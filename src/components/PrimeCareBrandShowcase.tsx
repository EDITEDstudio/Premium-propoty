import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  ShieldAlert, 
  Sparkles, 
  Sprout, 
  Car, 
  CreditCard, 
  FileText, 
  ShoppingBag, 
  CheckCircle2, 
  Palette,
  Compass
} from "lucide-react";

interface UniformRole {
  id: string;
  roleTh: string;
  roleEn: string;
  colorName: string;
  colorHex: string;
  textColor: string;
  uniformDetail: string;
  focusArea: string;
  icon: React.ReactNode;
  behaviorDesc: string;
}

interface BrandAssetItem {
  name: string;
  category: string;
  desc: string;
  features: string[];
}

export default function PrimeCareBrandShowcase({ isNightMode = false }: { isNightMode?: boolean }) {
  const [activeTab, setActiveTab] = useState<"uniforms" | "assets">("uniforms");
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(0);

  const uniformsData: UniformRole[] = [
    {
      id: "juristic",
      roleTh: "นิติบุคคลอาคาร",
      roleEn: "JURISTIC",
      colorName: "สีน้ำเงิน Primary Navy",
      colorHex: "#0F2B46",
      textColor: "text-white",
      uniformDetail: "เสื้อเชิ้ตคอปกสีน้ำเงินเข้ม (Navy Blue) สลักโลโก้แบรนด์สีกรมทองและทองอ่อน สวมคู่กับกางเกงสแล็คสีกรมท่าเข้ม ตัวแทนความโปร่งใส คมชัด และความเป็นผู้นำ",
      focusArea: "บริหารการเงินบัญชี ประสานคณะกรรมการ ร่วมตรวจสอบความสอดคล้องสถิติคลังข้อมูลตามระบบ ISO 9001:2015",
      icon: <Users className="w-6 h-6" />,
      behaviorDesc: "พร้อมให้คำปรึกษา แนะนำกฎระเบียบตึกสะสมอย่างซื่อตรงเปิดเผย"
    },
    {
      id: "security",
      roleTh: "รักษาความปลอดภัย",
      roleEn: "SECURITY",
      colorName: "สีเทาเหล็ก Steel Gray",
      colorHex: "#6B7280",
      textColor: "text-white",
      uniformDetail: "เสื้อเชิ้ตสีกากีเทาเหล็กอ่อน (Steel Gray) ตัวเครื่องแบบประดับอินธนูบ่า คล้องตั๋วแสดงตัวระบบ (ID Card) มีหมวกและเข็มขัดนิรภัยคุมวินัย สะท้อนความปลอดภัยสูงสุด",
      focusArea: "ลาดตระเวนประจำโครงการอย่างเข้มงวด ควบคุมจุดเข้าออก บันทึกข้อมูลและกำกับกล้องรักษาความปลอดภัย 24 ชั่วโมง",
      icon: <ShieldAlert className="w-6 h-6" />,
      behaviorDesc: "เฝ้าระวังเหตุด่วนด้วยความพร้อมบำรุงภัยและควบคุมความสงบในสัญญา 100%"
    },
    {
      id: "housekeeping",
      roleTh: "แม่บ้านทำความสะอาด",
      roleEn: "HOUSEKEEPING",
      colorName: "สีครีม Housekeeping Cream",
      colorHex: "#F4E8D0",
      textColor: "text-[#0F2B46]",
      uniformDetail: "เสื้อชุดเครื่องแบบกระดุมผ่าเปรียบเสมือนสีกระดาษกากีครีมสว่างนวลตา (Cream Beige) สลักขลิบกระเป๋าขอบน้ำตาลสว่าง ดูสุภาพ สอาดตา สุขอนามัย และเป็นมิตร",
      focusArea: "รักษาความสะอาดตึกหน้างาน บิ๊กคลีนนิ่งคลังขยะ จัดดูแลภูมิทัศน์ห้องสัญญากลาง และสุขอนามัยในพื้นที่แชร์ร่วม",
      icon: <Sparkles className="w-6 h-6" />,
      behaviorDesc: "ให้บริการด้วยความละเอียดอ่อน อัธยาศัยดีเป็นมิตรและเป็นระบบระเบียบสูง"
    },
    {
      id: "landscaping",
      roleTh: "คนสวนบำรุงสวนหย่อม",
      roleEn: "LANDSCAPING",
      colorName: "สีเขียว Landscaping Green",
      colorHex: "#2E7032",
      textColor: "text-white",
      uniformDetail: "เสื้อสปอร์ตโปโลแขนยาวสีเขียวชอุ่มชุ่มฉ่ำ (Landscaping Green) สะกดทักษะรักษาร่มเงา คู่กับหมวกปีกกว้างบังแดด (Bucket Hat) เข้าเซ็ต เพื่อความทะมัดทะแมง",
      focusArea: "ดักฟื้นฟูภูมิทัศน์ส่วนกลาง ตัดตกแต่งแต่งต้นไม้ระดับสูง ตัดสนามหญ้า และฟื้นบำรุงธรรมชาติในพิกัดโครงการ",
      icon: <Sprout className="w-6 h-6" />,
      behaviorDesc: "เชี่ยวชาญการจัดพินิจธรรมชาติ มีวินัยตรวจวัดสุนทรียภาพสิ่งแวดล้อมสัจธรรม"
    }
  ];

  const brandAssetsData: BrandAssetItem[] = [
    {
      name: "Service Vehicle (ยานพาหนะปฏิบัติการ)",
      category: "ขนส่งและหน่วยเคลื่อนที่เร็ว",
      desc: "รถสายตรวจกระบะ 4 ประตู (Patrol Car) คาดแถบแบรนด์สีกรมท่าทองสว่าง และรถตู้ฝ่ายช่างฉุกเฉิน (Service Van) ลายพรีเมียม สลักตราอาร์มสติ๊กเกอร์สะท้อนแสงเพื่อความปลอดภัยขณะเดินทางระงับเหตุบำรุงภายในเวลา < Hour",
      features: ["ติดเครื่องระบบสตรีมมิ่งตรวจจับพิกัด GPS", "บรรทุกชุดถังคาลิเบรตน้ำสระระบบ IoT ครบมือ", "พ่นลายนิรภัยสูงสะท้อนแสงแบบ 3M"]
    },
    {
      name: "Signage & Corporate ID Card",
      category: "การระบุตัวตนและป้ายนำทาง",
      desc: "ป้ายอะคริลิกหน้าทางเข้าสำนักงานนิติกาแล็กซี่ขัดมันขอบสีโครเมียมสลักตราสีกรมน้ำเงิน, การ์ดพลาสติกการ์ดพนักงาน (Badge ID) เชื่อมโยงระเบียบรายงานประวัติเข้าสอบเทียบด้วยรหัสคิวอาร์ระบบสดคลาวด์",
      features: ["ป้ายสีกรมท่าพรีเมียม #0F2B46 สะท้อนเกียรติยศ", "การ์ดแข็งพิมพ์ความละเอียดพิกเซลสูงสีกรม", "คิวอาร์โค้ดกำกับความปลอดภัยตรวจสอบได้"]
    },
    {
      name: "Stationery & Uniform Accents (ของใช้ในสำนักงาน)",
      category: "สื่อสิ่งพิมพ์และของประจำกาย",
      desc: "ซองจดหมายบรรจุสัญญารับจ้างบริหาร, หัวกระดาษพารามิเตอร์ตรวจสอบ ISO 9001:2015 (Letterhead), หมวกแก๊ปสีน้ำเงินกรมท่าสลักตราแบรนด์ปีกทองระบุกลุ่มปฏิบัติงานนิติบุคคล และแฟ้มใส่รายงานบัญชีเคลือบเงาหนา",
      features: ["กระดาษจดหมายเกรดพรีเมียมถนอมสายตา", "แฟ้มคุมเล่มระเบียบโครงสร้างสีน้ำเงินเข้ม", "หมวกแก๊ปสไตล์หรู Flat Logo ป้องกันแสงแดด"]
    },
    {
      name: "Promotional & Event Material",
      category: "จัดแสดงและวัสดุความภักดีแบรนด์",
      desc: "ถุงผ้าสีกรมหนาลายทองหรูระบายอากาศ (Tote Bag Premier) และ Roll-up แบนเนอร์แสดงสถิติประดุลสัดส่วนพลังงาน ซึ่งใช้ประดับบอร์ดนิทรรศการขัดแจงงบประมาณประจำการประชุมกรรมการร่วม",
      features: ["แบนเนอร์แนวตั้งโครงสร้างอะลูมิเนียมเกรดแกร่ง", "กระเป๋าเป้สะพายพนักงานและถุงผ้าขวัญถุงของพรีเมียม", "ดีไซน์หรูเน้นพื้นที่เว้นระยะสายหน้าจอสบายตา"]
    }
  ];

  const currentRole = uniformsData[selectedRoleIndex];

  return (
    <div className={`rounded-2xl border p-6 md:p-8 relative overflow-hidden transition-all duration-300 backdrop-blur-md ${
      isNightMode 
        ? "bg-[#010309]/65 border-white/5 text-slate-100 shadow-2xl" 
        : "bg-white/50 border-white/60 text-slate-800 shadow-xl shadow-slate-200/30"
    }`}>
      {/* Decorative backdrop glow */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#0F2B46]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#2E7032]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b pb-5 mb-6 gap-4 border-slate-700/15">
        <div className="space-y-1.5 text-left">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-mono border ${
            isNightMode 
              ? "bg-[#0F2B46]/30 text-[#38bdf8] border-[#38bdf8]/35" 
              : "bg-[#0F2B46]/10 text-[#0F2B46] border-[#0F2B46]/20"
          }`}>
            <Palette className="w-3.5 h-3.5" />
            PREMIUM PROPOTY CORPORATE IDENTITY (CI)
          </div>
          <h3 className={`text-xl md:text-2xl font-black tracking-tight font-sans ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
            เครื่องแบบผู้ปฏิบัติงานและนิทรรศการแอปพลิเคชันแบรนด์
          </h3>
          <p className={`text-xs ${isNightMode ? "text-slate-400" : "text-slate-500"} font-sans`}>
            ส่องภาพลักษณ์การบริการสัญญาระยะยาวที่มีประสิทธิภาพสูงสุดและภาพลักษณ์อันน่าเชื่อถือแห่งวิชาชีพบริหารจัดการสินทรัพย์
          </p>
        </div>

        {/* Tab Controls */}
        <div className={`flex p-1 rounded-lg border flex-shrink-0 ${isNightMode ? "bg-[#070D18] border-blue-950" : "bg-slate-100 border-slate-200/50"}`}>
          <button
            onClick={() => setActiveTab("uniforms")}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "uniforms"
                ? "bg-[#0F2B46] text-white shadow"
                : `text-slate-500 hover:text-slate-900 ${isNightMode ? "hover:text-white" : "hover:text-[#0F2B46]"}`
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>เครื่องแบบผู้แต่งกาย</span>
          </button>
          <button
            onClick={() => setActiveTab("assets")}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "assets"
                ? "bg-[#0F2B46] text-white shadow"
                : `text-slate-500 hover:text-slate-900 ${isNightMode ? "hover:text-white" : "hover:text-[#0F2B46]"}`
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>การใช้งานแบรนด์ในองค์กร</span>
          </button>
        </div>
      </div>

      {/* Tab Contents: UNIFORMS & ROLES */}
      <AnimatePresence mode="wait">
        {activeTab === "uniforms" ? (
          <motion.div
            key="uniforms-tab"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Uniform roles selection lists */}
            <div className="lg:col-span-5 space-y-3">
              <span className={`text-[10px] font-mono tracking-widest block font-bold mb-1 uppercase ${
                isNightMode ? "text-slate-400" : "text-slate-500"
              }`}>
                สลับเลือกตัวอย่างกลุ่มเครื่องแบบปฏิบัติงาน 
              </span>
              
              <div className="space-y-2">
                {uniformsData.map((role, idx) => {
                  const isSelected = idx === selectedRoleIndex;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRoleIndex(idx)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? isNightMode 
                            ? "bg-[#0F2B46]/30 border-[#0F2B46] text-white shadow-lg" 
                            : "bg-[#0F2B46]/5 border-[#0F2B46] text-[#0F2B46] font-semibold shadow-sm"
                          : isNightMode
                            ? "bg-[#0F2B46]/5 border-blue-950/20 text-slate-400 hover:bg-[#0F2B46]/10"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full border border-white/20 shadow-sm flex-shrink-0"
                          style={{ backgroundColor: role.colorHex }}
                        ></div>
                        <div>
                          <span className="block text-xs font-black font-sans leading-none">{role.roleTh}</span>
                          <span className="text-[9px] font-mono tracking-wider opacity-60 uppercase">{role.roleEn}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase ${
                          isNightMode ? "bg-blue-900/30 text-blue-300" : "bg-slate-200/50 text-slate-700"
                        }`}>
                          {role.colorName.split(" ")[1]}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Interactive detailed showcase of uniform and role */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className={`p-6 rounded-2xl border backdrop-blur-sm ${
                isNightMode ? "bg-[#010309]/55 border-white/5" : "bg-white/60 border-white/40"
              } space-y-5 shadow-inner relative`}>
                
                {/* Visual Accent Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-md text-[9px] font-bold font-mono tracking-widest uppercase border"
                     style={{ backgroundColor: currentRole.colorHex + "20", borderColor: currentRole.colorHex + "50", color: currentRole.colorHex }}>
                  <span>{currentRole.colorName}</span>
                </div>

                <div className="flex items-center gap-3.5 mt-2">
                  <div className="p-3 rounded-lg text-white" style={{ backgroundColor: currentRole.colorHex }}>
                    {currentRole.icon}
                  </div>
                  <div>
                    <h4 className={`font-extrabold text-base leading-tight font-sans ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
                      {currentRole.roleTh} ({currentRole.roleEn})
                    </h4>
                    <p className={`text-[10px] font-mono uppercase tracking-wider ${
                      isNightMode ? "text-slate-400" : "text-slate-500"
                    }`}>
                      Corporate Identity Uniform & Code of Conduct
                    </p>
                  </div>
                </div>

                {/* Uniform description block */}
                <div className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-wider font-bold text-[#D4A017] uppercase block">
                      รายละเอียดลักษณะเครื่องแบบประธานตรวจสอบ CI:
                    </span>
                    <p className={`text-xs ${isNightMode ? "text-slate-300" : "text-slate-700"} leading-relaxed font-sans`}>
                      {currentRole.uniformDetail}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className={`space-y-1 p-3 rounded-lg border ${
                      isNightMode ? "bg-[#010309]/60 border-white/5" : "bg-white/60 border-slate-200/40 shadow-sm"
                    }`}>
                      <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase block">
                        ขอบเขตการรับผิดชอบหลัก:
                      </span>
                      <p className={`text-[11px] leading-relaxed ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                        {currentRole.focusArea}
                      </p>
                    </div>

                    <div className={`space-y-1 p-3 rounded-lg border ${
                      isNightMode ? "bg-[#010309]/60 border-white/5" : "bg-white/60 border-slate-200/40 shadow-sm"
                    }`}>
                      <span className="text-[9px] font-mono font-bold text-[#D4A017] uppercase block">
                        วินัยและการปฏิสัมพันธ์:
                      </span>
                      <p className={`text-[11px] leading-relaxed ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                        {currentRole.behaviorDesc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slogan tagline alignment */}
              <div className="mt-4 flex items-center justify-between text-xs px-2">
                <span className={`text-[11px] ${isNightMode ? "text-slate-400" : "text-slate-500"} font-sans`}>
                  ✓ คุมทีมงานทุกสายตัวด้วยระบบจรรยาบรรณวิชาชีพและกฎระเบียบชุดเครื่องแบบระดับ ISO 9001
                </span>
                <span className={`font-extrabold text-xs font-display transition-colors ${isNightMode ? "text-amber-400" : "text-[#0F2B46]"}`}>
                  Professional Management · Trusted Care
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="assets-tab"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-xs"
          >
            {brandAssetsData.map((asset, index) => (
              <div 
                key={index} 
                className={`p-5 rounded-2xl border hover:border-amber-400 group transition-all duration-300 flex flex-col justify-between ${
                  isNightMode ? "bg-[#0D1B2E]/60 border-blue-950" : "bg-slate-50 border-slate-250/20 hover:bg-white hover:shadow-xl"
                }`}
              >
                <div className="space-y-2 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-amber-500 uppercase tracking-widest">
                      {asset.category}
                    </span>
                    <span className="text-[9px] font-mono opacity-40">ITEM 0{index + 1}</span>
                  </div>
                  <h4 className={`font-black text-sm font-sans group-hover:text-amber-500 transition-colors ${
                    isNightMode ? "text-white" : "text-[#0F2B46]"
                  }`}>
                    {asset.name}
                  </h4>
                  <p className={`text-[11px] leading-relaxed ${isNightMode ? "text-slate-300" : "text-slate-600"} font-sans`}>
                    {asset.desc}
                  </p>
                </div>

                <div className="border-t border-slate-400/10 pt-3 mt-1 text-[10px]">
                  <span className="text-slate-400 font-mono text-[8px] font-bold tracking-widest block mb-2 uppercase">
                    องค์ประกอบรายละเอียดระบุในแผนผัง CI:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {asset.features.map((feat, fIdx) => (
                      <span 
                        key={fIdx} 
                        className={`inline-flex items-center gap-1 py-1 px-2.5 rounded-full ${
                          isNightMode 
                            ? "bg-blue-950/45 text-blue-200 border border-blue-900/30" 
                            : "bg-white text-slate-700 border border-slate-200 shadow-sm"
                        }`}
                      >
                        <span className="w-1 h-1 bg-[#D4A017] rounded-full"></span>
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
