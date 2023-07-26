"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Margin = exports.Grid = void 0;
class Grid {
    constructor(padding) {
        this.Width = 0;
        this.Height = 0;
        this.Padding = 0;
        this.Padding = padding;
    }
}
exports.Grid = Grid;
class Margin {
    constructor() {
        this.Left = 0;
        this.Top = 0;
        this.Width = 10;
        this.Height = 20;
    }
}
exports.Margin = Margin;
function ConsolidatedGrid(grid, margin) {
    let consolidatedGrid = Object.assign({}, margin);
    consolidatedGrid.Left = margin.Left;
    consolidatedGrid.Top = margin.Top;
    consolidatedGrid.Width = margin.Width + grid.Width;
    consolidatedGrid.Height = margin.Height + grid.Height;
    consolidatedGrid.Padding = margin.Padding ? margin.Padding : grid.Padding;
    return consolidatedGrid;
}
let grid = { Height: 20, Width: 10, Padding: 5 };
let x = ConsolidatedGrid(grid, { Left: 5, Top: 5, Width: 5, Height: 5 });
console.log(`Left : ${x.Left}, Top : ${x.Top}, Width : ${x.Width}, Height : ${x.Height}, Padding : ${x.Padding}`);
