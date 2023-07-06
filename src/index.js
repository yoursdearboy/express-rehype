import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import cond from "./if";
import include from "./include";
import input from "./input";
import layout from "./layout";
import loop from "./for";
import replace from "./replace";
import text from "./text";

export const base = {
    plugins: [
        [rehypeParse, { fragment: true }],
        rehypeStringify
    ]
};

export default {
    plugins: [
        base,
        cond,
        include,
        input,
        layout,
        loop,
        replace,
        text
    ]
};
