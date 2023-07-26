"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
let guitar = { manufacturer: "Ibanez", type: 'Jem 777', strings: 6 };
let { manufacturer } = guitar, rest = __rest(guitar, ["manufacturer"]);
console.log(`The guitar ${manufacturer} ${rest.type} has ${rest.strings} strings`);
const instruments = ['Guitar', 'Violin', 'Oboe', 'Drums'];
let [gtr, ...rests] = instruments;
console.log(gtr);
function PrintInstruments(log, ...instruments) {
    console.log(log);
    instruments.forEach(instrument => {
        console.log(instrument);
    });
}
PrintInstruments('Music Shop Inventory', 'Guitar', 'Drums', 'Clarinet', 'Clavinova');
