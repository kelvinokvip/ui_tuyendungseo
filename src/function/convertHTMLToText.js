export const convertHTMLToText = (html) => {
    if (html) {
        const plainText = html.replace(/<[^>]+>/g, '');
        return plainText;
    }
    return "";
}