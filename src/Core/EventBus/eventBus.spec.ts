import sinon from "sinon";
import { expect } from "chai";
import EventBus from ".";

describe("Event bus", () => {
    let eventBus: EventBus;

    beforeEach(() => {
        eventBus = new EventBus();
    });

    it("should call provided function on event", () => {
        const callbackStub = sinon.stub();

        eventBus.on("test", callbackStub);

        eventBus.emit("test");

        expect(callbackStub.calledOnce).to.be.true;
    });

    it("should not call provided function if event unregistered", () => {
        const callbackStub = sinon.stub();

        eventBus.on("test", callbackStub);
        eventBus.off("test", callbackStub);

        eventBus.emit("test");

        expect(callbackStub.called).to.be.false;
    });
});
