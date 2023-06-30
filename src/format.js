import * as date from "date-fns";

export default function format(x, {
    format = "dd-MM-yyyy"
} = {}) {
    if (x instanceof Date) {
        x = date.format(x, format);
    }

    return x;
}
