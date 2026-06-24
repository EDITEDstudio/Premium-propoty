import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  TrendingDown, 
  CheckCircle2, 
  Building2, 
  Compass, 
  Users, 
  Check, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  MessageSquare,
  Activity,
  Zap,
  CheckSquare,
  Info,
  Scale,
  Wrench,
  Droplet,
  FileSpreadsheet,
  Menu,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon
} from "lucide-react";

import HeroDashboard from "./components/HeroDashboard";
import PDCAInteractive from "./components/PDCAInteractive";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import ProposalCalculator from "./components/ProposalCalculator";
import ContactModal from "./components/ContactModal";
import ScrollReveal, { ScrollGrid } from "./components/ScrollReveal";
import PoolWaterMonitor from "./components/PoolWaterMonitor";
import PrimeCareBrandShowcase from "./components/PrimeCareBrandShowcase";
import { portfolioItems } from "./portfolioData";

// Dataset ของทีมผู้จัดการและผู้สอบบัญชีที่ได้รับตรารับรองคุณวุฒิวิชาชีพ (นิติ, ช่าง, รปภ, แม่บ้าน, คนสวน)
const teamMembers = [
  {
    name: "คุณวรวุฒิ ศิริเลิศโสภณ",
    role: "ผู้จัดการนิติบุคคลและตรวจสอบความโปร่งใส (Juristic Manager)",
    experience: "ประสบการณ์ 12+ ปี ด้านการบริหารจัดการโครงการคอนโดมีเนียมและพื้นที่อาคารชุดหรู",
    certification: "ใบรับรองการบริหารจัดการทรัพย์สินมาตรฐานสากล (IPMA) / คณะกรรมการผู้ตรวจประเมิน ISO 9500:2015",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
    bio: "วรวุฒิ ดูแลความคล่องและงบแสดงฐานะทางการเงินเชิงรุก ตรวจรายงานบัญชีแยกประเภทนิติเปิดเผยแบบสด 100% สู่ระบบคลาวด์ พร้อมประสานงาน SOP นโยบายความพึงพอใจของลูกบ้าน"
  },
  {
    name: "ช่างสมยศ เกียรติทวีชัย",
    role: "หัวหน้าฝ่ายเทคนิคและวิศวกรรมบำรุงรักษาเชิงรุก (Lead Maintenance Specialist)",
    experience: "ประสบการณ์ 15+ ปี ระบบไฟฟ้ากำลัง, เครื่องเย็น Chiller, และท่อประปาอุตสาหกรรม",
    certification: "ใบอนุญาตขับขี่วิชาชีพวิศวกรรมควบคุม (กว.) / ผู้ควบคุมระบบความปลอดภัยหม้อน้ำและแรงดันสูง",
    image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=400",
    bio: "สมยศ สแกนควบคุมเครื่องปั๊มน้ำ บำบัดสระว่ายน้ำ คาลิเบรตหม้อแปลงไฟฟ้าแรงดันสูง ตรวจสอบเช็คลิสต์ SOP รายชั่วโมง และเตรียมทีมวิศวกรฉุกเฉินออกกู้ภัยภายใน 1 ชั่วโมง"
  },
  {
    name: "ร้อยตำรวจตรี ประจักษ์ ใจกล้า",
    role: "ผู้อำนวยการฝ่ายรักษาความปลอดภัยและระงับเหตุอัคคีภัย (Director of Tactical Security)",
    experience: "ประสบการณ์ 18+ ปี ด้านการวางผังควบคุมความปลอดภัยค่ายทหารและพื้นที่โครงการขนาดใหญ่",
    certification: "ใบรับรองมาตรฐานรักษาความปลอดภัย พ.ร.บ. ธุรกิจรักษาความปลอดภัย / เจ้าหน้าที่ควบคุมเหตุวิกฤตระลอก 1",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    bio: "ประจักษ์ ดูแลวินัยระเบียบ CCTV 24 ชั่วโมง ฝึกซ้อมแผนรับมืออัคคีภัย และคัดกรองยานพาหนะเข้า-ออกอย่างอิงตามมาตรฐานความปลอดภัยระดับเวทีสากล"
  },
  {
    name: "คุณสมศรี บุญประกอบ",
    role: "หัวหน้างานสุขอนามัยและดูแลพื้นที่ส่วนกลาง (Executive Housekeeping Lead)",
    experience: "ประสบการณ์ 10+ ปี ดูแลสุขอนามัยรอบข้างโรงแรม 5 ดาวและพลาซ่าเกรดเอ",
    certification: "ใบรับรองผู้เชี่ยวชาญด้านเคมีสำล้างปลอดภัยสากล / มาตรฐานความสอดคล้อง EHS สุขลักษณะสิ่งแวดล้อม",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
    bio: "สมศรี ตรวจสอบตารางทำความสะอาดจุดเสี่ยงแฝงโรค กำหนดทฤษฎีสีแยกเครื่องมือทำความสะอาด และควบคุมมาตรฐานน้ำยาฆ่าเชื้อเกณฑ์เกรดโรงพยาบาล"
  },
  {
    name: "คุณเกรียงไกร ชูเกียรติ",
    role: "ผู้เชี่ยวชาญออกแบบและดูแลภูมิทัศน์ระบบนิเวศแนวตั้ง (Master Landscape Architect & Specialist)",
    experience: "ประสบการณ์ 11+ ปี ด้านศัลยกรรมต้นไม้ใหญ่และระบบนิเวศสวนหย่อมคอนโดไฮเอนด์",
    certification: "ใบประกอบวิชาชีพภูมิสถาปัตยกรรม / ประกาศนียบัตรศิลปะการตัดตกแต่งต้นไม้ใหญ่อาร์บอริสต์",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    bio: "เกรียงไกร ออกแบบระบบระบายน้ำผิวดิน รัฐประศาสตร์การตัดแต่งต้นไม้ใหญ่รับพายุ บำรุงระบบรดน้ำอัตโนมัติ IoT และคัดสรรพรรณไม้ฟอกอากาศเพื่อลูกบ้าน"
  }
];



