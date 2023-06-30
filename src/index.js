import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import include from "./include";
import input from "./input";
import layout from "./layout";
import replace from "./replace";

export default {
    plugins: [
        [rehypeParse, { fragment: true }],
        rehypeStringify,
        include,
        input,
        layout,
        replace
    ]
};
