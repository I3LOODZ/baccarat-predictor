"use client";

import { useState } from "react";

const COLORS = { P: "bg-blue-600", B: "bg-red-600", T: "bg-green-600", };

const OPTIONS = ["P", "B", "T"];

export default function Home() { const [grid, setGrid] = useState<string[][]>(Array.from({ length: 10 }, () => Array(6).fill(""))); const [locked, setLocked] = useState(false); const [resultGrid, setResultGrid] = useState<string[][]>([]); const [checkGrid, setCheckGrid] = useState<string[][]>([]); const [history, setHistory] = useState<string[][]>([]);

const handleClick = (col: number, row: number) => { if (locked) return; const current = grid[col][row]; const next = OPTIONS[(OPTIONS.indexOf(current) + 1) % OPTIONS.length]; const newGrid = grid.map((col) => [...col]); newGrid[col][row] = next; setHistory((prev) => [...prev, grid.map((col) => [...col])]); setGrid(newGrid);

const totalInputs = newGrid.flat().filter((v) => v).length;
if (totalInputs === 10) {
  setLocked(true);
  randomizeRest(newGrid);
}

};

const randomizeRest = (newGrid: string[][]) => { const fullGrid = newGrid.map((col) => [...col]); for (let c = 0; c < 10; c++) { for (let r = 0; r < 6; r++) { if (!fullGrid[c][r]) { const rand = OPTIONS[Math.floor(Math.random() * OPTIONS.length)]; fullGrid[c][r] = rand; } } } setResultGrid(fullGrid); setCheckGrid(Array.from({ length: 10 }, () => Array(6).fill(""))); };

const toggleCheck = (col: number, row: number) => { const newCheck = [...checkGrid]; const current = newCheck[col][row]; newCheck[col][row] = current === "✓" ? "✗" : current === "✗" ? "" : "✓"; setCheckGrid(newCheck); };

const resetAll = () => { setGrid(Array.from({ length: 10 }, () => Array(6).fill(""))); setLocked(false); setResultGrid([]); setCheckGrid([]); setHistory([]); };

const undoLast = () => { if (history.length === 0 || locked) return; const prevGrid = history[history.length - 1]; setGrid(prevGrid); setHistory(history.slice(0, -1)); };

const displayGrid = locked ? resultGrid : grid;

return ( <div className="p-4"> <h1 className="text-xl font-bold mb-4">Baccarat Predictor</h1> <div className="flex gap-4 mb-4"> <button onClick={resetAll} className="bg-gray-700 text-white px-4 py-2 rounded">รีเซ็ต</button> <button onClick={undoLast} className="bg-yellow-600 text-white px-4 py-2 rounded">ย้อนกลับ 1 ครั้ง</button> </div> <div className="grid grid-cols-10 gap-2"> {displayGrid.map((col, colIndex) => ( <div key={colIndex} className="flex flex-col gap-2"> {col.map((cell, rowIndex) => ( <div key={rowIndex} className={w-10 h-10 rounded-full flex items-center justify-center border cursor-pointer ${ COLORS[cell as keyof typeof COLORS] || "bg-gray-200" }} onClick={() => handleClick(colIndex, rowIndex)} > {locked && ( <span className={text-white text-sm select-none} onClick={(e) => { e.stopPropagation(); toggleCheck(colIndex, rowIndex); }} > {checkGrid[colIndex][rowIndex] === "✓" ? "✓" : checkGrid[colIndex][rowIndex] === "✗" ? "✗" : ""} </span> )} </div> ))} </div> ))} </div> </div> ); }

