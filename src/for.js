import { clone } from "ramda";
import { visit } from "unist-util-visit";
import { evalWith, hasProperty } from "./utils";

export default function loop() {
    const data = this.data();

    return tree => {
        visit(tree, hasProperty("re:for"), (node, _, parent) => {
            const expr = node.properties["re:for"];
            const attr = node.properties["re:each"] || "each";
            const list = evalWith(expr, data);
            parent.children = list.map(value => {
                const bluedata = { [attr]: value, ...data };
                const blueprint = clone(node);
                delete blueprint.properties["re:for"];
                delete blueprint.properties["re:each"];
                return this().data(bluedata).runSync(blueprint);
            });
        });
    };
}
