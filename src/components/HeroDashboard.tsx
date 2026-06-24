import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  RefreshCw, 
  UserPlus, 
  Search, 
  ArrowUpRight, 
  Plus, 
  ThumbsUp, 
  PieChart, 
  DollarSign 
} from "lucide-react";
import { FinancialData, MaintenanceTicket } from "../types";

// Static premium initial data
const initialFinancials: FinancialData[] = [
  { month: "ม.ค.", budgeted: 85000, actual: 78200, savings: 6800 },
  { month: "ก.พ.", budgeted: 85000, actual: 74500, savings: 10500 },
  { month: "มี.ค.", budgeted: 85000, actual: 71200, savings: 13800 },
  { month: "เม.ย.", budgeted: 92000, actual: 75600, savings: 16400 },
  { month: "พ.ค.", budgeted: 92000, actual: 73100, savings: 18900 },
  { month: "มิ.ย.", budgeted: 92000, actual: 69800, savings: 22200 },
];

const initialTickets: MaintenanceTicket[] = [
  { id: "MKT-1082", property: "แกรนด์ ฮอไรซัน อาคาร A", category: "HVAC", status: "In Progress", urgency: "High", date: "วันนี้, 10:24 น." },
  { id: "MKT-1081", property: "หมู่บ้านเอเมอรัลด์ วิลล่า", category: "Electrical", status: "Completed", urgency: "Medium", date: "วันนี้, 08:15 น." },
  { id: "MKT-1080", property: "ซัมมิท พลาซ่า บล็อก C", category: "Plumbing", status: "Pending", urgency: "Critical", date: "เมื่อวานนี้" },
  { id: "MKT-1078", property: "แกรนด์ ฮอไรซัน อาคาร B", category: "Security", status: "Completed", urgency: "High", date: "เมื่อวานนี้" },
  { id: "MKT-1077", property: "หมู่บ้านเอเมอรัลด์ วิลล่า", category: "Cleaning", status: "In Progress", urgency: "Low", date: "2 วันที่แล้ว" },
];

