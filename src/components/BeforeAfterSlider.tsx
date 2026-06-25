import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeftRight, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Sparkles, 
  ArrowUpRight 
} from "lucide-react";
import { CaseStudy } from "../types";

const caseStudiesData: CaseStudy[] = [
  {
    id: "CS-01",
    title: "ลดค่าใช้จ่ายการดำเนินงานลดลง 25% และลดเวลากระบวนการประสานงานลงเหลือ 1.4 ชั่วโมง",
    propertyType: "อาคารชุด",
    propertyName: "โครงการ แกรนด์ ฮอไรซัน ทาวเวอร์ คอมเพล็กซ์",
    location: "เขตศูนย์กลางการเงินและเศรษฐกิจ (CBD)",
    challenge: "ประสบปัญหาค่าใช้จ่ายน้ำประปารั่วซึมสะสมจำนวนมาก ขาดความโปร่งใสและตรวจสอบบัญชีไม่ได้ ค่าใช้จ่ายส่วนกลางระบบปรับอากาศสระว่ายน้ำพุ่งสูง และการจัดการใบแจ้งซ่อมฉุกเฉินล่าช้ากว่า 36 ชั่วโมง",
    solution: "ส่งมอบการจัดการมายังทีมงาน Premium Propoty ทำการประเมินวิเคราะห์ประสิทธิภาพความร้อนอาคารจริงทั้งหมด เปลี่ยนเครื่องควบคุมปั๊มน้ำเป็นระบบอินเวอร์เตอร์ประสิทธิภาพสูง เปิดใช้งาน Cloud Portal และจัดตั้งผู้จัดการอาคารประจำการไซต์งานตลอดเวลา",
    metrics: [
      { label: "ค่าใช้จ่ายบำรุงรักษา OpEx", before: "$34,200 / Month", after: "$25,650 / Month", improvement: "-25% Savings" },
      { label: "ระยะเวลาแก้ไขเคสฉุกเฉิน", before: "36.2 Hours Average", after: "1.4 Hours Average", improvement: "96% Faster" },
      { label: "สถานะการประเมินและการกำกับ", before: "Unfavorable", after: "ISO 9001 Audited", improvement: "100% Compliant" }
    ],
    financials: {
      beforeCost: 34200,
      afterCost: 25650,
      savingsPercent: 25
    }
  },
  {
    id: "CS-02",
    title: "ประหยัดงบงานธุรการและการจัดการได้ 20% และฟื้นฟูความไว้ใจลูกบ้านส่วนกลาง",
    propertyType: "หมู่บ้าน",
    propertyName: "โครงการหรู เอ็มเมอรัลด์ วิลล่า ปลักซี่ เอสเตทส์",
    location: "พื้นที่เขตชานเมืองสีเขียวธรรมชาติ",
    challenge: "ประสบปัญหาค่าบริการดูแลสวนหย่อมและผู้รับเหมารายย่อยที่บานปลายและพุ่งสูงเกินความเหมาะสม ขาดระบบตรวจสอบความปลอดภัยของมิเตอร์น้ำและไฟฟ้าส่วนกลางแบบเรียลไทม์ พื้นที่ส่วนกลางทรุดโทรม และพบบันทึกการลงบัญชีคลาดเคลื่อนบ่อยครั้ง",
    solution: "เข้าดำเนินการตรวจสอบสัญญาดูแลสวนหย่อมทั้งหมดอย่างรอบคอบ ตัดขั้นตอนและผู้ให้บริการที่ซ้ำซ้อนทับซ้อน ติดตั้งระบบสมาร์ทมิเตอร์ตรวจสอบพลังงานแสงอาทิตย์ และกำหนดระเบียบตรวจสอบบัญชีสองฝ่ายตามเกณฑ์ ISO ข้อ 9.2",
    metrics: [
      { label: "ค่าใช้จ่ายการดำเนินงานส่วนกลาง", before: "$48,500 / Month", after: "$38,800 / Month", improvement: "-20% Savings" },
      { label: "งานตกแต่งสวนและการซ่อมบำรุง", before: "18 Days Overdue", after: "0.5 Days Overdue", improvement: "97% Faster" },
      { label: "ระดับความพึงพอใจของลูกบ้านส่วนกลาง", before: "68% Satisfaction", after: "96% Satisfaction", improvement: "+28% Happier" }
    ],
    financials: {
      beforeCost: 48500,
      afterCost: 38800,
      savingsPercent: 20
    }
  },
  {
    id: "CS-03",
    title: "ลดการสูญเสียการใช้พลังงาน HVAC ปรับอากาศส่วนกลางได้ 28% ของโครงสร้างผู้เช่าเชิงพาณิชย์",
    propertyType: "อาคารสำนักงาน",
    propertyName: "อาคาร ซัมมิท คอร์ปอเรท พลาซ่า ทาวเวอร์",
    location: "ย่านใจกลางย่านการค้าพาณิชย์",
    challenge: "การตั้งค่าตารางควบคุมระบบทำความเย็นและระบบไฟฟ้าส่วนกลางขาดประสิทธิภาพ สิ้นเปลืองพลังงานน้ำมันดีเซลสำหรับเครื่องกำเนิดไฟฟ้าสำรอง และมีประวัติตามล่าควบคุมตกแต่งพื้นที่ผู้เช่าไม่สอดคล้องกับระเบียบ",
    solution: "ทำการวิเคราะห์และกำหนดเวลาควบคุมระบบ Chiller ส่วนกลางใหม่ในแบบอัตโนมัติ เจรจาสัญญาซัพพลายเออร์เชื้อเพลิงระบบพ่นไฟสำรอง และจัดทำระเบียบเอกสารแนวเช็คลิสคู่มือผู้เช่าให้สอดคล้องกับระเบียบ ISO 9001:2015",
    metrics: [
      { label: "ค่าพลังงานและสาธารณูปโภค", before: "$62,000 / Month", after: "$44,640 / Month", improvement: "-28% Savings" },
      { label: "สถิติไฟฟ้าขัดข้องปรับอากาศ", before: "4.2 Events / Qtr", after: "0 Events / Qtr", improvement: "100% Fixed" },
      { label: "คะแนนดัชนีชี้วัดกฎระเบียบผู้เช่า", before: "74% Accord", after: "99% Accord", improvement: "+25% Accord" }
    ],
    financials: {
      beforeCost: 62000,
      afterCost: 44640,
      savingsPercent: 28
    }
  }
];

