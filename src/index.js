import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { readSync } from "to-vfile";
import { unified } from "unified";
import { visit } from "unist-util-visit";

export const base = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeStringify);

const eqProperty = (prop, value) => node => node.properties && node.properties[prop] === value;
const hasProperty = prop => node => node.properties && prop in node.properties;

/*
 * Merge nodes by id.
 */
function merge (b) {
    return tree => {
        visit(tree, eqProperty("id", b.properties.id), a => {
            a.properties = Object.assign({}, a.properties, b.properties);
            a.children = b.children;
        });
    }
}

export function include() {
    return tree => {
        visit(tree, hasProperty("re:include"), node => {
            const path = node.properties["re:include"];
            const part = readSync(path);
            const res = this.parse(part);
            node.children = res.children;
        });
    }
}

export const input = options => tree => {
    visit(tree, { tagName: "input" }, node => {
        const { name } = node.properties;
        const value = options[name];
        node.properties.value = value;
    })
};

export function layout() {
    return tree => {
        visit(tree, hasProperty("re:layout"), (node, _, parent) => {
            const path = node.properties["re:layout"];
            const layout = readSync(path);
            const proc = this().use(merge, node);
            const res = proc.runSync(proc.parse(layout));
            parent.children = res.children;
        });
    }
}

export function replace() {
    return tree => {
        visit(tree, hasProperty("re:replace"), (node, _, parent) => {
            const path = node.properties["re:replace"];
            const part = readSync(path);
            const res = this.parse(part);
            parent.children[parent.children.indexOf(node)] = res;
        });
    }
}
