import { unified } from "unified";
import { base } from ".";
import input from "./input";

test("input", async () => {
    const _input = '<input type="text" name="key">';
    const output = '<input type="text" name="key" value="value">';
    const data = { key: "value" };
    const result = await unified()
        .use(base)
        .use(input)
        .data(data)
        .process(_input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});

test("input date", async () => {
    const _input = '<input type="text" name="key">';
    const output = '<input type="text" name="key" value="01/02/2000">';
    const value = new Date(Date.parse("2000-02-01"));
    const data = { key: value };
    const result = await unified()
        .use(base)
        .use(input, { format: "dd/MM/yyyy" })
        .data(data)
        .process(_input);
    expect(result.value).toEqualIgnoringWhitespace(output);
});
