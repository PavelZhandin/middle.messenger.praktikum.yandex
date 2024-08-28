import Block from "../../Core/Block";

function render(query: string, component: Block) {
    const root = document.querySelector(query);

    if (root !== null) {
        root.append(component.getContent() || "");
    }
    return root;
}

export { render };
