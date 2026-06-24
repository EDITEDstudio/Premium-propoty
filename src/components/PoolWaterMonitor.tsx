import React, { useState } from "react";
import { Droplet, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, Thermometer } from "lucide-react";

interface PoolWaterMonitorProps {
  isNightMode: boolean;
}

export default function PoolWaterMonitor({ isNightMode }: PoolWaterMonitorProps) {
  // State for parameters
  const [pH, setPh] = useState<number>(7.4);
  const [chlorine, setChlorine] = useState<number>(1.5);
  const [turbidity, setTurbidity] = useState<number>(0.2);
  const [temp, setTemp] = useState<number>(26.5);

  // Quick preset functions
  const applyPreset = (type: "ideal" | "acidic" | "low-chlorine" | "turbid") => {
    switch (type) {
      case "ideal":
        setPh(7.4);
        setChlorine(1.8);
        setTurbidity(0.15);
        setTemp(27.0);
        break;
      case "acidic":
        setPh(6.5);
        setChlorine(0.6);
        setTurbidity(0.85);
        setTemp(29.0);
        break;
      case "low-chlorine":
        setPh(7.9);
        setChlorine(0.3);
        setTurbidity(0.40);
        setTemp(28.5);
        break;
      case "turbid":
        setPh(7.6);
        setChlorine(0.9);
        setTurbidity(1.45);
        setTemp(26.0);
        break;
    }
  };

  // Validation rules
  const isPhOk = pH >= 7.2 && pH <= 7.6;
  const isChlorineOk = chlorine >= 1.0 && chlorine <= 3.0;
  const isTurbidityOk = turbidity < 0.5;
  const isTempOk = temp >= 24 && temp <= 30;

  // Overall status
  const totalIssues = [isPhOk, isChlorineOk, isTurbidityOk, isTempOk].filter(x => !x).length;

  let overallStatus = "สมบูรณ์แบบ";
  let statusColor = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
  let waterBgStyle = "from-cyan-400 to-blue-500";
  let rippleColor = "border-cyan-200/50";
  let waterClarity = "opacity-100";

  if (totalIssues === 1) {
    overallStatus = "เฝ้าระวังความสมดุล";
    statusColor = "text-amber-500 bg-amber-500/10 border-amber-500/20";
    waterBgStyle = "from-cyan-500 via-blue-500 to-teal-500";
  } else if (totalIssues > 1) {
    overallStatus = "ไม่ได้มาตรฐาน - ต้องบำบัดเคมีด่วน";
    statusColor = "text-rose-500 bg-rose-500/10 border-rose-500/20";
    if (pH < 6.8 || turbidity >= 1.0) {
      waterBgStyle = "from-emerald-600/70 via-teal-700/80 to-[#1E293B]"; // green cloudy tint for algae/turbid pool
      rippleColor = "border-emerald-300/20";
      waterClarity = "opacity-40";
    } else {
      waterBgStyle = "from-blue-700/80 to-[#121E36]";
    }
  }

  return (
    <div className={`rounded-xl p-4 border transition-all duration-300 backdrop-blur-md ${
      isNightMode ? "bg-[#02050f]/75 border-white/5 text-white shadow-2xl" : "bg-white/50 border-white/60 shadow-xl shadow-slate-200/30 text-slate-800"
    }`}>
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-dashed border-slate-500/20">
        <h4 className="text-xs font-bold tracking-wider font-mono flex items-center gap-1.5 uppercase text-[#D4A017]">
          <Droplet className="w-4 h-4 text-cyan-400 animate-pulse" />
          ระบบจำลองการตรวจวัดวิเคราะห์ค่าน้ำ
        </h4>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${statusColor}`}>
          สถานะ: {overallStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left Interactive Panel (Sliders) */}
        <div className="md:col-span-6 space-y-4">
          {/* Slider 1: pH */}
          <div>
            <div className="flex justify-between text-xs font-sans mb-1">
              <span className={isNightMode ? "text-slate-300" : "text-slate-600"}>ค่าความเป็นกรด-ด่าง (pH)</span>
              <span className={`font-mono font-bold ${isPhOk ? "text-emerald-500" : "text-rose-500"}`}>
                {pH.toFixed(1)} {isPhOk ? "(มาตรฐาน 7.2 - 7.6)" : "(ผิดค่ากำหนด)"}
              </span>
            </div>
            <input
              type="range"
              min="6.0"
              max="8.5"
              step="0.1"
              value={pH}
              onChange={(e) => setPh(parseFloat(e.target.value))}
              className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-cyan-500 ${
                isNightMode ? "bg-slate-800" : "bg-slate-200"
              }`}
            />
          </div>

          {/* Slider 2: Chlorine */}
          <div>
            <div className="flex justify-between text-xs font-sans mb-1">
              <span className={isNightMode ? "text-slate-300" : "text-slate-600"}>ปริมาณสารคลอรีนอิสระ</span>
              <span className={`font-mono font-bold ${isChlorineOk ? "text-emerald-500" : "text-rose-500"}`}>
                {chlorine.toFixed(1)} ppm {isChlorineOk ? "(มาตรฐาน 1.0 - 3.0)" : "(ผิดค่ากำหนด)"}
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="4.5"
              step="0.1"
              value={chlorine}
              onChange={(e) => setChlorine(parseFloat(e.target.value))}
              className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-cyan-500 ${
                isNightMode ? "bg-slate-800" : "bg-slate-200"
              }`}
            />
          </div>

          {/* Slider 3: Turbidity */}
          <div>
            <div className="flex justify-between text-xs font-sans mb-1">
              <span className={isNightMode ? "text-slate-300" : "text-slate-600"}>ความขุ่นในน้ำ (Turbidity)</span>
              <span className={`font-mono font-bold ${isTurbidityOk ? "text-emerald-500" : "text-rose-500"}`}>
                {turbidity.toFixed(2)} NTU {isTurbidityOk ? "(ใสสะอาด < 0.5)" : "(น้ำขุ่นมัว)"}
              </span>
            </div>
            <input
              type="range"
              min="0.05"
              max="2.0"
              step="0.05"
              value={turbidity}
              onChange={(e) => setTurbidity(parseFloat(e.target.value))}
              className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-cyan-500 ${
                isNightMode ? "bg-slate-800" : "bg-slate-200"
              }`}
            />
          </div>

          {/* Slider 4: Temperature */}
          <div>
            <div className="flex justify-between text-xs font-sans mb-1">
              <span className={isNightMode ? "text-slate-300" : "text-slate-600"}>อุณหภูมิน้ำในสระ (°C)</span>
              <span className={`font-mono font-bold ${isTempOk ? "text-emerald-500" : "text-rose-500"}`}>
                {temp.toFixed(1)} °C {isTempOk ? "(มาตรฐาน 24 - 30)" : "(นอกเกณฑ์)"}
              </span>
            </div>
            <input
              type="range"
              min="20.0"
              max="35.0"
              step="0.5"
              value={temp}
              onChange={(e) => setTemp(parseFloat(e.target.value))}
              className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-cyan-500 ${
                isNightMode ? "bg-slate-800" : "bg-slate-200"
              }`}
            />
          </div>

          {/* Quick presets buttons */}
          <div className="pt-2 border-t border-dashed border-slate-500/20">
            <span className="text-[9px] font-mono text-slate-400 block mb-1.5">ปุ่มจำลองสถานการณ์น้ำในสระ:</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => applyPreset("ideal")}
                className="py-1 px-1.5 rounded bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-600/20 text-[10px] font-bold font-sans transition-all cursor-pointer"
              >
                ✓ ค่าใสมาตรฐาน
              </button>
              <button
                type="button"
                onClick={() => applyPreset("acidic")}
                className="py-1 px-1.5 rounded bg-rose-600/10 text-rose-400 border border-rose-500/20 hover:bg-rose-600/20 text-[10px] font-bold font-sans transition-all cursor-pointer"
              >
                ⚠ น้ำเป็นกรด / ฝนตกลงสระ
              </button>
              <button
                type="button"
                onClick={() => applyPreset("low-chlorine")}
                className="py-1 px-1.5 rounded bg-amber-600/10 text-amber-400 border border-amber-500/20 hover:bg-amber-600/20 text-[10px] font-bold font-sans transition-all cursor-pointer"
              >
                ☼ คลอรีนต่ำมาก / แดดเผา
              </button>
              <button
                type="button"
                onClick={() => applyPreset("turbid")}
                className="py-1 px-1.5 rounded bg-emerald-950 text-teal-400 border border-teal-800 hover:bg-teal-900 text-[10px] font-bold font-sans transition-all cursor-pointer"
              >
                ♒ สระขุ่นมัวจากตะกอน
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Real Image representation */}
        <div className="md:col-span-6 flex flex-col justify-between">
          {/* Liquid Preview Container representing the swimming pool water */}
          <div className={`relative h-40 rounded-xl overflow-hidden bg-gradient-to-br ${waterBgStyle} border shadow-inner flex flex-col justify-between p-3 transition-all duration-700`}>
            
            {/* Water Ripple Effects inside pool */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
              <div className={`absolute -inset-4 border-2 ${rippleColor} rounded-[40%] animate-[spin_12s_linear_infinite] opacity-30`}></div>
              <div className={`absolute -inset-8 border border-white/20 rounded-[43%] animate-[spin_18s_linear_infinite] opacity-20`}></div>
              <div className={`absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/5 rounded-full blur-xl`}></div>
            </div>

            {/* Clear Pool Tiles visible if Water is clear */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${waterClarity}`} style={{ 
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)", 
              backgroundSize: "20px 20px" 
            }}>
              <div className="w-full h-full border border-white/5 grid grid-cols-4 grid-rows-4 opacity-15">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="border border-white/10"></div>
                ))}
              </div>
            </div>

            {/* Top Labels inside Preview */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="bg-slate-900/70 backdrop-blur-md px-2 py-1 rounded text-[9px] font-mono font-bold text-white tracking-widest flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${totalIssues === 0 ? "bg-emerald-400 animate-ping" : "bg-red-400"}`}></span>
                POOL SIMULATION
              </div>
              <span className="text-[10px] font-bold bg-white/90 text-slate-900 px-1.5 rounded flex items-center gap-0.5 shadow">
                <Thermometer className="w-3.5 h-3.5 text-rose-500" />
                {temp} °C
              </span>
            </div>

            {/* Simulated Water Sparkles / Message */}
            <div className="relative z-10 text-center space-y-1 my-auto">
              {totalIssues === 0 ? (
                <div className="animate-pulse">
                  <p className="text-white font-sans text-xs font-black tracking-wide drop-shadow-md">✓ ระดับน้ำมาตรฐานกำหนด</p>
                  <p className="text-cyan-100 text-[10px] drop-shadow">น้ำสีฟ้าเทอควอยซ์ใส สะอาด ปลอดภัย</p>
                </div>
              ) : pH < 6.8 || turbidity >= 1.0 ? (
                <div>
                  <p className="text-rose-200 font-sans text-xs font-black tracking-wide drop-shadow-lg">⚠ น้ำไม่ได้คุณภาพมาตรฐาน</p>
                  <p className="text-emerald-200 text-[10px] drop-shadow">มีแนวโน้มตะไคร่หรือตะกอนขุ่นข้นสะสม</p>
                </div>
              ) : (
                <div>
                  <p className="text-amber-200 font-sans text-xs font-black tracking-wide drop-shadow-md">⚠ ปรับสภาพสารควบคุม</p>
                  <p className="text-slate-200 text-[10px] drop-shadow">ค่าน้ำเบี่ยงเบนจากขอบเขตมาตรฐานสากล</p>
                </div>
              )}
            </div>

            {/* Real pool physical view info bottom */}
            <div className="relative z-10 flex justify-between items-end text-[9px] text-white/95 bg-slate-950/40 p-1.5 rounded backdrop-blur-sm">
              <span className="font-sans flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                เกณฑ์มาตรฐาน ISO 9001
              </span>
              <span className="font-mono text-[8px]">ความใสของละอองน้ำ: {turbidity < 0.5 ? "ดีเยี่ยม" : "ปานกลาง/แย่"}</span>
            </div>
          </div>

          {/* Quick analysis checklist */}
          <div className="grid grid-cols-2 gap-2 mt-2 font-sans text-[10px] leading-snug">
            <div className="flex items-center gap-1.5 text-slate-400">
              {isPhOk ? <span className="text-emerald-500 font-bold">● pH: {pH}</span> : <span className="text-rose-500 font-bold">▲ pH วิกฤต</span>}
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              {isChlorineOk ? <span className="text-emerald-500 font-bold">● CL: {chlorine} ppm</span> : <span className="text-rose-500 font-bold">▲ CL บกพร่อง</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
