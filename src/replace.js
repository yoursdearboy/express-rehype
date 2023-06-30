import { readSync } from "to-vfile";
import { visit } from "unist-util-visit";
import { hasProperty } from "./utils";

export default function replace() {
    return tree => {
        visit(tree, hasProperty("re:replace"), (node, _, parent) => {
            const path = node.properties["re:replace"];
            const part = readSync(path);
            const res = this.parse(part);
            parent.children[parent.children.indexOf(node)] = res;
        });
    };
}
