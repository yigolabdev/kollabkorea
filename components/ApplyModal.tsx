import React, { useState, useCallback, useRef, useEffect } from 'react';
import { X, Send, Building2, Package, Globe, CheckCircle2 } from 'lucide-react';
import { BrandApplication, BrandCategory } from '../types';
import { CONTACT_INFO } from '../constants';
import { Button } from './ui/Button';
import { FormField } from './ui/FormField';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ExtendedBrandApplication extends BrandApplication {
  preferredZone: string;
  productCount: string;
  desiredStartDate: string;
  budgetRange: string;
  establishedYear: string;
  hasOnlineSales: string;
  hasExportExperience: string;
  currentSalesChannels: string;
  monthlyRevenue: string;
}

const CATEGORY_OPTIONS = [
  { value: '', label: '선택해주세요' },
  { value: 'Beauty', label: 'Beauty (Skincare/Makeup)' },
  { value: 'Fashion', label: 'Fashion (Apparel/Accessories)' },
  { value: 'Food', label: 'Food & Beverage' },
  { value: 'Lifestyle', label: 'Lifestyle/Goods' },
  { value: 'Other', label: 'Other' },
];

const ZONE_OPTIONS = [
  { value: '', label: '선택해주세요' },
  { value: 'Premium', label: 'Premium Zone (4 Brands / 최고 노출)' },
  { value: 'Standard', label: 'Standard Zone (6 Brands / 메인 중앙)' },
  { value: 'Basic', label: 'Basic Zone (20 Brands / 2주 회전)' },
  { value: 'Undecided', label: '상담 후 결정' },
];

const PRODUCT_COUNT_OPTIONS = [
  { value: '', label: '선택해주세요' },
  { value: '1-5', label: '1-5개' },
  { value: '6-10', label: '6-10개' },
  { value: '11-20', label: '11-20개' },
  { value: '20+', label: '20개 이상' },
];

const BUDGET_OPTIONS = [
  { value: '', label: '선택해주세요' },
  { value: 'under-5m', label: '500만원 미만' },
  { value: '5m-10m', label: '500만원 ~ 1,000만원' },
  { value: '10m-20m', label: '1,000만원 ~ 2,000만원' },
  { value: '20m+', label: '2,000만원 이상' },
  { value: 'flexible', label: '협의 가능' },
];

const REVENUE_OPTIONS = [
  { value: '', label: '선택해주세요' },
  { value: 'under-10m', label: '1,000만원 미만' },
  { value: '10m-50m', label: '1,000만원 ~ 5,000만원' },
  { value: '50m-100m', label: '5,000만원 ~ 1억원' },
  { value: '100m+', label: '1억원 이상' },
  { value: 'undisclosed', label: '비공개' },
];

export const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ExtendedBrandApplication>({
    brandName: '',
    category: '' as BrandCategory,
    contactPerson: '',
    email: '',
    phone: '',
    instagram: '',
    message: '',
    preferredZone: '',
    productCount: '',
    desiredStartDate: '',
    budgetRange: '',
    establishedYear: '',
    hasOnlineSales: '',
    hasExportExperience: '',
    currentSalesChannels: '',
    monthlyRevenue: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  
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

  // Hook 규칙: 모든 Hook은 return null 이전에 호출되어야 함
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const validateStep = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.brandName.trim()) {
          alert('브랜드명을 입력해주세요.');
          return false;
        }
        if (!formData.category) {
          alert('카테고리를 선택해주세요.');
          return false;
        }
        if (!formData.contactPerson.trim()) {
          alert('담당자 성함을 입력해주세요.');
          return false;
        }
        return true;
      case 2:
        if (!formData.email.includes('@')) {
          alert('올바른 이메일 주소를 입력해주세요.');
          return false;
        }
        if (!formData.phone.trim()) {
          alert('연락처를 입력해주세요.');
          return false;
        }
        return true;
      case 3:
        // 선택 사항이므로 항상 true
        return true;
      default:
        return true;
    }
  }, [formData]);

  const handleNext = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  }, [currentStep, validateStep]);

  const handlePrev = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    // 이메일 본문 구성
    const subject = `[입점문의] ${formData.brandName} - ${formData.preferredZone || '상담필요'}`;
    const body = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
