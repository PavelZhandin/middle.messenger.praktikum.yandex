/* eslint-disable no-param-reassign */
import Handlebars, { HelperOptions } from "handlebars";

export function registerComponent(name: string, Component: any) {
    if (name in Handlebars.helpers) {
        throw new Error(`The ${name} component is already registered!`);
    }

    Handlebars.registerHelper(name, function (this: unknown, { hash, data, fn }: HelperOptions) {
        const component = new Component(hash);
        const dataAttribute = `data-id="${component.id}"`;

        if ("ref" in hash) {
            (data.root.__refs = data.root.__refs || {})[hash.ref] = component;
        }

        if (data.root.__children === undefined) {
            data.root.__children = [];
        }

        data.root.__children.push({
            component,
            embed(fragment: DocumentFragment) {
                const stub = fragment.querySelector(`[${dataAttribute}]`);

                if (!stub) {
                    return;
                }

                component.getContent()?.append(...Array.from(stub.childNodes));

                stub.replaceWith(component.getContent()!);
            },
        });

        const contents = fn ? fn(this) : "";

        return `<div ${dataAttribute}>${contents}</div>`;
    });
}