export default function HeroDashboard({ isNightMode = false }: { isNightMode?: boolean }) {
  const [activeTab, setActiveTab] = useState<"financials" | "maintenance" | "satisfaction" | "audit">("financials");
  const [financials, setFinancials] = useState<FinancialData[]>(initialFinancials);
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(initialTickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);
  const [auditComplete, setAuditComplete] = useState(false);
  const [showAddTicket, setShowAddTicket] = useState(false);
  
  // States representing interactive filters or simulations
  const [selectedPropertyFilter, setSelectedPropertyFilter] = useState<string>("All");
  const [satisfactionScore, setSatisfactionScore] = useState(94.8);
  const [costReductionRate, setCostReductionRate] = useState(19.4);
  const [auditScore, setAuditScore] = useState(98.2);

  // Simulated live ticket log form
  const [newTicketProperty, setNewTicketProperty] = useState("Grand Horizon Tower A");
  const [newTicketCategory, setNewTicketCategory] = useState<"Plumbing" | "Electrical" | "HVAC" | "Security" | "Cleaning">("Plumbing");
  const [newTicketUrgency, setNewTicketUrgency] = useState<"Low" | "Medium" | "High" | "Critical">("Medium");

  // Dynamic values calculated from state
  const totalBudgeted = financials.reduce((sum, f) => sum + f.budgeted, 0);
  const totalActual = financials.reduce((sum, f) => sum + f.actual, 0);
  const totalSavings = totalBudgeted - totalActual;
  const currentSavingsPercent = ((totalSavings / totalBudgeted) * 100).toFixed(1);

  // Toggle ticket status in-dashboard
  const handleToggleStatus = (id: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        const statuses: ("Pending" | "In Progress" | "Completed")[] = ["Pending", "In Progress", "Completed"];
        const currentIndex = statuses.indexOf(t.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        
        // Boost metrics if state improves
        if (nextStatus === "Completed") {
          setSatisfactionScore(prevScore => Math.min(99.4, Number((prevScore + 0.2).toFixed(1))));
          setCostReductionRate(prevRate => Math.min(25.0, Number((prevRate + 0.1).toFixed(1))));
        }
        
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // Add new ticket simulation
  const handleAddTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `MKT-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Convert display name
    const propNameTh = 
      newTicketProperty === "Grand Horizon Tower A" ? "แกรนด์ ฮอไรซัน อาคาร A" :
      newTicketProperty === "Emerald Villa Estates" ? "หมู่บ้านเอเมอรัลด์ วิลล่า" : "ซัมมิท พลาซ่า บล็อก C";

    const freshTicket: MaintenanceTicket = {
      id: newId,
      property: propNameTh,
      category: newTicketCategory,
      status: "Pending",
      urgency: newTicketUrgency,
      date: "เมื่อครู่"
    };

    setTickets([freshTicket, ...tickets]);
    setShowAddTicket(false);
    
    // Decrement score temporarily until marked In Progress/Completed
    setSatisfactionScore(prev => Math.max(85, Number((prev - 0.4).toFixed(1))));
  };

  // Simulated Interactive AUDIT tool
  const triggerAudit = () => {
    setIsAuditing(true);
    setAuditComplete(false);
    setAuditProgress(0);
  };

  useEffect(() => {
    let interval: any;
    if (isAuditing && auditProgress < 100) {
      interval = setInterval(() => {
        setAuditProgress(prev => {
          if (prev >= 100) {
            setIsAuditing(false);
            setAuditComplete(true);
            setAuditScore(99.6); // Boost system audit score
            setCostReductionRate(prevRate => Math.min(24.8, Number((prevRate + 0.8).toFixed(1))));
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isAuditing, auditProgress]);

  // Handle financial optimization trigger (simulated strategy action)
  const optimizeFinancials = () => {
    setFinancials(prev => prev.map(f => ({
      ...f,
      actual: Math.round(f.actual * 0.94), // Save 6% more immediately
      savings: Math.round(f.budgeted - (f.actual * 0.94))
    })));
    setCostReductionRate(prev => Math.min(28.5, Number((prev + 1.8).toFixed(1))));
  };

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.property.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Property matching handles both languages
    const matchesProperty = 
      selectedPropertyFilter === "All" || 
      (selectedPropertyFilter === "Grand Horizon" && (t.property.includes("Horizon") || t.property.includes("ฮอไรซัน"))) ||
      (selectedPropertyFilter === "Emerald Villa" && (t.property.includes("Emerald") || t.property.includes("เอเมอรัลด์"))) ||
      (selectedPropertyFilter === "Summit Plaza" && (t.property.includes("Summit") || t.property.includes("ซัมมิท")));

    return matchesSearch && matchesProperty;
  });

  // Dynamic style tokens to support elegant high-contrast Light Theme
  const s_bg = isNightMode 
    ? "bg-[#010309]/55 border border-blue-950/40 text-white" 
    : "bg-white border border-slate-200 text-slate-800 shadow-xl";
  const s_heading = isNightMode ? "text-gray-200" : "text-[#0F2B46]";
  const s_muted = isNightMode ? "text-gray-400" : "text-slate-500 font-medium";
  const s_card = isNightMode ? "bg-[#02050f]/85 border border-blue-950/40" : "bg-slate-50 border border-slate-200 text-slate-700";
  const s_border = isNightMode ? "border-blue-950/40" : "border-slate-100";
  const s_inner_bg = isNightMode ? "bg-[#010204]/90 border border-blue-950/60" : "bg-slate-100/75 border border-slate-200/50 text-slate-750";
  const s_tabs_bg = isNightMode ? "bg-[#010204]/90 border border-blue-950/50" : "bg-slate-100 border border-slate-200";
  const s_tab_btn_active = isNightMode ? "bg-[#0F2B46] text-white border border-blue-800/40 shadow-sm" : "bg-[#0F2B46] text-white shadow-sm font-semibold";
  const s_tab_btn_inactive = isNightMode ? "text-gray-400 hover:text-white hover:bg-blue-950/20" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50";
  const s_input_bg = isNightMode ? "bg-[#010204]/90 border border-blue-950 text-white" : "bg-white border border-slate-300 text-slate-800";
  const s_row_bg = isNightMode ? "bg-[#010204]/90 border border-blue-950 hover:bg-blue-950/25 text-gray-200" : "bg-white border border-slate-100 hover:bg-slate-50/70 text-slate-750";

  return (
    <div id="hero-dashboard-container" className={`w-full backdrop-blur-lg rounded-2xl p-4 md:p-6 font-sans text-left relative overflow-hidden transition-all duration-300 ${s_bg}`}>
      {/* Glossy lighting effect */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header of dashboard */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 mb-4 gap-3 ${s_border}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-[#16A34A] to-[#D4A017] rounded-lg">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className={`font-sans font-bold text-sm tracking-wide flex items-center gap-2 ${s_heading}`}>
              ระบบจัดการบัญชีนิติ <span className="text-[10px] bg-emerald-500/20 text-emerald-600 px-1.5 py-0.5 rounded font-mono">ระบบตรวจสอบ</span>
            </h4>
            <p className={`text-xs font-mono ${s_muted}`}>โมดูลตรวจสอบสอดคล้องเกณฑ์ประเมินสากล ISO 9001:2015</p>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="flex gap-4">
          <div className="text-right">
            <p className={`text-[10px] font-mono tracking-wider ${s_muted}`}>ความพึงพอใจลูกบ้าน</p>
            <p className="text-sm font-bold text-emerald-600 font-mono">{satisfactionScore}%</p>
          </div>
          <div className={`text-right border-l pl-4 ${s_border}`}>
            <p className={`text-[10px] font-mono tracking-wider ${s_muted}`}>ลดรายจ่ายสะสม</p>
            <p className="text-sm font-bold text-emerald-600 font-mono">-{costReductionRate}%</p>
          </div>
          <div className={`text-right border-l pl-4 ${s_border}`}>
            <p className={`text-[10px] font-mono tracking-wider ${s_muted}`}>ผลตรวจสอบภายใน</p>
            <p className="text-sm font-bold text-amber-600 font-mono">{auditScore}%</p>
          </div>
        </div>
      </div>

      {/* Tabs list */}
      <div className={`flex flex-wrap gap-1.5 p-1 rounded-lg border mb-4 ${s_tabs_bg}`}>
        <button 
          id="btn-tab-financials"
          onClick={() => setActiveTab("financials")}
          className={`flex-1 py-1.5 px-2.5 rounded text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "financials" ? s_tab_btn_active : s_tab_btn_inactive
          }`}
        >
          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
          <span>บัญชีและการเงิน</span>
        </button>

        <button 
          id="btn-tab-maintenance"
          onClick={() => setActiveTab("maintenance")}
          className={`flex-1 py-1.5 px-2.5 rounded text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "maintenance" ? s_tab_btn_active : s_tab_btn_inactive
          }`}
        >
          <TrendingDown className="w-3.5 h-3.5 text-blue-600" />
          <span>งานวิศวกรรมซ่อมบำรุง</span>
        </button>

        <button 
          id="btn-tab-satisfaction"
          onClick={() => setActiveTab("satisfaction")}
          className={`flex-1 py-1.5 px-2.5 rounded text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "satisfaction" ? s_tab_btn_active : s_tab_btn_inactive
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5 text-[#D4A017]" />
          <span>ดัชนีตรวจลูกบ้าน</span>
        </button>

        <button 
          id="btn-tab-audit"
          onClick={() => setActiveTab("audit")}
          className={`flex-1 py-1.5 px-2.5 rounded text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeTab === "audit" ? s_tab_btn_active : s_tab_btn_inactive
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
          <span>ตรวจสอบประเมิน ISO</span>
        </button>
      </div>

      {/* Tabs screen content area */}
      <div className="min-h-[260px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {activeTab === "financials" && (
            <motion.div
              key="financials"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Top financial cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className={`p-2.5 rounded ${s_card}`}>
                  <p className={`text-[10px] font-mono ${s_muted}`}>งบประมาณสะสม</p>
                  <p className={`text-sm font-bold font-mono ${isNightMode ? "text-gray-200" : "text-slate-950"}`}>${totalBudgeted.toLocaleString()}</p>
                </div>
                <div className={`p-2.5 rounded ${s_card}`}>
                  <p className={`text-[10px] font-mono ${s_muted}`}>ยอดใช้จ่ายจริงหน้างาน (OPEX)</p>
                  <p className={`text-sm font-bold font-mono ${isNightMode ? "text-emerald-400" : "text-emerald-700"}`}>${totalActual.toLocaleString()}</p>
                </div>
                <div className={`p-2.5 rounded ${s_card}`}>
                  <p className={`text-[10px] font-mono ${s_muted}`}>เงินสะสมที่เซฟได้สำหรับลูกค้า</p>
                  <span className={`text-xs font-mono flex items-center gap-1 ${isNightMode ? "text-amber-400" : "text-amber-600 font-extrabold"}`}>
                    +${(totalSavings).toLocaleString()} ({currentSavingsPercent}%)
                  </span>
                </div>
              </div>

              {/* Dynamic SVG Sparkline Graph */}
              <div className={`p-3 rounded-lg border ${s_inner_bg}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono ${isNightMode ? "text-gray-400" : "text-slate-500 font-semibold"}`}>แนวโน้มยอดเงินที่ประหยัดได้สะสมปีนี้ ($ ดอลลาร์ต่อเดือน)</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isNightMode ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-100 text-emerald-800 font-semibold"}`}>
                    เปิดโหมดตรวจสอบบัญชีตลอดเวลา
                  </span>
                </div>

                <div className="h-24 w-full relative pt-2">
                  <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="500" y2="20" stroke={isNightMode ? "#1E293B" : "#CBD5E1"} strokeWidth="0.5" strokeDasharray="3" />
                    <line x1="0" y1="50" x2="500" y2="50" stroke={isNightMode ? "#1E293B" : "#CBD5E1"} strokeWidth="0.5" strokeDasharray="3" />
                    <line x1="0" y1="80" x2="500" y2="80" stroke={isNightMode ? "#1E293B" : "#CBD5E1"} strokeWidth="0.5" strokeDasharray="3" />

                    {/* Gradient Area under curve */}
                    <defs>
                      <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#16A34A" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#16A34A" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      document-id="spark-fill"
                      d="M 5,90 L 5,80 L 100,70 L 200,60 L 300,50 L 400,45 L 495,30 L 495,95 Z"
                      fill="url(#chart-grad)"
                    />

                    {/* Line of savings */}
                    <path
                      d="M 5,80 L 100,70 L 200,60 L 300,50 L 400,45 L 495,30"
                      fill="none"
                      stroke="#16A34A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Budget background line */}
                    <path
                      d="M 5,90 L 100,85 L 200,88 L 300,92 L 400,90 L 495,89"
                      fill="none"
                      stroke={isNightMode ? "#475569" : "#94A3B8"}
                      strokeWidth="1.5"
                      strokeDasharray="4"
                    />

                    {/* Interactive dots representing saving milestones */}
                    <circle cx="200" cy="60" r="3.5" fill="#D4A017" />
                    <circle cx="495" cy="30" r="4" fill="#16A34A" />
                  </svg>
                  
                  {/* labels on chart */}
                  <div className="flex justify-between text-[9px] text-gray-500 font-mono mt-1 px-1">
                    <span>ม.ค.</span>
                    <span>มี.ค.</span>
                    <span>พ.ค.</span>
                    <span>มิ.ย. (สอบทานระเบียบเสร็จแล้ว)</span>
                  </div>
                </div>
              </div>

              {/* Financial simulation action button */}
              <div className="flex items-center justify-between mt-3 text-xs">
                <span className={s_muted}>จำลองการเปิดใช้งานแผนเพิ่มความคุ้มค่าเชิงระบบ:</span>
                <button
                  id="btn-optimize-financials"
                  onClick={optimizeFinancials}
                  className={`font-mono text-xs px-3 py-1.5 rounded-md border transition-all flex items-center gap-1.5 cursor-pointer ${
                    isNightMode 
                      ? "bg-[#16A34A]/25 hover:bg-[#16A34A]/45 text-emerald-400 border-emerald-500/30" 
                      : "bg-[#16A34A] hover:bg-emerald-700 text-white border-emerald-600 shadow-sm"
                  }`}
                >
                  <RefreshCw className="w-3 h-3" />
                  ดำเนินการประหยัดทรัพยากรระดับ ISO
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "maintenance" && (
            <motion.div
              key="maintenance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2 border-slate-100">
                <div className={`flex items-center gap-2 px-2.5 py-1 rounded border ${s_input_bg}`}>
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <input 
                    id="search-maintenance-tickets"
                    type="text" 
                    placeholder="ค้นหากิจกรรมซ่อม..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none text-xs focus:outline-none w-32 text-slate-800"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    id="select-property-filter"
                    value={selectedPropertyFilter}
                    onChange={(e) => setSelectedPropertyFilter(e.target.value)}
                    className={`text-xs border rounded px-2 py-1 focus:outline-none ${s_input_bg}`}
                  >
                    <option value="All">ทุกโครงการ</option>
                    <option value="Grand Horizon">โครงการ ฮอไรซัน</option>
                    <option value="Emerald Villa">โครงการ เอเมอรัลด์</option>
                    <option value="Summit Plaza">โครงการ ซัมมิท พลาซ่า</option>
                  </select>

                  <button 
                    id="btn-add-ticket-show"
                    onClick={() => setShowAddTicket(!showAddTicket)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-2.5 py-1.5 rounded flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>สร้างตั๋วประสานงาน</span>
                  </button>
                </div>
              </div>

              {/* Maintenance Sub-Form Container */}
              {showAddTicket && (
                <motion.form 
                  id="frm-add-maintenance-ticket"
                  onSubmit={handleAddTicket}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className={`border p-3 rounded-md space-y-3 text-left ${s_card}`}
                >
                  <p className="text-xs font-semibold text-emerald-600 font-mono">ระบุรายละเอียดการแจ้งซ่อมใหม่</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className={`text-[9px] block mb-1 ${s_muted}`}>ชื่อโครงการ</label>
                      <select 
                        id="ipt-new-ticket-property"
                        value={newTicketProperty} 
                        onChange={(e) => setNewTicketProperty(e.target.value)}
                        className={`w-full text-xs p-1 rounded border ${s_input_bg}`}
                      >
                        <option value="Grand Horizon Tower A">ฮอไรซัน อาคาร A</option>
                        <option value="Emerald Villa Estates">เอเมอรัลด์ วิลล่า</option>
                        <option value="Summit Plaza Block C">ซัมมิท บล็อก C</option>
                      </select>
                    </div>

                    <div>
                      <label className={`text-[9px] block mb-1 ${s_muted}`}>หมวดหมู่งาน</label>
                      <select 
                        id="ipt-new-ticket-category"
                        value={newTicketCategory} 
                        onChange={(e) => setNewTicketCategory(e.target.value as any)}
                        className={`w-full text-xs p-1 rounded border ${s_input_bg}`}
                      >
                        <option value="HVAC">ระบบแอร์ส่วนกลาง</option>
                        <option value="Electrical">งานระบบไฟฟ้า</option>
                        <option value="Plumbing">งานประปาสุขาภิบาล</option>
                        <option value="Security">งานระบบรักษาความปลอดภัย</option>
                        <option value="Cleaning">งานทำความสะอาดบิ๊กคลีนนิ่ง</option>
                      </select>
                    </div>

                    <div>
                      <label className={`text-[9px] block mb-1 ${s_muted}`}>ระดับความต้องการ</label>
                      <select 
                        id="ipt-new-ticket-urgency"
                        value={newTicketUrgency} 
                        onChange={(e) => setNewTicketUrgency(e.target.value as any)}
                        className={`w-full text-xs p-1 rounded border ${s_input_bg}`}
                      >
                        <option value="Low">ปกติ</option>
                        <option value="Medium">ปานกลาง</option>
                        <option value="High">ด่วน</option>
                        <option value="Critical">ด่วนที่สุด</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 text-xs">
                    <button 
                      id="btn-cancel-ticket"
                      type="button" 
                      onClick={() => setShowAddTicket(false)} 
                      className="text-slate-400 hover:text-red-500 px-2 py-1"
                    >
                      ยกเลิก
                    </button>
                    <button 
                      id="btn-submit-ticket"
                      type="submit" 
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      จารึกเข้าระบบ
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Tickets list */}
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((t) => (
                    <div 
                      key={t.id} 
                      className={`rounded p-2 flex items-center justify-between hover:bg-slate-50 transition-colors text-xs ${s_row_bg}`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-slate-400 font-bold">{t.id}</span>
                          <span className={`truncate max-w-[140px] md:max-w-xs ${isNightMode ? "text-gray-200" : "text-slate-900 font-semibold"}`}>{t.property}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px]">
                          <span className={`${s_muted} font-mono`}>
                            หมวดหมู่: {
                              t.category === "HVAC" ? "ระบบทำความเย็นแอร์" :
                              t.category === "Electrical" ? "ไฟฟ้ากำลัง" :
                              t.category === "Plumbing" ? "สุขาภิบาลประปา" :
                              t.category === "Security" ? "ระบบรักษาความปลอดภัย" : "ความสะอาด"
                            }
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className={`${s_muted} font-mono`}>{t.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Urgency tag */}
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold ${
                          t.urgency === "Critical" ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                          t.urgency === "High" ? "bg-amber-500/10 text-amber-600 border border-amber-500/20 animate-pulse" :
                          t.urgency === "Medium" ? "bg-blue-500/10 text-blue-600 border border-blue-500/20" :
                          "bg-gray-500/10 text-gray-500 border border-gray-200"
                        }`}>
                          {t.urgency === "Critical" ? "ด่วนที่สุด" : t.urgency === "High" ? "ด่วน" : t.urgency === "Medium" ? "ปานกลาง" : "ปกติ"}
                        </span>

                        {/* Status Toggle Badge (Interactive!) */}
                        <button
                          id={`btn-toggle-status-${t.id}`}
                          onClick={() => handleToggleStatus(t.id)}
                          title="คลิกสลับสถานะ"
                          className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-all hover:scale-105 select-none ${
                            t.status === "Completed" ? "bg-[#16A34A] text-white font-bold" :
                            t.status === "In Progress" ? "bg-[#D4A017] text-white font-bold" :
                            isNightMode ? "bg-blue-900/60 text-blue-200" : "bg-blue-50 text-blue-700 border border-blue-200 font-semibold"
                          }`}
                        >
                          {t.status === "Completed" ? "ดำเนินการเสร็จสิ้น" : t.status === "In Progress" ? "กำลังแก้ไขหน้างาน" : "รอดำเนินการ"} ↻
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500 text-xs">
                    ไม่มีตั๋วแจ้งซ่อมตรงกับข้อมูลฟิลเตอร์การค้นหาของคุณในตอนนี้
                  </div>
                )}
              </div>

              <p className={`text-[10px] font-mono text-center ${s_muted}`}>
                💡 เคล็ดลับการจำลอง: คุณสามารถกดสลับปุ่มสถานะบาร์ของรายการช่างแจ้งซ่อม (เช่น เสร็จสิ้น กำลังซ่อม) เพื่อดูผลการสลับประสิทธิภาพดัชนีได้ทันที
              </p>
            </motion.div>
          )}

          {activeTab === "satisfaction" && (
            <motion.div
              key="satisfaction"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded flex flex-col justify-between ${s_card}`}>
                  <div>
                    <h5 className={`font-mono text-[10px] tracking-wide ${s_muted}`}>ระยะเวลาเฉลี่ยในการปิดตั๋วแจ้งซ่อม</h5>
                    <p className={`text-2xl font-bold font-mono mt-1 ${isNightMode ? "text-emerald-400" : "text-emerald-700"}`}>1.8 <span className="text-xs">ชั่วโมง</span></p>
                  </div>
                  <p className="text-[9px] text-[#D4A017] font-mono mt-2">✓ สถิติเกณฑ์มาตรฐานทั่วไปคือต่ำกว่า 12 ชั่วโมง</p>
                </div>

                <div className={`p-3 rounded flex flex-col justify-between ${s_card}`}>
                  <div>
                    <h5 className={`font-mono text-[10px] tracking-wide ${s_muted}`}>อัตราการลดการแจ้งเรื่องร้องเรียน</h5>
                    <p className={`text-2xl font-bold font-mono mt-1 ${isNightMode ? "text-emerald-400" : "text-emerald-700"}`}>-62.5%</p>
                  </div>
                  <p className={`text-[9px] font-mono mt-2 ${isNightMode ? "text-emerald-400" : "text-emerald-600"}`}>✓ คำนวณเป็นค่าเฉลี่ยสะสม YTD</p>
                </div>
              </div>

              {/* Feed of live sentiment reviews */}
              <div className="space-y-2">
                <p className={`font-mono text-[10px] ${s_muted}`}>เสียงสะท้อนคำชมล่าสุดจากคณะทำงานกรรมการร่วมและผู้พักอาศัย</p>
                
                <div className={`p-2.5 rounded space-y-2 ${s_inner_bg}`}>
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <p className={`font-bold ${isNightMode ? "text-gray-200" : "text-slate-900"}`}>ประธานคณะกรรมการร่วมชุดจัดตั้ง (ฮอไรซัน อาคาร A)</p>
                      <p className={`text-[10px] mt-0.5 ${isNightMode ? "text-gray-400" : "text-slate-600 font-medium"}`}>"การสืบค้นบัญชีเชิงลึกของทีมงาน Premium Propoty สามารถตัดงบค่าใช้น้ำรั่วไหลส่วนกลางและสิ่งฟุ่มเฟือยลงได้กว่า $4,200 ต่อเดือน การทำงานมีความสะอาดตาโปร่งใสอย่างเป็นที่สุด"</p>
                    </div>
                    <span className="text-amber-500 font-mono flex-shrink-0">★★★★★</span>
                  </div>
                </div>

                <div className={`p-2.5 rounded space-y-2 ${s_inner_bg}`}>
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <p className={`font-bold ${isNightMode ? "text-gray-200" : "text-slate-900"}`}>ประธานฝ่ายวิศวกรรมอาคาร (ซัมมิท พลาซ่า)</p>
                      <p className={`text-[10px] mt-0.5 ${isNightMode ? "text-gray-400" : "text-slate-600 font-medium"}`}>"การเปลี่ยนผ่านแผนปฏิบัติการเข้าสู่แนวทางมาตรฐานที่เป็นสากลแนว ISO ช่วยขจัดปัญหาตั๋วดองงานระบบซับซ้อนทิ้งได้อย่างราบรื่นมากและตรงจุด"</p>
                    </div>
                    <span className="text-amber-500 font-mono flex-shrink-0">★★★★★</span>
                  </div>
                </div>
              </div>

              {/* Interactive feedback slider */}
              <div className={`flex items-center justify-between border-t pt-2 text-[11px] ${s_border}`}>
                <span className={s_muted}>จำลองการแสดงความพึงพอใจและชื่นชมทีมงานช่าง:</span>
                <button
                  id="btn-simulate-satisfaction"
                  onClick={() => {
                    setSatisfactionScore(prev => Math.min(100.0, Number((prev + 0.3).toFixed(1))));
                    setCostReductionRate(prev => Math.min(27.0, Number((prev + 0.2).toFixed(1))));
                  }}
                  className={`font-mono px-2.5 py-1.5 rounded transition-all cursor-pointer ${
                    isNightMode 
                      ? "bg-blue-900/30 text-blue-300 border border-blue-500/20 hover:bg-blue-900/50" 
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-semibold text-xs"
                  }`}
                >
                  บันทึกเสียงสะท้อนด้านบวกจากลูกบ้าน (+เพิ่มคะแนน)
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "audit" && (
            <motion.div
              key="audit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3 font-mono text-xs"
            >
              <div className={`p-3 rounded ${s_card}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className={`text-[10px] font-mono ${s_muted}`}>รายการหมวดตรวจสอบวินัยบัญชี ISO 9001:2015</h5>
                    <p className={`text-sm font-bold mt-1 ${isNightMode ? "text-gray-200" : "text-slate-900"}`}>ความสะอาดเรียบร้อยประเมินประธานนิติบุคคล</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      isNightMode 
                        ? "bg-amber-500/10 border border-amber-500/20 text-amber-400" 
                        : "bg-amber-100 border border-amber-300 text-amber-850"
                    }`}>
                      โหมดสิทธิประเมินพิเศษเปิดใช้งาน
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 text-[10px]">
                  <div className={`flex items-center gap-1.5 ${isNightMode ? "text-gray-300" : "text-slate-700"}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>เคลียร์หน้าบัญชีความคุ้มค่าสูงสุด</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${isNightMode ? "text-gray-300" : "text-slate-700"}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>การจัดเก็บล็อกแจ้งซ่อมและรายงาน</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${isNightMode ? "text-gray-300" : "text-slate-700"}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ความปลอดภัยภัยสิ่งแวดล้อมหน้าไซต์</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${isNightMode ? "text-gray-300" : "text-slate-700"}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ประเมินประมวลผลข้อกฎ ISO Clause 9.2</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Progress Bar simulation */}
              <div className={`p-3 rounded-lg border ${s_inner_bg}`}>
                {isAuditing ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-emerald-600 animate-pulse font-semibold">กำลังประมวลผลการตรวจสอบเกณฑ์ข้อย่อยภาคผนวกที่ 9...</span>
                      <span className="font-bold">{auditProgress}%</span>
                    </div>
                    <div className={`w-full rounded-full h-2 overflow-hidden ${isNightMode ? "bg-blue-950" : "bg-slate-200"}`}>
                      <div className="bg-gradient-to-r from-emerald-500 to-[#D4A017] h-full" style={{ width: `${auditProgress}%` }}></div>
                    </div>
                  </div>
                ) : auditComplete ? (
                  <div className="space-y-1 text-center">
                    <p className="text-emerald-600 font-bold text-[11px] flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      ทุกเงื่อนไขเชิงโครงสร้างผ่านเกณฑ์ทดสอบ! (อัตราความสอดคล้อง 99.6%)
                    </p>
                    <p className={`text-[10px] ${s_muted}`}>ประวัติตรวจบัญชีความคุ้มค่างานและตรวจประเมินระบบไฟถูกระบุลงในฐานเซิฟเวอร์อย่างซื่อตรงปลอดภัยแล้ว</p>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <p className={`text-[11px] mb-2 ${s_muted}`}>ทดสอบจำลองกระบวนการเข้าสืบค้นบัญชีตามระเบียบประเมินผล ISO สากล</p>
                    <button
                      id="btn-trigger-iso-audit"
                      onClick={triggerAudit}
                      className="bg-[#D4A017] text-white font-sans font-bold text-xs px-4 py-1.5 rounded hover:bg-[#D4A017]/90 transition-all shadow-sm cursor-pointer"
                    >
                      เริ่มตรวจประเมินดัชนีวินัยหน้าไซต์งาน
                    </button>
                  </div>
                )}
              </div>

              <div className={`rounded p-2.5 border text-[10px] leading-relaxed ${s_card}`}>
                <p>ระบบทำการเชื่อมโยงสถิติประหยัดรายจ่าย ค้นหาบิลปริมาณน้ำรั่วไหลเพื่อสกัดปัญหาการสิ้นเปลือง และตรวจเช็กความโปร่งใสทางระเบียบของผู้จัดซ่อมบำรุง เพื่อให้คณะกรรมการอุ่นใจในความตรงไปตรงมาสูงสุด</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dashboard Footer */}
      <div className={`border-t pt-3 mt-4 flex justify-between items-center text-[10px] font-mono ${s_border} ${s_muted}`}>
        <span>การรักษาความปลอดภัยความโปร่งใสความลับเกณฑ์กากับ SHA-256</span>
        <span className="text-emerald-600 flex items-center gap-1 font-bold">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
          เครือข่ายความโปร่งใส Premium Propoty: ปลอดภัย
        </span>
      </div>
    </div>
  );
}
