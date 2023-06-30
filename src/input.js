import { visit } from "unist-util-visit";
import format from "./format";
import { eqProperty } from "./utils";

export default function input(options) {
    const data = this.data();

    return tree => {
        visit(tree, { tagName: "input" }, node => {
            const { name } = node.properties;
            const value = format(data[name], options);
            node.properties.value = value;
        });

        visit(tree, { tagName: "select" }, node => {
            const { name } = node.properties;
            const value = format(data[name]);
            visit(node, eqProperty("value", value), option => {
                option.properties.selected = true;
            });
        });
    };
}