export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState<number>(0);
  
  // Multipage state managers
  const [activeMenu, setActiveMenu] = useState<"home" | "about" | "services" | "portfolio">("home");
  const [activePortfolioType, setActivePortfolioType] = useState<"estate" | "condo" | "office">("estate");
  const [portfolioSearch, setPortfolioSearch] = useState("");
  const [portfolioPage, setPortfolioPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setPortfolioPage(1);
  }, [activePortfolioType, portfolioSearch]);

  const filteredPortfolioItems = portfolioItems[activePortfolioType].filter(item => {
    if (!portfolioSearch) return true;
    const kw = portfolioSearch.toLowerCase();
    return (
      item.title.toLowerCase().includes(kw) ||
      item.description.toLowerCase().includes(kw) ||
      item.tag.toLowerCase().includes(kw) ||
      item.detail.toLowerCase().includes(kw)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredPortfolioItems.length / itemsPerPage));
  const displayedPortfolioItems = filteredPortfolioItems.slice(
    (portfolioPage - 1) * itemsPerPage,
    portfolioPage * itemsPerPage
  );

  const [isNightMode, setIsNightMode] = useState<boolean>(true); // Set default to true (Cosmic Navy Dark Theme / Sapphire look) per user request
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // สถิติตัวเลขจำลอง rolling counts สำหรับบอร์ดผลลัพธ์
  const [countedCost, setCountedCost] = useState(15);
  const [countedSatisfaction, setCountedSatisfaction] = useState(85);
  const [countedComplaint, setCountedComplaint] = useState(40);
  const [countedSpeed, setCountedSpeed] = useState(25);

  useEffect(() => {
    const costInterval = setInterval(() => {
      setCountedCost(prev => (prev < 30 ? prev + 1 : 30));
    }, 45);
    const satisfactionInterval = setInterval(() => {
      setCountedSatisfaction(prev => (prev < 95 ? prev + 1 : 95));
    }, 25);
    const complaintInterval = setInterval(() => {
      setCountedComplaint(prev => (prev < 60 ? prev + 1 : 60));
    }, 35);
    const speedInterval = setInterval(() => {
      setCountedSpeed(prev => (prev < 40 ? prev + 1 : 40));
    }, 40);

    return () => {
      clearInterval(costInterval);
      clearInterval(satisfactionInterval);
      clearInterval(complaintInterval);
      clearInterval(speedInterval);
    };
  }, []);

  // Initialize Lenis smooth scroll for 120fps fluid scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Sync Lenis scroll with standard HTML attributes for styles
    const handleScroll = () => {
      document.documentElement.classList.add('lenis-scrolling');
    };
    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToMenu = (menu: "home" | "about" | "services" | "portfolio", subType?: "estate" | "condo" | "office") => {
    setActiveMenu(menu);
    if (subType) {
      setActivePortfolioType(subType);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 font-sans relative antialiased selection:bg-emerald-600 selection:text-white ${
      isNightMode || activeMenu === "about"
        ? "bg-[#010411]/25 text-slate-100"
        : "bg-slate-50/10 text-slate-800"
    }`}>
      
      {/* High-Performance GPU-Accelerated Fixed Background Wallpaper & Gradient Layer (Stutter Free) */}
      <div 
        className="fixed inset-0 w-full h-full -z-50 pointer-events-none transition-all duration-1000 ease-in-out"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
          WebkitTransform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden transition-colors duration-1000">
          {/* High-Fidelity Vector-Engine Reproduction of the User's Uploaded Brand Background */}
          <svg 
            className="w-full h-full" 
            viewBox="0 0 1440 900" 
            preserveAspectRatio="xMidYMid slice" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Dynamic Sky Background Gradient */}
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isNightMode || activeMenu === "about" ? "#020718" : "#e0f2fe"} />
                <stop offset="35%" stopColor={isNightMode || activeMenu === "about" ? "#030d22" : "#f8fafc"} />
                <stop offset="65%" stopColor={isNightMode || activeMenu === "about" ? "#020617" : "#ffffff"} />
                <stop offset="100%" stopColor={isNightMode || activeMenu === "about" ? "#010411" : "#ffffff"} />
              </linearGradient>

              {/* Dotted window matrix pattern for skyscrapers */}
              <pattern id="cityGrid" width="10" height="15" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1.3" fill={isNightMode || activeMenu === "about" ? "#22d3ee" : "#2563eb"} fillOpacity={isNightMode ? "0.22" : "0.25"} />
                <circle cx="5" cy="11" r="1.3" fill={isNightMode || activeMenu === "about" ? "#22d3ee" : "#2563eb"} fillOpacity={isNightMode ? "0.22" : "0.25"} />
              </pattern>

              {/* Vertical line pattern representing skyscraper ribs */}
              <pattern id="ribbedLines" width="8" height="10" patternUnits="userSpaceOnUse">
                <line x1="4" y1="0" x2="4" y2="10" stroke={isNightMode || activeMenu === "about" ? "#0ea5e9" : "#3b82f6"} strokeOpacity={isNightMode ? "0.25" : "0.3"} strokeWidth="1" />
              </pattern>

              {/* Colorful linear gradients for waves according to user's uploaded banner colors */}
              <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isNightMode || activeMenu === "about" ? "#02081e" : "#0f172a"} stopOpacity="0.95" />
                <stop offset="55%" stopColor={isNightMode || activeMenu === "about" ? "#0c4a6e" : "#1e40af"} stopOpacity="0.95" />
                <stop offset="100%" stopColor={isNightMode || activeMenu === "about" ? "#0ea5e9" : "#2563eb"} stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isNightMode || activeMenu === "about" ? "#003b5c" : "#1d4ed8"} stopOpacity="0.85" />
                <stop offset="60%" stopColor={isNightMode || activeMenu === "about" ? "#0ea5e9" : "#3b82f6"} stopOpacity="0.85" />
                <stop offset="100%" stopColor={isNightMode || activeMenu === "about" ? "#22d3ee" : "#60a5fa"} stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="wave3" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isNightMode || activeMenu === "about" ? "#09335a" : "#60a5fa"} stopOpacity="0.7" />
                <stop offset="50%" stopColor={isNightMode || activeMenu === "about" ? "#0ea5e9" : "#93c5fd"} stopOpacity="0.75" />
                <stop offset="100%" stopColor={isNightMode || activeMenu === "about" ? "#22d3ee" : "#e0f2fe"} stopOpacity="0.85" />
              </linearGradient>
            </defs>

            {/* Render absolute canvas background */}
            <rect width="1440" height="900" fill="url(#skyGrad)" />

            {/* Background Sky sweeping lines (Top Left to Mid Right) mimicking the subtle sky texture */}
            <path d="M0,80 Q350,150 700,50 T1440,110" stroke={isNightMode || activeMenu === "about" ? "rgba(56,189,248,0.12)" : "rgba(37,99,235,0.18)"} strokeWidth="3" fill="none" />
            <path d="M0,120 Q400,200 800,80 T1440,160" stroke={isNightMode || activeMenu === "about" ? "rgba(56,189,248,0.08)" : "rgba(56,189,248,0.22)"} strokeWidth="2" fill="none" />

            {/* SKYLINE GROUP: Multi-layered responsive tech architecture layout from user's image */}
            <g id="skyscrapers" opacity={isNightMode ? "0.68" : "0.78"}>
              {/* Backing Silhouette Row (Soft light tone) */}
              <rect x="50" y="320" width="75" height="430" fill={isNightMode ? "#0f172a" : "#bae6fd"} fillOpacity="0.3" />
              <rect x="180" y="410" width="60" height="340" fill={isNightMode ? "#0f172a" : "#bae6fd"} fillOpacity="0.3" />
              <rect x="300" y="370" width="85" height="380" fill={isNightMode ? "#0f172a" : "#bae6fd"} fillOpacity="0.4" />
              <rect x="440" y="290" width="90" height="460" fill={isNightMode ? "#0f172a" : "#93c5fd"} fillOpacity="0.3" />
              <rect x="690" y="330" width="70" height="420" fill={isNightMode ? "#0f172a" : "#bae6fd"} fillOpacity="0.3" />
              <rect x="800" y="280" width="100" height="470" fill={isNightMode ? "#0f172a" : "#93c5fd"} fillOpacity="0.35" />
              <rect x="960" y="350" width="80" height="400" fill={isNightMode ? "#0f172a" : "#bae6fd"} fillOpacity="0.3" />
              <rect x="1090" y="310" width="70" height="440" fill={isNightMode ? "#0f172a" : "#bae6fd"} fillOpacity="0.3" />
              <rect x="1230" y="390" width="90" height="360" fill={isNightMode ? "#0f172a" : "#bae6fd"} fillOpacity="0.3" />

              {/* Middle Grid Row: Decorative matrix-styled tech buildings */}
              <rect x="90" y="400" width="65" height="350" fill="url(#cityGrid)" />
              <rect x="220" y="460" width="55" height="290" fill="url(#ribbedLines)" />
              <rect x="350" y="420" width="70" height="330" fill="url(#cityGrid)" />
              
              {/* Grand Central Tower (Custom round-ended cylinder design - centerpiece of corporate skyline!) */}
              <path 
                d="M550,750 L550,420 A55,55 0 0,1 660,420 L660,750 Z" 
                fill={isNightMode ? "#07122a" : "#f0f9ff"} 
                stroke={isNightMode ? "#1e293b" : "#cbd5e1"} 
                strokeWidth="1.5"
              />
              <path 
                d="M550,750 L550,420 A55,55 0 0,1 660,420 L660,750 Z" 
                fill="url(#cityGrid)" 
              />
              {/* Central antenna / spike */}
              <line x1="605" y1="365" x2="605" y2="300" stroke={isNightMode ? "#22d3ee" : "#2563eb"} strokeWidth="2.5" opacity="0.9" />
              <circle cx="605" cy="300" r="3.5" fill={isNightMode ? "#22d3ee" : "#2563eb"} />

              {/* Right Grid buildings */}
              <rect x="710" y="390" width="74" height="360" fill="url(#cityGrid)" />
              <rect x="830" y="430" width="60" height="320" fill="url(#ribbedLines)" />
              <rect x="910" y="370" width="80" height="380" fill="url(#cityGrid)" />
              <rect x="1020" y="440" width="55" height="310" fill="url(#ribbedLines)" />
              <rect x="1140" y="410" width="70" height="340" fill="url(#cityGrid)" />
            </g>

            {/* BOTTOM FLOWING CURVED WAVES: The iconic blue ribbons that cradle the corporate view */}
            {/* Wave Layer 3 (Deep base wave) */}
            <path 
              d="M0,660 C300,720 600,600 900,730 C1200,860 1350,810 1440,750 L1440,900 L0,900 Z" 
              fill="url(#wave3)" 
            />

            {/* Wave Layer 2 (Middle translucent sky wave) */}
            <path 
              d="M0,710 C400,650 750,780 1100,680 C1300,630 1400,670 1440,700 L1440,900 L0,900 Z" 
              fill="url(#wave2)" 
            />

            {/* Wave Layer 1 (Vibrant foreground primary brand wave) */}
            <path 
              d="M0,770 C450,710 650,840 1050,750 C1250,710 1380,780 1440,820 L1440,900 L0,900 Z" 
              fill="url(#wave1)" 
            />
          </svg>

          {/* Double-layered elite gradient mask to ensure superb content contrast and absolute readability */}
          <div className={`absolute inset-0 transition-colors duration-1000 ${
            isNightMode || activeMenu === "about"
              ? "bg-gradient-to-t from-[#020512]/90 via-[#030d24]/65 to-[#020512]/95"
              : "bg-gradient-to-t from-slate-100/20 via-white/45 to-white/65"
          }`} />

          {/* Subtle light accent overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.1),transparent_50%)] pointer-events-none" />
          
          {/* Cosmic Blue Circular Gradients for extra depth */}
          <div 
            className="absolute bottom-[-20%] right-[-20%] w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] rounded-full bg-blue-600/12 blur-[140px] pointer-events-none mix-blend-screen transition-all duration-1000"
            style={{ 
              opacity: isNightMode ? 1 : 0,
              transform: `translate3d(0, 0, 0)`
            }}
          />
        </div>
      </div>
      
      {/* ส่วนหัวสำหรับแถบเมนูคุมความสอดคล้องระบบ (Header Floating Navigation) */}
      <header className={`sticky top-0 z-40 backdrop-blur-lg transition-all duration-300 shadow-sm border-b relative ${
        isNightMode || activeMenu === "about"
          ? "bg-[#010309]/85 border-white/5 text-white" 
          : "bg-white/80 border-slate-200/50 text-slate-800"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4.5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateToMenu("home")}>
            <svg viewBox="0 0 100 115" className="w-9 h-10" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Outer Hexagon */}
              <path d="M50 4L93.3 29V79L50 104L6.7 79V29L50 4Z" stroke={isNightMode || activeMenu === "about" ? "#38bdf8" : "#0F2B46"} strokeWidth="8" strokeLinejoin="round" />
              {/* Monolith Buildings inside */}
              <path d="M30 75 V48 L38 43 V75 Z" fill={isNightMode || activeMenu === "about" ? "#38bdf8" : "#0F2B46"} />
              <path d="M44 75 V32 L54 26 V75 Z" fill={isNightMode || activeMenu === "about" ? "#e2e8f0" : "#0F2B46"} />
              <path d="M60 75 V43 L68 38 V75 Z" fill={isNightMode || activeMenu === "about" ? "#38bdf8" : "#0F2B46"} />
            </svg>
            <div className="flex flex-col text-left">
              <span className={`text-lg font-black tracking-tight leading-none uppercase font-display ${isNightMode || activeMenu === "about" ? "text-white" : "text-[#0F2B46]"}`}>PREMIUM<span className="text-[#D4A017]">PROPOTY</span></span>
              <span className={`text-[7.5px] font-bold tracking-[0.16em] leading-tight font-display uppercase ${isNightMode || activeMenu === "about" ? "text-slate-400" : "text-slate-500"}`}>Property & Trading Systems</span>
            </div>
          </div>
          
          <nav className={`hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider ${isNightMode || activeMenu === "about" ? "text-slate-300" : "text-slate-600"}`}>
            <button 
              onClick={() => navigateToMenu("home")} 
              className={`hover:text-[#D4A017] font-sans cursor-pointer transition-colors py-1 border-b-2 ${
                activeMenu === "home" ? "text-[#D4A017] border-[#D4A017]" : "border-transparent"
              }`}
            >
              หน้าแรก
            </button>
            <button 
              onClick={() => navigateToMenu("about")} 
              className={`hover:text-[#D4A017] font-sans cursor-pointer transition-colors py-1 border-b-2 ${
                activeMenu === "about" ? "text-[#D4A017] border-[#D4A017]" : "border-transparent"
              }`}
            >
              เกี่ยวกับเรา
            </button>
            <button 
              onClick={() => navigateToMenu("services")} 
              className={`hover:text-[#D4A017] font-sans cursor-pointer transition-colors py-1 border-b-2 ${
                activeMenu === "services" ? "text-[#D4A017] border-[#D4A017]" : "border-transparent"
              }`}
            >
              ขอบเขตบริการ
            </button>
            <div className="relative group">
              <button 
                onClick={() => navigateToMenu("portfolio", "estate")} 
                className={`flex items-center gap-1 hover:text-[#D4A017] font-sans cursor-pointer transition-colors py-1 border-b-2 ${
                  activeMenu === "portfolio" ? "text-[#D4A017] border-[#D4A017]" : "border-transparent"
                }`}
              >
                <span>ผลงานสะสม</span>
                <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute left-0 mt-1 w-48 rounded-md shadow-lg py-1 border transition-all pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto z-50 ${
                isNightMode 
                  ? "bg-[#09142A]/95 text-slate-200 border-blue-900" 
                  : "bg-white text-slate-800 border-slate-200"
              }`}>
                <button 
                  onClick={() => navigateToMenu("portfolio", "estate")} 
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-emerald-600/10 hover:text-[#D4A017] transition-all flex items-center justify-between ${
                    activeMenu === "portfolio" && activePortfolioType === "estate" ? "text-[#D4A017]" : ""
                  }`}
                >
                  <span>หมู่บ้านโครงการ</span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-1 rounded">หมู่บ้าน</span>
                </button>
                <button 
                  onClick={() => navigateToMenu("portfolio", "condo")} 
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-emerald-600/10 hover:text-[#D4A017] transition-all flex items-center justify-between ${
                    activeMenu === "portfolio" && activePortfolioType === "condo" ? "text-[#D4A017]" : ""
                  }`}
                >
                  <span>คอนโดมิเนียม</span>
                  <span className="text-[10px] font-mono bg-blue-500/20 text-blue-400 px-1 rounded font-normal">อาคารชุด</span>
                </button>
                <button 
                  onClick={() => navigateToMenu("portfolio", "office")} 
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-emerald-600/10 hover:text-[#D4A017] transition-all flex items-center justify-between ${
                    activeMenu === "portfolio" && activePortfolioType === "office" ? "text-[#D4A017]" : ""
                  }`}
                >
                  <span>อาคารสำนักงาน</span>
                  <span className="text-[10px] font-mono bg-[#D4A017]/20 text-[#D4A017] px-1 rounded">เชิงพาณิชย์</span>
                </button>
              </div>
            </div>
          </nav>
 
          <div className="flex items-center gap-3">
            <button
              id="header-btn-consultation"
              onClick={() => setIsContactOpen(true)}
              className="hidden sm:flex bg-[#16A34A] hover:bg-emerald-700 text-white text-xs font-sans font-bold py-3 px-5 rounded-md tracking-wider transition-all items-center gap-1.5 uppercase shadow-sm cursor-pointer"
            >
              <span>ปรึกษาผู้ตรวจบัญชีระบบ</span>
              <ArrowRight className="w-3.5 h-3.5 text-white animate-pulse" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md transition-colors hover:bg-slate-200/20 text-current flex items-center justify-center cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#D4A017]" />
              ) : (
                <Menu className="w-6 h-6 text-current" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation side drawer / overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`lg:hidden fixed top-[73px] left-0 right-0 z-50 border-b shadow-2xl backdrop-blur-xl ${
              isNightMode || activeMenu === "about"
                ? "bg-[#09142A]/95 text-slate-100 border-blue-900/50" 
                : "bg-white/95 text-slate-800 border-slate-200"
            }`}
          >
            <div className="px-4 py-6 space-y-4 text-sm font-bold uppercase tracking-wider flex flex-col">
              <button 
                onClick={() => {
                  navigateToMenu("home");
                  setIsMobileMenuOpen(false);
                }} 
                className={`text-left py-2 px-3 rounded-lg transition-colors hover:bg-emerald-600/10 hover:text-[#D4A017] ${
                  activeMenu === "home" ? "bg-emerald-600/10 text-[#D4A017]" : ""
                }`}
              >
                หน้าแรก
              </button>
              <button 
                onClick={() => {
                  navigateToMenu("about");
                  setIsMobileMenuOpen(false);
                }} 
                className={`text-left py-2 px-3 rounded-lg transition-colors hover:bg-emerald-600/10 hover:text-[#D4A017] ${
                  activeMenu === "about" ? "bg-emerald-600/10 text-[#D4A017]" : ""
                }`}
              >
                เกี่ยวกับเรา
              </button>
              <button 
                onClick={() => {
                  navigateToMenu("services");
                  setIsMobileMenuOpen(false);
                }} 
                className={`text-left py-2 px-3 rounded-lg transition-colors hover:bg-emerald-600/10 hover:text-[#D4A017] ${
                  activeMenu === "services" ? "bg-emerald-600/10 text-[#D4A017]" : ""
                }`}
              >
                ขอบเขตบริการ
              </button>
              
              <div className="border-t border-slate-200/20 my-2 pt-2">
                <span className="text-[10px] text-slate-400 px-3 tracking-widest block mb-1">ผลงานสะสม</span>
                <button 
                  onClick={() => {
                    navigateToMenu("portfolio", "estate");
                    setIsMobileMenuOpen(false);
                  }} 
                  className={`w-full text-left py-2 px-3 rounded-lg transition-colors hover:bg-emerald-600/10 hover:text-[#D4A017] flex items-center justify-between ${
                    activeMenu === "portfolio" && activePortfolioType === "estate" ? "bg-emerald-600/10 text-[#D4A017]" : ""
                  }`}
                >
                  <span>หมู่บ้านโครงการ</span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-1.5 rounded">หมู่บ้าน</span>
                </button>
                <button 
                  onClick={() => {
                    navigateToMenu("portfolio", "condo");
                    setIsMobileMenuOpen(false);
                  }} 
                  className={`w-full text-left py-2 px-3 rounded-lg transition-colors hover:bg-emerald-600/10 hover:text-[#D4A017] flex items-center justify-between ${
                    activeMenu === "portfolio" && activePortfolioType === "condo" ? "bg-emerald-600/10 text-[#D4A017]" : ""
                  }`}
                >
                  <span>คอนโดมิเนียม</span>
                  <span className="text-[10px] font-mono bg-blue-500/20 text-blue-400 px-1.5 rounded">อาคารชุด</span>
                </button>
                <button 
                  onClick={() => {
                    navigateToMenu("portfolio", "office");
                    setIsMobileMenuOpen(false);
                  }} 
                  className={`w-full text-left py-2 px-3 rounded-lg transition-colors hover:bg-emerald-600/10 hover:text-[#D4A017] flex items-center justify-between ${
                    activeMenu === "portfolio" && activePortfolioType === "office" ? "bg-emerald-600/10 text-[#D4A017]" : ""
                  }`}
                >
                  <span>อาคารสำนักงาน</span>
                  <span className="text-[10px] font-mono bg-[#D4A017]/20 text-[#D4A017] px-1.5 rounded">เชิงพาณิชย์</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setIsContactOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="bg-[#16A34A] hover:bg-emerald-700 text-white text-xs font-sans font-bold py-3 px-5 rounded-md tracking-wider transition-all flex items-center justify-center gap-1.5 uppercase shadow-sm cursor-pointer"
              >
                <span>ปรึกษาผู้ตรวจบัญชีระบบ</span>
                <ArrowRight className="w-3.5 h-3.5 text-white animate-pulse" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {activeMenu === "home" && (
        <>
          {/* ส่วนที่ 1: แนะนำจุดแข็งเบื้องต้นของระบบรายงานบริหารจัดการ (Hero Area) */}
          <section id="home" className="relative overflow-hidden py-12 lg:py-16 transition-all duration-300 text-white">
            {/* Background image for hero area */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src="/herosection.jpg" 
                alt="Hero Background" 
                className="w-full h-full object-cover transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 transition-colors duration-500 ${
                isNightMode 
                  ? "bg-[#010309]/20 backdrop-blur-[0.5px]" 
                  : "bg-slate-950/20 backdrop-blur-[0.5px]"
              }`}></div>
            </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 text-left">
            <ScrollReveal direction="left" duration={0.8}>
              <div className="p-6 sm:p-8 rounded-2xl backdrop-blur-xl bg-slate-950/85 border border-white/10 shadow-2xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-widest font-sans">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  ตรารับรองระบบคุณภาพระดับสากล ISO 9001:2015
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black text-white leading-[1.3] tracking-tight font-display">
                  ยกระดับการจัดการนิติบุคคล <br/><span className="text-[#D4A017]">อย่างเป็นเลิศและชัดเจน</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl font-sans font-medium">
                  ยั่งยืนกับการเพิ่มมูลค่าอสังหาริมทรัพย์ด้วย<span className="text-[#38bdf8] font-semibold">ทีมงานมืออาชีพ</span>และ<span className="text-[#38bdf8] font-semibold">เทคโนโลยีล้ำสมัย</span>เพื่อป้องกันความสิ้นเปลืองงบประมาณจาก <span className="text-red-400 font-semibold">ปัญหาน้ำรั่วซึม (ค่าน้ำบวม) ประจุระบบไฟรั่วไหล</span> และจัดทำ <span className="text-emerald-400 font-semibold">แผนตรวจซ่อมบำรุงเชิงรุก</span> สำหรับคอนโดมิเนียม หมู่บ้าน และอาคารชุดพาณิชย์
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    id="hero-btn-request-consultation"
                    onClick={() => setIsContactOpen(true)}
                    className="bg-[#16A34A] hover:bg-emerald-700 text-white font-sans font-bold text-xs py-4 px-8 rounded-md tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>ลงทะเบียนรับการทดลองสำรวจและวิเคราะห์ฟรี</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>

                  <button
                    id="hero-btn-explore-services"
                    onClick={() => scrollToSection("process")}
                    className="border-2 border-white hover:bg-white/10 text-white font-sans font-bold text-xs py-4 px-8 rounded-md tracking-wider uppercase transition-all cursor-pointer"
                  >
                    <span>ขั้นตอนและมาตรฐานการบริการ</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-blue-900/40">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
                    <svg className="w-5 h-5 text-[#D4A017]" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                    รายงานบัญชีโปร่งใส 100%
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
                    <svg className="w-5 h-5 text-[#D4A017]" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                    บริหารอนุรักษ์พลังงานเชิงวิศวกรรม
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
                    <svg className="w-5 h-5 text-[#D4A017]" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                    ทีมวิศวกรและผู้ชำนาญการเฉพาะทาง
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
                    <svg className="w-5 h-5 text-[#D4A017]" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>
                    ควบคุมมาตรฐานคุณภาพตลอดเวลา
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6 relative">
            <ScrollReveal direction="right" duration={0.8} delay={0.15}>
              <HeroDashboard isNightMode={isNightMode} />
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ส่วนสถิติผลงานเด่น (Premium Achievements & Track Records) */}
      <section className="py-10 -mt-6 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" duration={0.6}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* KPI 1 - รางวัล */}
            <div className={`p-6 sm:p-8 rounded-2xl border text-center relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group backdrop-blur-md ${
              isNightMode 
                ? "bg-slate-900/40 border-white/10 shadow-black/30 text-white" 
                : "bg-white/50 border-white/60 shadow-xl shadow-slate-200/30 text-slate-800"
            }`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4A017]/5 rounded-full -mr-6 -mt-6 transition-all group-hover:scale-110"></div>
              <div className="mx-auto w-14 h-14 bg-[#D4A017]/10 flex items-center justify-center rounded-xl mb-4 group-hover:scale-105 transition-transform font-sans">
                <Award className="w-8 h-8 text-[#D4A017]" />
              </div>
              <div className="text-4xl sm:text-5xl font-black text-[#D4A017] tracking-tight mb-2 font-display">
                1
              </div>
              <h4 className={`font-bold text-sm font-sans tracking-tight ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>รางวัลแห่งความสำเร็จเด่น</h4>
              <p className={`text-[11px] leading-relaxed mt-1 font-sans ${isNightMode ? "text-slate-400" : "text-slate-500"}`}>
                ผ่านเกณฑ์ประเมินและได้รับการรับรองมาตรฐานระบบบริการสากล ISO 9001:2015 ในงานบริหารจัดการระดับพรีเมียม
              </p>
            </div>

            {/* KPI 2 - ประสบการณ์ */}
            <div className={`p-6 sm:p-8 rounded-2xl border text-center relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group backdrop-blur-md ${
              isNightMode 
                ? "bg-slate-900/40 border-white/10 shadow-black/30 text-white" 
                : "bg-white/50 border-white/60 shadow-xl shadow-slate-200/30 text-slate-800"
            }`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-6 -mt-6 transition-all group-hover:scale-110"></div>
              <div className="mx-auto w-14 h-14 bg-emerald-500/10 flex items-center justify-center rounded-xl mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="text-4xl sm:text-5xl font-black text-emerald-500 tracking-tight mb-2 font-display">
                15+ ปี
              </div>
              <h4 className={`font-bold text-sm font-sans tracking-tight ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>ประสบการณ์วิชาชีพสะสม</h4>
              <p className={`text-[11px] leading-relaxed mt-1 font-sans ${isNightMode ? "text-slate-400" : "text-slate-500"}`}>
                ด้วยระบบบริหารจัดการ โดยผู้จัดการวิชาชีพและวิศวกรเฉพาะทาง มีตารางสอดส่องและประสานงานตลอดทุกขั้นตอน
              </p>
            </div>

            {/* KPI 3 - โครงการ */}
            <div className={`p-6 sm:p-8 rounded-2xl border text-center relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group backdrop-blur-md ${
              isNightMode 
                ? "bg-slate-900/40 border-white/10 shadow-black/30 text-white" 
                : "bg-white/50 border-white/60 shadow-xl shadow-slate-200/30 text-slate-800"
            }`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-6 -mt-6 transition-all group-hover:scale-110"></div>
              <div className="mx-auto w-14 h-14 bg-blue-500/10 flex items-center justify-center rounded-xl mb-4 group-hover:scale-105 transition-transform font-sans">
                <Building2 className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-4xl sm:text-5xl font-black text-blue-500 tracking-tight mb-2 font-display">
                90+
              </div>
              <h4 className={`font-bold text-sm font-sans tracking-tight ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>โครงการที่ไว้วางใจ</h4>
              <p className={`text-[11px] leading-relaxed mt-1 font-sans ${isNightMode ? "text-slate-400" : "text-slate-500"}`}>
                ครอบคลุมการควบคุมโครงการหมู่บ้านหรูหรา คอนโดมิเนียมตึกสูง และอาคารพลาซ่าสาขาธุรกิจแวดล้อมทั่วไทย
              </p>
            </div>

            {/* KPI 4 - ไร่ */}
            <div className={`p-6 sm:p-8 rounded-2xl border text-center relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group backdrop-blur-md ${
              isNightMode 
                ? "bg-slate-900/40 border-white/10 shadow-black/30 text-white" 
                : "bg-white/50 border-white/60 shadow-xl shadow-slate-200/30 text-slate-800"
            }`}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4A017]/5 rounded-full -mr-6 -mt-6 transition-all group-hover:scale-110"></div>
              <div className="mx-auto w-14 h-14 bg-[#D4A017]/10 flex items-center justify-center rounded-xl mb-4 group-hover:scale-105 transition-transform">
                <Compass className="w-8 h-8 text-[#D4A017]" />
              </div>
              <div className="text-4xl sm:text-5xl font-black text-[#D4A017] tracking-tight mb-2 font-display">
                1,000+ ไร่
              </div>
              <h4 className={`font-bold text-sm font-sans tracking-tight ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>พื้นที่ดูแลระบบรวมสะสม</h4>
              <p className={`text-[11px] leading-relaxed mt-1 font-sans ${isNightMode ? "text-slate-400" : "text-slate-500"}`}>
                ใส่ใจในส่วนของประสิทธิภาพ และความสะอาดครอบคลุมผืนแผ่นดินใหญ่ ไซต์ขนาดยักษ์ ทุกพื้นที่ตารางนิ้ว
              </p>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* ส่วนที่ 2: อธิบายรายละเอียดจุดเด่นทำไมความน่าเชื่อถือสูง (Why Choose Us) */}
      <section id="why-us" className="py-12 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal direction="up" duration={0.6}>
          <div className="max-w-3xl mx-auto space-y-4 mb-8">
            <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest font-mono">คุณค่าและดุลการทำงานที่ยั่งยืน</span>
            <h2 className={`text-3xl sm:text-4xl font-black font-display tracking-tight leading-normal ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
              ทำไมโครงการระดับพรีเมียมมากกว่า 90 แห่งถึงไว้วางใจเรา
            </h2>
            <div className="w-16 h-0.5 bg-[#D4A017] mx-auto rounded"></div>
            <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
              ยกระดับคุณภาพอสังหาริมทรัพย์ด้วยทีมงานสัญญาวิชาชีพ อาวุธเทคโนโลยีตรวจจับความผิดปกติ และระเบียบวินัยบัญชีโปร่งใสคู่วงจรควบคุมมาตรฐานสากล
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: ความโปร่งใสขั้นสูงสุด */}
          <ScrollReveal direction="up" duration={0.6} delay={0.1}>
            <div className={`p-8 rounded-2xl border text-left space-y-4 h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 backdrop-blur-md ${
              isNightMode ? "bg-[#09152B]/40 border-white/10 text-white" : "bg-white/50 border-white/60 shadow-xl shadow-slate-200/30 text-slate-800"
            }`}>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className={`font-extrabold text-lg ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>บัญชีโปร่งใส คลาวด์สด 100%</h3>
              <p className={`text-xs leading-relaxed font-sans ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                สืบสมดุลความโปร่งใสทางบัญชีอย่างเด็ดขาด ผ่านระเบียบเช็คสลิปและใบแจ้งซ่อมสดบนคลาวด์ ปลอดภัย ปราศจากการเรียกเก็บส่วนต่างพิลึกหรือค่านายหน้าช่างนิติบุคคล
              </p>
              <div className="pt-2 text-xs font-semibold text-[#D4A017] group-hover:underline flex items-center gap-1 font-mono">
                <span>ISO 9001 Clause 9.2 Audits &rarr;</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: วิศวกรรมเชิงรุก */}
          <ScrollReveal direction="up" duration={0.6} delay={0.2}>
            <div className={`p-8 rounded-2xl border text-left space-y-4 h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 backdrop-blur-md ${
              isNightMode ? "bg-[#09152B]/40 border-white/10 text-white" : "bg-white/50 border-white/60 shadow-xl shadow-slate-200/30 text-slate-800"
            }`}>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className={`font-extrabold text-lg ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>วิศวกรรมอาคารและการลดพลังงาน</h3>
              <p className={`text-xs leading-relaxed font-sans ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                ตรวจสอบสแกนระบบปั๊มน้ำ ชิลเลอร์ (Chiller) สปริงเกอร์ดับเพลิง และระบบไฟฟ้ารอบโครงการแบบแผนเชิงรุก เพื่อกำจัดจุดรั่วไหลและตัดงบ OpEx อาคารอย่างมีประสิทธิภาพ
              </p>
              <div className="pt-2 text-xs font-semibold text-[#D4A017] group-hover:underline flex items-center gap-1 font-mono">
                <span>ISO 9001 Clause 8.5 Operations &rarr;</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: สิทธิรับประกันเฉลียบไว */}
          <ScrollReveal direction="up" duration={0.6} delay={0.3}>
            <div className={`p-8 rounded-2xl border text-left space-y-4 h-full relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 backdrop-blur-md ${
              isNightMode ? "bg-[#09152B]/40 border-white/10 text-white" : "bg-white/50 border-white/60 shadow-xl shadow-slate-200/30 text-slate-800"
            }`}>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className={`font-extrabold text-lg ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>สัญญา SLA การันตีความรวดเร็ว</h3>
              <p className={`text-xs leading-relaxed font-sans ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                หมดกังวลเรื่องการละเลยใบแจ้งงานซ่อมด่วน มีทีมวิศวกรเคลื่อนไหวฉุกเฉินระดับมือปฏิบัติการ ตอบสนองความเสียหายลิฟต์ ข้อมูลมิเตอร์ หรือท่อน้ำแตกร้าวใน 1 ชั่วโมง
              </p>
              <div className="pt-2 text-xs font-semibold text-[#D4A017] group-hover:underline flex items-center gap-1 font-mono">
                <span>ISO 9001 Clause 7.2 Competency &rarr;</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ส่วนที่ 3: บริการจำแนกตามโครงสร้าง bento (Services Division) */}
      <section id="services-bento" className="py-12 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" duration={0.6}>
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
            <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest font-mono">สามสายขอบข่ายการจัดการพรีเมียม</span>
            <h2 className={`text-3xl sm:text-4xl font-black font-display tracking-tight leading-normal ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
              ขีดความสามารถการดูแลจำแนกตามประเภททรัพย์สิน
            </h2>
            <div className="w-16 h-0.5 bg-[#D4A017] mx-auto rounded"></div>
            <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
              เราส่งมอบวินัยการปฏิบัติงานผ่านทีมบริหารตามคู่มือ SOP เกรดวิศวกรวิชาชีพเพื่อรักษาผลประโยชน์คณะกรรมการและเจ้าของร่วมอย่างเด็ดขาด
            </p>
          </div>
        </ScrollReveal>

        <ScrollGrid className="grid grid-cols-1 lg:grid-cols-12 gap-8" direction="up" staggerDelay={0.15}>
          
          {/* Bento Card 1: บริหารจัดการหมู่บ้านหรู */}
          <div className={`lg:col-span-4 border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between backdrop-blur-md ${
            isNightMode ? "bg-[#09152B]/40 border-white/10 text-slate-100" : "bg-white/50 border-white/60 shadow-xl shadow-slate-200/30 text-slate-800"
          }`}>
            <div>
              <div className="h-52 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" 
                  alt="แกรนด์บูเลอวาร์ด" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 text-left space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold text-[#D4A017] uppercase tracking-widest bg-[#D4A017]/10 px-2 py-0.5 rounded">HOUSING ESTATE</span>
                  <h3 className={`font-extrabold text-lg tracking-tight group-hover:text-[#D4A017] transition-colors ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
                    บริหารจัดการหมู่บ้านจัดสรรหรู
                  </h3>
                  <p className="text-xs text-slate-400 font-medium font-mono">การจัดระเบียบชุมชนและเทคนิคส่วนกลางเชิงลึก</p>
                </div>
                
                <p className={`text-xs leading-relaxed font-sans ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                  คุมเข้มระเบียบสกรีนการเข้าผ่านของบุคคลภายนอก ตรวจตราและบำรุงปั๊มสูบน้ำส่วนกลาง และปรับลดงบผู้รับเหมาจัดสวนแบบสัมบูรณ์
                </p>

                <div className="pt-2">
                  <div className="w-full h-px bg-slate-100 dark:bg-slate-800 mb-4"></div>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className={isNightMode ? "text-slate-300" : "text-slate-600"}>ควบคุมระบบความปลอดภัยและรถผู้มาติดต่อเข้มข้น</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className={isNightMode ? "text-slate-300" : "text-slate-600"}>บริหารเจรจาผู้รับเหมาสวนหย่อมประหยัดงบได้จริง 15%</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className={isNightMode ? "text-slate-300" : "text-slate-600"}>ทดสอบระบบวาล์วน้ำป้องประปารั่วซึมใต้ท่อเมนหมู่บ้าน</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-6 pt-0 text-left">
              <div className={`rounded-lg p-3 border flex items-center justify-between text-xs mt-2 backdrop-blur-sm ${
                isNightMode ? "bg-black/40 border-white/5 text-slate-300" : "bg-white/60 border-white/40 text-slate-807"
              }`}>
                <span className="font-sans font-medium">ความปลอดภัยระดับชุมชน:</span>
                <span className="font-mono font-bold text-emerald-500">100% บูรณาการ</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: บริหารนิติคอนโดมิเนียม */}
          <div className={`lg:col-span-4 border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between backdrop-blur-md ${
            isNightMode ? "bg-[#09152B]/40 border-white/10 text-slate-100" : "bg-white/50 border-white/60 shadow-xl shadow-slate-200/30 text-slate-800"
          }`}>
            <div>
              <div className="h-52 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800" 
                  alt="แกรนด์ฮอไรซัน" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 text-left space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold text-[#D4A017] uppercase tracking-widest bg-[#D4A017]/10 px-2 py-0.5 rounded">LUXURY CONDO</span>
                  <h3 className={`font-extrabold text-lg tracking-tight group-hover:text-[#D4A017] transition-colors ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
                    บริหารคอมมูนิตี้ คอนโดมิเนียมสูง
                  </h3>
                  <p className="text-xs text-slate-400 font-medium font-mono">วิศวกรรมสระส่วนกลาง ลิฟต์ และรายงานบัญชีตรวจสอบได้</p>
                </div>
                
                <p className={`text-xs leading-relaxed font-sans ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                  ดูแลรักษาปั๊มหมุนชิลเลอร์ ควบคุมค่าสารเคมี บำบัดประหยัดตารางแอร์ลิฟต์ส่วนกลาง ตรา ISO ตรวจสอบสด และจัดประชุมอย่างสร้างสรรค์โปร่งใส
                </p>

                <div className="pt-2">
                  <div className="w-full h-px bg-slate-100 dark:bg-slate-800 mb-4"></div>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className={isNightMode ? "text-slate-300" : "text-slate-600"}>บำรุงวิศวกรรมลิฟต์โดยสารและระบบ Chiller ตึกสูง</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className={isNightMode ? "text-slate-300" : "text-slate-600"}>ระบบตรวจสอบ IoT ดิจิทัลตรวจสอบค่าน้ำสระว่ายน้ำส่วนกลาง</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className={isNightMode ? "text-slate-300" : "text-slate-600"}>จัดทำรายงานงบการเงินและบัญชีรายเดือนสองฝ่ายชัดเจน</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-6 pt-0 text-left">
              <div className={`rounded-lg p-3 border flex items-center justify-between text-xs mt-2 backdrop-blur-sm ${
                isNightMode ? "bg-black/40 border-white/5 text-slate-300" : "bg-white/60 border-white/40 text-slate-808"
              }`}>
                <span className="font-sans font-medium">ความพึงพอใจผู้อยู่อาศัย:</span>
                <span className="font-mono font-bold text-emerald-500">98.4% จากผลสำรวจ</span>
              </div>
            </div>
          </div>

          {/* Bento Card 3: บริหารสำนักงานและออฟฟิศคอมเพล็กซ์ */}
          <div className={`lg:col-span-4 border rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between backdrop-blur-md ${
            isNightMode ? "bg-[#09152B]/40 border-white/10 text-slate-100" : "bg-white/50 border-white/60 shadow-xl shadow-slate-200/30 text-slate-800"
          }`}>
            <div>
              <div className="h-52 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
                  alt="ออฟฟิศพลาซ่า" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 text-left space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono font-bold text-[#D4A017] uppercase tracking-widest bg-[#D4A017]/10 px-2 py-0.5 rounded">OFFICE PLAZA</span>
                  <h3 className={`font-extrabold text-lg tracking-tight group-hover:text-[#D4A017] transition-colors ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
                    บริหารอาคารและตึกสำนักงานพาณิชย์
                  </h3>
                  <p className="text-xs text-slate-400 font-medium font-mono">การประหยัดพลังงานขั้นสูงระดับ HVAC & BEMS</p>
                </div>
                
                <p className={`text-xs leading-relaxed font-sans ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                  วางพารามิเตอร์ตารางสลับแอร์ยักษ์ เจรจาซื้ออุปกรณ์จัดจ้างสากล ควบคุมเจ้าหน้าที่หน้าด่าน บุคลากร รปภ. ตรวจสภาวะระบบฉุกเฉินระดับสูง
                </p>

                <div className="pt-2">
                  <div className="w-full h-px bg-slate-100 dark:bg-slate-800 mb-4"></div>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className={isNightMode ? "text-slate-300" : "text-slate-600"}>วางพารามิเตอร์ตารางคุมเครื่องปรับอากาศส่วนกลาง Chiller</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className={isNightMode ? "text-slate-300" : "text-slate-600"}>ตรวจสอบสัญญางบประมาณจัดจ้างคู่ค้าอย่างตรงไปตรงมา</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className={isNightMode ? "text-slate-300" : "text-slate-600"}>พัฒนาศักยภาพต้อนรับ รปภ. และจัดเก็บใบแจ้งหนี้สากล</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-6 pt-0 text-left">
              <div className={`rounded-lg p-3 border flex items-center justify-between text-xs mt-2 backdrop-blur-sm ${
                isNightMode ? "bg-black/40 border-white/5 text-slate-300" : "bg-white/60 border-white/45 text-slate-809"
              }`}>
                <span className="font-sans font-medium">การเข้าทำลายจุดรั่วไหลทางบัญชี:</span>
                <span className="font-mono font-bold text-emerald-500">100% ตรวจสอบได้</span>
              </div>
            </div>
          </div>

        </ScrollGrid>
      </section>

      {/* ส่วนที่ 4: เครื่องสแกนและจำลองคุณลักษณะน้ำส่วนกลาง IoT */}
      <section className={`py-12 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border rounded-3xl my-6 backdrop-blur-md ${
        isNightMode ? "bg-slate-900/30 border-white/5" : "bg-white/40 border-white/60 shadow-xl shadow-slate-200/20"
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest font-mono">เครื่องชี้วัดสถิติส่วนกลาง IoT</span>
            <h2 className={`text-3xl font-black font-display tracking-tight leading-snug ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
              เครื่องมือจำลองตรวจจับค่าน้ำสระว่ายน้ำส่วนกลาง
            </h2>
            <div className="w-16 h-0.5 bg-[#D4A017] rounded"></div>
            <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
              ทดลองเปลี่ยนสถานะตัวแปรของคุณ และทดลองประยุกต์ preset เกณฑ์สากล เพื่อดูระเบียบวินัยสุขอนามัยรอบข้างที่ทีมปฏิบัติการ Premium Propoty คอยสแกนควบคุมดูแลรายชั่วโมง
            </p>
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>ควบคุมสมดุลกรดด่าง (pH) ในเกณฑ์เหมาะสม 7.2 ถึง 7.6</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>กำจัดเชื้อโรคด้วยประจุคลอรีนสว่างสม่ำเสมอ 1.0 ถึง 3.0 ppm</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>กลั่นกรองตะกอนแขวนลอยให้ค่าความขุ่นต่ำกว่า 0.5 NTU</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <PoolWaterMonitor isNightMode={isNightMode} />
          </div>

        </div>
      </section>

      {/* ส่วนที่ 5: แผนผังจำลอง PDCA ไซเคิลเพื่อวินัยอาคารสอดคล้อง (PDCA Interactive) */}
      <section id="pdca" className="py-12 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal direction="up" duration={0.6}>
          <div className="max-w-3xl mx-auto space-y-4 mb-8">
            <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest font-mono">โครงสร้างการตรวจสอบวงรอบสากล</span>
            <h2 className={`text-3xl sm:text-4xl font-black font-display tracking-tight leading-normal ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
              กรอบการวิเคราะห์ตามวงจร PDCA คุณภาพระบบ ISO
            </h2>
            <div className="w-16 h-0.5 bg-[#D4A017] mx-auto rounded"></div>
            <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
              เราสอดแทรกวงจรควบคุมแผน ปฏิบัติ ตรวจรอบ และประดับผลลัพธ์ลงในหัวงานนิติโดยตรงเพื่อการกำจัดส่วนประกอบสิ้นเปลือง
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" duration={0.8} delay={0.15}>
          <PDCAInteractive isNightMode={isNightMode} />
        </ScrollReveal>
      </section>

      {/* ส่วนที่ 6: นิทรรศการเอกลักษณ์เครื่องแต่งกายและสินทรัพย์แบรนด์ (Brand Showcase) */}
      <section className="py-12 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" duration={0.6}>
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
            <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest font-mono">เกียรติยศและมาตรฐานภาพลักษณ์</span>
            <h2 className={`text-3xl sm:text-4xl font-black font-display tracking-tight leading-normal ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
              เอกลักษณ์วินัยเจ้าหน้าที่และทรัพย์สินที่จับต้องได้
            </h2>
            <div className="w-16 h-0.5 bg-[#D4A017] mx-auto rounded"></div>
            <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
              ความเรียบร้อยรอบแบรนด์บ่งบอกถึงวินัยการบริการ ตรวจสอบชุดยูนิฟอร์มและอุปกรณ์ของพนักงาน Premium Propoty ที่ประจำไซต์งานโครงการ
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" duration={0.8} delay={0.15}>
          <PrimeCareBrandShowcase isNightMode={isNightMode} />
        </ScrollReveal>
      </section>

      {/* ส่วนที่ 7: ก่อนและหลังแบบสไลด์เปรียบเทียบสัญญาน้ำ-ไฟ และงานประเมินบารมี (Before After Slider) */}
      <section id="results" className="py-12 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal direction="up" duration={0.6}>
          <div className="max-w-3xl mx-auto space-y-4 mb-8">
            <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest font-mono">ผลงานเชิงประจักษ์ความคุ้มค่าพลังงาน</span>
            <h2 className={`text-3xl sm:text-4xl font-black font-display tracking-tight leading-normal ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
              ภาพรวมตรวจเปรียบเทียบกรณีปรับแต่งระบบสัญญาลด OpEx
            </h2>
            <div className="w-16 h-0.5 bg-[#D4A017] mx-auto rounded"></div>
            <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
              สัมผัสความโปร่งใสผ่านตัวเลขวัดผลก่อนปรับปั๊มน้ำ, จัดการสวนหย่อม หรือควบคุมชิลเลอร์ กับสถานะที่เกิดขึ้นภายใต้ Premium Propoty
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" duration={0.8} delay={0.15}>
          <BeforeAfterSlider isNightMode={isNightMode} initialCaseId="CS-01" />
        </ScrollReveal>
      </section>

      {/* ส่วนที่ 8: ฟอร์มประดับประเมินยอดลดต้นทุนสะสมและ Call to Action ด่วน */}
      <section id="cta" className="relative bg-gradient-to-b from-[#0F2B46] to-[#0A1C2E] py-12 text-white overflow-hidden">
        
        <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=1600" 
            alt="เจ้าพระยาโค้งน้ำและเมืองระฟ้ายามค่ำคืน" 
            className="w-full h-full object-cover grayscale brightness-75 blur-[1px]"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
          
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="left" duration={0.8}>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#D4A017]/10 text-[#D4A017] rounded-full px-3.5 py-1 text-xs font-mono font-bold border border-[#D4A017]/30">
                  <Award className="w-4 h-4 text-[#D4A017]" />
                  <span>ความน่าเชื่อถือระบบตรวจสอบดุลการเงิน 99.4%</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  พร้อมดูแลทรัพย์สินนิติและประหยัดงบโครงการคุณแล้วหรือยัง?
                </h2>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl font-sans">
                  ก้าวแรกสู่ความโปร่งใส ความพึงพอใจของคณะกรรมการร่วมและการเคลียร์บัญชีแสนคลุมเครือให้สะอาดสว่างตาด้วยระบบมาตรฐาน ISO วางใจให้ทีมงานนายช่างเก่งและนักบัญชีสัญญาลดรั่วไหลของเราช่วยเหลือ
                </p>

                <div className="space-y-3.5 border-t border-blue-900/30 pt-6 font-sans">
                  <p className="text-[10px] font-mono tracking-wider text-gray-400 uppercase font-bold">3 ก้าวถัดไปสู่โครงสร้างความน่าอยู่</p>
                  
                  <div className="flex gap-3 text-xs leading-normal">
                    <div className="w-5 h-5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center font-mono font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <span>ทดลองทวงประหยัดงบประมาณคลังตรวจผ่านเครื่องประมาณการข้างเคียง</span>
                  </div>

                  <div className="flex gap-3 text-xs leading-normal">
                    <div className="w-5 h-5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center font-mono font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <span>นัดหมายทีมวิศวกรโครงสร้างอาวุโสเพื่อลงตรวจสแกนหน้าไซต์งานโครงการโดยไม่มีค่าใช้จ่าย</span>
                  </div>

                  <div className="flex gap-3 text-xs leading-normal">
                    <div className="w-5 h-5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center font-mono font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <span>เปลี่ยนผ่านระบบบัญชีและทีมช่างนิติจุดซุ่มซ่ามสู่คุณภาพวินัยอย่างเป็นระบบ</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    id="cta-btn-get-quote"
                    onClick={() => setIsContactOpen(true)}
                    className="bg-[#16A34A] hover:bg-emerald-700 text-white font-sans font-bold text-xs py-4 px-8 rounded-md tracking-wider uppercase transition-colors shadow-lg shadow-emerald-500/15 flex items-center gap-2 cursor-pointer"
                  >
                    <span>ขอรับการนัดหมายลงดูไซต์วิศวกรตรวจสอบฟรี</span>
                    <Phone className="w-4 h-4 text-white" />
                  </button>

                  <button
                    id="cta-btn-get-proposal"
                    onClick={() => {
                      const el = document.getElementById("proposal-calculator-card");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="border-2 border-white hover:bg-white/10 text-white font-sans font-bold text-xs py-3.5 px-8 rounded-md tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    <span>คำนวณยอดเงินประหยัดสะสม</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6">
            <ScrollReveal direction="right" duration={0.8} delay={0.15}>
              <ProposalCalculator isNightMode={isNightMode} />
            </ScrollReveal>
          </div>

        </div>
      </section>
        </>
      )}
      {/* =========================================================================
          PAGE 2: ABOUT PAGE (เกี่ยวกับเรา — PREMUIM PROPERTY)
          ========================================================================= */}
      {activeMenu === "about" && (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-12 text-white">
          {/* Header Area in Glassmorphism Card */}
          <ScrollReveal direction="up" duration={0.6}>
            <div className="p-8 sm:p-12 rounded-3xl backdrop-blur-xl bg-[#09152B]/30 border border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),_0_20px_50px_rgba(0,0,0,0.3)] text-center max-w-4xl mx-auto mb-12 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest block font-sans">นวัตกรรมและวิชาชีพบริหารนิติบุคคล</span>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-normal font-display text-white">
                  เกี่ยวกับเรา <span className="text-[#D4A017]">PREMIUM PROPOTY</span>
                </h1>
                <div className="w-16 h-0.5 bg-[#D4A017] mx-auto rounded"></div>
                <p className="text-slate-100 text-sm font-sans drop-shadow-sm max-w-2xl mx-auto leading-relaxed">
                  ทีมผู้จัดการกองทุนและวิศวกรวิชาชีพควบคุมคุณภาพระดับสากล ภายใต้ข้อตกลงระดับบริการ (SLA) และเกณฑ์สากล ISO 9001:2015 ในการดูแลคุ้มครองผลงานอสังหาริมทรัพย์ระดับพรีเมียม
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Intro Grid with Glassmorphic details (30% opacity) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-2xl font-bold font-sans text-white drop-shadow-sm">วิสัยทัศน์แห่งความโปร่งใสและวินัยสูงสุด</h2>
              <p className="text-slate-100 text-sm leading-relaxed drop-shadow-sm">
                เรามุ่งมั่นบริหารจัดการอสังหาริมทรัพย์ด้วยมาตรฐานระดับมืออาชีพ เพื่อความปลอดภัย ความสบายใจ และคุณภาพชีวิตที่ดีกว่าในทุกพื้นที่ ภายใต้แบรนด์การจัดการ <span className="font-bold text-[#D4A017]">Premium Propoty</span> ซึ่งได้บุกเบิกการบริหารจัดการนิติบุคคลอาคารชุด และคอมมูนิตี้หมู่บ้านจัดสรร ด้วยระบบตรวจสอบสดบนคลาวด์และระเบียบช่างซ่อมบำรุงเชิงรุก
              </p>
              <p className="text-slate-100 text-sm leading-relaxed drop-shadow-sm">
                เรามุ่งทำลายเกราะการทุจริตแบบเดิมๆ เช่น ค่านายหน้าฝ่ายช่างจัดซื้อ การคลาดเคลื่อนเงินสถิติส่วนกลาง และการละเลยระบบเซฟตี้ความปลอดภัยส่วนกลาง โดยเราประกันวินัยการทำงานด้วยสมุดคุมมาตรฐาน SOP และการยกกำลังชุดวิศวกรกู้ภัยฉุกเฉินภายในเวลาจำกัด 1 ชั่วโมง
              </p>
              
              <div className="flex gap-4">
                <div className="p-4 rounded-lg text-center flex-1 font-sans backdrop-blur-md bg-[#09152B]/40 border border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
                  <span className="block text-xl font-bold text-emerald-400">100%</span>
                  <span className="text-[10px] text-slate-200">บัญชีโปร่งใสคลาวด์สด</span>
                </div>
                <div className="p-4 rounded-lg text-center flex-1 font-sans backdrop-blur-md bg-[#09152B]/40 border border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
                  <span className="block text-xl font-bold text-sky-400">&lt; 1 ชั่วโมง</span>
                  <span className="text-[10px] text-slate-200">วิศวกรเคลื่อนบำรุงภัย</span>
                </div>
                <div className="p-4 rounded-lg text-center flex-1 font-sans backdrop-blur-md bg-[#09152B]/40 border border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
                  <span className="block text-xl font-bold text-[#D4A017]">ISO 9001</span>
                  <span className="text-[10px] text-slate-200">ควบคุมระบบสากล</span>
                </div>
              </div>
            </div>

            {/* Glassmorphic Widget Container with 30% Opacity */}
            <div className="lg:col-span-6 p-8 rounded-2xl backdrop-blur-xl space-y-6 bg-[#09152B]/40 border border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_50px_rgba(0,0,0,0.3)] text-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/15 text-emerald-400 rounded-lg">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight font-sans text-white">ค่านิยมหลักแห่งวิชาชีพคุมระบบ</h4>
                  <p className="text-[10px] text-slate-300 font-mono">CORE COMPLIANCE FRAMEWORK</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-md font-mono text-[10px] font-extrabold bg-amber-400/20 text-amber-300">01</div>
                  <div className="text-left">
                    <h5 className="font-extrabold text-sm text-white">TRUST & SECURITY (ความปลอดภัยและความน่าเชื่อถือ)</h5>
                    <p className="text-[11px] mt-0.5 text-slate-200">
                      มุ่งเน้นการปฏิบัติตามมาตรฐาน ป้องกัน ดูแลจัดระเบียบตึก ชุมชน ด้วยความรอบคอบและคำนึงถึงความปลอดภัยสูงสุดในชีวิตและทรัพย์สินของลูกบ้าน
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-md font-mono text-[10px] font-extrabold bg-amber-400/20 text-amber-300">02</div>
                  <div className="text-left">
                    <h5 className="font-extrabold text-sm text-white">PROFESSIONAL TEAM (ทีมงานมืออาชีพ)</h5>
                    <p className="text-[11px] mt-0.5 text-slate-200">
                      บุคลากรทุกท่านผ่านสัมภาษณ์ คัดสรร ตรวจสอบประวัติอาชญากรรม และเข้าร่วมโครงการฝึกอบรมทักษะเทคนิควินัยตรงสายงานอย่างเข้มงวด
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-md font-mono text-[10px] font-extrabold bg-amber-400/20 text-amber-300">03</div>
                  <div className="text-left">
                    <h5 className="font-extrabold text-sm text-white">MANAGEMENT EXCELLENCE (การบริหารจัดการอย่างมีประสิทธิภาพ)</h5>
                    <p className="text-[11px] mt-0.5 text-slate-200">
                      วิเคราะห์แผนลดค่าใช้จ่ายส่วนเกิน บำรุงรักษาเชิงป้องกันคุมค่าสระกระด้างและระบบชิลเลอร์ ลดอัตราความสิ้นเปลืองอย่างคุ้มค่าได้ผลระยะยาว
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-md font-mono text-[10px] font-extrabold bg-amber-400/20 text-amber-300">04</div>
                  <div className="text-left">
                    <h5 className="font-extrabold text-sm text-white">QUALITY STANDARD (ระบบบริหารคุณภาพมาตรฐาน)</h5>
                    <p className="text-[11px] mt-0.5 text-slate-200">
                      การปฏิบัติตามมาตรฐานระบบสากล ISO 9001:2015 ในการจัดจดบันทึกรายงาน วิเคราะห์ความสอดคล้อง วางแผน PDCA รับมือทุจริตทุกมิติ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-md font-mono text-[10px] font-extrabold bg-amber-400/20 text-amber-300">05</div>
                  <div className="text-left">
                    <h5 className="font-extrabold text-sm text-white">TRANSPARENCY (ความโปร่งใส ตรวจสอบได้)</h5>
                    <p className="text-[11px] mt-0.5 text-slate-200">
                      ให้คณะกรรมการตรวจสอบตรวจทานสมุดรายงานงบประดุล ตัวเลขบัญชี และสถานะการบริหารได้เรียลไทม์ผ่านระบบคลาวด์โปร่งใสของเรา
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members inside About Page */}
          <div className="pt-8 text-white">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-mono font-bold text-[#D4A017] uppercase tracking-widest block">คณะวิญญูชนร่วมสร้างวินัยอาคาร</span>
              <h3 className="text-2xl font-black font-sans text-white">ทีมวิศวกรระบบและผู้สอบบัญชีตรงสำหรับอาคารคุณ</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="rounded-xl overflow-hidden hover:scale-[1.01] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-left group backdrop-blur-xl bg-[#09152B]/40 border border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] text-white"
                >
                  <div>
                    <div className="h-52 relative overflow-hidden bg-slate-900">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3 bg-emerald-500 text-white font-mono font-bold text-[9px] px-2 py-0.5 rounded uppercase">
                        Active
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-2">
                      <span className="text-[#D4A017] font-mono text-[9px] font-bold uppercase tracking-widest">OFFICER-0{index + 1}</span>
                      <h4 className="font-bold text-sm font-sans tracking-tight text-white">{member.name}</h4>
                      <p className="text-[11px] text-emerald-400 font-semibold">{member.role}</p>
                      
                      <p className="text-[11px] leading-relaxed font-sans text-slate-200">
                        {member.bio}
                      </p>

                      <div className="border-t border-white/10 pt-2 mt-2 space-y-1 text-[10px]">
                        <div className="text-slate-300">
                          <strong className="text-[#D4A017]">สถิติงาน:</strong> {member.experience}
                        </div>
                        <div className="mt-1 font-sans text-slate-200">
                          <span className="inline-block py-0.5 px-2 rounded text-[9px] font-bold bg-blue-950/60 text-blue-200 border border-white/5">
                            {member.certification}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PrimeCare Brand & Uniform Showcase from CI - force isNightMode to keep dark layout contrast */}
          <ScrollReveal direction="up" duration={0.7}>
            <PrimeCareBrandShowcase isNightMode={true} />
          </ScrollReveal>
        </div>
      )}

      {/* =========================================================================
          PAGE 3: SERVICES PAGE (บริการของเรา — PREMUIM SERVICES)
          ========================================================================= */}
      {activeMenu === "services" && (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-12">
          {/* Header Area in Glassmorphism Card */}
          <ScrollReveal direction="up" duration={0.6}>
            <div className={`p-8 sm:p-12 rounded-3xl backdrop-blur-xl text-center max-w-4xl mx-auto mb-12 space-y-4 relative overflow-hidden border ${
              isNightMode 
                ? "bg-[#09152B]/30 border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_50px_rgba(0,0,0,0.3)] text-white" 
                : "bg-white/45 border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)] text-slate-800"
            }`}>
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest block font-sans">ขอบข่ายการจัดการโครงการระดับสากล</span>
                <h1 className={`text-4xl sm:text-5xl font-black tracking-tight leading-normal font-display ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
                  ขอบเขตงานบริการของเรา <span className="text-[#D4A017]">PREMIUM PROPOTY SERVICES</span>
                </h1>
                <div className="w-16 h-0.5 bg-[#D4A017] mx-auto rounded"></div>
                <p className={`text-sm font-sans max-w-2xl mx-auto leading-relaxed ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                  บริการเต็มพิกัดด้านการเงิน บัญชี ตรวจสอบอาคาร ซ่อมบำรุงวิศวกรรมฉุกเฉิน และแผนการจัดสรรสิ่งแวดล้อมสอดคล้องตามระเบียบสากล ISO 9001:2015
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive Bento Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Service 1: บริการบริหารจัดการโครงการ */}
             <div className={`p-6 rounded-2xl flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-cyan-590/20 ${
               isNightMode 
                 ? "bg-[#010309]/50 border border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_50px_rgba(0,0,0,0.3)] text-white" 
                 : "bg-white/45 border border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)] text-slate-800"
             }`}>
               <div className="space-y-4">
                 <div className="bg-[#D4A017]/10 text-[#D4A017] w-11 h-11 flex items-center justify-center rounded-lg border border-[#D4A017]/20">
                   <Building2 className="w-6 h-6" />
                 </div>
                 <h3 className={`font-extrabold text-lg font-sans ${isNightMode ? "text-white" : "text-slate-900"}`}>1. บริการบริหารจัดการโครงการ</h3>
                 <p className={`text-xs leading-relaxed font-sans ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                   บริหารงานนิติบุคคลและตัวแทนอสังหาริมทรัพย์ด้วยมาตรฐานสากล
                 </p>
                 <ul className={`space-y-2 text-xs font-sans ${isNightMode ? "text-slate-200" : "text-slate-600"}`}>
                   <li className="flex items-start gap-2">
                     <span className="text-[#D4A017] font-bold mt-0.5">•</span>
                     <span>บริหารจัดการนิติบุคคลอาคารชุด อาคารสำนักงาน อพาร์ทเม้นท์ ศูนย์การค้า พลาซ่า</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="text-[#D4A017] font-bold mt-0.5">•</span>
                     <span>บริหารจัดการนิติบุคคลหมู่บ้านจัดสรร</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="text-[#D4A017] font-bold mt-0.5">•</span>
                     <span>ตัวแทนด้านการฝากขาย ฝากเช่า</span>
                   </li>
                 </ul>
               </div>
               <div className={`mt-5 pt-4 border-t text-xs flex justify-between font-medium ${isNightMode ? "border-white/10" : "border-slate-200"}`}>
                 <span className={isNightMode ? "text-slate-400" : "text-slate-500"}>งานบริหารจัดการนิติบุคคล</span>
                 <span className="text-[#D4A017] font-bold">สิทธิตามกฎหมาย</span>
               </div>
             </div>

             {/* Service 2: บริการจดทะเบียนนิติบุคคล */}
             <div className={`p-6 rounded-2xl flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-cyan-950/20 ${
               isNightMode 
                 ? "bg-[#010309]/50 border border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_50px_rgba(0,0,0,0.3)] text-white" 
                 : "bg-white/45 border border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)] text-slate-800"
             }`}>
               <div className="space-y-4">
                 <div className="bg-emerald-500/10 text-emerald-400 w-11 h-11 flex items-center justify-center rounded-lg border border-emerald-500/20">
                   <Award className="w-6 h-6" />
                 </div>
                 <h3 className={`font-extrabold text-lg font-sans ${isNightMode ? "text-white" : "text-slate-900"}`}>2. บริการจดทะเบียนนิติบุคคล</h3>
                 <p className={`text-xs leading-relaxed font-sans ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                   ดำเนินการจัดตั้งนิติบุคคลอาคารชุดและหมู่บ้านเพื่อความถูกต้องสมบูรณ์
                 </p>
                 <ul className={`space-y-2 text-xs font-sans ${isNightMode ? "text-slate-200" : "text-slate-600"}`}>
                   <li className="flex items-start gap-2">
                     <span className="text-emerald-400 font-bold mt-0.5">•</span>
                     <span>จดทะเบียนและจัดตั้งนิติบุคคลอาคารชุด</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="text-emerald-400 font-bold mt-0.5">•</span>
                     <span>จดทะเบียนและจัดตั้งนิติบุคคลหมู่บ้านจัดสรร</span>
                   </li>
                 </ul>
               </div>
               <div className={`mt-5 pt-4 border-t text-xs flex justify-between font-medium ${isNightMode ? "border-white/10" : "border-slate-200"}`}>
                 <span className={isNightMode ? "text-slate-400" : "text-slate-500"}>การจัดการเอกสารจัดตั้ง</span>
                 <span className="text-emerald-400 font-bold">ครบวงจร 100%</span>
               </div>
             </div>

             {/* Service 3: ที่ปรึกษาโครงการอสังหาริมทรัพย์ */}
             <div className={`p-6 rounded-2xl flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-cyan-950/20 ${
               isNightMode 
                 ? "bg-[#010309]/50 border border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_50px_rgba(0,0,0,0.3)] text-white" 
                 : "bg-white/45 border border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)] text-slate-800"
             }`}>
               <div className="space-y-4">
                 <div className="bg-blue-500/10 text-blue-400 w-11 h-11 flex items-center justify-center rounded-lg border border-blue-500/20">
                   <Compass className="w-6 h-6" />
                 </div>
                 <h3 className={`font-extrabold text-lg font-sans ${isNightMode ? "text-white" : "text-slate-900"}`}>3. ที่ปรึกษาโครงการอสังหาริมทรัพย์</h3>
                 <p className={`text-xs leading-relaxed font-sans ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                   ให้คำปรึกษาวางแผนงานและระเบียบสัดส่วนเชิงลึกของทุกประเภทโครงการ
                 </p>
                 <ul className={`space-y-2 text-xs font-sans ${isNightMode ? "text-slate-200" : "text-slate-600"}`}>
                   <li className="flex items-start gap-2">
                     <span className="text-blue-400 font-bold mt-0.5">•</span>
                     <span>ที่ปรึกษาโครงการอาคารชุด อพาร์ทเม้นท์ อาคารสำนักงาน</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="text-blue-400 font-bold mt-0.5">•</span>
                     <span>ที่ปรึกษาโครงการหมู่บ้านจัดสรร การจัดสรรที่ดิน</span>
                   </li>
                 </ul>
               </div>
               <div className={`mt-5 pt-4 border-t text-xs flex justify-between font-medium ${isNightMode ? "border-white/10" : "border-slate-200"}`}>
                 <span className={isNightMode ? "text-slate-400" : "text-slate-500"}>วิเคราะห์และทบทวน</span>
                 <span className="text-blue-400 font-bold">วางแผนแม่บท</span>
               </div>
             </div>

             {/* Service 4: บริการทางด้านบัญชีและกฎหมาย */}
             <div className={`p-6 rounded-2xl flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-cyan-950/20 ${
               isNightMode 
                 ? "bg-[#010309]/50 border border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_50px_rgba(0,0,0,0.3)] text-white" 
                 : "bg-white/45 border border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)] text-slate-800"
             }`}>
               <div className="space-y-4">
                 <div className="bg-purple-500/10 text-purple-400 w-11 h-11 flex items-center justify-center rounded-lg border border-purple-500/20">
                   <Scale className="w-6 h-6" />
                 </div>
                 <h3 className={`font-extrabold text-lg font-sans ${isNightMode ? "text-white" : "text-slate-900"}`}>4. บริการทางด้านบัญชีและกฎหมาย</h3>
                 <p className={`text-xs leading-relaxed font-sans ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                   ดูแลระบบการเงินสอดคล้องตาม พ.ร.บ. บัญชี และสอบกฎหมายข้อบังคับ
                 </p>
                 <ul className={`space-y-2 text-xs font-sans ${isNightMode ? "text-slate-200" : "text-slate-600"}`}>
                   <li className="flex items-start gap-2">
                     <span className="text-purple-400 font-bold mt-0.5">•</span>
                     <span>ให้คำปรึกษา จัดทำบัญชี-การเงิน ปิดงบดุลบริษัท ที่เกี่ยวข้องกับอาคารชุด หมู่บ้านจัดสรร</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="text-purple-400 font-bold mt-0.5">•</span>
                     <span>ให้คำปรึกษาในเรื่องกฎหมายต่างๆ ที่เกี่ยวข้อง เช่น พ.ร.บ. อาคารชุด หรือ พ.ร.บ. การจัดสรรที่ดิน</span>
                   </li>
                 </ul>
               </div>
               <div className={`mt-5 pt-4 border-t text-xs flex justify-between font-medium ${isNightMode ? "border-white/10" : "border-slate-200"}`}>
                 <span className={isNightMode ? "text-slate-400" : "text-slate-500"}>พ.ร.บ. อาคารชุด & จัดสรร</span>
                 <span className="text-purple-400 font-bold">ตรวจสอบและป้องภัย</span>
               </div>
             </div>

             {/* Service 5: บริการทางด้านวิศวกรรม */}
             <div className={`p-6 rounded-2xl flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-cyan-950/20 ${
               isNightMode 
                 ? "bg-[#010309]/50 border border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_50px_rgba(0,0,0,0.3)] text-white" 
                 : "bg-white/45 border border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)] text-slate-800"
             }`}>
               <div className="space-y-4">
                 <div className="bg-amber-500/10 text-amber-500 w-11 h-11 flex items-center justify-center rounded-lg border border-amber-500/20">
                   <Wrench className="w-6 h-6" />
                 </div>
                 <h3 className={`font-extrabold text-lg font-sans ${isNightMode ? "text-white" : "text-slate-900"}`}>5. บริการทางด้านวิศวกรรม</h3>
                 <p className={`text-xs leading-relaxed font-sans ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                   บำรุงรักษาเชิงปักหมุดป้องกัน และทบทวนตรวจสอบโครงสร้างวิศกรรมอาคารสูง
                 </p>
                 <ul className={`space-y-2 text-xs font-sans ${isNightMode ? "text-slate-200" : "text-slate-600"}`}>
                   <li className="flex items-start gap-2">
                     <span className="text-amber-500 font-bold mt-0.5">•</span>
                     <span>บำรุงรักษาเชิงป้องกัน (Preventive Maintenance - PM)</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="text-amber-500 font-bold mt-0.5">•</span>
                     <span>ให้คำปรึกษางานด้านวิศวกรรมทั้งหมด</span>
                   </li>
                 </ul>
               </div>
               <div className={`mt-5 pt-4 border-t text-xs flex justify-between font-medium ${isNightMode ? "border-white/10" : "border-slate-200"}`}>
                 <span className={isNightMode ? "text-slate-400" : "text-slate-500"}>ตรวจสุขภาพตึกชุด</span>
                 <span className="text-amber-400 font-bold">ควบคุมตลอด 24 ชม.</span>
               </div>
             </div>

             {/* Service 6: ดูแลสระว่ายน้ำ */}
             <div className={`p-6 rounded-2xl flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-cyan-950/20 md:col-span-2 lg:col-span-3 ${
               isNightMode 
                 ? "bg-[#010309]/50 border border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_50px_rgba(0,0,0,0.3)] text-white" 
                 : "bg-white/45 border border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)] text-slate-800"
             }`}>
               <div className="space-y-4">
                 <div className="bg-cyan-500/10 text-cyan-400 w-11 h-11 flex items-center justify-center rounded-lg border border-cyan-500/20">
                   <Droplet className="w-6 h-6 animate-bounce" />
                 </div>
                 <h3 className={`font-extrabold text-lg font-sans ${isNightMode ? "text-white" : "text-slate-900"}`}>6. ดูแลสระว่ายน้ำ</h3>
                 <p className={`text-xs leading-relaxed font-sans ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                   ทำความสะอาดสระ ตรวจระบบฆ่าเชื้อโรค วัดสปีดเครื่องกรอง และ ตรวจสอบค่าน้ำตามมาตรฐานสเปคสวรรค์
                 </p>

                 <div className={`space-y-1 text-xs ${isNightMode ? "text-slate-200" : "text-slate-600"}`}>
                   <p className="flex items-center gap-1.5 font-sans">• ดูแลสระว่ายน้ำให้ใสเหมือนกระจกสม่ำเสมอ</p>
                   <p className="flex items-center gap-1.5 font-sans">• ตรวจสอบค่าน้ำตามมาตรฐานที่กำหนด พร้อมทำภาพจำลองตัวจริงให้วิเคราะห์ด้านล่าง</p>
                 </div>

                 {/* Real Integrated Interactive Simulator Widget for "พร้อมทำภาพตัวให้ดู" */}
                 <div className="pt-2">
                   <PoolWaterMonitor isNightMode={isNightMode} />
                 </div>
               </div>
               
               <div className={`mt-5 pt-4 border-t text-xs flex justify-between font-medium ${isNightMode ? "border-white/10" : "border-slate-200"}`}>
                 <span className={isNightMode ? "text-slate-400" : "text-slate-500"}>ระบบบำบัดน้ำและกรองเศษ</span>
                 <span className="text-cyan-400 font-bold">เครื่องตรวจวิเคราะห์คลาดสัดส่วน</span>
               </div>
             </div>
          </div>

          {/* Calculator inside Services Page for conversions */}
          <div className="pt-8">
            <div className={`rounded-2xl p-8 backdrop-blur-xl ${
              isNightMode 
                ? "bg-blue-950/20 border border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_50px_rgba(0,0,0,0.3)]" 
                : "bg-white/45 border border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)]"
            }`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                <div className="lg:col-span-5 space-y-4">
                  <span className="text-xs font-bold text-emerald-400 font-mono tracking-widest block uppercase">ESTIMATE SAVINGS LIVE</span>
                  <h3 className={`text-2xl font-black font-sans ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>ทดลองวิเคราะห์ยอดลดต้นทุนอาคารของคุณ</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    ใส่รายละเอียดจำนวนอสังหาริมทรัพย์และงบ Opex การดำเนินงานเพื่อตรวจอัตราค่าประหยัดเฉลี่ยในการใช้งานระบบคุณภาพคึกคัก
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <ProposalCalculator isNightMode={isNightMode} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PAGE 4: PORTFOLIO PAGE_TAB (หมู่บ้านโครงการ-คอนโด-อาคารสำนักงาน)
          ========================================================================= */}
      {activeMenu === "portfolio" && (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-12">
          {/* Header Area in Glassmorphism Card */}
          <ScrollReveal direction="up" duration={0.6}>
            <div className={`p-8 sm:p-12 rounded-3xl backdrop-blur-xl text-center max-w-4xl mx-auto mb-12 space-y-4 relative overflow-hidden border ${
              isNightMode 
                ? "bg-[#09152B]/30 border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_50px_rgba(0,0,0,0.3)] text-white" 
                : "bg-white/45 border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)] text-slate-800"
            }`}>
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest block font-sans">กรณีศึกษาความพึงพอใจและสถิติส่วนกลาง</span>
                <h1 className={`text-4xl sm:text-5xl font-black tracking-tight leading-normal font-display ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
                  ผลงานแยกตามประเภท <span className="text-[#D4A017]">PREMIUM PROPOTY PORTFOLIO</span>
                </h1>
                <div className="w-16 h-0.5 bg-[#D4A017] mx-auto rounded"></div>
                <p className={`text-sm font-sans max-w-2xl mx-auto leading-relaxed ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                  สถิติกรณีศึกษาวัดเชิงสถิติจริงจากกลุ่มหมู่บ้านจัดสรร อาคารชุดคอนโด และสำนักงาน ที่เข้าร่วมแผนคุมคุณภาพอย่างสอดคล้อง
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Sub-menu Portfolio Tabs */}
          <div className="flex justify-center flex-wrap gap-3 max-w-xl mx-auto p-1.5 rounded-xl bg-blue-950/20 border border-blue-900/30">
            <button
              onClick={() => setActivePortfolioType("estate")}
              className={`flex-1 min-w-[120px] font-sans font-bold text-xs py-3 px-4 rounded-lg tracking-wider transition-all cursor-pointer ${
                activePortfolioType === "estate"
                  ? "bg-[#D4A017] text-white shadow-md active:scale-95"
                  : isNightMode ? "text-slate-300 hover:bg-blue-900/30" : "text-slate-700 hover:bg-slate-200"
              }`}
            >
              หมู่บ้านโครงการ
            </button>
            <button
              onClick={() => setActivePortfolioType("condo")}
              className={`flex-1 min-w-[120px] font-sans font-bold text-xs py-3 px-4 rounded-lg tracking-wider transition-all cursor-pointer ${
                activePortfolioType === "condo"
                  ? "bg-[#0f2a45] text-white shadow-md active:scale-95"
                  : isNightMode ? "text-slate-300 hover:bg-blue-900/30" : "text-slate-700 hover:bg-slate-200"
              }`}
            >
              คอนโดมิเนียม
            </button>
            <button
              onClick={() => setActivePortfolioType("office")}
              className={`flex-1 min-w-[120px] font-sans font-bold text-xs py-3 px-4 rounded-lg tracking-wider transition-all cursor-pointer ${
                activePortfolioType === "office"
                  ? "bg-[#16A34A] text-white shadow-md active:scale-95"
                  : isNightMode ? "text-slate-300 hover:bg-blue-900/30" : "text-slate-700 hover:bg-slate-200"
              }`}
            >
              อาคารสำนักงาน
            </button>
          </div>

          {/* Quick facts according to selected active tab */}
          <div className={`p-6 rounded-2xl backdrop-blur-md shadow-xl border ${
            isNightMode 
              ? "bg-[#09152B]/40 border-white/10 text-slate-100" 
              : "bg-white/50 border-white/60 text-slate-850 shadow-xl shadow-slate-200/30"
          }`}>
            <AnimatePresence mode="wait">
              {activePortfolioType === "estate" && (
                <motion.div
                  key="estate-intro"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 text-xs md:text-sm font-sans"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="p-1 px-2.5 bg-amber-500/10 text-[#D4A017] font-mono text-[10px] font-black rounded uppercase">Premium Estate</span>
                    <h3 className="text-lg font-bold font-sans">งานดูแลสวน คุมมาตรวัด และระเบียบส่วนกลางหมู่บ้าน</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    <strong>ผลลัพธ์โครงการ:</strong> เราเข้าตรวจสอบสัญญาการดูแลภูมิสถาปัตย์และพื้นที่จัดสวนส่วนตัว ตัดงบประมาณซัพพลายเออร์ที่ทับซ้อน เพื่อให้ผลตอบแทนประหยัด OpEx ทันที 20% ฟื้นคืนความสุขในส่วนกลางให้ครอบครัวผู้เข้าพักอาศัยครบครัน
                  </p>
                </motion.div>
              )}

              {activePortfolioType === "condo" && (
                <motion.div
                  key="condo-intro"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 text-xs md:text-sm font-sans"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="p-1 px-2.5 bg-blue-500/10 text-blue-400 font-mono text-[10px] font-black rounded uppercase">High-Rise Condo</span>
                    <h3 className="text-lg font-bold font-sans">การวิเคราะห์สุขภาพท่อเมนและแผนตรวจสอบสองยอดบัญชีคอนโด</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    <strong>ผลลัพธ์อาคารชุด:</strong> ดูแลความโปร่งใสในบัญชีคลาวด์สด สแกนหาท่อประปารั่วซึม และดูแลระบบปั๊มน้ำประสิทธิภาพอินเวอร์เตอร์ ช่วยลดเวลารอบปิดงานร้องเรียนตั๋วของลูกบ้านลงจาก 36 ชั่วโมงเหลือเฉลี่ยต่ำสุดเพียง 1.4 ชั่วโมงเท่านั้น
                  </p>
                </motion.div>
              )}

              {activePortfolioType === "office" && (
                <motion.div
                  key="office-intro"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4 text-xs md:text-sm font-sans"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="p-1 px-2.5 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-black rounded uppercase">Business Plaza</span>
                    <h3 className="text-lg font-bold font-sans">ริเริ่มปรับระบบ Chiller ทำความเย็นและระเบียบคู่ค้าผู้เช่า</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    <strong>ผลลัพธ์เชิงพาณิชย์:</strong> นำตารางคุมระบบปรับอากาศ Chiller อัตโนมัติและแผนจัดเรียงปริมาณพลังงานสำรองมาใช้งานจริง ช่วยให้อาคารสำนักงานและพลาซ่าประหยัดค่าน้ำพลังงานไฟฟ้าลงสะสม 28% ของยอดดำเนินการ
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dynamic Grid Showcase - 30 Premium Items with Images */}
          <div className="pt-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b pb-4 border-slate-200/10">
              <div>
                <h2 className={`text-2xl font-extrabold font-sans flex items-center gap-2 ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
                  <span className="w-1.5 h-6 bg-[#D4A017] rounded-full inline-block"></span>
                  <span>ตัวอย่างโครงการและรายละเอียดงานจริงทั้งหมด ({portfolioItems[activePortfolioType].length} โครงการ)</span>
                </h2>
                <p className="text-xs text-slate-450 mt-1 font-sans">
                  แสดงรายละเอียดและผลลัพธ์คัดกรอง OpEx สแกนท่อรั่วซึม บำรุงระบบส่วนกลาง และประสิทธิภาพการใช้ปั๊มน้ำสอดคล้องมาตรฐานเกณฑ์สากล ISO 9001
                </p>
              </div>
              <span className="text-[10px] font-mono bg-[#D4A017]/15 text-[#D4A017] uppercase tracking-wider px-2 py-1 rounded mt-2 md:mt-0 font-extrabold self-start md:self-auto border border-[#D4A017]/30">
                {filteredPortfolioItems.length} PROJECTS IN {activePortfolioType === "estate" ? "HOUSING" : activePortfolioType === "condo" ? "CONDOMINIUM" : "OFFICE PLAZA"}
              </span>
            </div>

            {/* Search Filter and Quick Stats Bar */}
            <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              isNightMode 
                ? "bg-slate-900/60 border-blue-900/30" 
                : "bg-[#0F2B46]/5 border-[#0F2B46]/10"
            }`}>
              <div className="relative flex-1 max-w-md">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-slate-400" />
                </span>
                <input
                  type="text"
                  placeholder="ค้นหาชื่อโครงการ, รายละเอียด หรือคำสำคัญ..."
                  value={portfolioSearch}
                  onChange={(e) => setPortfolioSearch(e.target.value)}
                  className={`w-full pl-9 pr-12 py-2 text-xs rounded-lg border focus:ring-1 focus:outline-none font-sans transition-colors ${
                    isNightMode
                      ? "bg-slate-950 border-blue-900/40 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:ring-amber-500"
                      : "bg-white border-slate-300 text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:ring-amber-500"
                  }`}
                />
                {portfolioSearch && (
                  <button 
                    onClick={() => setPortfolioSearch("")}
                    className="absolute inset-y-0 right-3 flex items-center text-xs text-[#D4A017] hover:opacity-80 font-sans"
                  >
                    ล้าง
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className={isNightMode ? "text-slate-400" : "text-slate-600"}>
                  พบ <strong>{filteredPortfolioItems.length}</strong> จาก <strong>{portfolioItems[activePortfolioType].length}</strong> โครงการ 
                </span>
                {portfolioSearch && (
                  <span className="px-2 py-0.5 bg-[#D4A017]/10 text-[#D4A017] border border-[#D4A017]/30 text-[10px] rounded font-semibold font-sans">
                    กรองข้อมูลอยู่
                  </span>
                )}
              </div>
            </div>

            {displayedPortfolioItems.length === 0 ? (
              <div className={`p-12 text-center rounded-2xl border border-dashed ${
                isNightMode ? "bg-slate-900/30 border-blue-900/40" : "bg-slate-50 border-slate-300"
              }`}>
                <p className={`text-sm ${isNightMode ? "text-slate-400" : "text-slate-500"}`}>ไม่พบข้อมูลโครงการที่ระบุพิกัดหรือชื่อค้นหา กรุณาลองกรอกใหม่อีกครั้ง</p>
                <button
                  onClick={() => setPortfolioSearch("")}
                  className="mt-3 text-xs text-[#D4A017] underline hover:opacity-80"
                >
                  ดูโครงการทั้งหมด
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedPortfolioItems.map((item, idx) => (
                  <ScrollReveal key={item.id} direction="up" delay={(idx % 6) * 0.05} duration={0.5}>
                    <div className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col h-full backdrop-blur-xl border ${
                      isNightMode 
                        ? "bg-[#09152B]/40 border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_50px_rgba(0,0,0,0.3)] text-slate-100" 
                        : "bg-white/45 border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)] text-slate-800"
                    }`}>
                      {/* Visual Area */}
                      <div className="relative h-56 overflow-hidden bg-slate-950">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                        
                        {/* Sub-tag overlay */}
                        <span className="absolute top-4 left-4 text-[10px] font-bold font-mono tracking-widest bg-emerald-600 text-white py-1 px-2.5 rounded shadow-md uppercase">
                          {item.tag}
                        </span>

                        {/* Stat bubble */}
                        <div className="absolute bottom-4 right-4 bg-[#0F2B46] border border-[#D4A017] shadow-xl text-[#D4A017] text-[11px] font-bold px-2.5 py-1 rounded-lg">
                          {item.stats}
                        </div>
                      </div>

                      {/* Meta and Description */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <h4 className={`text-base font-bold tracking-tight font-sans ${isNightMode ? "text-slate-100 font-extrabold" : "text-[#0F2B46]"}`}>
                            {item.title}
                          </h4>
                          <p className={`text-xs leading-relaxed font-sans ${isNightMode ? "text-slate-400" : "text-slate-500"}`}>
                            {item.description}
                          </p>
                        </div>

                        {/* Execution Details sub-card */}
                        <div className={`p-4 rounded-xl border border-dashed text-left ${
                          isNightMode
                            ? "bg-blue-950/20 border-blue-900/40 text-slate-300"
                            : "bg-amber-50/40 border-amber-200/60 text-slate-700"
                        }`}>
                          <span className={`text-[9px] font-mono uppercase tracking-wider block mb-1 font-bold ${
                            isNightMode ? "text-amber-400" : "text-[#D4A017]"
                          }`}>
                            รายละเอียดการปฏิบัติงานจริง
                          </span>
                          <p className={`text-[11px] leading-relaxed font-sans ${isNightMode ? "text-slate-300" : "text-slate-655"}`}>
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => setPortfolioPage(prev => Math.max(1, prev - 1))}
                  disabled={portfolioPage === 1}
                  className={`p-2 rounded-lg border transition-all flex items-center justify-center ${
                    portfolioPage === 1
                      ? "opacity-40 cursor-not-allowed border-slate-200/10"
                      : isNightMode
                        ? "border-blue-900/40 hover:bg-slate-800 text-slate-300"
                        : "border-slate-300 hover:bg-[#0F2B46]/10 text-slate-700"
                  }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPortfolioPage(pageNum)}
                    className={`w-8 h-8 rounded-lg border text-xs font-bold font-mono transition-all flex items-center justify-center ${
                      portfolioPage === pageNum
                        ? "bg-[#D4A017] border-[#D4A017] text-[#0F2B46] shadow-md scale-105"
                        : isNightMode
                          ? "border-blue-900/40 bg-slate-900/40 text-slate-300 hover:bg-slate-800"
                          : "border-slate-300 bg-white text-slate-705 hover:bg-slate-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setPortfolioPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={portfolioPage === totalPages}
                  className={`p-2 rounded-lg border transition-all flex items-center justify-center ${
                    portfolioPage === totalPages
                      ? "opacity-40 cursor-not-allowed border-slate-200/10"
                      : isNightMode
                        ? "border-blue-900/40 hover:bg-slate-800 text-slate-300"
                        : "border-slate-300 hover:bg-[#0F2B46]/10 text-slate-700"
                  }`}
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Dynamic BeforeAfterSlider synced to selection */}
          <div className="pt-4">
            <BeforeAfterSlider 
              isNightMode={isNightMode} 
              initialCaseId={
                activePortfolioType === "estate" 
                  ? "CS-02" 
                  : activePortfolioType === "condo" 
                    ? "CS-01" 
                    : "CS-03"
              }
            />
          </div>
        </div>
      )}

      {/* ส่วนท้ายและพารามิเตอร์สำนักงานใหญ่ (Corporate Footer) */}
      <footer className="bg-[#050C12] text-gray-400 text-xs py-14 border-t border-blue-950/60 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
          
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigateToMenu("home")}>
              <svg viewBox="0 0 100 115" className="w-8 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 4L93.3 29V79L50 104L6.7 79V29L50 4Z" stroke="#FFFFFF" strokeWidth="8" strokeLinejoin="round" />
                <path d="M30 75 V48 L38 43 V75 Z" fill="#FFFFFF" />
                <path d="M44 75 V32 L54 26 V75 Z" fill="#FFFFFF" />
                <path d="M60 75 V43 L68 38 V75 Z" fill="#FFFFFF" />
              </svg>
              <span className="text-base font-bold tracking-tight text-white font-display">PREMIUM<span className="text-[#D4A017]">PROPOTY</span></span>
            </div>
            
            <p className="text-gray-400 leading-relaxed font-sans text-xs">
              กลุ่มบริษัทจัดการดูแลทรัพย์สินและนิติบุคคลอสังหาริมทรัพย์สัญญาระยะยาวเป็นสากลตั้งแต่ปี 2012 มุ่งมั่นรักษาดุลบัญชีและคุณภาพบริการสูงสุดตามระบบ ISO 9001:2015
            </p>

            <div className="space-y-1">
              <p className="text-gray-300 font-bold font-mono text-[10px] tracking-widest uppercase">รหัสใบอนุญาตทะเบียนนายทะเบียน</p>
              <p className="text-[10px] text-[#D4A017] font-mono font-semibold">QMS REGISTERED: ISO 9001:2015 REF-42.8.AA</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[10px] font-mono text-gray-300">ฝ่ายปฏิบัติงานหลัก</h5>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => navigateToMenu("services")} className="hover:text-amber-400 transition-colors">บริหารนิติคอนโดมิเนียม</button></li>
              <li><button onClick={() => navigateToMenu("services")} className="hover:text-amber-400 transition-colors">บริหารนิติหมู่บ้านจัดสรร</button></li>
              <li><button onClick={() => navigateToMenu("services")} className="hover:text-amber-400 transition-colors">บริหารตึกสำนักงานและพาณิชย์</button></li>
              <li><button onClick={() => navigateToMenu("home")} className="hover:text-amber-400 transition-colors">เข้าสู่ระบบตรวจสอบบัญชี v4.2</button></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[10px] font-mono text-gray-300">ระเบียบวินัยคุณภาพ ISO</h5>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => { navigateToMenu("home"); setTimeout(() => scrollToSection("pdca"), 100); }} className="hover:text-amber-400 transition-colors">หมวดที่ 6: การวางอัตรารับมือ</button></li>
              <li><button onClick={() => { navigateToMenu("home"); setTimeout(() => scrollToSection("pdca"), 100); }} className="hover:text-amber-400 transition-colors">หมวดที่ 8: การควบคุมปฏิบัติผล</button></li>
              <li><button onClick={() => { navigateToMenu("home"); setTimeout(() => scrollToSection("pdca"), 100); }} className="hover:text-amber-400 transition-colors">หมวดที่ 9: การสอบทานประดุลเงิน</button></li>
              <li><button onClick={() => { navigateToMenu("home"); setTimeout(() => scrollToSection("pdca"), 100); }} className="hover:text-amber-400 transition-colors">กรอบการวิเคราะห์ตามวงจร PDCA</button></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-[10px] font-mono text-gray-300">ติดต่อและประสานงานหลัก</h5>
            
            <div className="space-y-2.5 text-xs text-gray-400 leading-normal">
              <div className="flex gap-2 items-start">
                <MapPin className="w-4.5 h-4.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>ตึกพาณิชย์เอเพ็กซ์เซ็นเตอร์ ทาวเวอร์ ชั้น 12, ห้องชุด 412, ถนนศูนย์กลางอสังหาฯ เขตบางรัก CBD กรุงเทพฯ</span>
              </div>

              <div className="flex gap-2 items-center">
                <Mail className="w-4.5 h-4.5 text-[#D4A017] flex-shrink-0" />
                <span className="font-mono">operations@premiumpropoty.co.th</span>
              </div>

              <div className="flex gap-2 items-center">
                <Phone className="w-4.5 h-4.5 text-sky-500 flex-shrink-0" />
                <span className="font-mono">02-xxx-xxxx / www.premiumpropoty.co.th (ประสานวิศวกรด่วน 24 ชม.)</span>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-blue-950/50 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-500 font-mono">
          <span>&copy; 2026 เครือบริษัทและประสานทางเทคนิค Premium Propoty จำกัด สงวนสิทธิ์ทั้งปวงตามสัญญารับจ้าง</span>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:underline">คำชี้แจ้งข้อมูลส่วนบุคคลสืบค้นข้อมูล</a>
            <a href="#terms" className="hover:underline">ลิขสิทธิ์ความสอดคล้องตามเกณฑ์สากล ISO9001</a>
            <a href="#security" className="hover:underline">ความปลอดภัยนิรภัยระบบคลาวด์</a>
          </div>
        </div>
      </footer>

      {/* MULTI-STEP CONSULTATION BOOKING DIALOG MODAL */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

    </div>
  );
}
