import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import input from "./input";

test("input", async () => {
    const _input = '<input type="text" name="key">';
    const output = '<input type="text" name="key" value="value">';
    const data = { key: "value" };
    const result = await unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeStringify)
        .use(input)
        .data(data)
        .process(_input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});
