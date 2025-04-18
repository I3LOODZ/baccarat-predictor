'use client';
import { useState } from 'react';

const COLORS = {
  P: 'bg-blue-600',
  B: 'bg-red-600',
  T: 'bg-green-600',
};

const generateEmptyGrid = () => Array.from({ length: 10 }, () => Array(6).fill(''));
const generateEmptyCheckGrid = () => Array.from({ length: 10 }, () => Array(6).fill(''));

export default function Home() {
  const [grid, setGrid] = useState<string[][]>(generateEmptyGrid());
  const [checkGrid, setCheckGrid] = useState<string[][]>(generateEmptyCheckGrid());
  const [history, setHistory] = useState<string[][][]>([]);
  const [checkHistory, setCheckHistory] = useState<string[][][]>([]);
  const [locked, setLocked] = useState(false);
  const [resultGrid, setResultGrid] = useState<string[][]>(generateEmptyGrid());

  const handleClick = (colIndex: number, rowIndex: number) => {
    if (locked) return;
    const newGrid = grid.map(col => [...col]);
    const current = newGrid[colIndex][rowIndex];
    const next = current === '' ? 'P' : current === 'P' ? 'B' : current === 'B' ? 'T' : '';
    newGrid[colIndex][rowIndex] = next;
    setHistory([...history, grid.map(col => [...col])]);
    setCheckHistory([...checkHistory, checkGrid.map(col => [...col])]);
    setGrid(newGrid);
  };

  const toggleCheck = (colIndex: number, rowIndex: number) => {
    const newCheckGrid = checkGrid.map(col => [...col]);
    const current = newCheckGrid[colIndex][rowIndex];
    const next = current === '' ? '✓' : current === '✓' ? '✗' : '';
    newCheckGrid[colIndex][rowIndex] = next;
    setCheckGrid(newCheckGrid);
  };

  const resetAll = () => {
    setGrid(generateEmptyGrid());
    setCheckGrid(generateEmptyCheckGrid());
    setResultGrid(generateEmptyGrid());
    setLocked(false);
    setHistory([]);
    setCheckHistory([]);
  };

  const undoLast = () => {
    if (history.length === 0) return;
    const prevGrid = history[history.length - 1];
    const prevCheck = checkHistory[checkHistory.length - 1];
    setGrid(prevGrid);
    setCheckGrid(prevCheck);
    setHistory(history.slice(0, -1));
    setCheckHistory(checkHistory.slice(0, -1));
  };

  const lockAndPredict = () => {
    const flatGrid = grid.flat().filter(cell => cell !== '');
    if (flatGrid.length < 10) {
      alert('กรุณากรอกอย่างน้อย 10 ตัวก่อน');
      return;
    }

    const newGrid = grid.map(col => [...col]);
    for (let col = 0; col < 10; col++) {
      for (let row = 0; row < 6; row++) {
        if (newGrid[col][row] === '') {
          const options = ['P', 'B', 'T'];
          const random = options[Math.floor(Math.random() * options.length)];
          newGrid[col][row] = random;
        }
      }
    }
    setResultGrid(newGrid);
    setLocked(true);
  };

  const displayGrid = locked ? resultGrid : grid;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Baccarat Predictor</h1>
      <div className="flex gap-4 mb-4">
        <button onClick={resetAll} className="bg-gray-700 text-white px-4 py-2 rounded">รีเซ็ต</button>
        <button onClick={undoLast} className="bg-yellow-600 text-white px-4 py-2 rounded">ย้อนกลับ 1 ครั้ง</button>
        <button onClick={lockAndPredict} className="bg-green-700 text-white px-4 py-2 rounded">สุ่มผลที่เหลือ</button>
      </div>
      <div className="grid grid-cols-10 gap-2">
        {displayGrid.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-2">
            {col.map((cell, rowIndex) => (
              <div
                key={rowIndex}
                className={`w-10 h-10 rounded-full flex items-center justify-center border cursor-pointer ${COLORS[cell as keyof typeof COLORS] || 'bg-gray-200'}`}
                onClick={() => handleClick(colIndex, rowIndex)}
              >
                {locked && (
                  <span
                    className="text-white text-sm select-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCheck(colIndex, rowIndex);
                    }}
                  >
                    {checkGrid[colIndex][rowIndex] === '✓'
                      ? '✓'
                      : checkGrid[colIndex][rowIndex] === '✗'
                      ? '✗'
                      : ''}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
        }
