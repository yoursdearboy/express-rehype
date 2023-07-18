import { unified } from "unified";
import { base } from ".";
import text from "./text";

const settings = {
    settings: {
        fragment: true
    }
};

const processor = unified()
    .use(base)
    .use(text, { format: "dd/MM/yyyy" });

test("text will be text", async () => {
    const input = '<p re:text="key">what value?</p>';
    const output = "<p>Lorem ipsum dolor sit amet</p>";
    const value = "Lorem ipsum dolor sit amet";
    const data = { key: value };
    const result = await processor().data(data).use(settings).process(input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});

test("number will be text", async () => {
    const input = '<p re:text="key">what value?</p>';
    const output = "<p>42</p>";
    const value = 42;
    const data = { key: value };
    const result = await processor().data(data).use(settings).process(input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});

test("date will be formatted text", async () => {
    const input = '<p re:text="key">what value?</p>';
    const output = "<p>01/02/2000</p>";
    const value = new Date(Date.parse("2000-02-01"));
    const data = { key: value };
    const result = await processor().data(data).use(settings).process(input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});
