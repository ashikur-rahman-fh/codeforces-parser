// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	vscode.commands.registerCommand("codeforces-parser.helloWorld", () => {
		vscode.window.showInformationMessage("Hello World from Codeforces Parser!");
	});

	const contestProvider = new ContestTreeProvider(["Codeforces Round #1234", "Codeforces Round #1235", "Codeforces Round #1236 Div 2"]);
	vscode.window.registerTreeDataProvider("codeforces-parser.available-contests", contestProvider);
	// context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

class ContestNode extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);
		this.tooltip = this.label;
	}

	// iconPath = path.join(__filename, '..', '..', 'resources', 'images', 'contest-light.svg');
	iconPath: vscode.IconPath = {
		light: vscode.Uri.file(path.join(__filename, '..', '..', 'resources', 'images', 'contest-light.svg')),
		dark: vscode.Uri.file(path.join(__filename, '..', '..', 'resources', 'images', 'contest-dark.svg')),
	};

	contextValue = 'contestNode';
}

class ContestTreeProvider implements vscode.TreeDataProvider<ContestNode> {
	private _onDidChangeTreeData: vscode.EventEmitter<ContestNode | undefined | void> = new vscode.EventEmitter<ContestNode | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<ContestNode | undefined | void> = this._onDidChangeTreeData.event;
	private contests: string[];

	constructor(contests: string[]) {
		this.contests = contests;
	}

	getTreeItem(element: ContestNode): vscode.TreeItem {
		return element;
	}

	getChildren(element?: ContestNode): vscode.ProviderResult<ContestNode[]> {
		if (element) {
			return [];
		} else {
			return this.contests.map(contest => {
				return new ContestNode(contest, vscode.TreeItemCollapsibleState.None);
			});
		}
	}
}
