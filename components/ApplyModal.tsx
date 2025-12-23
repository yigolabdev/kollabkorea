import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  brandName: string;
  email: string;
  contactPerson: string;
  phone: string;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    brandName: '',
    email: '',
    contactPerson: '',
    phone: ''
  });

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 이메일로 전송
    const subject = `[KOLLAB 입점 신청] ${formData.brandName}`;
    const body = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
KOLLAB KOREA 입점 신청
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

브랜드명: ${formData.brandName}
담당자명: ${formData.contactPerson}
이메일: ${formData.email}
연락처: ${formData.phone}

신청일시: ${new Date().toLocaleString('ko-KR')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
※ 영업일 기준 3-5일 이내 회신 예정입니다.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    const mailtoLink = `mailto:info@kollabkorea.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // 사용자 피드백
    alert('이메일 클라이언트가 실행됩니다.\n내용을 확인하신 후 전송 버튼을 눌러주세요.\n\n영업일 기준 3-5일 이내 회신 예정입니다.');

    // iframe을 사용하여 페이지 이동 방지
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = mailtoLink;
    document.body.appendChild(iframe);

    // iframe 정리 및 모달 닫기
    setTimeout(() => {
      document.body.removeChild(iframe);
      onClose();
    }, 1000);

    // 폼 초기화
    setFormData({
      brandName: '',
      email: '',
      contactPerson: '',
      phone: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

      {/* Modal */}
      <div 
        ref={modalRef}
        className="relative bg-white w-full max-w-lg shadow-2xl border border-black/10 animate-in fade-in zoom-in duration-300"
      >
        {/* Header */}
        <div className="bg-black text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter">
              APPLY NOW
            </h2>
            <p className="text-xs font-medium text-white/60 uppercase tracking-widest mt-1">
              Brand Application
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 transition-colors rounded-full"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* 브랜드명 */}
          <div>
            <label htmlFor="brandName" className="block text-xs font-black tracking-widest uppercase mb-2 text-black">
              브랜드명 <span className="text-[#dc0000]">*</span>
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-black/20 bg-white text-black font-medium focus:border-[#dc0000] focus:ring-2 focus:ring-[#dc0000]/20 transition-all outline-none"
              placeholder="예: KOLLAB BEAUTY"
            />
          </div>

          {/* 담당자명 */}
          <div>
            <label htmlFor="contactPerson" className="block text-xs font-black tracking-widest uppercase mb-2 text-black">
              담당자명 <span className="text-[#dc0000]">*</span>
            </label>
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-black/20 bg-white text-black font-medium focus:border-[#dc0000] focus:ring-2 focus:ring-[#dc0000]/20 transition-all outline-none"
              placeholder="예: 홍길동"
            />
          </div>

          {/* 이메일 */}
          <div>
            <label htmlFor="email" className="block text-xs font-black tracking-widest uppercase mb-2 text-black">
              이메일 <span className="text-[#dc0000]">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-black/20 bg-white text-black font-medium focus:border-[#dc0000] focus:ring-2 focus:ring-[#dc0000]/20 transition-all outline-none"
              placeholder="예: hello@brand.com"
            />
          </div>

          {/* 연락처 */}
          <div>
            <label htmlFor="phone" className="block text-xs font-black tracking-widest uppercase mb-2 text-black">
              연락처 <span className="text-[#dc0000]">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-black/20 bg-white text-black font-medium focus:border-[#dc0000] focus:ring-2 focus:ring-[#dc0000]/20 transition-all outline-none"
              placeholder="예: 010-1234-5678"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#dc0000] text-white py-4 font-black uppercase tracking-[0.3em] text-sm hover:bg-black transition-all duration-300 flex items-center justify-center space-x-3 group"
            >
              <span>신청하기</span>
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Info */}
          <div className="pt-2 border-t border-black/10">
            <p className="text-xs text-black/50 text-center font-medium leading-relaxed">
              신청서 검토는 영업일 기준 3-5일 소요됩니다.<br />
              승인 후 브랜드 미팅을 통해 상세 안내해 드립니다.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;

