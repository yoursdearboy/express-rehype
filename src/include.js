import { readSync } from "to-vfile";
import { visit } from "unist-util-visit";
import { findFile, hasProperty } from "./utils";

export default function include() {
    return (tree, doc) => {
        visit(tree, hasProperty("re:include"), node => {
            const path = node.properties["re:include"];
            const part = readSync(findFile(path, doc));
            const res = this.parse(part);
            node.children = res.children;
        });
    };
}
