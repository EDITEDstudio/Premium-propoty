import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calculator, 
  ArrowRight, 
  CheckCircle, 
  FileCheck, 
  Activity, 
  Clock, 
  ThumbsUp,
  Award
} from "lucide-react";

export default function ProposalCalculator({ isNightMode = false }: { isNightMode?: boolean }) {
  const [propertyType, setPropertyType] = useState<"condo" | "estate" | "office">("condo");
  const [unitsCount, setUnitsCount] = useState<number>(150);
  const [currentExpense, setCurrentExpense] = useState<number>(25000);
  const [primaryPain, setPrimaryPain] = useState<string>("auditing");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Dynamic formula inputs
  const estimatedSavingsPercent = 
    propertyType === "condo" ? 22 : 
    propertyType === "estate" ? 18 : 26;

  const estimatedMonthlySavings = Math.round(currentExpense * (estimatedSavingsPercent / 100));
  const estimatedAnnualSavings = estimatedMonthlySavings * 12;
  const standardResolutionSpeedup = propertyType === "office" ? "เร็วขึ้น 91%" : "เร็วขึ้น 96%";

  const handleSubmitProposalForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  return (
    <div 
      id="proposal-calculator-card" 
      className="p-[1.5px] rounded-2xl bg-gradient-to-r from-white via-white/50 to-white/10 shadow-[0_0_25px_rgba(255,255,255,0.15)] relative overflow-hidden transition-all duration-500"
    >
      {/* Background overlay inside the premium frame */}
      <div className="bg-slate-950/80 backdrop-blur-lg rounded-2xl p-6 md:p-8 relative text-left text-white h-full border border-white/5">
        {/* Subtle top decoration */}
        <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-white text-slate-950 rounded-full p-2.5 shadow-lg border border-white/20 flex items-center justify-center pointer-events-none">
          <Award className="w-5 h-5 text-slate-950" />
        </div>

        {!isSubmitted ? (
          <form id="frm-proposal-calc" onSubmit={handleSubmitProposalForm} className="space-y-5">
            <div className="flex items-center gap-2.5 mb-2">
              <Calculator className="w-5 h-5 text-white" />
              <h4 className="font-sans font-extrabold text-sm sm:text-base tracking-tight uppercase font-display text-white">
                เครื่องมือประมาณการเพื่อการประหยัดงบและสอดคล้องตามเกณฑ์มาตรฐาน ISO 9001
              </h4>
            </div>
            
            <p className="text-xs text-white/90 leading-relaxed font-sans">
              กรอกข้อมูลและระเบียบการของอาคารในปัจจุบันของคุณ เพื่อรับการประเมินวิเคราะห์ประมาณการจัดเซฟค่าใช้จ่ายบำรุงรักษาอย่างรวดเร็วภายใต้ระเบียบการของกลุ่ม Premium Property
            </p>

            {/* Step 1: Property Type Selection */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase tracking-wider font-extrabold text-white">
                1. เลือกประเภทอสังหาริมทรัพย์
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  id="btn-prop-condo"
                  type="button"
                  onClick={() => {
                    setPropertyType("condo");
                    setUnitsCount(150);
                    setCurrentExpense(28000);
                  }}
                  className={`py-3 px-1 rounded-xl text-[10px] sm:text-xs font-extrabold font-sans border transition-all text-center cursor-pointer ${
                    propertyType === "condo"
                      ? "bg-white text-slate-950 border-white shadow-xl"
                      : "bg-white/5 text-white border-white/20 hover:bg-white/10"
                  }`}
                >
                  คอนโดมิเนียม
                </button>
                
                <button
                  id="btn-prop-estate"
                  type="button"
                  onClick={() => {
                    setPropertyType("estate");
                    setUnitsCount(80);
                    setCurrentExpense(20000);
                  }}
                  className={`py-3 px-1 rounded-xl text-[10px] sm:text-xs font-extrabold font-sans border transition-all text-center cursor-pointer ${
                    propertyType === "estate"
                      ? "bg-white text-slate-950 border-white shadow-xl"
                      : "bg-white/5 text-white border-white/20 hover:bg-white/10"
                  }`}
                >
                  โครงการหมู่บ้าน
                </button>

                <button
                  id="btn-prop-office"
                  type="button"
                  onClick={() => {
                    setPropertyType("office");
                    setUnitsCount(45);
                    setCurrentExpense(45000);
                  }}
                  className={`py-3 px-1 rounded-xl text-[10px] sm:text-xs font-extrabold font-sans border transition-all text-center cursor-pointer ${
                    propertyType === "office"
                      ? "bg-white text-slate-950 border-white shadow-xl"
                      : "bg-white/5 text-white border-white/20 hover:bg-white/10"
                  }`}
                >
                  อาคารสำนักงาน
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Step 2: Scale of Property */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wide block text-white">
                  {propertyType === "condo" ? "จำนวนยูนิตอาคารชุดทั้งหมด" : 
                   propertyType === "estate" ? "จำนวนบ้านในหมู่บ้านทั้งหมด" : "จำนวนแผนก / ผู้เช่า"}
                </label>
                <div className="relative">
                  <input
                    id="ipt-units-count"
                    type="number"
                    required
                    min="5"
                    max="2000"
                    value={unitsCount}
                    onChange={(e) => setUnitsCount(Math.max(1, Number(e.target.value)))}
                    className="w-full text-xs p-3 rounded-xl border border-white/35 bg-white/5 font-extrabold font-mono focus:outline-none transition-all text-white focus:bg-white/10 focus:border-white focus:ring-1 focus:ring-white"
                  />
                  <span className="absolute right-3 top-3 text-[10px] font-mono text-white">ยูนิต</span>
                </div>
              </div>

              {/* Step 3: Current Expenses */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wide block text-white">
                  งบค่าซ่อมบำรุง/ส่วนกลางต่อเดือน ($)
                </label>
                <div className="relative">
                  <input
                    id="ipt-current-expense"
                    type="number"
                    required
                    min="100"
                    max="1000000"
                    value={currentExpense}
                    onChange={(e) => setCurrentExpense(Math.max(0, Number(e.target.value)))}
                    className="w-full text-xs p-3 rounded-xl border border-white/35 bg-white/5 font-extrabold font-mono focus:outline-none transition-all text-white focus:bg-white/10 focus:border-white focus:ring-1 focus:ring-white"
                  />
                  <span className="absolute left-3 top-3 text-xs font-mono text-white">$</span>
                </div>
              </div>
            </div>

            {/* Step 4: Primary operational issue */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wide block text-white font-extrabold">
                2. ผลลัพธ์หรือปัญหาที่ต้องการปฏิรูปเร่งด่วน
              </label>
              <select
                id="ipt-primary-pain"
                value={primaryPain}
                onChange={(e) => setPrimaryPain(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-white/35 bg-slate-950 text-white focus:outline-none font-sans font-bold transition-all focus:ring-1 focus:ring-white"
              >
                <option value="auditing" className="text-white bg-slate-950 font-sans">ความกังวลทางการเงินและระบบบัญชี (ค่าน้ำหรือค่าตรวจสอบคลาดเคลื่อน)</option>
                <option value="maintenance" className="text-white bg-slate-950 font-sans">กระบวนการวิศวกรรมบำรุงรักษาล่าช้า (มีเรื่องร้องเรียนสะสมจากผู้อยู่อาศัย)</option>
                <option value="efficiency" className="text-white bg-slate-950 font-sans">ประสิทธิภาพพลังงานโครงสร้างอาคาร Chiller สิ้นเปลืองงบประมาณ</option>
                <option value="staff" className="text-white bg-slate-950 font-sans">บุคลากรฝ่ายอาคารไม่มีใบประกาศมาตรฐานวิชาชีพหรือใบรับรอง ISO</option>
              </select>
            </div>

            {/* Quick Real-time Indicator values panel */}
            <div className="rounded-xl p-4 border border-white/40 bg-white/5 flex items-center justify-between transition-all duration-300">
              <div>
                <p className="text-[9px] font-mono tracking-wider text-white">ยอดการลดรายจ่ายขั้นต้นที่คาดหวัง</p>
                <p className="text-xs sm:text-sm font-extrabold font-sans tracking-tight text-white mt-0.5">
                  ประหยัดได้ <span className="underline decoration-2 font-black text-white">{estimatedSavingsPercent}%</span> ภายใต้มาตรฐาน ISO
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-[9px] font-extrabold text-white block">เซฟสะสมรายเดือนประมาณการ</span>
                <p className="font-mono text-sm sm:text-base font-black text-white mt-0.5">+${estimatedMonthlySavings.toLocaleString()}/ด.</p>
              </div>
            </div>

            <button
              id="btn-generate-proposal-scorecard"
              type="submit"
              className="w-full bg-white hover:bg-white/90 active:scale-[0.99] text-slate-950 font-extrabold font-sans text-xs tracking-wider py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 uppercase border border-white/25 cursor-pointer"
            >
              <span>คำนวณขอข้อมูลผลวิเคราะห์ประวัติสถิติเต็มรูปแบบ</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-5 py-2"
          >
            <div className="text-center space-y-2">
              <div className="mx-auto w-11 h-11 bg-white/10 rounded-full flex items-center justify-center text-white border border-white/20 mb-1">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-sans font-black text-sm sm:text-base tracking-tight text-white">
                การประเมินวิเคราะห์ประสิทธิภาพเบื้องต้นสำเร็จเรียบร้อย!
              </h4>
              <p className="text-xs max-w-sm mx-auto text-white leading-relaxed">
                เราได้จัดสรรรายงานประเมินความสอดคล้องทางการจัดการลดรายจ่ายสัญญาราว ISO 9001:2015 สำหรับ {unitsCount} ยูนิตอสังหาริมทรัพย์ของคุณแล้ว
              </p>
            </div>

            {/* Projection breakdown */}
            <div className="border border-white/40 rounded-2xl p-4 space-y-4 bg-white/5">
              <div className="flex justify-between items-center text-xs border-b border-white/20 pb-2.5 text-white">
                <span className="font-sans font-extrabold text-white">ประเภทอสังหาริมทรัพย์:</span>
                <span className="font-black text-white decoration-white underline">
                  {propertyType === "condo" ? "การจัดการโครงการอาคารชุด คอนโดมิเนียม" :
                   propertyType === "estate" ? "การจัดการโครงการหมู่บ้านจัดสรร" : 
                   "การจัดการอาคารสำนักงานและพาณิชย์เกรดพรีเมียม"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3 border border-white/30 bg-white/5 text-left transition-all">
                  <span className="text-[9px] font-mono text-white block uppercase">งบเซฟรายเดือน</span>
                  <span className="text-xs sm:text-sm font-black font-mono text-white mt-1 block">${estimatedMonthlySavings.toLocaleString()}</span>
                </div>
                <div className="rounded-xl p-3 border border-white/30 bg-white/5 text-left transition-all">
                  <span className="text-[9px] font-mono text-white block uppercase">ลดพลังงานคาร์บอน</span>
                  <span className="text-xs sm:text-sm font-black font-mono text-white mt-1 block">ลดเฉลี่ย 14.5% / ปี</span>
                </div>
              </div>

              <div className="space-y-3 pt-1 text-xs">
                <div className="flex items-center gap-2.5 text-white">
                  <FileCheck className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="font-medium">คะแนนสอดคล้องระบบ ISO: <span className="font-black">สูงถึง 99.4%</span></span>
                </div>
                <div className="flex items-center gap-2.5 text-white">
                  <Clock className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="font-medium">ระยะเวลาเข้าตรวจวิศวกรรม: <span className="font-black">{standardResolutionSpeedup}</span></span>
                </div>
                <div className="flex items-center gap-2.5 text-white">
                  <Activity className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="font-medium">ภารกิจแก้ไขลำดับแรก: <span className="font-black">จัดตั้งระบบ SOP แผนคุมรั่วไหลทันที</span></span>
                </div>
              </div>
            </div>

            {/* Simulation Submission success message */}
            <div className="rounded-xl p-3.5 text-xs border border-white/40 bg-white/5 flex gap-3 text-white">
              <div className="p-1 px-1.5 bg-white text-slate-950 rounded-lg flex-shrink-0 self-start">
                <ThumbsUp className="w-3.5 h-3.5 text-slate-950" />
              </div>
              <p className="leading-relaxed text-white">
                <strong>เจ้าหน้าที่ได้รับข้อมูลแล้ว:</strong> รายรายงานวิเคราะห์การเงินฉบับเต็มจะถูกส่งต่อให้วิศวกรของกลุ่ม Premium Property เรากำลังจัดเตรียมทีมผู้ประเมินติดต่อกลับเพื่อเข้าสำรวจหน้าไซต์ฟรี
              </p>
            </div>

            <button
              id="btn-proposal-calc-reestimate"
              onClick={resetForm}
              className="text-xs text-center font-bold block mx-auto text-white hover:underline transition-all pt-2 cursor-pointer"
            >
              ← ปรับแต่งตัวประมาณการอีกรอบ
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
