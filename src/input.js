import { visit } from "unist-util-visit";
import format from "./format";
import { eqProperty } from "./utils";

export default function input(options) {
    const data = this.data();

    const get = node => data[node.properties.name];
    const value = node => format(get(node), options);

    return tree => {
        visit(tree, { tagName: "input" }, node => {
            node.properties.value = value(node);
        });

        visit(tree, { tagName: "textarea" }, node => {
            node.children = [{
                type: "text",
                value: value(node)
            }];
        });

        visit(tree, { tagName: "select" }, node => {
            visit(node, eqProperty("value", value(node)), option => {
                option.properties.selected = true;
            });
        });
    };
}
