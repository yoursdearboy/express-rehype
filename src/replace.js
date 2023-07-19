import { readSync } from "to-vfile";
import { visit } from "unist-util-visit";
import { findFile, hasProperty } from "./utils";

export default function replace() {
    return (tree, doc) => {
        visit(tree, hasProperty("re:replace"), (node, _, parent) => {
            const path = node.properties["re:replace"];
            const part = readSync(findFile(path, doc));
            const res = this.parse(part);
            parent.children[parent.children.indexOf(node)] = res;
        });
    };
}
