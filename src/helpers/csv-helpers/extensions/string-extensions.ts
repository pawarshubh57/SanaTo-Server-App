class StringExtensions extends String {
    checkStatement = (statement: string): boolean =>
        (typeof statement === "undefined" || statement === "" || statement === null || /\\s+/.test(statement));
    fileNameWithoutExtension = function (path: string): string {
        var fileName = path.split('.').slice(0, -1).join('.');
        return fileName;
    };
    fileExtensionOnly = function (path: string): string {
        if (typeof path === "undefined" || path === "" || path === null) return "";
        try {
            const regEx = /\.[^.]+$/;
            const extension = regEx.exec(path).pop();
            return extension;
        } catch (error) {
            console.error(error);
            return ""
        }
    };
}

const stringExtensions: StringExtensions = new StringExtensions();

export { stringExtensions, StringExtensions };