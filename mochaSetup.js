import { JSDOM } from "jsdom";
import { describe, it } from "mocha";

const jsdom = new JSDOM("<body></body>", {
    url: "https://example.org",
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
global.MouseEvent = jsdom.window.MouseEvent;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;

// mocha
global.describe = describe;
global.it = it;
