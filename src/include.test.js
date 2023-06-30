import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { read } from "to-vfile";
import { unified } from "unified";
import include from "./include";

test("include", async () => {
    const input = await read("views/include/input.html");
    const output = await read("views/include/output.html", "utf-8");
    const result = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeStringify)
        .use(include)
        .process(input);
    expect(result.value).toEqualIgnoringWhitespace(output.value);
});
