import { visit } from "unist-util-visit";

export default function input(options) {
    return tree => {
        visit(tree, { tagName: "input" }, node => {
            const { name } = node.properties;
            const value = options[name];
            node.properties.value = value;
        });
    }
}
