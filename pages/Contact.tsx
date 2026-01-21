/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { contactContentEn } from '../content/contact.en';
import { contactContentKo } from '../content/contact.ko';
import { containerVariants, itemVariants } from '../utils/animations';
import type { BrandApplicationForm, Language } from '../types';
import { loadEmailJsConfigFromEnv, sendAutoReplyEmail, sendContactUsEmail } from '../services/emailjsService';
import { useFacebookPixel } from '../hooks/useFacebookPixel';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const content = language === 'en' ? contactContentEn : contactContentKo;
  const [emailCopied, setEmailCopied] = useState(false);
  const emailJsConfig = useMemo(() => {
    const config = loadEmailJsConfigFromEnv();
    console.log('📧 EmailJS Config Loaded:', config ? '✅ Success' : '❌ Failed');
    if (!config) {
      console.error('❌ EmailJS environment variables are missing! Check .env.local file.');
    }
    return config;
  }, []);
  
  // Facebook Pixel for conversion tracking
  const { events } = useFacebookPixel();

  const [form, setForm] = useState<BrandApplicationForm>({
    brandName: '',
    contactPerson: '',
    phone: '',
    email: '',
    category: 'Beauty',
    website: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BrandApplicationForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const categoryDisplay = (value: string) => value;

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const buildRequiredMessage = () => content.form.validation.required;
  const buildInvalidEmailMessage = () => content.form.validation.invalidEmail;

  const validateForm = (lang: Language, data: BrandApplicationForm) => {
    const next: Partial<Record<keyof BrandApplicationForm, string>> = {};

    const requiredFields: Array<keyof BrandApplicationForm> = ['brandName', 'contactPerson', 'phone', 'email', 'category', 'message'];
    requiredFields.forEach((k) => {
      const v = String(data[k] ?? '').trim();
      if (!v) next[k] = buildRequiredMessage();
    });

    if (data.email && !validateEmail(data.email)) {
      next.email = buildInvalidEmailMessage();
    }

    // website is optional; if provided, keep as-is (no strict URL validation)
    // language is used only for error copy
    void lang;
    return next;
  };

  const onChangeField = <K extends keyof BrandApplicationForm>(key: K, value: BrandApplicationForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const { [key]: _removed, ...rest } = prev;
      return rest;
    });
    if (submitStatus !== 'idle') setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateForm(language, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!emailJsConfig) {
      console.error('EmailJS config missing: set VITE_EMAILJS_* env vars');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    const timestamp = new Date().toISOString();
    const paramsAdmin = {
      brand_name: form.brandName.trim(),
      contact_name: form.contactPerson.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      category_display: categoryDisplay(form.category),
      brand_intro: form.message.trim(),
      timestamp,
      page_url: typeof window !== 'undefined' ? window.location.href : undefined,
      language,
      reply_to: form.email.trim(),
    };

    try {
      const adminRes = await sendContactUsEmail(emailJsConfig, paramsAdmin);
      if (!adminRes.ok) {
        console.error('EmailJS Contact Us failed:', adminRes.status, adminRes.responseText);
        setSubmitStatus('error');
        return;
      }

      // Auto-reply is best-effort (do not fail whole submission if it errors)
      if (emailJsConfig.templateAutoReplyId) {
        const autoRes = await sendAutoReplyEmail(emailJsConfig, {
          name: form.contactPerson.trim(),
          email: form.email.trim(),
          to_email: form.email.trim(),
          timestamp,
        });
        if (!autoRes.ok) {
          console.warn('EmailJS Auto-Reply failed:', autoRes.status, autoRes.responseText);
        }
      }

      setSubmitStatus('success');
      
      // Track successful brand application completion
      events.brandApplicationComplete(form.brandName.trim());
      
      setForm({
        brandName: '',
        contactPerson: '',
        phone: '',
        email: '',
        category: 'Beauty',
        website: '',
        message: '',
      });
    } catch (err) {
      console.error('EmailJS submit error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(content.contactInfo.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section - Brands Style */}
      <div className="px-6 max-w-7xl mx-auto pt-12 md:pt-18 pb-12 md:pb-16">
        {/* Hero title block (centered text + full-width line aligned to grid edges) */}
        <div className="bg-white text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block text-left text-3xl md:text-6xl font-bold text-black leading-[0.95] tracking-normal"
          >
            {content.hero.title}
          </motion.h2>
          <div className="mt-12 h-px w-full bg-black" />
        </div>

        {/* Hero deck (below the line, centered) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`mt-12 md:mt-16 mb-0 text-center text-xl md:text-3xl font-semibold text-black ${
            language === 'ko' ? 'tracking-[0.01em] break-keep' : 'tracking-[0.02em]'
          }`}
        >
          {content.hero.deck}
        </motion.p>
      </div>

      {/* Apply Section */}
      <motion.section
        id="apply-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24"
      >
        <div className="flex flex-col h-full">
          <motion.div variants={itemVariants} className="pt-16">
            <p
              className={`text-xl md:text-2xl font-semibold tracking-normal text-black/80 ${
                language === 'ko' ? 'break-keep' : ''
              }`}
              style={{ lineHeight: 1.34 }}
            >
              {content.applyLeft.copy.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < content.applyLeft.copy.split('\n').length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 lg:mt-20 space-y-10"
            style={{ fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight">{content.contactInfo.title}</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold text-black tracking-[0.12em] mb-2">{content.contactInfo.emailLabel}</p>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-black tracking-wide">
                    {content.contactInfo.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="relative flex-shrink-0 p-2 text-black hover:text-zinc-600 transition-all duration-300 group"
                    aria-label={emailCopied ? (language === 'ko' ? '복사됨' : 'Copied') : (language === 'ko' ? '이메일 복사' : 'Copy email')}
                    title={emailCopied ? (language === 'ko' ? '복사됨!' : 'Copied!') : (language === 'ko' ? '복사' : 'Copy')}
                  >
                    {emailCopied ? (
                      <Check size={24} className="transition-transform duration-300 scale-110" />
                    ) : (
                      <Copy size={24} className="group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-black tracking-[0.12em] mb-2">{content.contactInfo.instagramLabel}</p>
                <div className="flex items-center gap-4">
                  <a 
                    href={content.contactInfo.instagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-3xl font-bold text-black hover:underline underline-offset-8 tracking-wide"
                  >
                    {content.contactInfo.instagram}
                  </a>
                  <a
                    href={content.contactInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex-shrink-0 p-2 text-black hover:text-zinc-600 transition-all duration-300 group"
                    aria-label={language === 'ko' ? '인스타그램으로 이동' : 'Go to Instagram'}
                    title={language === 'ko' ? '인스타그램으로 이동' : 'Go to Instagram'}
                  >
                    <ExternalLink size={24} className="group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Form */}
        <motion.div variants={itemVariants} className="bg-[#f5f5f5] p-10 md:p-12 border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl md:text-4xl font-extrabold text-black mb-8 tracking-tight">{content.form.title}</h3>
          {!emailJsConfig ? (
            <div className={`mb-6 text-sm font-semibold text-black/70 leading-relaxed ${language === 'ko' ? 'break-keep' : ''}`}>
              {language === 'ko'
                ? '현재 폼 전송 설정이 완료되지 않았습니다. 로컬에서 `.env.local`에 VITE_EMAILJS_* 값을 설정해 주세요.'
                : 'Form sending is not configured. Please set VITE_EMAILJS_* in your `.env.local`.'}
            </div>
          ) : null}

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="space-y-2">
              <label htmlFor="brandName" className="text-sm font-extrabold text-black tracking-[0.12em]">
                {content.form.fields.brandName}
              </label>
              <input
                id="brandName"
                name="brandName"
                type="text"
                value={form.brandName}
                onChange={(ev) => onChangeField('brandName', ev.target.value)}
                className="w-full border-b-2 border-black/20 py-2.5 focus:outline-none focus:border-black text-lg font-semibold tracking-normal bg-transparent"
                placeholder="Kollab Beauty"
                autoComplete="organization"
                aria-invalid={Boolean(errors.brandName)}
                aria-describedby={errors.brandName ? 'brandName-error' : undefined}
              />
              {errors.brandName ? (
                <p id="brandName-error" className={`text-sm font-semibold text-kollab-red ${language === 'ko' ? 'break-keep' : ''}`}>
                  {errors.brandName}
                </p>
              ) : null}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="contactPerson" className="text-sm font-extrabold text-black tracking-[0.12em]">
                  {content.form.fields.contactPerson}
                </label>
                <input
                  id="contactPerson"
                  name="contactPerson"
                  type="text"
                  value={form.contactPerson}
                  onChange={(ev) => onChangeField('contactPerson', ev.target.value)}
                  className="w-full border-b-2 border-black/20 py-2.5 focus:outline-none focus:border-black text-lg font-semibold tracking-normal bg-transparent"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.contactPerson)}
                  aria-describedby={errors.contactPerson ? 'contactPerson-error' : undefined}
                />
                {errors.contactPerson ? (
                  <p id="contactPerson-error" className={`text-sm font-semibold text-kollab-red ${language === 'ko' ? 'break-keep' : ''}`}>
                    {errors.contactPerson}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-extrabold text-black tracking-[0.12em]">
                  {content.form.fields.phone}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(ev) => onChangeField('phone', ev.target.value)}
                  className="w-full border-b-2 border-black/20 py-2.5 focus:outline-none focus:border-black text-lg font-semibold tracking-normal bg-transparent"
                  placeholder="010-0000-0000"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone ? (
                  <p id="phone-error" className={`text-sm font-semibold text-kollab-red ${language === 'ko' ? 'break-keep' : ''}`}>
                    {errors.phone}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-extrabold text-black tracking-[0.12em]">
                  {content.form.fields.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(ev) => onChangeField('email', ev.target.value)}
                  className="w-full border-b-2 border-black/20 py-2.5 focus:outline-none focus:border-black text-lg font-semibold tracking-normal bg-transparent"
                  placeholder="brand@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email ? (
                  <p id="email-error" className={`text-sm font-semibold text-kollab-red ${language === 'ko' ? 'break-keep' : ''}`}>
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-extrabold text-black tracking-[0.12em]">
                  {content.form.fields.category}
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={(ev) => onChangeField('category', ev.target.value)}
                  className="w-full border-b-2 border-black/20 py-2.5 focus:outline-none focus:border-black text-lg font-semibold bg-transparent tracking-normal"
                  aria-invalid={Boolean(errors.category)}
                  aria-describedby={errors.category ? 'category-error' : undefined}
                >
                  <option value="Beauty">Beauty</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Goods">Goods</option>
                  <option value="F&B">F&amp;B</option>
                  <option value="Life">Life</option>
                </select>
                {errors.category ? (
                  <p id="category-error" className={`text-sm font-semibold text-kollab-red ${language === 'ko' ? 'break-keep' : ''}`}>
                    {errors.category}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="website" className="text-sm font-extrabold text-black tracking-[0.12em]">
                {content.form.fields.website}
              </label>
              <input
                id="website"
                name="website"
                type="text"
                value={form.website}
                onChange={(ev) => onChangeField('website', ev.target.value)}
                className="w-full border-b-2 border-black/20 py-2.5 focus:outline-none focus:border-black text-lg font-semibold tracking-normal bg-transparent"
                placeholder="https://..."
                autoComplete="url"
                aria-invalid={Boolean(errors.website)}
                aria-describedby={errors.website ? 'website-error' : undefined}
              />
              {errors.website ? (
                <p id="website-error" className={`text-sm font-semibold text-kollab-red ${language === 'ko' ? 'break-keep' : ''}`}>
                  {errors.website}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-extrabold text-black tracking-[0.12em]">
                {content.form.fields.message}
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={form.message}
                onChange={(ev) => onChangeField('message', ev.target.value)}
                className="w-full border-b-2 border-black/20 py-2.5 focus:outline-none focus:border-black text-lg font-medium tracking-normal bg-transparent resize-none"
                placeholder={language === 'ko' ? '브랜드를 간단히 소개해 주세요' : 'Brief intro...'}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message ? (
                <p id="message-error" className={`text-sm font-semibold text-kollab-red ${language === 'ko' ? 'break-keep' : ''}`}>
                  {errors.message}
                </p>
              ) : null}
            </div>

            {/* Submit feedback (moved above the button) */}
            {submitStatus !== 'idle' ? (
              <div
                role="status"
                aria-live="polite"
                className={`border-2 ${submitStatus === 'success' ? 'border-black' : 'border-kollab-red'} bg-white p-4`}
              >
                <div className="text-base font-extrabold text-black tracking-tight">
                  {submitStatus === 'success' ? content.form.successTitle : content.form.errorTitle}
                </div>
                <div className={`mt-1 text-sm font-semibold text-black/70 leading-relaxed ${language === 'ko' ? 'break-keep' : ''}`}>
                  {submitStatus === 'success' ? content.form.successBody : content.form.errorBody}
                </div>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting || !emailJsConfig}
              className="w-full bg-black text-[#EDEBE4] py-6 text-xl md:text-2xl font-extrabold tracking-[0.42em] hover:bg-[#1A1A1A] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? content.form.submitting : content.form.submit}
            </button>
          </form>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Contact;