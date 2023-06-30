import { readSync } from "to-vfile";
import { visit } from "unist-util-visit";
import { hasProperty } from "./utils";

export default function include() {
    return tree => {
        visit(tree, hasProperty("re:include"), node => {
            const path = node.properties["re:include"];
            const part = readSync(path);
            const res = this.parse(part);
            node.children = res.children;
        });
    }
}
