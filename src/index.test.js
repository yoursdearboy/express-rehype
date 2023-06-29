import { read } from "to-vfile";
import { base, include, input, layout, replace } from "./index";

test("works", async () => {
    const data = {
        key1: "value1"
    };
    const file = await read("views/demo.html");
    const res = await base.use(include).use(input, data).use(layout).use(replace).process(file);
    console.log(res);
});
