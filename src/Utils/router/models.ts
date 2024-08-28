/* eslint-disable new-cap */
import Block from "../../Core/Block";
import { render } from "./render";

type Options = {
    rootQuery: string;
};

class Route {
    protected pathname: string;

    protected componentClass: typeof Block;

    protected options: Options;

    protected component: Nullable<Block> = null;

    constructor(pathname: string, componentClass: typeof Block, options: Options) {
        this.pathname = pathname;
        this.componentClass = componentClass;
        this.options = options;
    }

    public navigate(pathname: string): void {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    public leave(): void {
        if (this.component) {
            this.component.hide();
        }
    }

    public match(pathname: string): boolean {
        return pathname === this.pathname;
    }

    public render(): void {
        if (this.component) {
            this.component.show();
        } else {
            this.component = new this.componentClass({});
            render(this.options.rootQuery, this.component);
        }
    }
}

export { Route };
