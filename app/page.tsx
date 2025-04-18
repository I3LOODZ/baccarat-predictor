"use client"
import { useState } from "react";

export default function Home() {
  const [inputs, setInputs] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAdd = (value: string) => {
    if (inputs.length < 10) {
      setInputs([...inputs, value]);
    }
  };

  const handleClear = () => {
    setInputs([]);
    setResult(null);
  };

  const handlePredict = () => {
    if (inputs.length === 10) {
      // ตัวอย่างการประมวลผล: แค่รวมข้อความโชว์ก่อน
      setResult(`คุณกรอก: ${inputs.join(" ")}`);
    } else {
      setResult("กรุณากรอกให้ครบ 10 ตา");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100 text-center">
      <h1 className="text-2xl font-bold mb-4">กรอกผลย้อนหลัง 10 ตา</h1>
      <div className="flex gap-2 mb-4">
        <button onClick={() => handleAdd("P")} className="bg-blue-500 text-white px-4 py-2 rounded">P</button>
        <button onClick={() => handleAdd("B")} className="bg-red-500 text-white px-4 py-2 rounded">B</button>
        <button onClick={handleClear} className="bg-gray-400 text-white px-4 py-2 rounded">ล้าง</button>
      </div>
      <div className="mb-4">
        <p className="text-lg">ผลที่กรอก: {inputs.join(" ")}</p>
      </div>
      <button onClick={handlePredict} className="bg-green-500 text-white px-6 py-2 rounded">ทำนาย</button>
      {result && (
        <div className="mt-6 text-lg text-purple-700">{result}</div>
      )}
    </main>
  );
}
