import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";

export const input = options => tree => {
    visit(tree, { tagName: "input" }, node => {
        const { name } = node.properties;
        const value = options[name];
        node.properties.value = value;
    })
};

export const base = unified()
    .use(rehypeParse)
    .use(rehypeStringify);
