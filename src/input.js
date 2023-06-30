import { visit } from "unist-util-visit";

export default function input() {
    const data = this.data();
    return tree => {
        visit(tree, { tagName: "input" }, node => {
            const { name } = node.properties;
            const value = data[name];
            node.properties.value = value;
        });
    }
}
