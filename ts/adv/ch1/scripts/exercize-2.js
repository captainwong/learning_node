"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor(Name = "", Action = new Function()) {
        this.Name = Name;
        this.Action = Action;
    }
}
exports.Command = Command;
class Commands {
    constructor() {
        this.commands = new Map();
    }
    Add(command) {
        this.commands.set(command.Name, command);
    }
    Execute(name) {
        var _a;
        if (this.commands.has(name)) {
            (_a = this.commands.get(name)) === null || _a === void 0 ? void 0 : _a.Action();
        }
    }
    ExecuteAll() {
        for (let cmd of this.commands) {
            cmd[1].Action();
        }
    }
}
let cmds = new Commands();
let cmd1 = new Command("Test1", () => { console.log(`Test1 is running`); });
let cmd2 = new Command("Test2", () => { console.log(`Test2 is running`); });
cmds.Add(cmd1);
cmds.Add(cmd2);
cmds.Execute("Test1");
cmds.ExecuteAll();
