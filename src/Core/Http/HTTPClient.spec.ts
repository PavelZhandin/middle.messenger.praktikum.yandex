import { expect, assert } from "chai";
import sinon from "sinon";
import { HTTPClient } from ".";

describe("HTTP client", () => {
    let http: HTTPClient;
    let requestStub: sinon.SinonStub<any>;

    const base = "https://ya-praktikum.tech/api/v2";

    beforeEach(() => {
        http = new HTTPClient("");
        requestStub = sinon.stub(http, "request").resolves();
    });

    afterEach(() => {
        sinon.restore();
    });

    it("should stringify parameters object", () => {
        const expectedURL = base.concat("?a=1&b=2");
        const testData = { a: "1", b: "2" };

        http.get("", { data: testData });

        expect(requestStub.calledWithMatch(expectedURL, { method: "GET" })).equal(true);
    });

    it("should encode characters for query", () => {
        const expectedURL = base.concat("?a=1%2B2&b=2%202");
        const testData = { a: "1+2", b: "2 2" };

        http.get("", { data: testData });

        expect(requestStub.calledWithMatch(expectedURL, { method: "GET" })).equal(true);
    });

    it("get should get request", () => {
        http.get("/url");
        assert(requestStub.calledOnce);
        assert(requestStub.calledWithMatch("/url"));
    });

    it("put should put request", () => {
        http.put("/url");
        assert(requestStub.calledOnce);
        assert(requestStub.calledWithMatch("/url"));
    });
    it("post should POST request", () => {
        http.post("/url");
        assert(requestStub.calledOnce);
        assert(requestStub.calledWithMatch("/url"));
    });
    it("delete should Delete request", () => {
        http.delete("/url");
        assert(requestStub.calledOnce);
        assert(requestStub.calledWithMatch("/url"));
    });
});
