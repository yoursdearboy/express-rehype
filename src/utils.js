import { visit } from "unist-util-visit";

export function eqProperty(prop, value) {
    return node => {
        return node.properties && node.properties[prop] === value;
    };
}

export function hasProperty(prop) {
    return node => {
        return node.properties && prop in node.properties;
    };
}

/*
 * Merge nodes by id.
 */
export function merge (b) {
    return tree => {
        visit(tree, eqProperty("id", b.properties.id), a => {
            a.properties = Object.assign({}, a.properties, b.properties);
            a.children = b.children;
        });
    };
}
