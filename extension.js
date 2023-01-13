const vscode = require("vscode");
const { TextEncoder } = require("util");

const replaceFileExtension = (fileName, extension = ".scss") => {
    const exp = /\.([A-Za-z0-9]+)$/;
    return fileName.replace(exp, extension);
};

const getFileName = (filePath) => {
    // extract a fileName from the given filePath.
    const arr = filePath.split("/");
    return arr.at(-1);
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    /**
     // // todo get the selected text from a particular document.
     // todo convert the selected html/jsx to a boiler template in SASS.
     // // todo create a new file with the same name as the input document, except with extension as scss.
     // // todo add an import line in the current document file.
     // // todo open the newly created scss file.
     */

    console.log(
        'Congratulations, your extension "sass_template_generator" is now active!'
    );

    let disposable = vscode.commands.registerCommand(
        "sassTemplateGenerator.generateSass",
        async function () {
            const editor = vscode.window.activeTextEditor;
            const text = editor.document.getText(editor.selection);

            const oldFilePath = editor.document.fileName;
            const oldFilePathUri = vscode.Uri.file(oldFilePath);
            const newFilePath = replaceFileExtension(oldFilePath);
            const newFileUri = vscode.Uri.file(newFilePath);

            const oldFileData = await vscode.workspace.fs.readFile(
                oldFilePathUri
            );

            const updatedText = `import "./${getFileName(
                newFilePath
            )}";\n${oldFileData}`;

            await vscode.workspace.fs.writeFile(
                oldFilePathUri,
                new TextEncoder().encode(updatedText)
            );

            await vscode.workspace.fs.writeFile(
                newFileUri,
                new TextEncoder().encode(text)
            );

            const doc = await vscode.workspace.openTextDocument(newFileUri);
            await vscode.window.showTextDocument(doc);

            editor.document.save();

            vscode.window.showInformationMessage(
                `SCSS Boiler Template Generated.`
            );
        }
    );

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
