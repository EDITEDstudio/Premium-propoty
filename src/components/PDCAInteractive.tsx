import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  Settings, 
  Search, 
  TrendingUp, 
  ArrowRight, 
  CheckSquare, 
  ArrowUpRight, 
  ShieldCheck, 
  HelpCircle 
} from "lucide-react";
import { PDCAStep } from "../types";

const pdcaSteps: PDCAStep[] = [
  {
    phase: "PLAN",
    title: "1. การวางแผนและจัดการงบประมาณเชิงกลยุทธ์",
    subtitle: "กำหนดเป้าหมายค่าใช้จ่ายของโครงสร้างและเกณฑ์มาตรฐานคุณภาพ ISO",
    color: "from-blue-700 to-blue-500",
    icon: "Compass",
    details: [
      "การตรวจสอบประเมินข้อมูลค่าใช้จ่ายพื้นฐานของอาคารจริงอย่างละเอียด",
      "การจัดทำงบประมาณการดำเนินงานและงบประมาณทางการเงินที่โปร่งใส",
      "การกำหนดตัวชี้วัดประสิทธิภาพหลัก (KPIs) ที่ปรับแต่งเฉพาะตัว",
      "การวิเคราะห์ความเสี่ยงและการวางแผนความปลอดภัยด้านสิ่งแวดล้อมภายใต้ข้อกำหนด ISO Clause 6"
    ],
    isoStandard: "ISO 9001:2015 Clause 6 (Planning)"
  },
  {
    phase: "DO",
    title: "2. การปฏิบัติงานเชิงกลยุทธ์",
    subtitle: "การจัดตั้งทีมงานประสิทธิภาพสูงและนำเทคโนโลยีการบริหารอาคารมาปรับใช้",
    color: "from-indigo-600 to-sky-500",
    icon: "Settings",
    details: [
      "จัดตั้งทีมบริหารจัดการอสังหาริมทรัพย์ที่มีวินัยและผ่านการรับรอง",
      "การอัปเกรดระบบเครื่องกล ไฟฟ้า และระบบปรับอากาศส่วนกลาง (HVAC)",
      "การกำหนดขั้นตอนการทำบัญชีทางการเงินที่โปร่งใสและเป็นมาตรฐาน",
      "การฝึกอบรมพนักงานและการเตรียมความพร้อมให้กับผู้พักอาศัยอย่างเป็นระบบ"
    ],
    isoStandard: "ISO 9001:2015 Clause 7 & 8 (Support & Operation)"
  },
  {
    phase: "CHECK",
    title: "3. การตรวจสอบอย่างเข้มงวดและต่อเนื่อง",
    subtitle: "การตรวจสอบต้นทุนแบบเรียลไทม์และการปฏิบัติตามมาตรฐานความโปร่งใสขั้นสูงสุด",
    color: "from-sky-500 to-cyan-400",
    icon: "Search",
    details: [
      "การตรวจสอบบัญชีและการเงินอิสระโดยผู้จัดการฝ่ายตรวจสอบที่ได้รับการรับรอง",
      "การตรวจสอบความสมบูรณ์ทางเทคนิคของอาคารและวิเคราะห์ความเสี่ยงอย่างสม่ำเสมอ",
      "การประเมินความพึงพอใจของผูอยู่อาศัยและตัวชี้วัดความสุขทุกครึ่งปี",
      "การประเมินตัวชี้วัดประสิทธิภาพและคุณภาพงานของผู้รับเหมารายย่อย"
    ],
    isoStandard: "ISO 9001:2015 Clause 9 (Performance Evaluation)"
  },
  {
    phase: "ACT",
    title: "4. การปรับปรุงคุณภาพอย่างสม่ำเสมอ",
    subtitle: "การปรับปรุงการจัดสรรทรัพยากรและวงจรผลตอบรับเพื่อสร้างการประหยัดอย่างเป็นระบบ",
    color: "from-blue-600 to-indigo-500",
    icon: "TrendingUp",
    details: [
      "การแก้ไขความคลาดเคลื่อนด้านคุณภาพในระดับรองอย่างเป็นระบบทันที",
      "การจัดทำและอัปเดตขั้นตอนปฏิบัติงานมาตรฐานของอสังหาริมทรัพย์ (SOPs)",
      "การจัดสรรการใช้พลังงานใหม่เพื่อลดค่าไฟและค่าใช้จ่ายส่วนเกินให้ดียิ่งขึ้น",
      "การทบทวนการดำเนินงานโดยฝ่ายบริหารประจำปีและการต่ออายุการรับรองมาตรฐานสม่ำเสมอ"
    ],
    isoStandard: "ISO 9001:2015 Clause 10 (Improvement)"
  }
];

