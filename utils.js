const replaceFileExtension = (fileName, extension = ".scss") => {
    const exp = /\.([A-Za-z0-9]+)$/;
    return fileName.replace(exp, extension);
};

const getFileName = (filePath) => {
    // extract a fileName from the given filePath.
    const arr = filePath.split("/");
    return arr.at(-1);
};

module.exports = {
    getFileName,
    replaceFileExtension,
};
