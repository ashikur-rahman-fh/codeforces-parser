import * as vscode from 'vscode';
import { ContestTreeProvider, ContestNode } from './contestTreeProvider';

export function activate(context: vscode.ExtensionContext) {

	vscode.commands.registerCommand("codeforces-parser.helloWorld", () => {
		vscode.window.showInformationMessage("Hello World from Codeforces Parser!");
	});

	const contestProvider = new ContestTreeProvider(["Codeforces Round #1234", "Codeforces Round #1235", "Codeforces Round #1236 Div 2"]);
	vscode.window.registerTreeDataProvider("codeforces-parser.available-contests", contestProvider);

	vscode.commands.registerCommand("codeforces-parser.parse-contest", (contest: ContestNode) => {
		vscode.window.showInformationMessage("Parsing contest ...");
		console.log("Parsing contest: ", contest);
	});
}

export function deactivate() {}
