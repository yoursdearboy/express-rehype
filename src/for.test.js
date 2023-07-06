import { unified } from "unified";
import { base } from ".";
import loop from "./for";

test("loop", async () => {
    const input = '<ul><li re:for="x">item</li></ul>';
    const output = "<ul>" +
        '<li re:for="x">item</li>' +
        '<li re:for="x">item</li>' +
        '<li re:for="x">item</li>' +
    "</ul>";
    const data = { x: [1, 2, 3] };
    const result = await unified()
        .use(base)
        .use(loop)
        .data(data)
        .process(input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});
