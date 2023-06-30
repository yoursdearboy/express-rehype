import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { read } from "to-vfile";
import { unified } from "unified";
import { include, input, layout, replace } from ".";

test("works", async () => {
    const data = {
        key: "value"
    };
    const _input = await read("views/preset/input.html");
    const output = await read("views/preset/output.html", "utf8");
    const result = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeStringify)
    .use(include)
    .use(input, data)
    .use(layout)
    .use(replace)
    .process(_input);
    expect(result.value).toEqualIgnoringWhitespace(output.value);
});
