"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const exercize_2_1 = require("./exercize-2");
function Log(target, propertyKey, descriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function () {
        console.log(`Added a command`);
        originalMethod.apply(this, arguments);
    };
    return descriptor;
}
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
__decorate([
    Log
], Commands.prototype, "Add", null);
let cmds = new Commands();
let cmd1 = new exercize_2_1.Command("Test1", () => { console.log(`Test1 is running`); });
let cmd2 = new exercize_2_1.Command("Test2", () => { console.log(`Test2 is running`); });
cmds.Add(cmd1);
cmds.Add(cmd2);
cmds.Execute("Test1");
cmds.ExecuteAll();
