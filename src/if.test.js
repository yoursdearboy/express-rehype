import { unified } from "unified";
import { base } from ".";
import cond from "./if";

const settings = {
    settings: {
        fragment: true
    }
};

const processor = unified()
    .use(base)
    .use(cond);

test("if", async () => {
    const input =
        '<div re:if="x <= 10">fine</div>' +
        '<div re:if="x > 10">too much</div>';
    const output1 = '<div re:if="x <= 10">fine</div>';
    const branch1 = await processor().data({ x: 7 }).use(settings).process(input);
    expect(branch1.value).toEqualIgnoringWhitespace(output1);
    const output2 = '<div re:if="x > 10">too much</div>';
    const branch2 = await processor().data({ x: 42 }).use(settings).process(input);
    expect(branch2.value).toEqualIgnoringWhitespace(output2);
});
