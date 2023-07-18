import { read } from "to-vfile";
import { unified } from "unified";
import { base } from ".";
import replace from "./replace";

test("replace", async () => {
    const input = await read("views/replace/input.html");
    const output = await read("views/replace/output.html", "utf-8");
    const settings = { settings: { fragment: true } };
    const result = await unified()
        .use(base)
        .use(replace)
        .use(settings)
        .process(input);
    expect(result.value).toEqualIgnoringWhitespace(output.value);
});
