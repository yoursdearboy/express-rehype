import { visit } from "unist-util-visit";
import format from "./format";

export default function input(options) {
    const data = this.data();
    return tree => {
        visit(tree, { tagName: "input" }, node => {
            const { name } = node.properties;
            const value = data[name];
            node.properties.value = format(value, options);
        });
    };
}
