"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ConsolidatedGrid(grid, margin) {
    let consolidatedGrid = Object.assign(Object.assign({}, margin), grid);
    consolidatedGrid.Width += grid.Width;
    consolidatedGrid.Height += grid.Height;
    consolidatedGrid.Padding = margin.Padding ? margin.Padding : grid.Padding;
    return consolidatedGrid;
}
let grid = { Height: 20, Width: 10, Padding: 5 };
let margin = { Left: 5, Top: 5, Width: 5, Height: 5 };
let consolidatedGrid = ConsolidatedGrid(grid, margin);
console.log(`Left : ${consolidatedGrid.Left}, Top : ${consolidatedGrid.Top}, Width : ${consolidatedGrid.Width},  Height : ${consolidatedGrid.Height}, Padding ${consolidatedGrid.Padding}`);
console.log(`Grid : Height ${grid.Height}, Width ${grid.Width}, Padding ${grid.Padding}`);
console.log(`Margin : Height ${margin.Height}, Width ${margin.Width}, Padding ${margin.Padding}, Left ${margin.Left}, Top ${margin.Top}`);
