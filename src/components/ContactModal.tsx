import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, CheckSquare, Sparkles, Building, User, Mail, Phone, Clock } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "condo",
    propertyName: "",
    role: "committee_member",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate premium API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: "",
      email: "",
      phone: "",
      propertyType: "condo",
      propertyName: "",
      role: "committee_member",
      notes: ""
    });
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div id="contact-modal-portal" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      
      {/* Dark overlay backdrop */}
      <div 
        id="modal-backdrop"
        onClick={resetForm}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Main modal bounding box */}
      <div 
        id="modal-card-container" 
        className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg z-10 border border-slate-200"
      >
        {/* Sleek top status colored indicator strip */}
        <div className="h-2 w-full bg-gradient-to-r from-[#0F2B46] via-[#16A34A] to-[#D4A017]"></div>

        {/* Close Button */}
        <button
          id="btn-close-modal"
          onClick={resetForm}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full transition-colors focus:ring-1 focus:ring-blue-900"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal content body */}
        <div className="p-6 md:p-8">
          
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <div key="form-container">
                {/* Header text */}
                <div className="mb-6">
                  <span className="text-xs font-mono font-bold text-emerald-700 tracking-wider uppercase">
                    การประเมินสิทธิ์เบื้องต้นตามระบบมาตรฐาน ISO 9001:2015
                  </span>
                  <h3 className="text-2xl font-black text-[#0F2B46] tracking-tight mt-1">
                    ลงทะเบียนขอคำปรึกษาและเข้าตรวจสอบคุณภาพอาคาร
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    ยกระดับการพัฒนาโครงการและการจัดสัดส่วนพื้นที่ของคุณ ด้วยผู้เชี่ยวชาญ คณะทำงานบัญชีที่ซื่อตรง และระบบวิศวกรรมที่เสถียร
                  </p>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-2 mb-6">
                  <div className={`h-1 flex-1 rounded ${step >= 1 ? "bg-[#0F2B46]" : "bg-gray-200"}`}></div>
                  <div className={`h-1 flex-1 rounded ${step >= 2 ? "bg-[#0F2B46]" : "bg-gray-200"}`}></div>
                </div>

                <form id="frm-contact-modal" onSubmit={step === 1 ? handleNextStep : handleSubmit} className="space-y-4 text-left">
                  
                  {step === 1 ? (
                    <div className="space-y-4">
                      {/* Personal metrics */}
                      <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">ขั้นตอนที่ 1: ข้อมูลและบทบาทผู้ติดต่อนัดหมาย</p>
                      
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">ชื่อ - นามสกุลของคุณ</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 w-4.5 h-4.5 text-slate-400" />
                          <input
                            id="ipt-contact-name"
                            type="text"
                            name="name"
                            required
                            placeholder="เช่น สมชาย พัฒนพงศ์"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="text-xs font-medium w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#0F2B46] focus:border-[#0F2B46] text-slate-900 placeholder-slate-450"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 block">อีเมลสำหรับติดต่อประสานงาน</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 w-4.5 h-4.5 text-slate-400" />
                            <input
                              id="ipt-contact-email"
                              type="email"
                              name="email"
                              required
                              placeholder="somchai@property.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="text-xs font-medium w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#0F2B46] focus:border-[#0F2B46] text-slate-900 placeholder-slate-450"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-gray-700 block">เบอร์โทรศัพท์ส่วนตัว/ติดต่อตรง</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 w-4.5 h-4.5 text-slate-400" />
                            <input
                              id="ipt-contact-phone"
                              type="tel"
                              name="phone"
                              required
                              placeholder="เช่น 081-728-1090"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="text-xs font-medium w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#0F2B46] focus:border-[#0F2B46] text-slate-900 placeholder-slate-450"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">บทบาทหรืองานประสานงานของคุณในโครงการ</label>
                        <select
                          id="select-contact-role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="text-xs font-medium w-full bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#0F2B46] focus:border-[#0F2B46] text-slate-900"
                        >
                          <option value="committee_member" className="bg-white text-slate-900">สมาชิกหรือกรรมการนิติบุคคลโครงการ (JMC)</option>
                          <option value="board_member" className="bg-white text-slate-900">ประธานคณะกรรมการนิติบุคคล / ประธานฝ่ายที่ปรึกษา</option>
                          <option value="building_owner" className="bg-white text-slate-900">ตัวแทนผู้จัดสรรโครงการ / บริษัทผู้พัฒนาอสังหาริมทรัพย์</option>
                          <option value="tenant_representative" className="bg-white text-slate-900">ตัวแทนผู้เช่าเชิงพาณิชย์ / ผู้อำนวยการส่วนเทคนิคอาคาร</option>
                        </select>
                      </div>

                      <button
                        id="btn-modal-step1-next"
                        type="submit"
                        className="w-full bg-[#0F2B46] hover:bg-[#163a5d] text-white py-3.5 rounded-xl font-bold font-sans text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 mt-2"
                      >
                        <span>ดำเนินการต่อเพื่อระบุข้อมูลพื้นที่โครงการ</span>
                        <X className="w-3.5 h-3.5 rotate-45" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Property parameters */}
                      <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">ขั้นตอนที่ 2: ข้อกำหนดและขอบเขตพื้นที่อาคาร</p>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">ชื่อโครงการ / ชื่อตึกเฟสอาคาร</label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 w-4.5 h-4.5 text-slate-400" />
                          <input
                            id="ipt-contact-property-name"
                            type="text"
                            name="propertyName"
                            required
                            placeholder="เช่น โครงการ แกรนด์ การ์เดน อาคาร เอ"
                            value={formData.propertyName}
                            onChange={handleInputChange}
                            className="text-xs font-medium w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#0F2B46] focus:border-[#0F2B46] text-slate-900 placeholder-slate-450"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">กลุ่มและลักษณะทางโครงสร้างอสังหาริมทรัพย์</label>
                        <select
                          id="select-contact-property-type"
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleInputChange}
                          className="text-xs font-medium w-full bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#0F2B46] focus:border-[#0F2B46] text-slate-900"
                        >
                          <option value="condo" className="bg-white text-slate-900">โครงการแนวสูง อาคารชุดชุดพักอาศัย (คอนโดมิเนียม)</option>
                          <option value="estate" className="bg-white text-slate-900">โครงการแนวราบ หมู่บ้านเดี่ยว / ทาวน์โฮม (หมู่บ้านจัดสรร)</option>
                          <option value="office" className="bg-white text-slate-900">อาคารสำนักงานและอาคารพาณิชย์เชิงธุรกิจ (ตึกออฟฟิศ / มิกซ์ยูส)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700 block">ข้อพิจารณา ข้อกังวล หรือความต้องการเพิ่มเติม (ระบุได้ตามต้องการ)</label>
                        <textarea
                          id="ipt-contact-notes"
                          name="notes"
                          rows={3}
                          placeholder="เช่น ต้องการระงับยอดค่าน้ำรั่วไหลสะสม ประสบปัญหาฝ่ายซ่อมบำรุงแก้ไขล่าช้า หรือต้องการตรวจทานระบบบัญชีประจำปีเพื่อความโปร่งใส..."
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="text-xs font-medium w-full bg-slate-50 border border-slate-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#0F2B46] focus:border-[#0F2B46] text-slate-900 placeholder-slate-450"
                        ></textarea>
                      </div>

                      {/* Security declaration */}
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 self-start">
                        <input id="ipt-chk-security-iso" type="checkbox" required defaultChecked className="rounded border-slate-300 text-blue-900 focus:ring-blue-900" />
                        <span className="text-[10px] text-gray-500 leading-normal">
                          ข้าพเจ้ายินยอมเปิดเผยข้อมูลเพื่อความสอดคล้องทางการออกรายงานสรุปและเตรียมข้อเสนอลดรายจ่ายอย่างปลอดภัย
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          id="btn-modal-step2-back"
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-1/3 border border-slate-250 text-slate-700 hover:bg-slate-50 rounded-xl font-bold text-xs"
                        >
                          ย้อนกลับ
                        </button>
                        <button
                          id="btn-modal-step2-submit"
                          type="submit"
                          disabled={isSubmitting}
                          className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <span>กำลังประเมินคุณภาพ...</span>
                          ) : (
                            <>
                              <span>ยืนยันและจองสิทธิ์ปรึกษา</span>
                              <CheckSquare className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                </form>
              </div>
            ) : (
              <motion.div 
                key="success-container"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="mx-auto w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-[#0F2B46] tracking-tight">
                  ระบบทำการบันทึกข้อมูลนัดหมายของท่านเรียบร้อยแล้ว!
                </h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                  ทางทีมงานขอขอบคุณอย่างยิ่ง คุณ <strong>{formData.name}</strong> เราได้ลิ้งก์โครงการ <strong>{formData.propertyName}</strong> เข้าในท่อรวบรวมข้อมูลคุณภาพวิศวกรรมอาคารแล้ว
                </p>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 max-w-sm mx-auto text-left space-y-2">
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">ขั้นตอนการนัดหมายและการประสานงานถัดไป</p>
                  <div className="flex gap-2.5 text-xs text-gray-700">
                    <Calendar className="w-5 h-5 text-[#0F2B46] flex-shrink-0" />
                    <span>ผู้ตรวจสอบอาคารและทีมงานวิศวกรผู้เชี่ยวชาญจะเตรียมการรายงานเพื่อต่อสายคุยกับท่านตามเบอร์โทร (<strong>{formData.phone}</strong>) ภายใน 4 ชั่วโมงทำการ เพื่อยืนยันและนัดหมายวันเข้าตรวจสอบหน้าไซต์งานเป็นทางการ</span>
                  </div>
                  <div className="flex gap-2.5 text-xs text-gray-700 border-t border-slate-200/80 pt-2 mt-1">
                    <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>สำเนาร่างแนวทางการลดค่าใช้จ่ายเบื้องต้นจะถูกจัดส่งไปยังอีเมล <strong>{formData.email}</strong> ทันทีหลังจากได้รับการยืนยันสายโทร</span>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 max-w-sm mx-auto text-xs text-emerald-800">
                  🛡️ ข้อตกลงการประสานงานประเมินหน้าไซต์ตามแนวทางและขั้นตอนรับรองมาตรฐานการประกันคุณภาพกลยุทธ์ ISO 9001:2015 สำเร็จเสร็จสิ้น
                </div>

                <button
                  id="btn-close-modal-success"
                  onClick={resetForm}
                  className="bg-[#0F2B46] hover:bg-[#163a5d] text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow"
                >
                  กลับสู่หน้าหลัก
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
