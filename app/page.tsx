"use client"
import { useState } from "react";

export default function Home() {
  const [inputs, setInputs] = useState<string[]>([]);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [next15, setNext15] = useState<string[]>([]);

  const handleAdd = (value: string) => {
    if (inputs.length < 10) {
      setInputs([...inputs, value]);
    }
  };

  const handleClear = () => {
    setInputs([]);
    setPrediction(null);
    setNext15([]);
  };

  const generateNext15 = (base: string) => {
    const result: string[] = [];
    for (let i = 0; i < 15; i++) {
      const rand = Math.random();
      if (base === "P") {
        result.push(rand < 0.65 ? "P" : "B"); // เน้น P
      } else {
        result.push(rand < 0.65 ? "B" : "P"); // เน้น B
      }
    }
    return result;
  };

  const handlePredict = () => {
    if (inputs.length === 10) {
      const countP = inputs.filter(i => i === "P").length;
      const countB = inputs.filter(i => i === "B").length;

      let guess = "";
      if (countP > countB) guess = "P";
      else if (countB > countP) guess = "B";
      else guess = Math.random() < 0.5 ? "P" : "B";

      setPrediction(`ทำนายตาถัดไป: ${guess}`);
      const nextResults = generateNext15(guess);
      setNext15(nextResults);
    } else {
      setPrediction("กรุณากรอกให้ครบ 10 ตา");
      setNext15([]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100 text-center">
      <h1 className="text-2xl font-bold mb-4">กรอกผลย้อนหลัง 10 ตา</h1>

      <div className="flex gap-2 mb-4">
        <button onClick={() => handleAdd("P")} className="bg-blue-500 text-white px-4 py-2 rounded">P</button>
        <button onClick={() => handleAdd("B")} className="bg-red-500 text-white px-4 py-2 rounded">B</button>
        <button onClick={handleClear} className="bg-gray-500 text-white px-4 py-2 rounded">ล้าง</button>
      </div>

      <div className="flex gap-2 justify-center mb-4">
        {inputs.map((val, idx) => (
          <div
            key={idx}
            className={`w-6 h-6 rounded-full ${val === "P" ? "bg-blue-600" : "bg-red-600"}`}
          ></div>
        ))}
      </div>

      <button onClick={handlePredict} className="bg-green-600 text-white px-6 py-2 rounded">ทำนาย</button>

      {prediction && (
        <div className="mt-6 text-lg font-semibold text-purple-700">{prediction}</div>
      )}

      {next15.length > 0 && (
        <div className="mt-4">
          <p className="text-lg font-medium mb-2">ผล 15 ตาถัดไป (จำลอง):</p>
          <div className="flex gap-2 justify-center">
            {next15.map((val, idx) => (
              <div
                key={idx}
                className={`w-6 h-6 rounded-full ${val === "P" ? "bg-blue-600" : "bg-red-600"}`}
              ></div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
