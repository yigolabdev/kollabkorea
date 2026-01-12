export interface EmailJsConfig {
  serviceId: string;
  publicKey: string;
  templateContactId: string;
  templateAutoReplyId?: string;
}

export interface EmailJsSendResult {
  ok: boolean;
  status: number;
  responseText?: string;
}

export interface ContactUsTemplateParams {
  brand_name: string;
  contact_name: string;
  email: string;
  phone: string;
  category_display: string;
  brand_intro: string;
  timestamp: string;
  page_url?: string;
  language?: 'ko' | 'en';
  reply_to?: string;
}

export interface AutoReplyTemplateParams {
  name: string;
  email: string;
  to_email?: string;
  timestamp?: string;
}

interface EmailJsSendPayload<TTemplateParams extends Record<string, unknown>> {
  service_id: string;
  template_id: string;
  user_id: string;
  template_params: TTemplateParams;
}

const EMAILJS_SEND_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

async function emailjsSend<TTemplateParams extends Record<string, unknown>>(
  payload: EmailJsSendPayload<TTemplateParams>
): Promise<EmailJsSendResult> {
  const res = await fetch(EMAILJS_SEND_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const responseText = await res.text().catch(() => undefined);
  if (!res.ok) {
    return { ok: false, status: res.status, responseText };
  }
  return { ok: true, status: res.status, responseText };
}

export function loadEmailJsConfigFromEnv(): EmailJsConfig | null {
  const serviceId = (import.meta as any).env?.VITE_EMAILJS_SERVICE_ID as string | undefined;
  const publicKey = (import.meta as any).env?.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
  const templateContactId = (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_CONTACT_ID as string | undefined;
  const templateAutoReplyId = (import.meta as any).env?.VITE_EMAILJS_TEMPLATE_AUTOREPLY_ID as string | undefined;

  if (!serviceId || !publicKey || !templateContactId) return null;
  return { serviceId, publicKey, templateContactId, templateAutoReplyId };
}

export async function sendContactUsEmail(config: EmailJsConfig, params: ContactUsTemplateParams): Promise<EmailJsSendResult> {
  return emailjsSend<ContactUsTemplateParams>({
    service_id: config.serviceId,
    template_id: config.templateContactId,
    user_id: config.publicKey,
    template_params: params,
  });
}

export async function sendAutoReplyEmail(config: EmailJsConfig, params: AutoReplyTemplateParams): Promise<EmailJsSendResult> {
  if (!config.templateAutoReplyId) {
    return { ok: false, status: 400, responseText: 'Missing templateAutoReplyId' };
  }

  return emailjsSend<AutoReplyTemplateParams>({
    service_id: config.serviceId,
    template_id: config.templateAutoReplyId,
    user_id: config.publicKey,
    template_params: params,
  });
}

