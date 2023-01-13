const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    /**
     * todo get the selected text from a particular document.
     * todo convert the selected html/jsx to a boiler template in SASS.
     * todo create a new file with the same name as the input document, except with extension as scss.
     * todo add an import line in the current document file.
     * todo open the newly created scss file.
     */

    console.log(
        'Congratulations, your extension "sass_template_generator" is now active!'
    );

    let disposable = vscode.commands.registerCommand(
        "sassTemplateGenerator.generateSass",
        function () {
            vscode.window.showInformationMessage(
                "Hello World from Sass Template Generator!"
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
