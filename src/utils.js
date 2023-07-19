import path from "path";
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

export function hasPropertyStartsWith(prop) {
    return node => {
        return Object
            .keys(node.properties || {})
            .some(s => s.startsWith(prop));
    };
}

/*
 * Merge nodes by id.
 */
export function merge(b) {
    return tree => {
        visit(tree, eqProperty("id", b.properties.id), a => {
            a.properties = Object.assign({}, a.properties, b.properties);
            a.children = b.children;
        });
    };
}

export function evalWith(code, context) {
    const args = Object.keys(context);
    const values = Object.values(context);
    const fun = eval(`(${args.join(",")}) => ${code};`);
    return fun.apply(null, values);
}

export function findFile(relativePath, relative) {
    return path.join(relative.cwd, relativePath);
}
