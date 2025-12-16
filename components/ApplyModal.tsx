import React, { useState, useCallback, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { BrandApplication, BrandCategory } from '../types';
import { CONTACT_INFO } from '../constants';
import { Button } from './ui/Button';
import { FormField } from './ui/FormField';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORY_OPTIONS = [
  { value: '', label: '선택해주세요' },
  { value: 'Beauty', label: 'Beauty (Skincare/Makeup)' },
  { value: 'Fashion', label: 'Fashion' },
  { value: 'Food', label: 'Food & Beverage' },
  { value: 'Lifestyle', label: 'Lifestyle/Goods' },
  { value: 'Other', label: 'Other' },
];

export const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<BrandApplication>({
    brandName: '',
    category: '' as BrandCategory,
    contactPerson: '',
    email: '',
    phone: '',
    instagram: '',
    message: ''
  });
  
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // 모달이 열릴 때 첫 번째 입력 필드에 포커스
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // 모달 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // 폼 검증
    if (!formData.brandName.trim()) {
      alert('브랜드명을 입력해주세요.');
      return;
    }
    if (!formData.category) {
      alert('카테고리를 선택해주세요.');
      return;
    }
    if (!formData.email.includes('@')) {
      alert('올바른 이메일 주소를 입력해주세요.');
      return;
    }

    // 이메일 본문 구성
    const subject = `[입점문의] ${formData.brandName} 입점 신청서 제출`;
    const body = `
[KOLLAB SEOUL 입점 신청서]

1. 브랜드명: ${formData.brandName}
2. 카테고리: ${formData.category}
3. 담당자 성함: ${formData.contactPerson}
4. 연락처: ${formData.phone}
5. 이메일: ${formData.email}
6. 인스타그램/웹사이트: ${formData.instagram}

[문의내용/브랜드소개]
${formData.message}

----------------------------------------------------
※ 본 메일은 KOLLAB 웹사이트를 통해 작성되었습니다.
    `.trim();

    // mailto 링크로 이메일 클라이언트 실행
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // 사용자 피드백
    alert('이메일 클라이언트가 실행됩니다. 내용을 확인 후 전송해주세요.');
    onClose();
  }, [formData, onClose]);

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div 
        ref={modalRef}
        className="relative bg-zinc-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-none border border-zinc-700 shadow-2xl"
      >
        <div className="sticky top-0 bg-zinc-900 p-6 border-b border-zinc-800 flex justify-between items-center z-10">
          <div>
            <h2 id="modal-title" className="text-2xl font-black text-white">입점 신청 (APPLY)</h2>
            <p className="text-zinc-400 text-xs mt-1">작성하신 내용은 공식 이메일로 전송됩니다.</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-zinc-800 text-white rounded-full transition-colors"
            aria-label="모달 닫기"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="브랜드명 (Brand Name)"
              name="brandName"
              type="text"
              value={formData.brandName}
              onChange={handleChange}
              required
            />
            <FormField
              label="카테고리 (Category)"
              name="category"
              type="select"
              value={formData.category}
              onChange={handleChange}
              options={CATEGORY_OPTIONS}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              label="담당자 성함"
              name="contactPerson"
              type="text"
              value={formData.contactPerson}
              onChange={handleChange}
              required
            />
            <FormField
              label="연락처"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <FormField
            label="이메일"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FormField
            label="인스타그램 / 홈페이지 URL"
            name="instagram"
            type="text"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="@brand_official"
          />

          <FormField
            label="문의사항 / 브랜드 소개"
            name="message"
            type="textarea"
            value={formData.message}
            onChange={handleChange}
            rows={4}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Send}
            iconPosition="left"
            fullWidth
          >
            Send Application Email
          </Button>
        </form>
      </div>
    </div>
  );
};