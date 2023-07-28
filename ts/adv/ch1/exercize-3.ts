import { Command } from "./exercize-2";

function Log(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function () {
        console.log(`Added a command`);
        originalMethod.apply(this, arguments);
    }
    return descriptor;
}

class Commands{
    private readonly commands: Map<string, Command>;

    public constructor() {
        this.commands = new Map<string, Command>();
    }

    @Log
    public Add(command: Command): void{
        this.commands.set(command.Name, command);
    }

    public Execute(name: string): void{
        if (this.commands.has(name)) {
            this.commands.get(name)?.Action();
        }
    }

    public ExecuteAll(): void{
        for (let cmd of this.commands) {
            cmd[1].Action();
        }
    }
}


let cmds = new Commands();
let cmd1 = new Command("Test1", () => { console.log(`Test1 is running`) });
let cmd2 = new Command("Test2", () => { console.log(`Test2 is running`) });
cmds.Add(cmd1);
cmds.Add(cmd2);
cmds.Execute("Test1");
cmds.ExecuteAll();