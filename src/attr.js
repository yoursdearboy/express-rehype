import { visit } from "unist-util-visit";
import { evalWith, hasPropertyStartsWith } from "./utils";

export default function attr() {
    const data = this.data();

    return tree => {
        visit(tree, hasPropertyStartsWith("re:"), node => {
            Object.keys(node.properties).forEach(reprop => {
                if (!reprop.startsWith("re:")) return;
                const newprop = reprop.substring(3, reprop.length);
                const value = evalWith(node.properties[reprop], data);
                node.properties[newprop] = value;
                delete node.properties[reprop];
            });
        });
    };
}
