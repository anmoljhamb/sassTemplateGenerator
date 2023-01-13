const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log(
        'Congratulations, your extension "sassTemplateGenerator" is now active!'
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
