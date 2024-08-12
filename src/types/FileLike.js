export class FileListLike {
    constructor(files) {
        this.length = files.length;
        files.forEach((file, index) => {
            this[index] = file;
        });
    }
}