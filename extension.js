const vscode = require("vscode");
const fs = require("fs");

const replaceFileExtension = (fileName, extension = ".scss") => {
    const exp = /\.([A-Za-z0-9]+)$/;
    return fileName.replace(exp, extension);
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    /**
     // // todo get the selected text from a particular document.
     // todo convert the selected html/jsx to a boiler template in SASS.
     // // todo create a new file with the same name as the input document, except with extension as scss.
     // todo add an import line in the current document file.
     // todo open the newly created scss file.
     */

    console.log(
        'Congratulations, your extension "sass_template_generator" is now active!'
    );

    let disposable = vscode.commands.registerCommand(
        "sassTemplateGenerator.generateSass",
        function () {
            const editor = vscode.window.activeTextEditor;
            const text = editor.document.getText(editor.selection);
            const newFilePath = replaceFileExtension(editor.document.fileName);

            fs.writeFileSync(newFilePath, text, {
                encoding: "utf-8",
            });

            vscode.window.showInformationMessage(
                `SCSS Boiler Template Generated at the path: ${newFilePath}`
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