export default function BeforeAfterSlider({ isNightMode = false, initialCaseId }: { isNightMode?: boolean; initialCaseId?: string }) {
  const [selectedCase, setSelectedCase] = useState<string>("CS-01");
  const [compareSliderVal, setCompareSliderVal] = useState<number>(50); // 0 to 100 percentage
  
  React.useEffect(() => {
    if (initialCaseId) {
      setSelectedCase(initialCaseId);
    }
  }, [initialCaseId]);

  const currentCase = caseStudiesData.find(c => c.id === selectedCase) || caseStudiesData[0];

  return (
    <div id="before-after-slider-card" className="w-full font-sans text-left space-y-8">
      
      {/* Property Selector Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-6">
        {caseStudiesData.map((c) => {
          const isSelected = selectedCase === c.id;
          return (
            <button
              key={c.id}
              id={`btn-case-select-${c.id}`}
              onClick={() => setSelectedCase(c.id)}
              className={`px-5 py-3 rounded-xl font-bold font-sans text-xs tracking-wider transition-all duration-300 flex items-center gap-2 ${
                isSelected
                  ? isNightMode
                    ? "bg-blue-600 text-white border border-blue-500 shadow-md ring-1 ring-blue-400/30"
                    : "bg-[#0F2B46] text-white border border-blue-800 shadow-md ring-1 ring-blue-700/30"
                  : isNightMode
                    ? "bg-blue-950/20 text-blue-300 hover:bg-blue-900/30 border border-blue-900/40"
                    : "bg-white text-[#0F2B46] hover:bg-gray-100 border border-gray-300"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-emerald-400" : isNightMode ? "bg-blue-800" : "bg-gray-400"}`}></span>
              <span>{c.propertyType}: {c.propertyName.includes("แกรนด์") ? "แกรนด์" : c.propertyName.includes("เอ็มเมอรัลด์") ? "เอ็มเมอรัลด์" : "ซัมมิท"}</span>
            </button>
          );
        })}
      </div>

      {/* Main Study Details Grid - Effect Glassy (30% opacity) */}
      <div className={`grid grid-cols-1 xl:grid-cols-12 gap-8 rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 backdrop-blur-xl border ${
        isNightMode
          ? "bg-[#010309]/50 border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_50px_rgba(0,0,0,0.3)] text-white"
          : "bg-white/45 border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)] text-slate-800"
      }`}>
        
        {/* Left Side: Challenge / Solution Summary */}
        <div className="xl:col-span-6 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                isNightMode
                  ? "bg-blue-950/60 text-blue-300 border-blue-800/40"
                  : "bg-blue-50 text-blue-800 border-blue-100"
              }`}>
                กรณีศึกษา{currentCase.propertyType}
              </span>
              <span className={`text-xs font-mono ${isNightMode ? "text-slate-400" : "text-gray-500"}`}>{currentCase.location}</span>
            </div>
            <h4 id="case-study-title" className={`text-xl md:text-2xl font-black tracking-tight ${
              isNightMode ? "text-white" : "text-[#0F2B46]"
            }`}>
              {currentCase.propertyName}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-4">
            {/* Challenge Card */}
            <div className={`rounded-2xl p-4 border flex gap-3 transition-colors duration-300 ${
              isNightMode
                ? "bg-red-950/15 border-red-500/20 text-slate-200"
                : "bg-red-50/75 border-red-100 text-slate-700"
            }`}>
              <div className={`mt-0.5 p-1 rounded-lg flex-shrink-0 ${
                isNightMode ? "bg-red-950/60 text-red-400" : "bg-red-100 text-red-600"
              }`}>
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className={`text-xs font-mono font-bold uppercase tracking-wider mb-1 ${
                  isNightMode ? "text-red-300" : "text-red-800"
                }`}>ความท้าทายก่อนหน้า (ก่อนที่จะใช้บริการ PREMIUM PROPOTY)</p>
                <p className="text-xs md:text-sm leading-relaxed font-sans">{currentCase.challenge}</p>
              </div>
            </div>

            {/* Solution Card */}
            <div className={`rounded-2xl p-4 border flex gap-3 transition-colors duration-300 ${
              isNightMode
                ? "bg-emerald-950/15 border-emerald-500/20 text-slate-200"
                : "bg-emerald-50/75 border-emerald-100 text-slate-700"
            }`}>
              <div className={`mt-0.5 p-1 rounded-lg flex-shrink-0 ${
                isNightMode ? "bg-emerald-950/60 text-emerald-400" : "bg-emerald-100 text-emerald-600"
              }`}>
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className={`text-xs font-mono font-bold uppercase tracking-wider mb-1 ${
                  isNightMode ? "text-emerald-300" : "text-emerald-800"
                }`}>ผลลัพธ์การแก้ไขปัญหาของ PREMIUM PROPOTY)</p>
                <p className="text-xs md:text-sm leading-relaxed font-sans">{currentCase.solution}</p>
              </div>
            </div>
          </div>

          <div className={`border-t pt-4 mt-2 ${isNightMode ? "border-blue-950" : "border-gray-100"}`}>
            <div className={`flex items-center justify-between text-xs ${
              isNightMode ? "text-slate-400" : "text-gray-500"
            }`}>
              <span>มาตรฐานการตรวจสอบบัญชี:</span>
              <span className={`font-mono font-bold flex items-center gap-1 ${
                isNightMode ? "text-blue-200" : "text-[#0F2B46]"
              }`}>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                สอดคล้องมาตรฐานบัญชีโปร่งใสตามระบบ ISO 9001
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Drag Metric Comparison / Visual Savings Grid */}
        <div className={`xl:col-span-6 rounded-2xl p-5 flex flex-col justify-between gap-6 transition-all duration-300 backdrop-blur-xl border ${
          isNightMode
            ? "bg-[#010309]/45 border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] text-white"
            : "bg-white/45 border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)] text-slate-800"
        }`}>
          
          <div className="space-y-4">
            <h5 className={`text-xs font-mono tracking-wider uppercase font-bold flex items-center gap-1.5 ${
              isNightMode ? "text-slate-200" : "text-[#0F2B46]"
            }`}>
              <ArrowLeftRight className="w-4 h-4 text-[#D4A017]" />
              เปรียบเทียบดัชนีประสิทธิภาพระหว่าง ก่อน และ หลัง ดำเนินการ
            </h5>

            {/* Simulated Comparison Slider Visualization */}
            <div className={`rounded-xl p-4 border shadow-sm relative overflow-hidden transition-colors duration-300 ${
              isNightMode
                ? "bg-[#0E1E38]/50 border-blue-900/30"
                : "bg-white border-slate-200"
            }`}>
              <div className={`flex justify-between items-center text-[10px] font-mono mb-2 ${
                isNightMode ? "text-slate-400" : "text-gray-500"
              }`}>
                <span className={isNightMode ? "text-red-400 font-bold" : "text-red-700 font-bold"}>ก่อนเซ็นสัญญา</span>
                <span className={isNightMode ? "text-emerald-400 font-bold" : "text-emerald-700 font-bold"}>เข้าร่วมระบบ PREMIUM PROPOTY (-{currentCase.financials.savingsPercent}%)</span>
              </div>

              {/* Slider comparative track */}
              <div className={`relative w-full h-8 rounded-lg overflow-hidden flex items-center select-none border transition-colors ${
                isNightMode ? "bg-[#060D1A] border-blue-900/40" : "bg-gray-200 border-slate-200"
              }`}>
                {/* BEFORE side (red block) */}
                <div 
                  className="h-full bg-gradient-to-r from-red-600/30 to-red-500/10 flex items-center pl-3 font-mono text-xs text-red-400 font-bold transition-all pointer-events-none"
                  style={{ width: `${compareSliderVal}%` }}
                >
                  {compareSliderVal > 15 && `$${currentCase.financials.beforeCost.toLocaleString()}`}
                </div>
                
                {/* AFTER side (emerald block) */}
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500/10 to-emerald-600/30 flex items-center justify-end pr-3 font-mono text-xs text-emerald-400 font-bold transition-all flex-1 pointer-events-none"
                >
                  {(100 - compareSliderVal) > 15 && `$${currentCase.financials.afterCost.toLocaleString()}`}
                </div>

                {/* Handle lines */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-amber-500 shadow-lg cursor-ew-resize z-10"
                  style={{ left: `${compareSliderVal}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-[8px] font-black shadow-md border border-white">
                    ↔
                  </div>
                </div>
              </div>

              {/* Input range slider controller */}
              <input
                id={`slider-case-compare-${currentCase.id}`}
                type="range"
                min="0"
                max="100"
                value={compareSliderVal}
                onChange={(e) => setCompareSliderVal(Number(e.target.value))}
                className="w-full h-2 bg-transparent absolute inset-0 opacity-0 cursor-ew-resize"
              />
              
              <div className="flex justify-between text-[9px] text-gray-400 font-mono mt-1 px-1">
                <span>ลากแถบเพื่อเปรียบเทียบสัดส่วน</span>
                <span className="text-amber-500 font-bold">สัดส่วน: {compareSliderVal}% : {100 - compareSliderVal}%</span>
              </div>
            </div>
          </div>

          {/* Three comparison metrics cards */}
          <div className="space-y-2">
            <p className={`text-[10px] font-mono uppercase tracking-wider mb-2 ${
              isNightMode ? "text-slate-400" : "text-gray-400"
            }`}>ดัชนีประสิทธิภาพที่ทำได้สอดคล้องตามเกณฑ์</p>
            {caseStudiesData.find(c => c.id === selectedCase)?.metrics.map((m, idx) => (
              <div 
                key={idx} 
                className={`rounded-xl p-3 border shadow-sm flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:items-center hover:shadow-md transition-all ${
                  isNightMode
                    ? "bg-[#091528]/85 border-blue-900/40 hover:bg-[#0E203C]/80"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="col-span-12 sm:col-span-5">
                  <p className={`text-xs font-sans font-bold sm:font-normal ${isNightMode ? "text-slate-200" : "text-slate-700"}`}>{m.label}</p>
                </div>
                
                <div className="col-span-12 sm:col-span-7 flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-blue-950/40">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] sm:hidden text-slate-400 font-sans mr-1">เดิม:</span>
                    <span className="font-mono text-xs text-red-500 line-through font-medium">{m.before.split(" ")[0]}</span>
                  </div>

                  <span className="text-xs text-slate-400 font-bold">→</span>

                  <div className="flex items-center gap-2">
                    <span className={`font-mono text-xs font-bold ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
                      {m.after.includes("Hours") ? m.after.replace("Hours", " ชั่วโมง") : m.after.includes("Savings") ? m.after.replace("Savings", " ประหยัด") : m.after.includes("Audited") ? "ผ่านเกณฑ์ ISO 9001" : m.after.includes("Satisfaction") ? m.after.replace("Satisfaction", "ความพึงพอใจ") : m.after}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-white bg-emerald-600 px-1.5 py-0.5 rounded flex-shrink-0 shadow-sm">
                      {m.improvement === "-25% Savings" ? "-25% ประหยัด" : m.improvement === "96% Faster" ? "เร็วขึ้น 96%" : m.improvement === "100% Compliant" ? "สอดคล้อง 100%" : m.improvement === "-20% Savings" ? "-20% ประหยัด" : m.improvement === "97% Faster" ? "เร็วขึ้น 97%" : m.improvement === "+28% Happier" ? "+28% พึงพอใจ" : m.improvement === "-28% Savings" ? "-28% ประหยัด" : m.improvement === "100% Fixed" ? "แก้ไข 100%" : m.improvement === "+25% Accord" ? "+25% ร่วมมือ" : m.improvement}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`rounded-xl p-3 border flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs transition-colors duration-300 ${
            isNightMode
              ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-300"
              : "bg-emerald-50 border-emerald-100 text-emerald-800"
          }`}>
            <span className="font-sans">เซฟงบประมาณรายปีสะสมโดยรวม:</span>
            <span className={`font-mono font-bold text-xs sm:text-sm ${isNightMode ? "text-emerald-400" : "text-emerald-700"}`}>
              ${((currentCase.financials.beforeCost - currentCase.financials.afterCost) * 12).toLocaleString()} / ปี สุทธิ (เซฟสำเร็จ)
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