export default function PDCAInteractive({ isNightMode = false }: { isNightMode?: boolean }) {
  const [activePhase, setActivePhase] = useState<"PLAN" | "DO" | "CHECK" | "ACT" >("PLAN");

  const currentStep = pdcaSteps.find(s => s.phase === activePhase) || pdcaSteps[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass": return <Compass className="w-8 h-8 text-sky-400" />;
      case "Settings": return <Settings className="w-8 h-8 text-indigo-400" />;
      case "Search": return <Search className="w-8 h-8 text-cyan-400" />;
      case "TrendingUp": return <TrendingUp className="w-8 h-8 text-blue-400" />;
      default: return <Compass className="w-8 h-8" />;
    }
  };

  return (
    <div id="pdca-section-interactive-card" className={`rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all duration-300 backdrop-blur-xl border ${
      isNightMode
        ? "bg-[#010309]/50 border border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_50px_rgba(0,0,0,0.3)] text-white"
        : "bg-white/45 border border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)] text-slate-800"
    }`}>
      {/* Decorative dark background patterns */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Col: Interactive Circular/Quad Visualizer */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#050B15] border border-blue-900/30 p-2 shadow-inner flex items-center justify-center">
            
            {/* Center Core Logo/ISO indicator */}
            <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#0A1224] border-2 border-blue-900/60 flex flex-col justify-center items-center text-center shadow-xl z-20">
              <span className={`text-[10px] font-mono tracking-wider uppercase ${isNightMode ? "text-[#38bdf8]" : "text-[#2563eb]"}`}>ระบบวงรอบคุณภาพ</span>
              <span className="text-sm font-black text-white font-sans mt-0.5">PDCA</span>
              <span className="text-[9px] font-mono text-gray-400 mt-1">ISO 9001:2015</span>
            </div>

            {/* Connecting circular svg arrows/lines */}
            <svg className="absolute inset-0 w-full h-full rotate-45 pointer-events-none z-10" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="#1E293B" strokeWidth="1" />
              <path d="M 50 6 A 44 44 0 0 1 94 50" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" />
              <path d="M 94 50 A 44 44 0 0 1 50 94" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1.5" />
              <path d="M 50 94 A 44 44 0 0 1 6 50" fill="none" stroke="rgba(14, 165, 233, 0.3)" strokeWidth="1.5" />
              <path d="M 6 50 A 44 44 0 0 1 50 6" fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1.5" />
            </svg>

            {/* PLAN Quadrant */}
            <button
              id="quadrant-plan"
              onClick={() => setActivePhase("PLAN")}
              className={`absolute top-0 left-0 w-1/2 h-1/2 rounded-tl-full border-r border-b border-blue-950 flex flex-col items-end justify-end p-4 md:p-6 transition-all duration-300 ${
                activePhase === "PLAN" 
                  ? "bg-blue-600/20 text-white scale-102 ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/10" 
                  : "text-gray-400 hover:text-gray-200 hover:bg-blue-900/5"
              }`}
            >
              <div className="text-right pr-2 pb-2">
                <span className="block text-[11px] font-mono font-bold tracking-widest text-[#D4A017]">01</span>
                <span className="text-sm font-black font-sans">PLAN</span>
              </div>
            </button>

            {/* DO Quadrant */}
            <button
              id="quadrant-do"
              onClick={() => setActivePhase("DO")}
              className={`absolute top-0 right-0 w-1/2 h-1/2 rounded-tr-full border-l border-b border-blue-950 flex flex-col items-start justify-end p-4 md:p-6 transition-all duration-300 ${
                activePhase === "DO" 
                  ? "bg-indigo-600/20 text-white scale-102 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-500/10" 
                  : "text-gray-400 hover:text-gray-200 hover:bg-indigo-900/5"
              }`}
            >
              <div className="text-left pl-2 pb-2">
                <span className="block text-[11px] font-mono font-bold tracking-widest text-indigo-400">02</span>
                <span className="text-sm font-black font-sans">DO</span>
              </div>
            </button>

            {/* CHECK Quadrant */}
            <button
              id="quadrant-check"
              onClick={() => setActivePhase("CHECK")}
              className={`absolute bottom-0 right-0 w-1/2 h-1/2 rounded-br-full border-l border-t border-blue-950 flex flex-col items-start justify-start p-4 md:p-6 transition-all duration-300 ${
                activePhase === "CHECK" 
                  ? "bg-sky-500/20 text-white scale-102 ring-2 ring-sky-500/30 shadow-lg shadow-sky-500/10" 
                  : "text-gray-400 hover:text-gray-200 hover:bg-sky-900/5"
              }`}
            >
              <div className="text-left pl-2 pt-2">
                <span className="block text-[11px] font-mono font-bold tracking-widest text-sky-400">03</span>
                <span className="text-sm font-black font-sans">CHECK</span>
              </div>
            </button>

            {/* ACT Quadrant */}
            <button
              id="quadrant-act"
              onClick={() => setActivePhase("ACT")}
              className={`absolute bottom-0 left-0 w-1/2 h-1/2 rounded-bl-full border-r border-t border-blue-950 flex flex-col items-end justify-start p-4 md:p-6 transition-all duration-300 ${
                activePhase === "ACT" 
                  ? "bg-blue-600/20 text-white scale-102 ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/10" 
                  : "text-gray-400 hover:text-gray-200 hover:bg-blue-900/5"
              }`}
            >
              <div className="text-right pr-2 pt-2">
                <span className="block text-[11px] font-mono font-bold tracking-widest text-blue-400">04</span>
                <span className="text-sm font-black font-sans">ACT</span>
              </div>
            </button>

          </div>
          
          <div className="flex gap-2 mt-4 text-[11px] font-mono text-gray-400">
            <span>💡 คลิกเลือกตามระยะงานเพื่อดูรายละเอียดเชิงลึก</span>
          </div>
        </div>

        {/* Right Col: Animated details pane */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${currentStep.color} shadow-lg shadow-blue-500/5`}>
                  {getIcon(currentStep.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[#D4A017] text-xs font-mono font-semibold tracking-wider uppercase px-2 py-0.5 rounded border ${
                      isNightMode ? "bg-[#18231c]/40 border-emerald-950" : "bg-emerald-50 border-emerald-100"
                    }`}>
                      ระยะ {activePhase}
                    </span>
                    <span className={`font-mono text-xs ${isNightMode ? "text-gray-400" : "text-slate-500"}`}>• {currentStep.isoStandard}</span>
                  </div>
                  <h4 className={`text-xl md:text-2xl font-bold tracking-tight mt-1 ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>{currentStep.title}</h4>
                </div>
              </div>

              <p className={`text-sm italic font-sans pl-1 border-l-2 border-blue-500/40 ${isNightMode ? "text-gray-300" : "text-slate-600"}`}>
                "{currentStep.subtitle}"
              </p>

              <div>
                <p className={`text-xs font-mono uppercase tracking-wider mb-3 font-semibold ${isNightMode ? "text-gray-400" : "text-slate-500"}`}>ขอบเขตงานและดัชนีชี้วัดตามมาตรฐาน ISO</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentStep.details.map((detail, index) => (
                    <div 
                      key={index} 
                      className={`rounded-xl p-3 border flex items-start gap-2.5 transition-all ${
                        isNightMode 
                          ? "bg-[#060C17]/80 border-blue-950/50 hover:border-blue-800/30" 
                          : "bg-white/70 border-white/40 hover:border-[#D4A017]/30 shadow-sm"
                      }`}
                    >
                      <CheckSquare className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className={`text-xs font-sans leading-relaxed ${isNightMode ? "text-gray-300" : "text-slate-700"}`}>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action output banner */}
              <div className={`rounded-xl p-4 border flex items-center justify-between gap-4 mt-6 ${
                isNightMode ? "bg-[#010309]/80 border-blue-950/40" : "bg-blue-50/70 border-blue-200/50 shadow-sm"
              }`}>
                <div>
                  <p className="text-[10px] font-mono text-emerald-600 tracking-wider font-bold">ผลลัพธ์ที่คาดหวังจากระยะนี้</p>
                  <p className={`text-xs mt-1 ${isNightMode ? "text-white" : "text-slate-800"}`}>
                    {activePhase === "PLAN" ? "แผนงานประหยัดต้นทุนที่โปร่งใส 100% พร้อมตัวชี้วัดเป้าหมายที่ชัดเจนก่อนเริ่มต้นที่หน้างานจริง" :
                     activePhase === "DO" ? "ระเบียบและระเบียบวินัยในองค์กรอย่างสมบูรณ์ มีผู้ดูแลระบบและพนักงานอาคารพร้อมระบบจัดการรายงานข้อมูลสม่ำเสมอ" :
                     activePhase === "CHECK" ? "การตรวจสอบข้อมูลบัญชีที่เป็นกลาง เกณฑ์ผลการปฏิบัติงาน และคลังเก็บบันทึกตรวจสอบสุขาภิบาล/โครงสร้างอาคาร" :
                     "วงรอบการลดต้นทุนที่มีประสิทธิภาพอย่างยั่งยืน ลูปการปรับปรุงการประหยัดอัปเกรดอัตโนมัติในรายงานทางการประจำปี"}
                  </p>
                </div>
                <button
                  id={`btn-proceed-pdca-${activePhase}`}
                  onClick={() => {
                    const phases: ("PLAN" | "DO" | "CHECK" | "ACT")[] = ["PLAN", "DO", "CHECK", "ACT"];
                    const nextIdx = (phases.indexOf(activePhase) + 1) % phases.length;
                    setActivePhase(phases[nextIdx]);
                  }}
                  className="bg-blue-900/40 hover:bg-blue-800/50 text-[#D4A017] p-2.5 rounded-lg border border-blue-800/30 hover:border-[#D4A017]/30 transition-all flex-shrink-0"
                  title="Next Phase"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
