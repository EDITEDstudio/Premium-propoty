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
  Moon,
  Bell,
  SlidersHorizontal,
  Calendar,
  ChevronDown,
  MessageCircle,
  Home as HomeIcon,
  Layers,
  Settings,
  DollarSign,
  Plus,
  Briefcase,
  Clock,
  LineChart,
  FileText
} from "lucide-react";

import HeroDashboard from "./components/HeroDashboard";
import PDCAInteractive from "./components/PDCAInteractive";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import ProposalCalculator from "./components/ProposalCalculator";
import ContactModal from "./components/ContactModal";
import ScrollReveal, { ScrollGrid } from "./components/ScrollReveal";
import PoolWaterMonitor from "./components/PoolWaterMonitor";
import PrimeCareBrandShowcase from "./components/PrimeCareBrandShowcase";
import { portfolioItems, PortfolioItem } from "./portfolioData";

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

  const [portfolioItemsState, setPortfolioItemsState] = useState<{
    estate: PortfolioItem[];
    condo: PortfolioItem[];
    office: PortfolioItem[];
  }>(() => {
    const saved = localStorage.getItem("premium_portfolio_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return portfolioItems;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("premium_admin_logged_in") === "true";
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddTeamMemberModalOpen, setIsAddTeamMemberModalOpen] = useState(false);

  const [teamMembersState, setTeamMembersState] = useState(() => {
    const saved = localStorage.getItem("premium_team_members");
    if (saved) return JSON.parse(saved);
    return teamMembers;
  });

  const handleDeleteProject = (id: string) => {
    if (!window.confirm("คุณต้องการลบโครงการนี้ออกอย่างถาวรใช่หรือไม่?")) return;
    const updated = {
      estate: portfolioItemsState.estate.filter(item => item.id !== id),
      condo: portfolioItemsState.condo.filter(item => item.id !== id),
      office: portfolioItemsState.office.filter(item => item.id !== id)
    };
    setPortfolioItemsState(updated);
    localStorage.setItem("premium_portfolio_data", JSON.stringify(updated));
  };

  const handleAddProject = (newProj: {
    title: string;
    category: "estate" | "condo" | "office";
    description: string;
    stats: string;
    tag: string;
    detail: string;
    image: string;
  }) => {
    const newItem: PortfolioItem = {
      id: `${newProj.category}-${Date.now()}`,
      title: newProj.title,
      description: newProj.description,
      image: newProj.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      stats: newProj.stats || "สำเร็จตามมาตรฐาน",
      tag: newProj.tag || "งานบริหารจัดการ",
      detail: newProj.detail || "ดำเนินการตามมาตรฐานระบบบำรุงรักษาเชิงรุก"
    };

    const updated = {
      ...portfolioItemsState,
      [newProj.category]: [newItem, ...portfolioItemsState[newProj.category]]
    };

    setPortfolioItemsState(updated);
    localStorage.setItem("premium_portfolio_data", JSON.stringify(updated));
  };

  const handleAddTeamMember = (newMember: any) => {
    const updated = [...teamMembersState, newMember];
    setTeamMembersState(updated);
    localStorage.setItem("premium_team_members", JSON.stringify(updated));
    setIsAddTeamMemberModalOpen(false);
  };

  const handleDeleteTeamMember = (indexToDelete: number) => {
    if (!window.confirm("คุณต้องการลบวิศวกร/ผู้สอบบัญชีท่านนี้ใช่หรือไม่?")) return;
    const updated = teamMembersState.filter((_: any, idx: number) => idx !== indexToDelete);
    setTeamMembersState(updated);
    localStorage.setItem("premium_team_members", JSON.stringify(updated));
  };

  // New Dashboard States
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<any>(null);
  const [activeChatPartner, setActiveChatPartner] = useState<"kianna" | "jaydon" | "mira">("kianna");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInputText, setChatInputText] = useState("");
  const [isChatTyping, setIsChatTyping] = useState(false);
  const [activeSimTab, setActiveSimTab] = useState<"iot" | "pdca" | "renovation" | "proposal">("iot");
  const [chatMessages, setChatMessages] = useState<Record<string, Array<{ sender: "user" | "bot"; text: string; timestamp: string }>>>({
    kianna: [
      { sender: "bot", text: "สวัสดีครับท่านกรรมการ ผมตรวจเช็คโครงการ Siam Royal View สัญญาการดูแลความปลอดภัยสอดคล้องตามมาตรฐานแล้วครับ", timestamp: "10:10" }
    ],
    jaydon: [
      { sender: "bot", text: "ผลงานตรวจสอบจุดไฟรั่วสะสมสัปดาห์นี้ ลดค่าใช้จ่ายพลังงานความเย็น Chiller เพิ่มอีก 3% ครับ", timestamp: "10:12" }
    ],
    mira: [
      { sender: "bot", text: "แผนบำรุงรักษาเชิงรุกตามเกณฑ์ ISO 9001:2015 จัดทำเอกสาร SOP และแชร์ระบบคลาวด์แยกประเภทแล้วค่ะ", timestamp: "10:14" }
    ]
  });

  useEffect(() => {
    setPortfolioPage(1);
  }, [activePortfolioType, portfolioSearch]);

  const filteredPortfolioItems = portfolioItemsState[activePortfolioType].filter(item => {
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

  useEffect(() => {
    if (isNightMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isNightMode]);

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

  const handleSendChatMessage = () => {
    if (!chatInputText.trim()) return;
    const userMsg = {
      sender: "user" as const,
      text: chatInputText,
      timestamp: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })
    };
    
    setChatMessages(prev => ({
      ...prev,
      [activeChatPartner]: [...(prev[activeChatPartner] || []), userMsg]
    }));
    
    const sentText = chatInputText;
    setChatInputText("");
    setIsChatTyping(true);
    
    setTimeout(() => {
      let botResponseText = "";
      if (activeChatPartner === "kianna") {
        botResponseText = `รับทราบครับท่านกรรมการ สำหรับข้อความ "${sentText}" ผมได้สั่งการให้ทีมช่างอาคารเข้าตรวจสอบจุดชำรุดเชิงรุกและตรวจสอบระบบไฟฟ้าอัจฉริยะเรียบร้อยแล้วครับ`;
      } else if (activeChatPartner === "jaydon") {
        botResponseText = `รับทราบข้อมูลครับท่าน เกี่ยวกับเรื่อง "${sentText}" ผมกำลังเช็คกราฟกำลังไฟรั่วและปรับแต่งตัวเลขค่าสปอตไลท์ส่วนกลางให้ประหยัดพลังงานเพิ่มขึ้นครับ`;
      } else {
        botResponseText = `รับทราบค่ะท่านผู้บริหาร ในส่วนของ "${sentText}" ได้ถูกบันทึกไว้ในแผนงานคุมเกณฑ์ ISO 9001:2015 เรียบร้อยแล้ว จะแจ้งความคืบหน้าถัดไปค่ะ`;
      }
      
      const botMsg = {
        sender: "bot" as const,
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })
      };
      
      setChatMessages(prev => ({
        ...prev,
        [activeChatPartner]: [...(prev[activeChatPartner] || []), botMsg]
      }));
      setIsChatTyping(false);
    }, 1200);
  };

  const AdminLoginModal = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (username === "admin" && password === "admin") {
        setIsAdminLoggedIn(true);
        localStorage.setItem("premium_admin_logged_in", "true");
        setIsLoginModalOpen(false);
        setError("");
        setUsername("");
        setPassword("");
      } else {
        setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    };

    if (!isLoginModalOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div className={`relative max-w-md w-full rounded-2xl border shadow-2xl p-6 transition-all ${
          isNightMode ? "bg-[#0b1325] border-blue-900/50 text-slate-100" : "bg-white border-slate-200 text-slate-800"
        }`}>
          <button 
            type="button"
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-blue-600/10 text-blue-600 dark:bg-sky-500/10 dark:text-sky-400 rounded-full flex items-center justify-center mx-auto text-xl">
              🔐
            </div>
            <h3 className="text-lg font-bold font-sans">เข้าสู่ระบบแอดมิน</h3>
            <p className="text-xs text-slate-400 font-sans">กรอกข้อมูลบัญชีเพื่อสิทธิ์การเพิ่มหรือลบโครงการในระบบ</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 mt-6">
            <div className="text-left">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-sans">ชื่อผู้ใช้งาน</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-1 focus:outline-none ${
                  isNightMode 
                    ? "bg-slate-950 border-blue-900/40 text-slate-100 focus:border-amber-500 focus:ring-amber-500" 
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
            </div>

            <div className="text-left">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-sans">รหัสผ่าน</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-1 focus:outline-none ${
                  isNightMode 
                    ? "bg-slate-950 border-blue-900/40 text-slate-100 focus:border-amber-500 focus:ring-amber-500" 
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 font-bold font-sans text-left">{error}</p>
            )}

            <button 
              type="submit"
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white dark:text-[#0b1325] font-bold text-sm cursor-pointer transition-all shadow-md active:scale-95 border-0"
            >
              ยืนยันการเข้าสู่ระบบ
            </button>

            <p className="text-[10px] text-center text-slate-400 font-sans mt-2">
              (บัญชีทดสอบ: admin / admin)
            </p>
          </form>
        </div>
      </div>
    );
  };

  const AddTeamMemberModal = () => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [certification, setCertification] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setImage(base64String);
          setImagePreview(base64String);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!name || !role || !image) {
        alert("กรุณากรอกข้อมูลชื่อ, ตำแหน่ง และแนบรูปภาพ");
        return;
      }
      handleAddTeamMember({ name, role, experience, certification, bio, image });
      setName(""); setRole(""); setExperience(""); setCertification(""); setBio(""); setImage(""); setImagePreview("");
    };

    if (!isAddTeamMemberModalOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div className={`w-full max-w-2xl rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] ${isNightMode ? "bg-[#0B172E] text-white" : "bg-white text-slate-800"}`}>
          <div className="flex justify-between items-center mb-6 text-left">
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-sans">เพิ่มสมาชิกทีม (Add Team Member)</h2>
              <p className={`text-sm mt-1 font-sans ${isNightMode ? "text-slate-400" : "text-slate-500"}`}>เพิ่มรายชื่อวิศวกรหรือผู้สอบบัญชีสำหรับอาคารคุณ</p>
            </div>
            <button onClick={() => setIsAddTeamMemberModalOpen(false)} className={`p-2 rounded-xl transition-all cursor-pointer ${isNightMode ? "hover:bg-slate-800 text-slate-400" : "hover:bg-slate-100 text-slate-500"}`}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-sm text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold">ชื่อ-นามสกุล</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="เช่น คุณวรวุฒิ ศิริเลิศโสภณ" className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isNightMode ? "bg-[#091224] border-slate-700 focus:border-blue-500" : "bg-slate-50 border-slate-200 focus:border-blue-600"}`} />
              </div>
              <div className="space-y-1.5">
                <label className="font-bold">ตำแหน่ง (Role)</label>
                <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="เช่น ผู้จัดการนิติบุคคล" className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isNightMode ? "bg-[#091224] border-slate-700 focus:border-blue-500" : "bg-slate-50 border-slate-200 focus:border-blue-600"}`} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="font-bold">ประสบการณ์ (Experience)</label>
              <input type="text" value={experience} onChange={e => setExperience(e.target.value)} placeholder="เช่น ประสบการณ์ 12+ ปี..." className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isNightMode ? "bg-[#091224] border-slate-700 focus:border-blue-500" : "bg-slate-50 border-slate-200 focus:border-blue-600"}`} />
            </div>
            <div className="space-y-1.5">
              <label className="font-bold">ใบรับรอง / คุณวุฒิ (Certification)</label>
              <input type="text" value={certification} onChange={e => setCertification(e.target.value)} placeholder="เช่น ใบรับรอง IPMA..." className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isNightMode ? "bg-[#091224] border-slate-700 focus:border-blue-500" : "bg-slate-50 border-slate-200 focus:border-blue-600"}`} />
            </div>
            <div className="space-y-1.5">
              <label className="font-bold">ประวัติย่อ / ความรับผิดชอบ (Bio)</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} placeholder="คำอธิบายความรับผิดชอบย่อๆ..." className={`w-full px-4 py-3 rounded-xl border outline-none transition-all resize-none ${isNightMode ? "bg-[#091224] border-slate-700 focus:border-blue-500" : "bg-slate-50 border-slate-200 focus:border-blue-600"}`} />
            </div>
            <div className="space-y-1.5">
              <label className="font-bold">รูปภาพประจำตัว</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className={`w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:cursor-pointer ${isNightMode ? "file:bg-slate-800 file:text-slate-200 text-slate-400" : "file:bg-slate-100 file:text-slate-700 text-slate-500"}`} />
              {imagePreview && (
                <div className="mt-3 aspect-video w-32 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div className="pt-4 flex gap-3">
              <button type="button" onClick={() => setIsAddTeamMemberModalOpen(false)} className={`flex-1 py-3 rounded-xl font-bold transition-all cursor-pointer ${isNightMode ? "bg-slate-800 hover:bg-slate-700 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}>
                ยกเลิก
              </button>
              <button type="submit" className="flex-1 py-3 rounded-xl font-bold transition-all cursor-pointer bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" /> บันทึกข้อมูล
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const AddProjectModal = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState<"estate" | "condo" | "office">("estate");
    const [description, setDescription] = useState("");
    const [stats, setStats] = useState("");
    const [tag, setTag] = useState("");
    const [detail, setDetail] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setImage(base64String);
          setImagePreview(base64String);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!title || !description || !image) {
        alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน รวมถึงแนบรูปภาพโครงการ");
        return;
      }

      handleAddProject({
        title,
        category,
        description,
        stats,
        tag,
        detail,
        image
      });

      // Reset
      setTitle("");
      setCategory("estate");
      setDescription("");
      setStats("");
      setTag("");
      setDetail("");
      setImage("");
      setImagePreview("");
      setIsAddProjectModalOpen(false);
    };

    if (!isAddProjectModalOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <div className={`relative max-w-lg w-full rounded-2xl border shadow-2xl p-6 my-8 transition-all max-h-[90vh] overflow-y-auto ${
          isNightMode ? "bg-[#0b1325] border-blue-900/50 text-slate-100" : "bg-white border-slate-200 text-slate-800"
        }`}>
          <button 
            type="button"
            onClick={() => setIsAddProjectModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2 mb-6">
            <h3 className="text-lg font-bold font-sans">เพิ่มโครงการใหม่เข้าระบบ</h3>
            <p className="text-xs text-slate-400 font-sans">กรอกรายละเอียดเพื่อจัดส่งขึ้นบอร์ดบริหารโครงการแบบทันที</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-sans">ชื่อโครงการ *</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="เช่น Nirvana Forest Haven (เนอวานา ฟอเรสต์)"
                required
                className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-1 focus:outline-none ${
                  isNightMode 
                    ? "bg-slate-950 border-blue-900/40 text-slate-100 focus:border-amber-500 focus:ring-amber-500" 
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
            </div>

            <div className="text-left">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-sans">ประเภทโครงการ *</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value as any)}
                className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-1 focus:outline-none ${
                  isNightMode 
                    ? "bg-slate-950 border-blue-900/40 text-slate-100 focus:border-amber-500 focus:ring-amber-500" 
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
                }`}
              >
                <option value="estate">หมู่บ้านจัดสรร (Housing Estate)</option>
                <option value="condo">อาคารชุด (Condominium)</option>
                <option value="office">อาคารสำนักงาน / พลาซ่า (Office Plaza)</option>
              </select>
            </div>

            <div className="text-left">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-sans">คำอธิบายโครงการ *</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                placeholder="เช่น การบริหารระบบไฟฟ้าประหยัดไฟ 25% ตรวจสอบไฟรั่วสะสม..."
                required
                rows={3}
                className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-1 focus:outline-none ${
                  isNightMode 
                    ? "bg-slate-950 border-blue-900/40 text-slate-100 focus:border-amber-500 focus:ring-amber-500" 
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-sans">สถิติ/ผลลัพธ์</label>
                <input 
                  type="text" 
                  value={stats} 
                  onChange={(e) => setStats(e.target.value)}
                  placeholder="เช่น ลดค่าน้ำยา 15%"
                  className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-1 focus:outline-none ${
                    isNightMode 
                      ? "bg-slate-950 border-blue-900/40 text-slate-100 focus:border-amber-500 focus:ring-amber-500" 
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-sans">ป้ายกำกับ (Tag)</label>
                <input 
                  type="text" 
                  value={tag} 
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="เช่น ควบคุมคุณภาพน้ำ"
                  className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-1 focus:outline-none ${
                    isNightMode 
                      ? "bg-slate-950 border-blue-900/40 text-slate-100 focus:border-amber-500 focus:ring-amber-500" 
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                />
              </div>
            </div>

            <div className="text-left">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-sans">รายละเอียดงานจริง</label>
              <textarea 
                value={detail} 
                onChange={(e) => setDetail(e.target.value)}
                placeholder="เช่น การใช้พารามิเตอร์ตรวจจับการหมุนเวียนและการบำบัดธรรมชาติ..."
                rows={3}
                className={`w-full px-3 py-2 text-xs rounded-lg border focus:ring-1 focus:outline-none ${
                  isNightMode 
                    ? "bg-slate-950 border-blue-900/40 text-slate-100 focus:border-amber-500 focus:ring-amber-500" 
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 focus:ring-blue-500"
                }`}
              />
            </div>

            <div className="text-left">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 font-sans">อัปโหลดภาพโครงการ *</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                required
                className={`w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white dark:file:bg-sky-500 dark:file:text-[#0b1325] hover:file:opacity-90 file:cursor-pointer`}
              />
              {imagePreview && (
                <div className="mt-4 aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => { setImage(""); setImagePreview(""); }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-[10px]"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-3 text-xs">
              <button 
                type="button"
                onClick={() => setIsAddProjectModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-850 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold cursor-pointer"
              >
                ยกเลิก
              </button>
              <button 
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white dark:text-[#0b1325] font-bold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer border-0"
              >
                บันทึกโครงการ
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-all duration-300 font-sans relative antialiased selection:bg-emerald-600 selection:text-white ${
      isNightMode
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
        <div className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-1000">
          {!isNightMode ? (
            <img 
              src="/light_wallpaper.png" 
              alt="Light Background" 
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            />
          ) : (
            <>
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
                    <stop offset="0%" stopColor="#020718" />
                    <stop offset="35%" stopColor="#030d22" />
                    <stop offset="65%" stopColor="#020617" />
                    <stop offset="100%" stopColor="#010411" />
                  </linearGradient>

                  {/* Dotted window matrix pattern for skyscrapers */}
                  <pattern id="cityGrid" width="10" height="15" patternUnits="userSpaceOnUse">
                    <circle cx="5" cy="5" r="1.3" fill="#22d3ee" fillOpacity="0.22" />
                    <circle cx="5" cy="11" r="1.3" fill="#22d3ee" fillOpacity="0.22" />
                  </pattern>

                  {/* Vertical line pattern representing skyscraper ribs */}
                  <pattern id="ribbedLines" width="8" height="10" patternUnits="userSpaceOnUse">
                    <line x1="4" y1="0" x2="4" y2="10" stroke="#0ea5e9" strokeOpacity="0.25" strokeWidth="1" />
                  </pattern>

                  {/* Colorful linear gradients for waves according to user's uploaded banner colors */}
                  <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#02081e" stopOpacity="0.95" />
                    <stop offset="55%" stopColor="#0c4a6e" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.95" />
                  </linearGradient>

                  <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#003b5c" stopOpacity="0.85" />
                    <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.9" />
                  </linearGradient>

                  <linearGradient id="wave3" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#09335a" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.85" />
                  </linearGradient>
                </defs>

                {/* Render absolute canvas background */}
                <rect width="1440" height="900" fill="url(#skyGrad)" />

                {/* Background Sky sweeping lines (Top Left to Mid Right) mimicking the subtle sky texture */}
                <path d="M0,80 Q350,150 700,50 T1440,110" stroke="rgba(56,189,248,0.12)" strokeWidth="3" fill="none" />
                <path d="M0,120 Q400,200 800,80 T1440,160" stroke="rgba(56,189,248,0.08)" strokeWidth="2" fill="none" />

                {/* SKYLINE GROUP: Multi-layered responsive tech architecture layout from user's image */}
                <g id="skyscrapers" opacity="0.68">
                  {/* Backing Silhouette Row (Soft light tone) */}
                  <rect x="50" y="320" width="75" height="430" fill="#0f172a" fillOpacity="0.3" />
                  <rect x="180" y="410" width="60" height="340" fill="#0f172a" fillOpacity="0.3" />
                  <rect x="300" y="370" width="85" height="380" fill="#0f172a" fillOpacity="0.4" />
                  <rect x="440" y="290" width="90" height="460" fill="#0f172a" fillOpacity="0.3" />
                  <rect x="690" y="330" width="70" height="420" fill="#0f172a" fillOpacity="0.3" />
                  <rect x="800" y="280" width="100" height="470" fill="#0f172a" fillOpacity="0.35" />
                  <rect x="960" y="350" width="80" height="400" fill="#0f172a" fillOpacity="0.3" />
                  <rect x="1090" y="310" width="70" height="440" fill="#0f172a" fillOpacity="0.3" />
                  <rect x="1230" y="390" width="90" height="360" fill="#0f172a" fillOpacity="0.3" />

                  {/* Middle Grid Row: Decorative matrix-styled tech buildings */}
                  <rect x="90" y="400" width="65" height="350" fill="url(#cityGrid)" />
                  <rect x="220" y="460" width="55" height="290" fill="url(#ribbedLines)" />
                  <rect x="350" y="420" width="70" height="330" fill="url(#cityGrid)" />
                  
                  {/* Grand Central Tower (Custom round-ended cylinder design - centerpiece of corporate skyline!) */}
                  <path 
                    d="M550,750 L550,420 A55,55 0 0,1 660,420 L660,750 Z" 
                    fill="#07122a" 
                    stroke="#1e293b" 
                    strokeWidth="1.5"
                  />
                  <path 
                    d="M550,750 L550,420 A55,55 0 0,1 660,420 L660,750 Z" 
                    fill="url(#cityGrid)" 
                  />
                  {/* Central antenna / spike */}
                  <line x1="605" y1="365" x2="605" y2="300" stroke="#22d3ee" strokeWidth="2.5" opacity="0.9" />
                  <circle cx="605" cy="300" r="3.5" fill="#22d3ee" />

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
              <div className="absolute inset-0 bg-gradient-to-t from-[#020512]/90 via-[#030d24]/65 to-[#020512]/95" />
            </>
          )}
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
      
      {/* =========================================================================
          PREMIUM CORPORATE DASHBOARD SHELL
          ========================================================================= */}
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 py-6 relative z-10 font-sans">
        <div className={`rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col ${
          isNightMode 
            ? "bg-[#060c18]/75 backdrop-blur-2xl border-white/10 text-slate-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]" 
            : "bg-white/70 backdrop-blur-2xl border-white/40 text-slate-800 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.08)]"
        }`}>
          
          {/* Header */}
          <header className={`px-6 py-4 border-b flex items-center justify-between transition-colors duration-300 ${
            isNightMode ? "border-blue-900/30 bg-[#081224]/90 text-white" : "border-white/40 bg-white/40 text-slate-800"
          }`}>
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigateToMenu("home")}>
              {/* Corporate Hex-Column Icon matching footer */}
              <svg 
                viewBox="0 0 100 115" 
                className="w-7 h-8 transition-colors duration-300" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: isNightMode ? "#ffffff" : "#2563eb" }}
              >
                <path d="M50 4L93.3 29V79L50 104L6.7 79V29L50 4Z" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
                <path d="M30 75 V48 L38 43 V75 Z" fill="currentColor" />
                <path d="M44 75 V32 L54 26 V75 Z" fill="currentColor" />
                <path d="M60 75 V43 L68 38 V75 Z" fill="currentColor" />
              </svg>
              <div className="flex flex-col text-left">
                <span 
                  className="text-base font-bold tracking-tight font-display uppercase leading-none transition-colors duration-300"
                  style={{ color: isNightMode ? "#ffffff" : "#2563eb" }}
                >
                  PREMIUM PROPOTY
                </span>
                <span className="text-[7.5px] font-bold tracking-[0.16em] uppercase text-slate-400 dark:text-slate-500">
                  Property & Trading Systems
                </span>
              </div>
            </div>

            {/* Desktop Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-full text-xs font-bold transition-all">
              <button 
                onClick={() => navigateToMenu("home")} 
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all cursor-pointer ${
                  activeMenu === "home" 
                    ? "bg-white dark:bg-slate-750 text-blue-600 dark:text-sky-400 shadow-sm" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <HomeIcon className="w-3.5 h-3.5" />
                <span>หน้าแรก</span>
              </button>
              <button 
                onClick={() => navigateToMenu("services")} 
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all cursor-pointer ${
                  activeMenu === "services" 
                    ? "bg-white dark:bg-slate-750 text-blue-600 dark:text-sky-400 shadow-sm" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>ขอบเขตบริการ</span>
              </button>
              <button 
                onClick={() => navigateToMenu("portfolio", "estate")} 
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all cursor-pointer ${
                  activeMenu === "portfolio" 
                    ? "bg-white dark:bg-slate-750 text-blue-600 dark:text-sky-400 shadow-sm" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>ผลงานสะสม</span>
              </button>
              <button 
                onClick={() => navigateToMenu("about")} 
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all cursor-pointer ${
                  activeMenu === "about" 
                    ? "bg-white dark:bg-slate-750 text-blue-600 dark:text-sky-400 shadow-sm" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>เกี่ยวกับเรา</span>
              </button>
              <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1"></div>
              <button 
                onClick={() => setIsContactOpen(true)} 
                className="flex items-center gap-1.5 px-4 py-2 rounded-full transition-all cursor-pointer bg-blue-600 dark:bg-sky-500 text-white hover:bg-blue-700 dark:hover:bg-sky-400 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>ติดต่อเรา</span>
              </button>
            </nav>

            {/* Profile Avatar / Icons */}
            <div className="flex items-center gap-3">
              {/* Chat bubble Icon */}
              <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 relative cursor-pointer">
                <MessageCircle className="w-4.5 h-4.5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full border border-white dark:border-[#060c18]" />
              </button>
              
              {/* Notification Bell Icon */}
              <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 relative cursor-pointer">
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#060c18]" />
              </button>

              {/* Profile Card / Admin Auth */}
              {isAdminLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-850">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm font-sans">
                      AD
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">Sabi Administrator</span>
                      <span className="text-[9px] text-slate-400 leading-none">sabi2544mc1@gmail.com</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsAdminLoggedIn(false);
                      localStorage.removeItem("premium_admin_logged_in");
                    }}
                    className="p-1.5 px-3 rounded-lg bg-red-500/15 text-red-500 hover:bg-red-500/25 text-[10px] font-bold transition-all cursor-pointer border border-red-500/20"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white dark:bg-sky-500 dark:text-[#0b1325] hover:opacity-90 text-[10px] sm:text-xs font-bold font-sans cursor-pointer transition-all shadow-sm active:scale-95 border-0"
                >
                  <span>🔐 เข้าสู่ระบบแอดมิน</span>
                </button>
              )}
              
              {/* Mobile Menu Toggle Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </header>

          {/* Mobile navigation menu if opened */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-b border-slate-100 dark:border-blue-900/30 bg-slate-50 dark:bg-[#07101f] py-3 px-4 flex flex-col gap-2 font-bold text-xs"
              >
                <button onClick={() => { navigateToMenu("home"); setIsMobileMenuOpen(false); }} className={`p-2.5 rounded-lg text-left ${activeMenu === "home" ? "bg-white dark:bg-slate-850 text-blue-600 dark:text-sky-400" : "text-slate-500"}`}>หน้าแรก</button>
                <button onClick={() => { navigateToMenu("services"); setIsMobileMenuOpen(false); }} className={`p-2.5 rounded-lg text-left ${activeMenu === "services" ? "bg-white dark:bg-slate-850 text-blue-600 dark:text-sky-400" : "text-slate-500"}`}>ขอบเขตบริการ</button>
                <button onClick={() => { navigateToMenu("portfolio", "estate"); setIsMobileMenuOpen(false); }} className={`p-2.5 rounded-lg text-left ${activeMenu === "portfolio" ? "bg-white dark:bg-slate-850 text-blue-600 dark:text-sky-400" : "text-slate-500"}`}>ผลงานสะสม</button>
                <button onClick={() => { navigateToMenu("about"); setIsMobileMenuOpen(false); }} className={`p-2.5 rounded-lg text-left ${activeMenu === "about" ? "bg-white dark:bg-slate-850 text-blue-600 dark:text-sky-400" : "text-slate-500"}`}>เกี่ยวกับเรา</button>
                <div className="border-t border-slate-100 dark:border-slate-800 my-2"></div>
                <button onClick={() => { setIsContactOpen(true); setIsMobileMenuOpen(false); }} className="p-2.5 rounded-lg text-left bg-blue-600 text-white font-bold">ติดต่อเรา (Contact)</button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subheader */}
          <div className={`px-6 py-3 border-b flex flex-wrap items-center justify-between gap-4 transition-colors duration-300 ${
            isNightMode ? "border-blue-900/20 bg-[#070f1a] text-slate-300" : "border-white/30 bg-white/20 text-slate-600"
          }`}>
            {/* Left: Date Display */}
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
              <span>
                {new Date().toLocaleDateString("th-TH", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>

            {/* Center: Search Bar */}
            <div className="relative max-w-xs w-64 md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-3.5 h-3.5 text-slate-400" />
              </span>
              <input 
                type="text"
                value={portfolioSearch}
                onChange={(e) => setPortfolioSearch(e.target.value)}
                placeholder="ค้นหารายชื่อโครงการ / รหัสคุมเกณฑ์..."
                className="w-full pl-9 pr-8 py-1.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800 border-0 focus:ring-1 focus:ring-blue-600 dark:focus:ring-sky-500 text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-all"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              </span>
            </div>

            {/* Right: Theme Toggle pill styled like Buy/Sell */}
            <div className="bg-slate-100 dark:bg-slate-800 p-0.5 rounded-full flex items-center text-[10px] font-black shadow-inner border border-slate-200/40 dark:border-slate-700/50">
              <button 
                onClick={() => setIsNightMode(false)}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${!isNightMode ? "bg-white text-blue-600 shadow-sm" : "text-slate-400"}`}
              >
                ☀ LIGHT
              </button>
              <button 
                onClick={() => setIsNightMode(true)}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${isNightMode ? "bg-blue-600 text-white shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-200"}`}
              >
                ☾ DARK
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <main className={`flex-1 min-h-[600px] transition-colors duration-300 ${
            isNightMode ? "bg-[#03070f]/20" : "bg-white/10"
          }`}>

      {activeMenu === "home" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 text-left">
          
          {/* ==========================================
              NEW HEADER SECTION
              ========================================== */}
          <div className="lg:col-span-12 mb-6">
            <div className="relative w-full rounded-3xl overflow-hidden mb-6 shadow-lg group">
              <img 
                src="/header-bg.jpg" 
                alt="Premium Property Header" 
                className="w-full h-auto transition-transform duration-700 group-hover:scale-105 block"
              />
              <div className="absolute inset-0 bg-black/40 dark:bg-black/60 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white font-display tracking-tight drop-shadow-md">
                    PREMIUM PROPOTY
                  </h1>
                  <span className="text-sm sm:text-base font-mono text-white/90 uppercase tracking-[0.3em] mt-3 block drop-shadow">
                    Property & Trading Systems
                  </span>
                </motion.div>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto text-center px-4">
              <p className={`text-base sm:text-lg font-sans leading-relaxed ${isNightMode ? "text-slate-300" : "text-slate-600"}`}>
                ยกระดับมาตรฐานการบริหารจัดการอสังหาริมทรัพย์ระดับพรีเมียม ด้วยความเชี่ยวชาญทางวิศวกรรมและเทคโนโลยีล้ำสมัย เรามุ่งมั่นสร้างสรรค์สังคมคุณภาพที่ปลอดภัย สะดวกสบาย และยั่งยืน เพื่อรักษามูลค่าทรัพย์สินและมอบประสบการณ์การอยู่อาศัยที่ดีที่สุดให้กับลูกบ้านทุกคน
              </p>
            </div>
          </div>

          {/* ==========================================
              NEW SECTION A: Why Trust Us
              ========================================== */}
          <div className="lg:col-span-12 mb-2 mt-4">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <span className="text-xs font-mono font-bold text-[#D4A017] uppercase tracking-widest block">Proven Excellence</span>
              <h3 className={`text-2xl sm:text-3xl font-black font-sans tracking-tight ${isNightMode ? "text-white" : "text-slate-900"}`}>
                ทำไมโครงการระดับพรีเมียมมากกว่า 90 แห่งถึงไว้วางใจเรา?
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-2xl border transition-all ${isNightMode ? "bg-[#09152B]/60 border-blue-900/30 text-white" : "bg-white border-slate-100 shadow-sm text-slate-800"} flex flex-col items-center text-center gap-4 group`}>
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-sans mb-2">มาตรฐานระดับสากล ISO</h4>
                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-sans">
                    ทำงานด้วยระบบ PDCA สอดคล้องกับมาตรฐาน ISO 9001:2015 ตรวจสอบได้ทุกขั้นตอนแบบ 100% โปร่งใส ปราศจากการทุจริต
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border transition-all ${isNightMode ? "bg-[#09152B]/60 border-blue-900/30 text-white" : "bg-white border-slate-100 shadow-sm text-slate-800"} flex flex-col items-center text-center gap-4 group`}>
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <TrendingDown className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-sans mb-2">ลดค่าใช้จ่าย Opex ได้จริง</h4>
                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-sans">
                    วิเคราะห์จุดสูญเสียพลังงานและจุดเสื่อมสภาพด้วยวิศวกรผู้เชี่ยวชาญ ช่วยลดงบซ่อมบำรุงและค่าพลังงานส่วนกลางลงได้ถึง 30%
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border transition-all ${isNightMode ? "bg-[#09152B]/60 border-blue-900/30 text-white" : "bg-white border-slate-100 shadow-sm text-slate-800"} flex flex-col items-center text-center gap-4 group`}>
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <h4 className="text-lg font-bold font-sans mb-2">ตอบสนองเหตุฉุกเฉิน 24/7</h4>
                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-sans">
                    มีทีมหน่วยปฏิบัติการพิเศษ (Operational Dispatch) สแตนด์บายพร้อมเข้าแก้ไขปัญหาภายใน 1 ชั่วโมง เพื่อไม่ให้กระทบต่อการอยู่อาศัย
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              NEW SECTION B: Capabilities by Property Type
              ========================================== */}
          <div className="lg:col-span-12 mt-8 mb-4">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-mono font-bold text-[#D4A017] uppercase tracking-widest block">Property Expertise</span>
              <h3 className={`text-2xl sm:text-3xl font-black font-sans tracking-tight ${isNightMode ? "text-white" : "text-slate-900"}`}>
                ขีดความสามารถการดูแลจำแนกตามประเภททรัพย์สิน
              </h3>
            </div>
            
            <div className="flex flex-col gap-8 max-w-[90rem] mx-auto mt-12 relative z-10 px-4 lg:px-8 xl:px-12">
              {[
                { 
                  type: "บริหารจัดการหมู่บ้านจัดสรรหรู", 
                  subtitle: "การจัดระเบียบชุมชนและเทคนิคส่วนกลางเชิงลึก",
                  img: "/house-img.png?v=2", 
                  desc: "คุมเข้มระเบียบสกรีนการเข้าผ่านของบุคคลภายนอก ตรวจตราและบำรุงปั๊มสูบน้ำส่วนกลาง และปรับลดงบผู้รับเหมาจัดสวนแบบสัมบูรณ์",
                  bullets: [
                    "ควบคุมระบบความปลอดภัยและรถผู้มาติดต่อเข้มข้น",
                    "บริหารเจรจาผู้รับเหมาสวนหย่อมประหยัดงบได้จริง 15%",
                    "ทดสอบระบบวาล์วน้ำป้องประปารั่วซึมใต้ท่อเมนหมู่บ้าน"
                  ]
                },
                { 
                  type: "บริหารคอมมูนิตี้ คอนโดมิเนียมสูง", 
                  subtitle: "วิศวกรรมสระส่วนกลาง ลิฟต์ และรายงานบัญชีตรวจสอบได้",
                  img: "/condo-img.png?v=2", 
                  desc: "ดูแลรักษาปั๊มหมุนชิลเลอร์ ควบคุมค่าสารเคมี บำบัดประหยัดตารางแอร์ลิฟต์ส่วนกลาง ตรา ISO ตรวจสอบสด และจัดประชุมอย่างสร้างสรรค์โปร่งใส",
                  bullets: [
                    "บำรุงวิศวกรรมลิฟต์โดยสารและระบบ Chiller ตึกสูง",
                    "ระบบตรวจสอบ IoT ดิจิทัลตรวจสอบค่าน้ำสระว่ายน้ำส่วนกลาง",
                    "จัดทำรายงานงบการเงินและบัญชีรายเดือนสองฝ่ายชัดเจน"
                  ]
                },
                { 
                  type: "บริหารอาคารและตึกสำนักงานพาณิชย์", 
                  subtitle: "การประหยัดพลังงานขั้นสูงระดับ HVAC & BEMS",
                  img: "/office-img.png?v=2", 
                  desc: "วางพารามิเตอร์ตารางสลับแอร์ยักษ์ เจรจาซื้ออุปกรณ์จัดจ้างสากล ควบคุมเจ้าหน้าที่หน้าด่าน บุคลากร รปภ. ตรวจสภาวะระบบฉุกเฉินระดับสูง",
                  bullets: [
                    "วางพารามิเตอร์ตารางคุมเครื่องปรับอากาศส่วนกลาง Chiller",
                    "ตรวจสอบสัญญางบประมาณจัดจ้างคู่ค้าอย่างตรงไปตรงมา",
                    "พัฒนาศักยภาพต้อนรับ รปภ. และจัดเก็บใบแจ้งหนี้สากล"
                  ]
                }
              ].map((cap, i) => (
                <div key={i} className={`relative flex flex-col lg:flex-row items-center justify-between gap-6 px-6 py-6 md:px-10 md:py-8 xl:px-16 xl:py-12 group transition-all duration-500 rounded-[3rem] bg-gradient-to-r ${!isNightMode ? 'from-[#F0F8FF]/80 to-[#E3F2FD]/50 shadow-[inset_0_2px_15px_rgba(255,255,255,1),_0_10px_30px_rgba(0,0,0,0.05)] border border-white/60' : 'from-slate-800/80 to-slate-900/50 shadow-[inset_0_2px_20px_rgba(255,255,255,0.05),_0_10px_30px_rgba(0,0,0,0.5)] border border-slate-700/60'} backdrop-blur-md overflow-hidden ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Decorative Glow */}
                  <div className={`absolute top-1/2 -translate-y-1/2 ${i % 2 === 0 ? '-left-20' : '-right-20'} w-64 h-64 bg-blue-300/30 dark:bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
                  
                  {/* Image Display */}
                  <div className="w-full lg:w-5/12 flex items-center justify-center relative z-10 shrink-0">
                    <img 
                      src={cap.img} 
                      alt={cap.type} 
                      className={`h-[260px] sm:h-[320px] md:h-[400px] lg:h-[480px] xl:h-[540px] object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl`} 
                    />
                  </div>
                  
                  {/* Text Content */}
                  <div className={`w-full lg:w-7/12 relative z-10 flex flex-col justify-center px-4 md:px-8 xl:px-12`}>
                    <h4 className={`text-xl md:text-3xl lg:text-[32px] font-black mb-2 font-sans tracking-tight ${!isNightMode ? 'text-slate-900' : 'text-white'}`}>{cap.type}</h4>
                    <div className="text-sm md:text-base font-bold text-blue-600 dark:text-sky-400 mb-5">{cap.subtitle}</div>
                    
                    <p className={`text-sm md:text-lg leading-relaxed font-sans mb-6 ${!isNightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                      {cap.desc}
                    </p>
                    
                    <div className="space-y-4">
                      {cap.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className={`mt-1 rounded-full p-1 shrink-0 ${!isNightMode ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/50 text-blue-400'}`}>
                            <Check className="w-4 h-4" />
                          </div>
                          <span className={`text-sm md:text-[15px] xl:text-[17px] font-sans ${!isNightMode ? 'text-slate-700' : 'text-slate-300'}`}>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* ==========================================
              NEW SECTION C: Workflow & Value Proposition
              ========================================== */}
          <div className="lg:col-span-12 mt-8 mb-12">
             <div className={`p-8 sm:p-10 rounded-3xl border ${isNightMode ? "bg-gradient-to-br from-[#09152B] to-[#040812] border-blue-900/30" : "bg-gradient-to-br from-blue-50 to-white border-blue-100"}`}>
                <div className="max-w-3xl mx-auto text-center mb-10 space-y-3">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-sky-400 uppercase tracking-widest block">Workflow & ROI</span>
                  <h3 className={`text-2xl sm:text-3xl font-black font-sans tracking-tight ${isNightMode ? "text-white" : "text-slate-900"}`}>
                    กระบวนการทำงานที่ชัดเจน ผลตอบแทนที่จับต้องได้
                  </h3>
                  <p className="text-sm font-sans text-slate-500 dark:text-slate-400">
                    เราไม่เพียงแต่บริหารงานทั่วไป แต่เรายกระดับมูลค่าทรัพย์สินของคุณผ่าน 4 ขั้นตอนการดำเนินงานเชิงรุก
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                  {/* Connection Line for Desktop */}
                  <div className="hidden lg:block absolute top-6 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-blue-200 via-blue-400 to-emerald-200 dark:from-blue-900 dark:via-sky-700 dark:to-emerald-800 z-0 opacity-50"></div>

                  {[
                    { step: "01", title: "Audit & Analyze", desc: "วิศวกรเข้าประเมินจุดบกพร่องและวิเคราะห์สถานะการเงินของนิติบุคคล", icon: <Search className="w-5 h-5" /> },
                    { step: "02", title: "Plan & Propose", desc: "จัดทำแผน SOP และยื่นข้อเสนอแนวทางลดค่าใช้จ่ายรายเดือน", icon: <FileText className="w-5 h-5" /> },
                    { step: "03", title: "Execute & Manage", desc: "จัดตั้งทีมงานมืออาชีพเข้าบริหารจัดการตามมาตรฐาน ISO 9001", icon: <Settings className="w-5 h-5" /> },
                    { step: "04", title: "Report & ROI", desc: "รายงานผลเรียลไทม์ผ่านแดชบอร์ด ทรัพย์สินมูลค่าเพิ่ม ค่าส่วนกลางลดลง", icon: <LineChart className="w-5 h-5" /> },
                  ].map((s, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center text-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shadow-md border-4 ${isNightMode ? "bg-[#09152B] border-[#040812] text-blue-400" : "bg-white border-blue-50 text-blue-600"}`}>
                        {s.icon}
                      </div>
                      <div className={`p-4 rounded-2xl w-full border ${isNightMode ? "bg-[#0B172E]/80 border-slate-800" : "bg-white border-slate-100 shadow-sm"}`}>
                        <span className={`text-[11px] font-black mb-1 block tracking-wider ${isNightMode ? 'text-sky-400' : 'text-blue-600'}`}>STEP {s.step}</span>
                        <h4 className={`text-sm font-bold font-sans mb-2 ${isNightMode ? 'text-white' : 'text-blue-700'}`}>{s.title}</h4>
                        <p className={`text-xs font-sans leading-relaxed ${isNightMode ? 'text-slate-400' : 'text-slate-600'}`}>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* ==========================================
              LEFT PANEL: 8 Columns (Dashboard)
              ========================================== */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Row 1: KPI Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Stat 1 */}
              <div className={`p-5 rounded-2xl border transition-all ${
                isNightMode ? "bg-[#091224]/80 border-blue-900/30 text-white" : "bg-white border-slate-100 shadow-sm text-slate-800"
              }`}>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1 font-sans">
                  โครงการภายใต้การดูแล
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black font-display tracking-tight text-blue-600 dark:text-sky-400">90</span>
                  <span className="text-xs font-bold text-slate-400 font-sans">แห่ง</span>
                </div>
                <div className="mt-2 text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-sans">ครอบคลุมกรุงเทพฯ & ปริมณฑล</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className={`p-5 rounded-2xl border transition-all ${
                isNightMode ? "bg-[#091224]/80 border-blue-900/30 text-white" : "bg-white border-slate-100 shadow-sm text-slate-800"
              }`}>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1 font-sans">
                  อัตราความพึงพอใจลูกบ้าน
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black font-display tracking-tight text-blue-600 dark:text-sky-400">98.4%</span>
                </div>
                <div className="mt-2 text-[10px] text-blue-500 font-semibold flex items-center gap-1 font-sans">
                  <span>จากประชากรรวม 40,000+ คน</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className={`p-5 rounded-2xl border transition-all ${
                isNightMode ? "bg-[#091224]/80 border-blue-900/30 text-white" : "bg-white border-slate-100 shadow-sm text-slate-800"
              }`}>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1 font-sans">
                  มูลค่าเงินงบประมาณ Opex ประหยัดลง
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black font-display tracking-tight text-blue-600 dark:text-sky-400">35.8%</span>
                </div>
                <div className="mt-2 text-[10px] text-[#D4A017] font-semibold flex items-center gap-1 font-sans">
                  <span>เป้าหมายถัดไปตาม SOP: 40%</span>
                </div>
              </div>
            </div>

            {/* Row 2: Centerpiece image card (Modern Luxury Villa) */}
            <div className={`relative rounded-3xl overflow-hidden border shadow-lg group transition-all duration-500 ${
              isNightMode ? "border-blue-900/30 bg-[#091224]/60" : "border-slate-150 bg-white"
            }`}>
              <div className="aspect-[21/9] w-full relative overflow-hidden bg-slate-955">
                <img 
                  src="/modern_luxury_villa.png" 
                  alt="Modern Luxury Villa centerpiece" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85" />
                
                {/* Featured Tag */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold tracking-widest uppercase rounded shadow-md font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>โครงการวิลล่าต้นแบบบำรุงรักษา</span>
                </div>
                
                {/* Villa detail overlay */}
                <div className="absolute bottom-5 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] font-bold text-sky-400 tracking-widest uppercase block font-sans">ECO-LUXURY VILLA PORTFOLIO</span>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight font-display">Pine Crest Luxury Villa (CS-02)</h2>
                    <p className="text-xs text-slate-300 max-w-lg leading-relaxed font-sans">
                      วิลล่าหรูต้นแบบการบริหารสัญญารักษาความปลอดภัยและประหยัดงบประปา-ไฟฟ้าส่วนกลาง บูรณาการเครื่องสูบน้ำอัตโนมัติอัจฉริยะแบบอินเวอร์เตอร์
                    </p>
                  </div>
                  <div className="flex gap-4 text-xs font-semibold bg-slate-900/70 border border-white/15 px-4 py-2.5 rounded-xl backdrop-blur-sm self-start sm:self-auto font-mono">
                    <div className="text-center">
                      <span className="text-[9px] text-slate-400 block uppercase">ลดค่าน้ำเสีย</span>
                      <span className="text-blue-400 text-sm font-bold">85%</span>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="text-center">
                      <span className="text-[9px] text-slate-400 block uppercase">พลังงานทดแทน</span>
                      <span className="text-[#D4A017] text-sm font-bold">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Progress indicators (Completed Deals & Total Revenue) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Completed Deals Progress Card */}
              <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isNightMode ? "bg-[#091224]/80 border-blue-900/30 text-white" : "bg-white border-slate-100 shadow-sm text-slate-800"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-widest block font-sans">
                      Completed Deals (งานบำรุงรักษาเสร็จสิ้น)
                    </span>
                  </div>
                  <span className="text-sm font-black font-mono text-emerald-500">78%</span>
                </div>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-2xl font-black font-display tracking-tight text-slate-900 dark:text-white">125,79</span>
                  <span className="text-[10px] text-slate-400 font-bold font-sans">ใบงานที่สำเร็จ</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: "78%" }} />
                </div>
              </div>

              {/* Total Revenue Progress Card */}
              <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isNightMode ? "bg-[#091224]/80 border-blue-900/30 text-white" : "bg-white border-slate-100 shadow-sm text-slate-800"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                    <span className="text-xs font-bold text-slate-455 dark:text-slate-400 uppercase tracking-widest block font-sans">
                      Total Revenue (มูลค่าประหยัดสะสมรายเดือน)
                    </span>
                  </div>
                  <span className="text-sm font-black font-mono text-sky-400">34%</span>
                </div>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-2xl font-black font-display tracking-tight text-slate-900 dark:text-white">$43,752K</span>
                  <span className="text-[10px] text-slate-400 font-bold font-sans">ดอลลาร์/เดือน</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-400 h-full rounded-full transition-all duration-1000" style={{ width: "34%" }} />
                </div>
              </div>
            </div>

            {/* Row 4: Bento Analytics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Digital Analytics Bento Card */}
              <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isNightMode ? "bg-[#091224]/80 border-blue-900/30 text-white" : "bg-white border-slate-100 shadow-sm text-slate-800"
              }`}>
                <div className="space-y-1 mb-4 text-left">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-sans">
                    Digital Analytics & Gain
                  </span>
                  <h3 className="text-base font-extrabold tracking-tight font-sans text-slate-900 dark:text-white">
                    การลดงบประมาณเชิงประดุลและวิศวกรรม
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    กราฟแสดงเปอร์เซ็นต์อัตราการลดงบดำเนินงาน (Opex Savings) แยกตามโครงสร้างส่วนกลางอาคาร
                  </p>
                </div>
                
                {/* Vertical Bar Chart SVG */}
                <div className="h-32 flex items-end justify-between px-2 pt-2 border-b border-slate-100 dark:border-slate-800/80">
                  {[
                    { label: "Jul", value: "35%", height: "h-[35%]", color: "bg-slate-200 dark:bg-slate-800" },
                    { label: "Aug", value: "48%", height: "h-[48%]", color: "bg-slate-200 dark:bg-slate-800" },
                    { label: "Sep", value: "62%", height: "h-[62%]", color: "bg-slate-200 dark:bg-slate-800" },
                    { label: "Oct", value: "54%", height: "h-[54%]", color: "bg-slate-200 dark:bg-slate-800" },
                    { label: "Nov", value: "85%", height: "h-[85%]", color: "bg-blue-600 dark:bg-sky-500 shadow-lg shadow-sky-500/20" },
                    { label: "Dec", value: "70%", height: "h-[70%]", color: "bg-slate-250 dark:bg-slate-750" }
                  ].map((bar, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1.5 w-1/8 h-full justify-end group relative" style={{ height: '100%' }}>
                      {/* Floating tooltip */}
                      <span className="absolute -top-7 scale-0 group-hover:scale-100 transition-all bg-slate-900 text-white text-[9px] font-bold font-mono px-1.5 py-0.5 rounded shadow-md pointer-events-none z-20">
                        {bar.value}
                      </span>
                      <div className={`w-6 rounded-t-sm transition-all duration-700 ${bar.height} ${bar.color}`} />
                      <span className="text-[9px] font-bold text-slate-400 font-mono mt-1">{bar.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sales Statistics Bento Card */}
              <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                isNightMode ? "bg-[#091224]/80 border-blue-900/30 text-white" : "bg-white border-slate-100 shadow-sm text-slate-800"
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-sans">
                      Sales Statistic
                    </span>
                    <h3 className="text-base font-extrabold tracking-tight font-sans text-slate-900 dark:text-white">
                      แนวโน้มการเติบโตสัญญาบริการสะสม
                    </h3>
                  </div>
                  <div className="bg-sky-500/10 text-sky-400 text-[10px] font-black font-mono px-2 py-1 rounded">
                    +32.43%
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4 font-sans text-left">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">ผลกำไรสะสม</span>
                    <span className="text-lg font-black font-mono text-slate-900 dark:text-white">$24.9K</span>
                  </div>
                  <div className="w-px h-6 bg-slate-200 dark:bg-slate-800" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">ยอดผู้เข้าชม</span>
                    <span className="text-lg font-black font-mono text-slate-900 dark:text-white">$24K</span>
                  </div>
                </div>

                {/* SVG Sparkline Graph */}
                <div className="h-20 w-full relative">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <path 
                      d="M 0 30 L 0 20 Q 20 10, 40 25 T 80 5 T 100 2 L 100 30 Z" 
                      fill="url(#chartGrad)" 
                    />
                    {/* Curve line */}
                    <path 
                      d="M 0 20 Q 20 10, 40 25 T 80 5 T 100 2" 
                      fill="none" 
                      stroke="#2563eb" 
                      strokeWidth="1.5" 
                      strokeLinecap="round"
                    />
                    {/* Pulsing indicator node */}
                    <circle cx="100" cy="2" r="1.5" fill="#38bdf8" className="animate-ping" />
                    <circle cx="100" cy="2" r="1" fill="#2563eb" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* ==========================================
              RIGHT PANEL: 4 Columns (Listing Board)
              ========================================== */}
          <div className={`lg:col-span-4 border-l p-4 sm:p-4 rounded-2xl flex flex-col gap-3.5 max-h-[1400px] transition-all duration-300 self-start ${
            isNightMode ? "border-blue-900/20 bg-[#050a14]/30" : "border-white/50 bg-white/20"
          }`}>
            <div className="flex flex-col gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-sans">
                    Listing Board
                  </span>
                  <h3 className={`text-base font-extrabold tracking-tight font-sans ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
                    พอร์ตโครงการบริหาร
                  </h3>
                </div>
                <span className="text-[9px] font-bold bg-blue-600/10 text-blue-600 dark:text-sky-400 px-2 py-0.5 rounded font-mono flex-shrink-0">
                  พบ {filteredPortfolioItems.length} แห่ง
                </span>
              </div>
              {isAdminLoggedIn && (
                <button 
                  onClick={() => setIsAddProjectModalOpen(true)}
                  className="mt-1 w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold rounded-lg cursor-pointer transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5 border-0"
                >
                  <span>➕ เพิ่มโครงการใหม่</span>
                </button>
              )}
            </div>

            {/* List of scrollable project cards */}
            <div className="space-y-2 overflow-y-auto max-h-[850px] pr-1 scrollbar-thin flex-1">
              {filteredPortfolioItems.slice((portfolioPage - 1) * 6, portfolioPage * 6).length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-450 font-sans">
                  ไม่พบรายการผลงานสะสมที่สืบค้น...
                </div>
              ) : (
                filteredPortfolioItems.slice((portfolioPage - 1) * 6, portfolioPage * 6).map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedPortfolioItem(item)}
                    className={`p-2.5 rounded-2xl border transition-all duration-300 hover:shadow-md cursor-pointer flex gap-2.5 text-left ${
                      isNightMode 
                        ? "bg-[#091224]/80 border-blue-900/40 hover:bg-[#0c1933] text-white" 
                        : "bg-white border-slate-100 hover:bg-slate-50 text-slate-800"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-900">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[8px] font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 font-sans truncate">
                            {item.tag}
                          </span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <span className="text-[8px] font-bold bg-[#D4A017]/10 text-[#D4A017] px-1.5 py-0.5 rounded font-mono">
                              {item.stats}
                            </span>
                            {isAdminLoggedIn && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteProject(item.id);
                                }}
                                className="p-1 rounded bg-red-500/10 text-red-500 hover:bg-red-500/25 transition-all cursor-pointer border border-red-500/20"
                                title="ลบโครงการ"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </div>
                        </div>
                        <h4 className={`text-xs font-bold leading-tight font-sans truncate ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-slate-400 leading-snug line-clamp-2 mt-1 font-sans">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Micro pagination controls inside Listing Board sidebar */}
            {Math.ceil(filteredPortfolioItems.length / 6) > 1 && (
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-850 pt-3 text-xs font-bold">
                <button 
                  onClick={() => setPortfolioPage(prev => Math.max(1, prev - 1))}
                  disabled={portfolioPage === 1}
                  className={`px-3 py-1.5 rounded-lg border transition-all flex items-center justify-center gap-1 cursor-pointer font-sans ${
                    portfolioPage === 1 
                      ? "opacity-30 cursor-not-allowed border-slate-200/10 text-slate-450" 
                      : isNightMode ? "border-blue-900/40 hover:bg-slate-800 text-slate-300" : "border-slate-350 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>ก่อนหน้า</span>
                </button>
                <span className="font-mono text-slate-400 text-[10px]">
                  หน้า {portfolioPage} / {Math.ceil(filteredPortfolioItems.length / 6)}
                </span>
                <button 
                  onClick={() => setPortfolioPage(prev => Math.min(Math.ceil(filteredPortfolioItems.length / 6), prev + 1))}
                  disabled={portfolioPage === Math.ceil(filteredPortfolioItems.length / 6)}
                  className={`px-3 py-1.5 rounded-lg border transition-all flex items-center justify-center gap-1 cursor-pointer font-sans ${
                    portfolioPage === Math.ceil(filteredPortfolioItems.length / 6) 
                      ? "opacity-30 cursor-not-allowed border-slate-200/10 text-slate-450" 
                      : isNightMode ? "border-blue-900/40 hover:bg-slate-800 text-slate-300" : "border-slate-350 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <span>ถัดไป</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Row 6: Interactive Simulators Panel (Full Width) */}
          <div className={`lg:col-span-12 p-5 rounded-2xl border transition-all ${
            isNightMode ? "bg-[#091224]/80 border-blue-900/30 text-white" : "bg-white border-slate-100 shadow-sm text-slate-800"
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-3 mb-4 gap-2">
              <div className="space-y-0.5 text-left">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-sans">
                  Interactive Controls
                </span>
                <h3 className="text-base font-extrabold tracking-tight font-sans text-slate-900 dark:text-white">
                  ห้องปฏิบัติการจำลองสมดุลส่วนกลาง (IoT & Audit Lab)
                </h3>
              </div>

              {/* Sub tabs switcher */}
              <div className="bg-slate-100 dark:bg-slate-850 p-0.5 rounded-xl flex gap-1 text-[10px] font-bold self-start sm:self-auto font-sans border border-slate-200/20">
                <button 
                  onClick={() => setActiveSimTab("iot")}
                  className={`px-4 py-1.5 rounded-lg cursor-pointer transition-all ${activeSimTab === "iot" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-sky-400 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}
                >
                  IoT สระน้ำ
                </button>
                <button 
                  onClick={() => setActiveSimTab("pdca")}
                  className={`px-4 py-1.5 rounded-lg cursor-pointer transition-all ${activeSimTab === "pdca" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-sky-400 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}
                >
                  ISO 9001 PDCA
                </button>
                <button 
                  onClick={() => setActiveSimTab("proposal")}
                  className={`px-4 py-1.5 rounded-lg cursor-pointer transition-all ${activeSimTab === "proposal" ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-sky-400 shadow-sm" : "text-slate-500 dark:text-slate-400"}`}
                >
                  ประเมินแผนลดงบ
                </button>
              </div>
            </div>

            {/* Render Selected Simulator Component */}
            <div className="pt-2 text-left">
              {activeSimTab === "iot" && (
                <PoolWaterMonitor isNightMode={isNightMode} />
              )}
              {activeSimTab === "pdca" && (
                <PDCAInteractive isNightMode={isNightMode} />
              )}
              {activeSimTab === "proposal" && (
                <ProposalCalculator isNightMode={isNightMode} />
              )}
            </div>
          </div>

          {/* Row 7: Standalone Before/After Renovation Slider (Full Width) */}
          <div className={`lg:col-span-12 p-5 rounded-2xl border transition-all ${
            isNightMode ? "bg-[#091224]/80 border-blue-900/30 text-white" : "bg-white border-slate-100 shadow-sm text-slate-800"
          }`}>
            <div className="border-b border-slate-100 dark:border-slate-850 pb-3 mb-4 text-left">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-sans">
                Case Studies Renovation
              </span>
              <h3 className="text-base font-extrabold tracking-tight font-sans text-slate-900 dark:text-white">
                เปรียบเทียบก่อน-หลัง การปรับปรุงโครงสร้าง (Renovation Before/After)
              </h3>
            </div>
            <BeforeAfterSlider isNightMode={isNightMode} />
          </div>
        </div>
      )}
      {/* =========================================================================
          PAGE 2: ABOUT PAGE (เกี่ยวกับเรา — PREMUIM PROPERTY)
          ========================================================================= */}
      {activeMenu === "about" && (
        <div className={`py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-12 transition-all duration-300 ${
          isNightMode ? "text-white" : "text-slate-850"
        }`}>
          {/* Header Area in Glassmorphism Card */}
          <ScrollReveal direction="up" duration={0.6}>
            <div className={`p-8 sm:p-12 rounded-3xl backdrop-blur-xl text-center max-w-4xl mx-auto mb-12 space-y-4 relative overflow-hidden border ${
              isNightMode 
                ? "bg-[#09152B]/30 border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),_0_20px_50px_rgba(0,0,0,0.3)] text-white" 
                : "bg-white/45 border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)] text-slate-800"
            }`}>
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest block font-sans">นวัตกรรมและวิชาชีพบริหารนิติบุคคล</span>
                <h1 className={`text-4xl sm:text-5xl font-black tracking-tight leading-normal font-display ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>
                  เกี่ยวกับเรา <span className="text-[#D4A017]">PREMIUM PROPOTY</span>
                </h1>
                <div className="w-16 h-0.5 bg-[#D4A017] mx-auto rounded"></div>
                <p className={`text-sm font-sans max-w-2xl mx-auto leading-relaxed ${isNightMode ? "text-slate-100 drop-shadow-sm" : "text-slate-650"}`}>
                  ทีมผู้จัดการกองทุนและวิศวกรวิชาชีพควบคุมคุณภาพระดับสากล ภายใต้ข้อตกลงระดับบริการ (SLA) และเกณฑ์สากล ISO 9001:2015 ในการดูแลคุ้มครองผลงานอสังหาริมทรัพย์ระดับพรีเมียม
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Intro Grid with Glassmorphic details (30% opacity) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className={`text-2xl font-bold font-sans ${isNightMode ? "text-white drop-shadow-sm" : "text-[#0F2B46]"}`}>วิสัยทัศน์แห่งความโปร่งใสและวินัยสูงสุด</h2>
              <p className={`text-sm leading-relaxed ${isNightMode ? "text-slate-100 drop-shadow-sm" : "text-slate-650"}`}>
                เรามุ่งมั่นบริหารจัดการอสังหาริมทรัพย์ด้วยมาตรฐานระดับมืออาชีพ เพื่อความปลอดภัย ความสบายใจ และคุณภาพชีวิตที่ดีกว่าในทุกพื้นที่ ภายใต้แบรนด์การจัดการ <span className="font-bold text-[#D4A017]">Premium Propoty</span> ซึ่งได้บุกเบิกการบริหารจัดการนิติบุคคลอาคารชุด และคอมมูนิตี้หมู่บ้านจัดสรร ด้วยระบบตรวจสอบสดบนคลาวด์และระเบียบช่างซ่อมบำรุงเชิงรุก
              </p>
              <p className={`text-sm leading-relaxed ${isNightMode ? "text-slate-100 drop-shadow-sm" : "text-slate-650"}`}>
                เรามุ่งทำลายเกราะการทุจริตแบบเดิมๆ เช่น ค่านายหน้าฝ่ายช่างจัดซื้อ การคลาดเคลื่อนเงินสถิติส่วนกลาง และการละเลยระบบเซฟตี้ความปลอดภัยส่วนกลาง โดยเราประกันวินัยการทำงานด้วยสมุดคุมมาตรฐาน SOP และการยกกำลังชุดวิศวกรกู้ภัยฉุกเฉินภายในเวลาจำกัด 1 ชั่วโมง
              </p>
              
              <div className="flex gap-4">
                <div className={`p-4 rounded-lg text-center flex-1 font-sans backdrop-blur-md border ${
                  isNightMode 
                    ? "bg-[#09152B]/40 border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] text-slate-200" 
                    : "bg-white/45 border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_8px_32px_rgba(15,23,42,0.04)] text-slate-700"
                }`}>
                  <span className={`block text-xl font-bold ${isNightMode ? "text-emerald-400" : "text-emerald-600"}`}>100%</span>
                  <span className={`text-[10px] ${isNightMode ? "text-slate-200" : "text-slate-500"}`}>บัญชีโปร่งใสคลาวด์สด</span>
                </div>
                <div className={`p-4 rounded-lg text-center flex-1 font-sans backdrop-blur-md border ${
                  isNightMode 
                    ? "bg-[#09152B]/40 border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] text-slate-200" 
                    : "bg-white/45 border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_8px_32px_rgba(15,23,42,0.04)] text-slate-700"
                }`}>
                  <span className={`block text-xl font-bold ${isNightMode ? "text-sky-400" : "text-sky-650"}`}>&lt; 1 ชั่วโมง</span>
                  <span className={`text-[10px] ${isNightMode ? "text-slate-200" : "text-slate-500"}`}>วิศวกรเคลื่อนบำรุงภัย</span>
                </div>
                <div className={`p-4 rounded-lg text-center flex-1 font-sans backdrop-blur-md border ${
                  isNightMode 
                    ? "bg-[#09152B]/40 border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] text-slate-200" 
                    : "bg-white/45 border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_8px_32px_rgba(15,23,42,0.04)] text-slate-700"
                }`}>
                  <span className="block text-xl font-bold text-blue-600 dark:text-sky-400">ISO 9001</span>
                  <span className={`text-[10px] ${isNightMode ? "text-slate-200" : "text-slate-500"}`}>ควบคุมระบบสากล</span>
                </div>
              </div>
            </div>

            {/* Glassmorphic Widget Container with 30% Opacity */}
            <div className={`lg:col-span-6 p-8 rounded-2xl backdrop-blur-xl space-y-6 border ${
              isNightMode 
                ? "bg-[#09152B]/40 border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_50px_rgba(0,0,0,0.3)] text-slate-100" 
                : "bg-white/45 border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)] text-slate-700"
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 rounded-lg">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className={`font-bold text-sm tracking-tight font-sans ${isNightMode ? "text-white" : "text-[#0F2B46]"}`}>ค่านิยมหลักแห่งวิชาชีพคุมระบบ</h4>
                  <p className={`text-[10px] font-mono ${isNightMode ? "text-slate-300" : "text-slate-400"}`}>CORE COMPLIANCE FRAMEWORK</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-md font-mono text-[10px] font-extrabold ${isNightMode ? "bg-sky-500/15 text-sky-400" : "bg-blue-600/10 text-blue-600"}`}>01</div>
                  <div className="text-left">
                    <h5 className={`font-extrabold text-sm ${isNightMode ? "text-white" : "text-slate-900"}`}>TRUST & SECURITY (ความปลอดภัยและความน่าเชื่อถือ)</h5>
                    <p className={`text-[11px] mt-0.5 ${isNightMode ? "text-slate-200" : "text-slate-650"}`}>
                      มุ่งเน้นการปฏิบัติตามมาตรฐาน ป้องกัน ดูแลจัดระเบียบตึก ชุมชน ด้วยความรอบคอบและคำนึงถึงความปลอดภัยสูงสุดในชีวิตและทรัพย์สินของลูกบ้าน
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-md font-mono text-[10px] font-extrabold ${isNightMode ? "bg-sky-500/15 text-sky-400" : "bg-blue-600/10 text-blue-600"}`}>02</div>
                  <div className="text-left">
                    <h5 className={`font-extrabold text-sm ${isNightMode ? "text-white" : "text-slate-900"}`}>PROFESSIONAL TEAM (ทีมงานมืออาชีพ)</h5>
                    <p className={`text-[11px] mt-0.5 ${isNightMode ? "text-slate-200" : "text-slate-650"}`}>
                      บุคลากรทุกท่านผ่านสัมภาษณ์ คัดสรร ตรวจสอบประวัติอาชญากรรม และเข้าร่วมโครงการฝึกอบรมทักษะเทคนิควินัยตรงสายงานอย่างเข้มงวด
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-md font-mono text-[10px] font-extrabold ${isNightMode ? "bg-sky-500/15 text-sky-400" : "bg-blue-600/10 text-blue-600"}`}>03</div>
                  <div className="text-left">
                    <h5 className={`font-extrabold text-sm ${isNightMode ? "text-white" : "text-slate-900"}`}>MANAGEMENT EXCELLENCE (การบริหารจัดการอย่างมีประสิทธิภาพ)</h5>
                    <p className={`text-[11px] mt-0.5 ${isNightMode ? "text-slate-200" : "text-slate-650"}`}>
                      วิเคราะห์แผนลดค่าใช้จ่ายส่วนเกิน บำรุงรักษาเชิงป้องกันคุมค่าสระกระด้างและระบบชิลเลอร์ ลดอัตราความสิ้นเปลืองอย่างคุ้มค่าได้ผลระยะยาว
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-md font-mono text-[10px] font-extrabold ${isNightMode ? "bg-sky-500/15 text-sky-400" : "bg-blue-600/10 text-blue-600"}`}>04</div>
                  <div className="text-left">
                    <h5 className={`font-extrabold text-sm ${isNightMode ? "text-white" : "text-slate-900"}`}>QUALITY STANDARD (ระบบบริหารคุณภาพมาตรฐาน)</h5>
                    <p className={`text-[11px] mt-0.5 ${isNightMode ? "text-slate-200" : "text-slate-650"}`}>
                      การปฏิบัติตามมาตรฐานระบบสากล ISO 9001:2015 ในการจัดจดบันทึกรายงาน วิเคราะห์ความสอดคล้อง วางแผน PDCA รับมือทุจริตทุกมิติ
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-md font-mono text-[10px] font-extrabold ${isNightMode ? "bg-sky-500/15 text-sky-400" : "bg-blue-600/10 text-blue-600"}`}>05</div>
                  <div className="text-left">
                    <h5 className={`font-extrabold text-sm ${isNightMode ? "text-white" : "text-slate-900"}`}>TRANSPARENCY (ความโปร่งใส ตรวจสอบได้)</h5>
                    <p className={`text-[11px] mt-0.5 ${isNightMode ? "text-slate-200" : "text-slate-650"}`}>
                      ให้คณะกรรมการตรวจสอบตรวจทานสมุดรายงานงบประดุล ตัวเลขบัญชี และสถานะการบริหารได้เรียลไทม์ผ่านระบบคลาวด์โปร่งใสของเรา
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members inside About Page */}
          <div className="pt-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2 relative">
              <span className="text-xs font-mono font-bold text-[#D4A017] uppercase tracking-widest block">คณะวิญญูชนร่วมสร้างวินัยอาคาร</span>
              <h3 className={`text-2xl font-black font-sans ${isNightMode ? "text-white" : "text-slate-900"}`}>ทีมวิศวกรระบบและผู้สอบบัญชีตรงสำหรับอาคารคุณ</h3>
              {isAdminLoggedIn && (
                <button
                  onClick={() => setIsAddTeamMemberModalOpen(true)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold font-sans hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  เพิ่มสมาชิกทีม
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {teamMembersState.map((member: any, index: number) => (
                <div 
                  key={index} 
                  className={`rounded-xl overflow-hidden hover:scale-[1.01] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-left group backdrop-blur-xl border ${
                    isNightMode 
                      ? "bg-[#09152B]/40 border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] text-white" 
                      : "bg-white/45 border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_12px_40px_rgba(15,23,42,0.04)] text-slate-800"
                  }`}
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
                      {isAdminLoggedIn && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTeamMember(index);
                          }}
                          className="absolute top-3 left-3 w-7 h-7 bg-red-500/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center cursor-pointer transition-all z-10 shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="p-4 space-y-2">
                      <span className="text-[#D4A017] font-mono text-[9px] font-bold uppercase tracking-widest">OFFICER-0{index + 1}</span>
                      <h4 className={`font-bold text-sm font-sans tracking-tight ${isNightMode ? "text-white" : "text-slate-900"}`}>{member.name}</h4>
                      <p className={`text-[11px] font-semibold ${isNightMode ? "text-emerald-400" : "text-emerald-600"}`}>{member.role}</p>
                      
                      <p className={`text-[11px] leading-relaxed font-sans ${isNightMode ? "text-slate-200" : "text-slate-600"}`}>
                        {member.bio}
                      </p>

                      <div className={`border-t pt-2 mt-2 space-y-1 text-[10px] ${isNightMode ? "border-white/10 text-slate-300" : "border-slate-100 text-slate-500"}`}>
                        <div>
                          <strong className="text-[#D4A017]">สถิติงาน:</strong> {member.experience}
                        </div>
                        <div className="mt-1 font-sans">
                          <span className={`inline-block py-0.5 px-2 rounded text-[9px] font-bold ${
                            isNightMode 
                              ? "bg-blue-950/60 text-blue-200 border border-white/5" 
                              : "bg-blue-50 text-blue-700 border border-blue-100"
                          }`}>
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

          {/* PrimeCare Brand & Uniform Showcase from CI */}
          <ScrollReveal direction="up" duration={0.7}>
            <PrimeCareBrandShowcase isNightMode={isNightMode} />
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
                  <span>ตัวอย่างโครงการและรายละเอียดงานจริงทั้งหมด ({portfolioItemsState[activePortfolioType].length} โครงการ)</span>
                </h2>
                <p className="text-xs text-slate-450 mt-1 font-sans">
                  แสดงรายละเอียดและผลลัพธ์คัดกรอง OpEx สแกนท่อรั่วซึม บำรุงระบบส่วนกลาง และประสิทธิภาพการใช้ปั๊มน้ำสอดคล้องมาตรฐานเกณฑ์สากล ISO 9001
                </p>
              </div>
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                {isAdminLoggedIn && (
                  <button 
                    onClick={() => setIsAddProjectModalOpen(true)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold rounded-lg cursor-pointer transition-all shadow-md active:scale-95 border-0"
                  >
                    ➕ เพิ่มโครงการใหม่
                  </button>
                )}
                <span className="text-[10px] font-mono bg-[#D4A017]/15 text-[#D4A017] uppercase tracking-wider px-2 py-1 rounded font-extrabold border border-[#D4A017]/30">
                  {filteredPortfolioItems.length} PROJECTS IN {activePortfolioType === "estate" ? "HOUSING" : activePortfolioType === "condo" ? "CONDOMINIUM" : "OFFICE PLAZA"}
                </span>
              </div>
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
                  พบ <strong>{filteredPortfolioItems.length}</strong> จาก <strong>{portfolioItemsState[activePortfolioType].length}</strong> โครงการ 
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
                    <div 
                      onClick={() => setSelectedPortfolioItem(item)}
                      className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col h-full backdrop-blur-xl border cursor-pointer ${
                        isNightMode 
                          ? "bg-[#09152B]/40 border-white/20 border-t-white/35 border-l-white/30 border-r-white/10 border-b-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),_0_20px_50px_rgba(0,0,0,0.3)] text-slate-100" 
                          : "bg-white/45 border-white/50 border-t-white/70 border-l-white/60 border-r-slate-300/40 border-b-slate-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),_0_20px_50px_rgba(15,23,42,0.06)] text-slate-800"
                      }`}
                    >
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

                        {isAdminLoggedIn && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(item.id);
                            }}
                            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg shadow-md cursor-pointer transition-all border border-red-500 z-10"
                            title="ลบโครงการ"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}

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


        </div>
      )}

      </main>
        </div>
      </div>

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

      {/* HIGH-FIDELITY PROJECT DETAILS INTERACTIVE MODAL OVERLAY */}
      <AnimatePresence>
        {selectedPortfolioItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className={`relative max-w-4xl w-full rounded-3xl shadow-2xl border overflow-hidden p-6 max-h-[90vh] overflow-y-auto ${
                isNightMode ? "bg-[#0b1325] border-blue-900/50 text-slate-100" : "bg-white border-slate-200 text-slate-800"
              }`}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedPortfolioItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="space-y-6">
                
                {/* Header */}
                <div className="border-b border-slate-100 dark:border-slate-850 pb-4 pr-10 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-sky-400 font-sans">
                      {selectedPortfolioItem.tag}
                    </span>
                    <span className="text-[9px] font-bold bg-[#D4A017]/10 text-[#D4A017] px-2 py-0.5 rounded font-mono">
                      {selectedPortfolioItem.stats}
                    </span>
                  </div>
                  <h2 className={`text-xl sm:text-2xl font-black tracking-tight font-display ${isNightMode ? 'text-white' : 'text-slate-900'}`}>
                    {selectedPortfolioItem.title}
                  </h2>
                </div>

                {/* Grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                  
                  {/* Left Column: Image & Info (5 columns) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                      <img 
                        src={selectedPortfolioItem.image} 
                        alt={selectedPortfolioItem.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-2 font-sans">
                      <span className={`text-[10px] font-bold uppercase tracking-widest block ${isNightMode ? 'text-slate-400' : 'text-slate-500'}`}>คำอธิบายโครงการ</span>
                      <p className={`text-xs leading-relaxed ${isNightMode ? 'text-slate-350' : 'text-slate-600'}`}>
                        {selectedPortfolioItem.description}
                      </p>
                    </div>
                    <div className={`p-4 rounded-xl border border-dashed text-xs leading-relaxed font-sans ${isNightMode ? 'border-slate-800 bg-slate-900/40 text-slate-400' : 'border-slate-300 bg-slate-100/50 text-slate-700'}`}>
                      <span className={`font-bold block mb-1 ${isNightMode ? 'text-slate-200' : 'text-slate-900'}`}>ผลงานปฏิบัติการจริง:</span>
                      {selectedPortfolioItem.detail}
                    </div>
                  </div>

                  {/* Right Column: Embedded Simulators (7 columns) */}
                  <div className="lg:col-span-7 space-y-4 text-left">
                    <div className={`p-4 rounded-2xl border ${isNightMode ? 'border-slate-800 bg-slate-900/40' : 'border-slate-300 bg-slate-100/50'}`}>
                      <h4 className={`text-xs font-bold mb-3 font-sans flex items-center gap-1.5 ${isNightMode ? 'text-slate-200' : 'text-slate-900'}`}>
                        <span className="w-1.5 h-3.5 bg-blue-600 rounded-full inline-block"></span>
                        <span>ระบบจำลองการตรวจวัดวิเคราะห์ค่าน้ำส่วนกลาง (IoT Pool Monitor)</span>
                      </h4>
                      <PoolWaterMonitor isNightMode={isNightMode} />
                    </div>
                  </div>

                </div>

                {/* Footer buttons */}
                <div className="flex justify-end gap-3 border-t border-slate-100 dark:border-slate-850 pt-4 font-sans text-xs">
                  <button 
                    onClick={() => setSelectedPortfolioItem(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-750 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer font-bold"
                  >
                    ปิดหน้าต่าง
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedPortfolioItem(null);
                      setIsContactOpen(true);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 dark:bg-sky-500 text-white font-bold hover:bg-blue-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-blue-500/10 active:scale-95"
                  >
                    <span>ปรึกษาผู้ตรวจระบบโครงการนี้</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MULTI-STEP CONSULTATION BOOKING DIALOG MODAL */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

      {/* ADMIN PORTAL & LOGISTICS MODALS */}
      <AdminLoginModal />
      <AddProjectModal />
      <AddTeamMemberModal />

      {/* Floating Operational Dispatch Chat Button */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700 transition-all z-50 cursor-pointer shadow-blue-500/30"
      >
        {isChatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {(!isChatOpen && [
          { id: "kianna", unread: 2 },
          { id: "jaydon", unread: 0 },
          { id: "mira", unread: 1 }
        ].reduce((sum, p) => sum + p.unread, 0) > 0) && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-slate-900 text-white font-mono">
            3
          </span>
        )}
      </button>

      {/* Floating Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-24 right-6 w-[340px] sm:w-[450px] z-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${isNightMode ? "bg-[#091224]/95 border-blue-900/50 backdrop-blur-xl" : "bg-white/95 border-slate-200 backdrop-blur-xl"}`}
          >
            <div className={`p-4 border-b ${isNightMode ? "border-slate-850" : "border-slate-100"}`}>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5 text-left">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-sans">
                    Operational Dispatch
                  </span>
                  <h3 className="text-sm font-extrabold tracking-tight font-sans text-slate-900 dark:text-white">
                    ระบบประสานงานวิศวกรด่วนเชิงรุก
                  </h3>
                </div>
                <span className="flex items-center gap-1.5 text-[9px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="hidden sm:inline">ออนไลน์</span>
                </span>
              </div>
            </div>

            <div className="flex h-[360px]">
              {/* Chat Partner list: Sidebar */}
              <div className={`w-[110px] sm:w-[130px] flex-shrink-0 flex flex-col gap-1.5 p-2 overflow-y-auto border-r scrollbar-thin ${isNightMode ? "border-slate-850" : "border-slate-100"}`}>
                {[
                  { id: "kianna", name: "Kianna G.", role: "วิศวกร SOP", avatar: "KG", unread: 2 },
                  { id: "jaydon", name: "Jaydon M.", role: "ผู้ตรวจ Opex", avatar: "JM", unread: 0 },
                  { id: "mira", name: "Mira M.", role: "ผู้สอบทาน", avatar: "MM", unread: 1 }
                ].map((p) => (
                  <button 
                    key={p.id}
                    onClick={() => setActiveChatPartner(p.id as any)}
                    className={`p-2 rounded-xl text-left transition-all flex flex-col items-center justify-center gap-1 cursor-pointer relative ${
                      activeChatPartner === p.id 
                        ? "bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-sky-400" 
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold font-sans text-slate-800 dark:text-white">
                      {p.avatar}
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-[10px] font-bold font-sans leading-tight">{p.name}</span>
                      <span className="text-[8px] text-slate-450 leading-none mt-0.5">{p.role}</span>
                    </div>
                    {p.unread > 0 && activeChatPartner !== p.id && (
                      <span className="absolute top-1 right-1 text-[8px] font-black bg-emerald-500 text-white w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono">
                        {p.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Chat logs & Input fields: Main Chat */}
              <div className="flex-1 flex flex-col justify-between p-3 min-w-0 bg-slate-50/50 dark:bg-[#050a14]/50">
                <div className="flex-1 overflow-y-auto max-h-[260px] space-y-3 mb-3 pr-2 scrollbar-thin">
                  {(chatMessages[activeChatPartner] || []).map((msg, idx) => (
                    <div key={idx} className={`flex flex-col max-w-[90%] ${msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}>
                      <div className={`p-2.5 rounded-2xl text-xs font-medium leading-relaxed shadow-sm text-left ${
                        msg.sender === "user" 
                          ? "bg-blue-600 text-white rounded-tr-none" 
                          : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/50 dark:border-slate-700"
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-slate-400 mt-1 font-mono">{msg.timestamp}</span>
                    </div>
                  ))}
                  {isChatTyping && (
                    <div className="flex items-center gap-1.5 mr-auto p-2.5 bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none w-14 border border-slate-200/50 dark:border-slate-700">
                      <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-auto">
                  <input 
                    type="text"
                    value={chatInputText}
                    onChange={(e) => setChatInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                    placeholder="พิมพ์ตอบกลับ..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white focus:ring-1 focus:ring-blue-600 dark:focus:ring-sky-500 placeholder-slate-400 font-sans shadow-sm"
                  />
                  <button 
                    onClick={handleSendChatMessage}
                    className="bg-blue-600 dark:bg-sky-500 text-white p-2 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
