import { visit } from "unist-util-visit";
import { evalWith, hasProperty } from "./utils";
import format from "./format";

export default function text(options) {
    const data = this.data();

    return tree => {
        visit(tree, hasProperty("re:text"), (node) => {
            const expr = node.properties["re:text"];
            const value = evalWith(expr, data);
            node.children = [{
                type: "text",
                value: format(value, options)
            }];
        });
    };
}
