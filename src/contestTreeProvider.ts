import * as vscode from "vscode";
import * as path from "path";
import * as parser from "./parser";

export class ContestNode extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly tooltip: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command,
  ) {
    super(label, collapsibleState);
    this.tooltip = tooltip;
  }

  iconPath: vscode.IconPath = {
    light: vscode.Uri.file(
      path.join(
        __filename,
        "..",
        "..",
        "resources",
        "images",
        "contest-light.svg",
      ),
    ),
    dark: vscode.Uri.file(
      path.join(
        __filename,
        "..",
        "..",
        "resources",
        "images",
        "contest-dark.svg",
      ),
    ),
  };

  contextValue = "contestNode";
}

export class ContestTreeProvider
  implements vscode.TreeDataProvider<ContestNode>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    ContestNode | undefined | void
  > = new vscode.EventEmitter<ContestNode | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<ContestNode | undefined | void> =
    this._onDidChangeTreeData.event;
  private contests: parser.Contest[];

  constructor(contests: parser.Contest[]) {
    this.contests = contests;
  }

  getTreeItem(element: ContestNode): vscode.TreeItem {
    return element;
  }

  getChildren(element?: ContestNode): vscode.ProviderResult<ContestNode[]> {
    if (element) {
      return [];
    } else {
      return this.contests.map((contest) => {
        return new ContestNode(
          contest.name,
          parser.buildContestUrl(contest),
          vscode.TreeItemCollapsibleState.None,
        );
      });
    }
  }
}
