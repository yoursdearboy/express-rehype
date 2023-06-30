import { read } from "to-vfile";
import { base, include, input, layout, replace } from "./index";

test("works", async () => {
    const data = {
        key1: "value1"
    };
    const file = await read("src/__tests__/input.html");
    const expected = await read("src/__tests__/output.html", "utf8");
    const result = await base.use(include).use(input, data).use(layout).use(replace).process(file);
    expect(result.value).toEqualIgnoringWhitespace(expected.value);
});
