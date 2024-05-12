export const removeQuotes = (str: "true" | "false") => {
    if (str === "true") {
        return true;
    } else if (str === "false") {
        return false;
    } else {
        return undefined;
    }
}