import * as vscode from "vscode";
import { ContestTreeProvider, ContestNode } from "./contestTreeProvider";
import * as parser from "./parser";

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("codeforces-parser.helloWorld", () => {
    vscode.window.showInformationMessage("Hello World from Codeforces Parser!");
  });

  const contests: parser.Contest[] = [
    {
      id: "2095",
      name: "April Fools Day Contest 2025",
      duration: "02:00",
      startTime: {
        date: "Apr/01/2025",
        time: "10:35",
        timezone: "UTC-4",
      },
    },
    {
      id: "2092",
      name: "Codeforces Round 1014 (Div. 2)",
      duration: "02:00",
      startTime: {
        date: "Mar/27/2025",
        time: "10:35",
        timezone: "UTC-4",
      },
    },
  ];

  const contestProvider = new ContestTreeProvider(contests);
  vscode.window.registerTreeDataProvider(
    "codeforces-parser.available-contests",
    contestProvider
  );

	vscode.commands.registerCommand(
		"codeforces-parser.refresh-contests",
		() => {
			vscode.window.showInformationMessage("Refreshing contests ...");
		}
	);

  vscode.commands.registerCommand(
    "codeforces-parser.parse-contest",
    (contest: ContestNode) => {
      vscode.window.showInformationMessage("Parsing contest ...");
      console.log("Parsing contest: ", contest);
    }
  );
}

export function deactivate() {}
