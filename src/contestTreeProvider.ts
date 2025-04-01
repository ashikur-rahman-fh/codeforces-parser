import * as vscode from "vscode";
import * as path from "path";

export class ContestNode extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);
		this.tooltip = this.label;
	}

	iconPath: vscode.IconPath = {
		light: vscode.Uri.file(path.join(__filename, '..', '..', 'resources', 'images', 'contest-light.svg')),
		dark: vscode.Uri.file(path.join(__filename, '..', '..', 'resources', 'images', 'contest-dark.svg')),
	};

	contextValue = 'contestNode';
}

export class ContestTreeProvider implements vscode.TreeDataProvider<ContestNode> {
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
