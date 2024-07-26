/* eslint-disable no-use-before-define */
import Handlebars from "handlebars";
import EventBus from "./EventBus";
import { isDeepEqual } from "../Utils/compareFunctions/isDeepEqual";

export interface IProps extends Record<string, unknown> {
    events: Record<string, unknown>;
}

export type TBlock = typeof Block;

export class Block<Props extends Partial<IProps> = Record<string, unknown>> {
    static EVENTS = {
        INIT: "init",
        FLOW_DID_MOUNT: "flow:component-did-mount",
        FLOW_DID_UPDATE: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
        FLOW_WILL_UNMOUNT: "flow:component-will-unmount",
    };

    public id = Math.floor(Math.random() * 100);

    protected props: Props;

    protected _element: HTMLElement | null = null;

    private eventBus: () => EventBus;

    private children: Record<string, Block> = {};

    protected refs: Record<string, Block> = {};

    constructor(propsWithChildren: IProps) {
        const eventBus = new EventBus();
        console.log(eventBus);
        const { props, children } = this._getChildrenAndProps(propsWithChildren);

        this.children = children;
        this.props = this.makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _getChildrenAndProps(childrenAndProps: IProps) {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props, children };
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_DID_MOUNT, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_DID_UPDATE, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_WILL_UNMOUNT, this._componentWillUnmount.bind(this));
    }

    private _init() {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount() {
        this.componentDidMount();
    }

    protected componentDidMount() {}

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_DID_MOUNT);
        Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(oldProps: IProps, newProps: IProps) {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: IProps, newProps: IProps): boolean {
        return isDeepEqual(oldProps as Record<string, IProps>, newProps as Record<string, IProps>);
    }

    private _componentWillUnmount() {
        this.componentWillUnmount();
        this._removeEvents();
    }

    protected componentWillUnmount() {
        this._removeEvents();
    }

    public setProps = (nextProps: Props) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props || {}, nextProps);
    };

    get element() {
        return this._element;
    }

    public value() {
        return this._element && (<HTMLInputElement>this._element).value
            ? (<HTMLInputElement>this._element).value
            : "";
    }

    public getRefs() {
        return this.refs;
    }

    private _render() {
        if (this.props) {
            const fragment = this.compile(this.render(), this.props);

            const newElement = fragment.firstElementChild as HTMLElement;

            if (this._element) {
                this._removeEvents();
                this._element.replaceWith(newElement);
            }

            this._element = newElement;

            this._addEvents();
        }
    }

    private _addEvents() {
        const { events = {} } = this.props as {
            events: Record<string, () => void>;
        };

        Object.keys(events).forEach((eventName) => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents() {
        const { events = {} } = this.props as {
            events: Record<string, () => void>;
        };

        Object.keys(events).forEach((eventName) => {
            this._element?.removeEventListener(eventName, events[eventName]);
        });
    }

    private compile(template: string, context: object) {
        const contextAndStubs = {
            ...context,
            __children: [],
            __refs: this.refs,
        };

        const html = Handlebars.compile(template)(contextAndStubs);

        const templateElement = document.createElement("template");

        templateElement.innerHTML = html;

        contextAndStubs.__children?.forEach(({ embed }) => {
            embed(templateElement.content);
        });

        return templateElement.content;
    }

    protected render(): string {
        return "";
    }

    getContent() {
        return this.element;
    }

    private makePropsProxy(props: { [index: string | symbol]: unknown }) {
        const self = this;
        // private makePropsProxy(props: IProps) {
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = { ...target };

                // eslint-disable-next-line no-param-reassign
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_DID_UPDATE, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            },
        });
    }
}

export default Block;
