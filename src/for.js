import { visit } from "unist-util-visit";
import { evalWith, hasProperty } from "./utils";

export default function loop() {
    const data = this.data();

    return tree => {
        visit(tree, hasProperty("re:for"), (node, _, parent) => {
            const expr = node.properties["re:for"];
            const list = evalWith(expr, data);
            parent.children = list.map(el => node);
        });
    };
}