KOLLAB SEOUL 입점 신청서
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【 기본 정보 】
• 브랜드명: ${formData.brandName}
• 카테고리: ${formData.category}
• 담당자: ${formData.contactPerson}
• 연락처: ${formData.phone}
• 이메일: ${formData.email}
• SNS/웹사이트: ${formData.instagram || '미입력'}

【 입점 희망 정보 】
• 희망 Zone: ${formData.preferredZone || '상담 후 결정'}
• 제품 수량: ${formData.productCount || '미입력'}
• 희망 시작일: ${formData.desiredStartDate || '협의 가능'}
• 예산 범위: ${formData.budgetRange || '미입력'}

【 브랜드 현황 】
• 설립 연도: ${formData.establishedYear || '미입력'}
• 온라인 판매: ${formData.hasOnlineSales || '미입력'}
• 수출 경험: ${formData.hasExportExperience || '미입력'}
• 현재 판매처: ${formData.currentSalesChannels || '미입력'}
• 월 매출: ${formData.monthlyRevenue || '비공개'}

【 문의사항 / 브랜드 소개 】
${formData.message || '(내용 없음)'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
※ 본 메일은 KOLLAB 웹사이트를 통해 자동 생성되었습니다.
신청일시: ${new Date().toLocaleString('ko-KR')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    // mailto 링크 생성
    const mailtoLink = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // 사용자 피드백 먼저 표시
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
      category: '' as BrandCategory,
      contactPerson: '',
      email: '',
      phone: '',
      instagram: '',
      message: '',
      preferredZone: '',
      productCount: '',
      desiredStartDate: '',
      budgetRange: '',
      establishedYear: '',
      hasOnlineSales: '',
      hasExportExperience: '',
      currentSalesChannels: '',
      monthlyRevenue: '',
    });
    setCurrentStep(1);
  }, [formData, currentStep, onClose]);

  const renderStepContent = useCallback(() => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="text-kollab-red" size={24} />
              <h3 className="text-lg font-black text-white">기본 정보</h3>
            </div>
            
            <FormField
              label="브랜드명 (Brand Name)"
              name="brandName"
              type="text"
              value={formData.brandName}
              onChange={handleChange}
              required
              placeholder="예: Seoul Beauty Lab"
            />
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="카테고리 (Category)"
                name="category"
                type="select"
                value={formData.category}
                onChange={handleChange}
                options={CATEGORY_OPTIONS}
                required
              />
              <FormField
                label="설립 연도"
                name="establishedYear"
                type="text"
                value={formData.establishedYear}
                onChange={handleChange}
                placeholder="예: 2020"
              />
            </div>

            <FormField
              label="담당자 성함"
              name="contactPerson"
              type="text"
              value={formData.contactPerson}
              onChange={handleChange}
              required
              placeholder="예: 홍길동"
            />

            <FormField
              label="인스타그램 / 홈페이지 URL"
              name="instagram"
              type="text"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="@brand_official or https://..."
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="text-kollab-red" size={24} />
              <h3 className="text-lg font-black text-white">연락처 정보</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="이메일"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="contact@brand.com"
              />
              <FormField
                label="연락처"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="010-0000-0000"
              />
            </div>

            <FormField
              label="현재 판매 채널"
              name="currentSalesChannels"
              type="text"
              value={formData.currentSalesChannels}
              onChange={handleChange}
              placeholder="예: 자사몰, 네이버 스마트스토어, 올리브영"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="온라인 판매 여부"
                name="hasOnlineSales"
                type="select"
                value={formData.hasOnlineSales}
                onChange={handleChange}
                options={[
                  { value: '', label: '선택해주세요' },
                  { value: 'Yes', label: '네, 하고 있습니다' },
                  { value: 'No', label: '아니오' },
                  { value: 'Planning', label: '준비 중입니다' },
                ]}
              />
              <FormField
                label="해외 수출 경험"
                name="hasExportExperience"
                type="select"
                value={formData.hasExportExperience}
                onChange={handleChange}
                options={[
                  { value: '', label: '선택해주세요' },
                  { value: 'Yes', label: '있습니다' },
                  { value: 'No', label: '없습니다' },
                  { value: 'Planning', label: '계획 중입니다' },
                ]}
              />
            </div>

            <FormField
              label="월 평균 매출"
              name="monthlyRevenue"
              type="select"
              value={formData.monthlyRevenue}
              onChange={handleChange}
              options={REVENUE_OPTIONS}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="text-kollab-red" size={24} />
              <h3 className="text-lg font-black text-white">입점 희망 정보</h3>
            </div>

            <FormField
              label="희망 Zone"
              name="preferredZone"
              type="select"
              value={formData.preferredZone}
              onChange={handleChange}
              options={ZONE_OPTIONS}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                label="입점 예정 제품 수"
                name="productCount"
                type="select"
                value={formData.productCount}
                onChange={handleChange}
                options={PRODUCT_COUNT_OPTIONS}
              />
              <FormField
                label="희망 시작 시기"
                name="desiredStartDate"
                type="text"
                value={formData.desiredStartDate}
                onChange={handleChange}
                placeholder="예: 2025년 3월"
              />
            </div>

            <FormField
              label="예산 범위 (월 기준)"
              name="budgetRange"
              type="select"
              value={formData.budgetRange}
              onChange={handleChange}
              options={BUDGET_OPTIONS}
            />

            <FormField
              label="문의사항 / 브랜드 소개"
              name="message"
              type="textarea"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="브랜드 스토리, 특별한 문의사항 등을 자유롭게 작성해주세요."
            />
          </div>
        );

      default:
        return null;
    }
  }, [currentStep, formData, handleChange]);

  // Hook 규칙 준수: 모든 Hook 호출 후 조건부 렌더링
  if (!isOpen) return null;

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
        className="relative bg-zinc-900 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-none border border-zinc-700 shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-zinc-900 p-6 border-b border-zinc-800 z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 id="modal-title" className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                Brand Application
              </h2>
              <p className="text-zinc-400 text-xs md:text-sm mt-1">KOLLAB SEOUL 입점 신청서</p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-zinc-800 text-white rounded-full transition-colors"
              aria-label="모달 닫기"
            >
              <X />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    currentStep >= step 
                      ? 'bg-kollab-red text-white' 
                      : 'bg-zinc-800 text-zinc-500'
                  }`}>
                    {currentStep > step ? <CheckCircle2 size={16} /> : step}
                  </div>
                  <span className={`ml-2 text-xs font-bold hidden md:inline ${
                    currentStep >= step ? 'text-white' : 'text-zinc-600'
                  }`}>
                    {step === 1 ? '기본정보' : step === 2 ? '연락처' : '입점정보'}
                  </span>
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-[2px] mx-2 transition-colors ${
                    currentStep > step ? 'bg-kollab-red' : 'bg-zinc-800'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-zinc-800">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handlePrev}
                className="flex-1"
              >
                이전
              </Button>
            )}
            
            {currentStep < 3 ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNext}
                className="flex-1"
              >
                다음
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={Send}
                className="flex-1"
              >
                신청서 제출
              </Button>
            )}
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-zinc-800/50 border border-zinc-700 rounded-sm">
            <p className="text-zinc-400 text-xs leading-relaxed">
              ℹ️ 작성하신 내용은 이메일로 전송됩니다.<br/>
              • 영업일 기준 3-5일 이내 회신 예정입니다.<br/>
              • 추가 문의: {CONTACT_INFO.email}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};