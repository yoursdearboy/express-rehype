import { readSync } from "to-vfile";
import { visit } from "unist-util-visit";
import { findFile, hasProperty, merge } from "./utils";

export default function layout() {
    return (tree, doc) => {
        visit(tree, hasProperty("re:layout"), node => {
            const path = node.properties["re:layout"];
            const layout = readSync(findFile(path, doc));
            const proc = this().use(merge, node);
            const res = proc.runSync(proc.parse(layout));
            tree.children = res.children;
        });
    };
}
