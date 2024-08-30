import { expect } from "chai";
import sinon from "sinon";
import Block, { IProps } from "./Block";

describe("Block", () => {
    let ComponentClass: typeof Block<IProps>;

    class Component extends Block<IProps> {
        constructor(props: IProps) {
            super({
                ...props,
            });
        }

        public get props() {
            return this._props as Record<string, unknown>;
        }

        public render(): string {
            return `
                <div>
                <span id="test-id">{{text}}</span>
                <button>{{text-button}}</button>
                </div>
            `;
        }
    }
    beforeEach(() => {
        ComponentClass = Component;
    });

    it("should render properly", () => {
        const block = new ComponentClass({ text: "text" }) as Component;
        const render = sinon.spy(block, "render");
        expect(render.calledOnce);
    });

    it("should be rendered with provided props", () => {
        const text = "hello";
        const blockComponent = new ComponentClass({ text });

        const spanText = blockComponent.element?.querySelector("#test-id")?.innerHTML;
        expect(spanText).to.be.equal(text);
    });

    it("should create content correctly", () => {
        const block = new ComponentClass({ text: "test_text" });
        expect(block.getContent()).not.null;
    });

    it("should render again after change props", () => {
        const block = new ComponentClass({ text: "test_text" }) as Component;
        const render = sinon.spy(block, "render");
        expect(render.calledOnce);
        block.props.text = "new_test_text";
        block.setProps(block.props);
        expect(render.called);
    });

    it("should show after being hidden and shown", () => {
        const pageComponent = new ComponentClass({});

        pageComponent.hide();
        pageComponent.show();

        expect(pageComponent.getContent().style.display).equal("flex");
    });
});
