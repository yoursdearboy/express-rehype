import { unified } from "unified";
import { base } from ".";
import attr from "./attr";

test("attributes can be evaluated using re attributes", async () => {
    const input = '<div re:some="x + 1"></div>';
    const output = '<div some="2"></div>';
    const data = { x: 1 };
    const settings = { settings: { fragment: true } };
    const result = await unified()
        .use(base)
        .use(attr)
        .data(data)
        .use(settings)
        .process(input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});
