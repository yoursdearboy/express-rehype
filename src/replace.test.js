import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { read } from "to-vfile";
import { unified } from "unified";
import replace from "./replace";

test("replace", async () => {
    const input = await read("views/replace/input.html");
    const output = await read("views/replace/output.html", "utf-8");
    const result = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeStringify)
        .use(replace)
        .process(input);
    expect(result.value).toEqualIgnoringWhitespace(output.value);
});
