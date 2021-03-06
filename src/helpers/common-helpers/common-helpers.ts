import fs from "fs";
import path from "path";

class CommonHelper {
    /**
     *Creates an instance of CommonHelper.
     * @memberof CommonHelper
     */
    constructor() { }
    changeExtensions = function (rootPath: string, ext: string, dirToLook: string[], dirToSkip: string[] = []) {
        if (!fs.existsSync(rootPath)) return;
        dirToLook = Array.isArray(dirToLook) ? dirToLook /*Array.from(new Map(dirToLook.map(s => [s.toLowerCase(), s])).values())*/ : [];
        dirToSkip = Array.isArray(dirToSkip) ? Array.from(new Map(dirToSkip.map(s => [s.toLowerCase(), s])).values()) : [];
        for (const dir of dirToLook) {
            var dirOrFiles: any[] = [];
            const dirPath = path.resolve(rootPath, dir);
            if (!fs.existsSync(dirPath)) continue;
            var directories = fs.readdirSync(dirPath);
            directories.forEach(d => dirOrFiles.push(d));

            dirOrFiles = dirOrFiles.filter(d => !(d === ""));
            var uniqueDirectories: string[] = Array.from(new Set(dirOrFiles));
            var remainingDirOrFiles = uniqueDirectories.filter(df => {
                return dirToSkip.every(d => d !== df);
            });

            remainingDirOrFiles.forEach((file) => {
                var oldPath = path.join(rootPath, dir, file);
                if (!fs.existsSync(oldPath)) return;
                const stats = fs.statSync(oldPath);
                if (stats.isDirectory()) return this.changeExtension(oldPath, ext);

                var basename = path.basename(oldPath);
                if (!(basename.lastIndexOf(ext) === -1)) return;
                var newPath = path.join(rootPath, dir, file).concat(ext);
                console.log(newPath);
                fs.renameSync(oldPath, newPath);
            });
        }
    };
    /**
     *
     *
     * @protected
     * @memberof CommonHelper
     */
    protected changeExtension = function (dirPath: string, ext: string): void {
        var allFiles = fs.readdirSync(dirPath);
        allFiles.forEach(function (file) {
            var oldPath = path.join(dirPath, file);
            var basename = path.basename(oldPath);
            if (!(basename.lastIndexOf(ext) === -1)) return;
            var newPath = path.join(dirPath, file).concat(ext);
            console.log(newPath);
            fs.renameSync(oldPath, newPath);
        });
    };
};

const commonHelper: CommonHelper = new CommonHelper();
export { commonHelper, CommonHelper };