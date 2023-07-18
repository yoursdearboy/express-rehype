import { unified } from "unified";
import { base } from ".";
import input from "./input";

const settings = {
    settings: {
        fragment: true
    }
};

const processor = unified()
    .use(base)
    .use(input, { format: "dd/MM/yyyy" });

test("input", async () => {
    const _input = '<input type="text" name="key">';
    const output = '<input type="text" name="key" value="value">';
    const value = "value";
    const data = { key: value };
    const result = await processor().data(data).use(settings).process(_input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});

test("input date", async () => {
    const _input = '<input type="text" name="key">';
    const output = '<input type="text" name="key" value="01/02/2000">';
    const value = new Date(Date.parse("2000-02-01"));
    const data = { key: value };
    const result = await processor().data(data).use(settings).process(_input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});

test("input number", async () => {
    const _input = '<input type="text" name="key">';
    const output = '<input type="text" name="key" value="42">';
    const value = 42;
    const data = { key: value };
    const result = await processor().data(data).use(settings).process(_input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});

test("select ", async () => {
    const _input = '<select name="key">' +
        '<option value="1">One</option>' +
        '<option value="2">Two</option>' +
        '<option value="3">Three</option>' +
        "</select>";
    const output = '<select name="key">' +
        '<option value="1">One</option>' +
        '<option value="2" selected>Two</option>' +
        '<option value="3">Three</option>' +
        "</select>";
    const value = "2";
    const data = { key: value };
    const result = await processor().data(data).use(settings).process(_input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});

test("textarea", async () => {
    const _input = '<textarea name="key"></textarea>';
    const output = '<textarea name="key">Ohayo</textarea>';
    const value = "Ohayo";
    const data = { key: value };
    const result = await processor().data(data).use(settings).process(_input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});
