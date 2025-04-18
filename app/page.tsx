'use client';

import { useState } from 'react';

const COLORS: Record<string, string> = {
  P: 'bg-blue-600',
  B: 'bg-red-600',
  T: 'bg-green-600',
};

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [prediction, setPrediction] = useState<string[]>([]);
  const [checkList, setCheckList] = useState<string[]>([]);
  const [history, setHistory] = useState<{ input: string; prediction: string[]; checkList: string[] }[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^PBT]/g, '').slice(0, 10);
    setInput(value);
  };

  const handlePredict = () => {
    if (input.length !== 10) return;
    const result: string[] = [];
    const choices = ['P', 'B', 'T'];
    for (let i = 0; i < 15; i++) {
      const rand = choices[Math.floor(Math.random() * choices.length)];
      result.push(rand);
    }
    setHistory([...history, { input, prediction, checkList }]);
    setPrediction(result);
    setCheckList(new Array(15).fill(''));
  };

  const handleCheck = (index: number, mark: string) => {
    const updated = [...checkList];
    updated[index] = updated[index] === mark ? '' : mark;
    setCheckList(updated);
  };

  const handleReset = () => {
    setInput('');
    setPrediction([]);
    setCheckList([]);
    setHistory([]);
  };

  const handleUndo = () => {
    const last = history.pop();
    if (last) {
      setInput(last.input);
      setPrediction(last.prediction);
      setCheckList(last.checkList);
      setHistory([...history]);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Baccarat Predictor</h1>

      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        maxLength={10}
        placeholder="ใส่ผล 10 ตัวแรก (P, B, T)"
        className="p-2 border rounded w-full"
      />

      <div className="flex gap-4">
        <button onClick={handlePredict} className="bg-blue-600 text-white px-4 py-2 rounded">
          ทำนาย
        </button>
        <button onClick={handleReset} className="bg-gray-600 text-white px-4 py-2 rounded">
          รีเซ็ต
        </button>
        <button onClick={handleUndo} className="bg-yellow-500 text-white px-4 py-2 rounded">
          ย้อนกลับ 1 ครั้ง
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {[...input, ...prediction].map((val, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
              COLORS[val] || 'bg-gray-300'
            }`}
          >
            {val}
          </div>
        ))}
      </div>

      {prediction.length === 15 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {checkList.map((val, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="flex gap-1">
                <button
                  onClick={() => handleCheck(i, '✓')}
                  className={`w-6 h-6 rounded-full text-white ${val === '✓' ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  ✓
                </button>
                <button
                  onClick={() => handleCheck(i, '✗')}
                  className={`w-6 h-6 rounded-full text-white ${val === '✗' ? 'bg-red-500' : 'bg-gray-300'}`}
                >
                  ✗
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
