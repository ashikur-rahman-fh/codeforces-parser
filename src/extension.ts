// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	vscode.commands.registerCommand("codeforces-parser.helloWorld", () => {
		vscode.window.showInformationMessage("Hello World from Codeforces Parser!");
	});

	// context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
