import { unified } from "unified";
import { base } from ".";
import loop from "./for";
import text from "./text";

test("basic empty loop", async () => {
    const input = '<ul><li re:for="x">item</li></ul>';
    const output = "<ul>" +
        '<li>item</li>' +
        '<li>item</li>' +
        '<li>item</li>' +
    "</ul>";
    const data = { x: [1, 2, 3] };
    const result = await unified()
        .use(base)
        .use(loop)
        .data(data)
        .process(input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});

test("loop with text substitution", async () => {
    const input = '<ul><li re:for="x" re:each="i" re:text="i">item</li></ul>';
    const output = "<ul>" +
        '<li>1</li>' +
        '<li>2</li>' +
        '<li>3</li>' +
    "</ul>";
    const data = { x: [1, 2, 3] };
    const result = await unified()
        .use(base)
        .use(loop)
        .use(text)
        .data(data)
        .process(input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});

test("loop with nested element and text substitution", async () => {
    const input = '<ul><li re:for="x" re:each="i"><span re:text="i">item</span></li></ul>';
    const output = "<ul>" +
        '<li><span>1</span></li>' +
        '<li><span>2</span></li>' +
        '<li><span>3</span></li>' +
    "</ul>";
    const data = { x: [1, 2, 3] };
    const result = await unified()
        .use(base)
        .use(loop)
        .use(text)
        .data(data)
        .process(input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});
