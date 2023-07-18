import { read } from "to-vfile";
import { unified } from "unified";
import { base } from ".";
import include from "./include";

test("include", async () => {
    const input = await read("views/include/input.html");
    const output = await read("views/include/output.html", "utf-8");
    const settings = { settings: { fragment: true } };
    const result = await unified()
        .use(base)
        .use(include)
        .use(settings)
        .process(input);
    expect(result.value).toEqualIgnoringWhitespace(output.value);
});
