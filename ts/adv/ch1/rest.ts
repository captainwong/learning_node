let guitar = { manufacturer: "Ibanez", type: 'Jem 777', strings: 6 };
let { manufacturer, ...rest } = guitar;
console.log(`The guitar ${manufacturer} ${rest.type} has ${rest.strings} strings`);

const instruments = ['Guitar', 'Violin', 'Oboe', 'Drums'];
let [gtr, ...rests] = instruments;
console.log(gtr);

function PrintInstruments(log: string, ...instruments: string[]): void {
    console.log(log);
    instruments.forEach(instrument => {
        console.log(instrument);
    });
}

PrintInstruments('Music Shop Inventory', 'Guitar', 'Drums', 'Clarinet', 'Clavinova');