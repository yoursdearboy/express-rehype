import { read } from "to-vfile";
import { base, input } from "./index";

test("works", async () => {
    const data = {
        key1: "value1"
    };
    const file = await read("demo.html");
    const res = await base.use(input, data).process(file);
    console.log(res);
});
