import { expect, assert } from "chai";
import sinon from "sinon";
import { Router } from ".";
import { ERoutes } from "../../Enums/routes";

describe("Router", () => {
    const rootQuery = "#app";
    let router: Router;

    const setRouters = () => {
        router = new Router(rootQuery);

        if (router) {
            window.router = router;
            router.start();
        }
    };

    it("Object should create correct", () => {
        setRouters();
        expect(router).not.null;
        expect(router.currentRoute).null;
    });

    it("Object should get only one instance", () => {
        setRouters();
        const router1 = new Router(".app1");
        assert.equal(router1, router);
    });

    it("use return instance of router and added route", () => {
        setRouters();
        assert.equal(router.go(ERoutes.SignIn), null);
        expect(router.go(ERoutes.SignIn)).not.null;
    });

    it("getRoute should return route or null", () => {
        setRouters();
        expect(router.go(ERoutes.SignIn)).not.null;
    });

    it("go works correct", () => {
        setRouters();
        const pushState = sinon.spy(window.history, "pushState");
        assert.equal(window.location.pathname, ERoutes.SignIn);

        router.go(ERoutes.Messenger);
        assert.equal(window.location.pathname, ERoutes.Messenger);
        assert(pushState.calledOnce);
    });

    it("back works correct", () => {
        setRouters();
        const back = sinon.spy(window.history, "back");

        router.go("/login");
        router.go("/signup");
        router.back();
        assert(back.calledOnce);
    });
    it("forward works correct", () => {
        setRouters();
        const forward = sinon.spy(window.history, "forward");

        router.forward();
        assert(forward.calledOnce);
    });
});
