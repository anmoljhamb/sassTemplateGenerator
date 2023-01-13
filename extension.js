const vscode = require("vscode");
const { TextEncoder } = require("util");
const { getFileName, replaceFileExtension } = require("./utils");
const generateSass = require("./generateSass");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    /**
     // // todo get the selected text from a particular document.
     // // todo convert the selected html/jsx to a boiler template in SASS.
     // // todo create a new file with the same name as the input document, except with extension as scss.
     // // todo add an import line in the current document file.
     // // todo open the newly created scss file.
     */

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

            const temp = `import "./${getFileName(newFilePath)}";`;
            if (temp !== oldFileData.toString().split("\n")[0]) {
                const updatedText = `${temp}\n${oldFileData}`;
                await vscode.workspace.fs.writeFile(
                    oldFilePathUri,
                    new TextEncoder().encode(updatedText)
                );
            }

            await vscode.workspace.fs.writeFile(
                newFileUri,
                new TextEncoder().encode(generateSass(text))
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
