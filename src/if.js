import { visit } from "unist-util-visit";
import { evalWith, hasProperty } from "./utils";

export default function cond() {
    const data = this.data();

    return tree => {
        visit(tree, hasProperty("re:if"), (node, _, parent) => {
            const cond = node.properties["re:if"];
            const pass = evalWith(cond, data);
            if (!pass) {
                parent.children = parent.children.filter(c => c !== node);
            }
        });
    };
}
