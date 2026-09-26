import React, { useState } from 'react';
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Instagram,
  Copy,
  Check,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import RevealOnScroll from './RevealOnScroll';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Please provide a valid email format (e.g. name@domain.com).';
      }
    }
    if (!formData.message.trim()) {
      errors.message = 'Please include a message.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent duplicate submission

    if (!validate()) {
      return;
    }

    setLoading(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setStatusMessage(
          data.message || 'Thank you for reaching out! Your message has been sent successfully.'
        );
        setFormData({ name: '', email: '', message: '' });
        setFormErrors({});
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Failed to submit message. Please use direct email below.');
      }
    } catch (error) {
      // In case network or serverless error occurs, provide clear feedback with mailto fallback
      setStatus('error');
      setStatusMessage(
        'Unable to connect to contact service. Please click the direct email button below to reach out!'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <RevealOnScroll direction="up">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A6583E] mb-2">
              <span className="w-6 h-[2px] bg-[#FF8A65]" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#241B16]">
              Let's Build Something Together
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#6E5549]">
              Have an internship opportunity, project collaboration, or tech discussion in mind?
              Drop a message below or connect directly through email and socials.
            </p>
          </div>
        </RevealOnScroll>

        {/* Contact Layout Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info & Social Connections (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <RevealOnScroll direction="up" delay={50}>
              {/* Availability Card */}
              <div className="bg-gradient-to-r from-[#FFF5F0] via-[#FFEDE6] to-[#FFE2D6] rounded-2xl p-5 border border-[#FFCBB8] shadow-2xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8A65] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E66840]" />
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#8C432A]">
                    Open to Opportunities
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#3D251C]">
                  Internships · Projects · Collaboration
                </p>
                <p className="mt-1 text-[11px] text-[#7A6358] leading-relaxed">
                  Actively open to software development and AI/ML internship opportunities for hands-on engineering growth.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={100}>
              {/* Email Card with Copy button */}
              <div className="bg-white rounded-2xl p-6 border border-[#F2DDD3] shadow-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] border border-[#FFD0BE] flex items-center justify-center text-[#E66840]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8C5542]">
                      Direct Email
                    </span>
                    <div className="text-sm sm:text-base font-semibold text-[#241B16] break-all">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-[#F7EBE5]">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#FAF4F0] hover:bg-[#F5EAE4] text-[#473026] text-xs font-semibold border border-[#EBDCD3] transition-colors cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#E66840]" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${PERSONAL_INFO.email}?subject=Opportunity%20Inquiry%20via%20Portfolio`}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#E66840] hover:bg-[#D4552E] text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Mail</span>
                  </a>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={200}>
              {/* Social Network Cards */}
              <div className="bg-white rounded-2xl p-6 border border-[#F2DDD3] shadow-xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8C5542] mb-4">
                  Professional & Social Profiles
                </h3>

                <div className="space-y-3">
                  <a
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#FAF5F1] hover:bg-[#FFF0EB] border border-[#F2E5DC] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center">
                        <Linkedin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#2A1B14] group-hover:text-[#0A66C2]">
                          LinkedIn
                        </div>
                        <div className="text-[11px] text-[#7A6358]">Connect & Professional Network</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#A8948B] group-hover:text-[#0A66C2] transition-colors" />
                  </a>

                  <a
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#FAF5F1] hover:bg-[#FFF0EB] border border-[#F2E5DC] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#241F1C] text-white flex items-center justify-center">
                        <Github className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#2A1B14] group-hover:text-[#241F1C]">
                          GitHub
                        </div>
                        <div className="text-[11px] text-[#7A6358]">Open Source Repositories & Code</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#A8948B] group-hover:text-[#241F1C] transition-colors" />
                  </a>

                  <a
                    href={PERSONAL_INFO.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#FAF5F1] hover:bg-[#FFF0EB] border border-[#F2E5DC] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#2A1B14] group-hover:text-[#DD2A7B]">
                          Instagram
                        </div>
                        <div className="text-[11px] text-[#7A6358]">Personal Updates & Creative Life</div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#A8948B] group-hover:text-[#DD2A7B] transition-colors" />
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Fully Functional Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <RevealOnScroll direction="up" delay={200}>
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#F2DDD3] shadow-xs">
                <h3 className="text-lg font-bold text-[#2A1B14] mb-1">Send a Direct Message</h3>
                <p className="text-xs text-[#7A6358] mb-6">
                  Messages are processed through a serverless backend.
                </p>

            {/* Status alerts */}
            {status === 'success' && (
              <div
                role="status"
                className="mb-6 p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] flex items-start gap-3 text-xs leading-relaxed"
              >
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-sm">Message Sent!</strong>
                  <span>{statusMessage}</span>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] flex items-start gap-3 text-xs leading-relaxed"
              >
                <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold block text-sm">Notice</strong>
                  <span>{statusMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold text-[#3B251D] mb-1">
                  Your Full Name <span className="text-[#E66840]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="e.g. Alex Sharma"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#261A14] bg-[#FAF7F2] placeholder-[#A8948B] focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                    formErrors.name
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-[#EAD7CE] focus:border-[#FF8A65] focus:ring-[#FF8A65]/20'
                  }`}
                  disabled={loading}
                  required
                />
                {formErrors.name && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold text-[#3B251D] mb-1">
                  Your Email Address <span className="text-[#E66840]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#261A14] bg-[#FAF7F2] placeholder-[#A8948B] focus:bg-white focus:outline-hidden focus:ring-2 transition-all ${
                    formErrors.email
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-[#EAD7CE] focus:border-[#FF8A65] focus:ring-[#FF8A65]/20'
                  }`}
                  disabled={loading}
                  required
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold text-[#3B251D] mb-1">
                  Your Message <span className="text-[#E66840]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Share a brief overview of your project, internship role, or inquiry..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#261A14] bg-[#FAF7F2] placeholder-[#A8948B] focus:bg-white focus:outline-hidden focus:ring-2 transition-all resize-y ${
                    formErrors.message
                      ? 'border-red-400 focus:ring-red-400'
                      : 'border-[#EAD7CE] focus:border-[#FF8A65] focus:ring-[#FF8A65]/20'
                  }`}
                  disabled={loading}
                  required
                />
                {formErrors.message && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.message}
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#FF8A65] to-[#E66840] hover:from-[#E66840] hover:to-[#D4552E] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
