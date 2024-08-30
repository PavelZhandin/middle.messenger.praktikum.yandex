import Block from "../../Core/Block";
import { Route } from "./models";

class Router {
    private static instance: Router;

    private routes: Route[] = [];

    private history: History = window.history;

    private _currentRoute: Nullable<Route> = null;

    private rootQuery: string = "";

    constructor(rootQuery: string) {
        if (Router.instance) {
            return Router.instance;
        }

        this.rootQuery = rootQuery;

        Router.instance = this;
    }

    public get currentRoute() {
        return this._currentRoute;
    }

    public use(pathname: string, component: typeof Block<any> | any): Router {
        const route = new Route(pathname, component, { rootQuery: this.rootQuery });

        this.routes.push(route);

        return this;
    }

    public start() {
        window.addEventListener("popstate", () => {
            this.onRoute(window.location.pathname);
        });

        this.onRoute(window.location.pathname);
    }

    public onRoute(pathname: string): void {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this.currentRoute) {
            this.currentRoute.leave();
        }

        this._currentRoute = route;

        route.render();
    }

    public go(pathname: string): void {
        this.history.pushState({}, "", pathname);
        this.onRoute(pathname);
    }

    private getRoute(pathname: string): Optional<Route> {
        return this.routes.find((route) => route.match(pathname));
    }

    public back(): void {
        this.history.back();
    }

    public forward(): void {
        this.history.forward();
    }
}

export { Router };
