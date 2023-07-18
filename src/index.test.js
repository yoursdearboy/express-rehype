import { read } from "to-vfile";
import { unified } from "unified";
import preset from ".";

test("works", async () => {
    const data = {
        key: "value"
    };
    const _input = await read("views/preset/input.html");
    const output = await read("views/preset/output.html", "utf8");
    const settings = { settings: { fragment: true } };
    const result = await unified()
        .use(preset)
        .data(data)
        .use(settings)
        .process(_input);
    expect(result.value).toEqualIgnoringWhitespace(output.value);
});
