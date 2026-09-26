import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Send,
  Trash2,
  RotateCcw,
  Loader2,
  Bot,
  User,
  HelpCircle,
} from 'lucide-react';
import { SUGGESTED_PROMPTS, type ChatMessage } from '../data/portfolioKnowledge.ts';

interface AskSarthikAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  sender: 'assistant',
  text: "Hi! I'm Sarthik AI 👋\n\nI can help you explore Sarthik's projects, skills, experience, education and learning journey.\n\nWhat would you like to know?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export default function AskSarthikAiModal({
  isOpen,
  onClose,
  initialPrompt,
}: AskSarthikAiModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastFailedQuery, setLastFailedQuery] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of chat without touching window scroll
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        textareaRef.current?.focus();
        scrollToBottom('auto');
      }, 80);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  // Handle initialPrompt passed from project cards, hero, or nav
  useEffect(() => {
    if (isOpen && initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt.trim());
    }
  }, [isOpen, initialPrompt]);

  // Handle Esc key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setHasError(false);
    setLastFailedQuery(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Chat API network error');
      }

      const data = await response.json();
      const replyText = data.reply || "I don't have verified information showing that in Sarthik's portfolio.";

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error querying Sarthik AI:', err);
      setHasError(true);
      setLastFailedQuery(text);

      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "Sorry, I couldn't reach the AI service right now. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearConversation = () => {
    setMessages([WELCOME_MESSAGE]);
    setHasError(false);
    setLastFailedQuery(null);
  };

  const handleRetry = () => {
    if (lastFailedQuery) {
      setMessages((prev) => prev.filter((m) => !m.isError));
      handleSendMessage(lastFailedQuery);
    }
  };

  if (!isOpen) return null;

  // Simple markdown renderer for links, bullets, and bold text
  const renderFormattedText = (content: string) => {
    return content.split('\n\n').map((paragraph, pIdx) => {
      if (paragraph.startsWith('- ') || paragraph.startsWith('* ') || paragraph.match(/^\d+\.\s/)) {
        const items = paragraph.split('\n');
        return (
          <ul key={pIdx} className="space-y-1.5 my-2 pl-1">
            {items.map((item, iIdx) => {
              const cleanItem = item.replace(/^[-*]\s+|\d+\.\s+/, '');
              return (
                <li key={iIdx} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed">
                  <span className="text-[#FF8A65] font-bold mt-1 text-[10px] shrink-0">●</span>
                  <span dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(cleanItem) }} />
                </li>
              );
            })}
          </ul>
        );
      }

      return (
        <p
          key={pIdx}
          className="text-xs sm:text-sm leading-relaxed my-1.5"
          dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(paragraph) }}
        />
      );
    });
  };

  function parseInlineMarkdown(text: string): string {
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(
      /\[(.*?)\]\((https?:\/\/.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#E66840] font-semibold underline underline-offset-2 hover:text-[#C54823] inline-flex items-center gap-0.5">$1</a>'
    );
    formatted = formatted.replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 rounded bg-[#FAF2ED] text-[#8C432A] font-mono text-[11px] border border-[#F2DDD3]">$1</code>'
    );
    return formatted;
  }

  return (
    <>
      {/* Light backdrop for mobile & click-away dismissal */}
      <div
        className="fixed inset-0 z-40 bg-[#2B1B15]/25 backdrop-blur-[1px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Fixed Viewport-based Chat Panel: Anchored bottom-right on desktop, full height on mobile */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-chat-title"
        className="fixed inset-x-3 bottom-[calc(14px+env(safe-area-inset-bottom,0px))] top-14 sm:inset-auto sm:right-7 sm:bottom-[82px] z-50 sm:w-[460px] sm:max-w-[calc(100vw-32px)] sm:h-[76vh] sm:max-h-[min(650px,calc(100vh-100px))] bg-white rounded-3xl border-2 border-[#FFCBB8] shadow-[0_20px_50px_rgba(43,27,21,0.22)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-3 fade-in duration-200 motion-reduce:animate-none"
      >
        {/* Header */}
        <div className="px-4 sm:px-5 py-3.5 bg-gradient-to-r from-[#FFF5F0] via-[#FFEDE6] to-[#FFE2D6] border-b border-[#FFD0BE] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FF8A65] to-[#FFA07A] flex items-center justify-center text-white shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="ai-chat-title" className="text-sm sm:text-base font-extrabold text-[#261A14]">
                  Sarthik AI
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-white/90 border border-[#FFCBB8] text-[10px] font-extrabold text-[#9A462B]">
                  Portfolio Assistant
                </span>
              </div>
              <p className="text-[11px] text-[#7A6358] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Grounded on verified portfolio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleClearConversation}
              className="p-1.5 rounded-xl text-[#7A6358] hover:text-[#261A14] hover:bg-white/80 transition-colors cursor-pointer"
              title="Clear conversation"
              aria-label="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#7A6358] hover:text-[#261A14] hover:bg-white/80 transition-colors cursor-pointer"
              title="Close chat"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-[#FAF7F2]">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 sm:gap-3 ${
                  isUser ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
                    isUser
                      ? 'bg-[#2B1B15] text-white shadow-2xs'
                      : 'bg-gradient-to-tr from-[#FF8A65] to-[#FFA07A] text-white shadow-2xs'
                  }`}
                  aria-hidden="true"
                >
                  {isUser ? <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-2xs text-[#261A14] ${
                    isUser
                      ? 'bg-[#2B1B15] text-white rounded-tr-xs'
                      : msg.isError
                      ? 'bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] rounded-tl-xs'
                      : 'bg-white border border-[#F2DDD3] rounded-tl-xs'
                  }`}
                >
                  {isUser ? (
                    <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                    </p>
                  ) : (
                    <div className="text-[#3D251C]">{renderFormattedText(msg.text)}</div>
                  )}

                  <div
                    className={`mt-1 text-[10px] flex items-center justify-between gap-2 ${
                      isUser ? 'text-white/60' : 'text-[#8C6D60]'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {msg.isError && (
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#E66840] hover:underline cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" /> Retry
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-[#FF8A65] to-[#FFA07A] text-white flex items-center justify-center shadow-2xs shrink-0">
                <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="px-3.5 py-2 rounded-2xl rounded-tl-xs bg-white border border-[#F2DDD3] shadow-2xs flex items-center gap-2">
                <span className="text-xs font-medium text-[#7A6358]">Thinking</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A65] animate-bounce" />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#FF8A65] animate-bounce"
                    style={{ animationDelay: '0.15s' }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#FF8A65] animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  />
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts (Chips) */}
        <div className="px-3 sm:px-4 py-2 bg-[#FFF9F6] border-t border-[#F5E6DF] overflow-x-auto no-scrollbar shrink-0">
          <div className="flex items-center gap-1.5 w-max">
            <span className="text-[10px] font-bold text-[#8C5542] uppercase tracking-wider flex items-center gap-1 shrink-0">
              <HelpCircle className="w-3 h-3 text-[#FF8A65]" /> Try:
            </span>
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FFF0EB] text-[#593E32] hover:text-[#B8401C] border border-[#FFD0BE] text-[11px] font-medium transition-all shadow-2xs hover:shadow-xs active:scale-95 disabled:opacity-50 cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#F2DDD3] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2"
          >
            <div className="relative flex-1">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about projects, skills, journey..."
                rows={1}
                disabled={isLoading}
                className="w-full resize-none rounded-2xl border border-[#EAD7CE] bg-[#FAF7F2] focus:bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#261A14] placeholder-[#A8948B] focus:outline-hidden focus:ring-2 focus:ring-[#FF8A65]/30 focus:border-[#FF8A65] transition-all disabled:opacity-60 max-h-28 leading-relaxed"
                style={{ minHeight: '42px' }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-r from-[#FF8A65] to-[#E66840] hover:from-[#E66840] hover:to-[#D4552E] text-white flex items-center justify-center shadow-xs hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>

          <p className="mt-1.5 text-[9px] sm:text-[10px] text-center text-[#A38A80]">
            Grounded in Sarthik's verified portfolio · Press <kbd className="font-mono bg-[#FAF4F0] px-1 py-0.5 rounded border border-[#E8D7CE]">Enter</kbd> to send
          </p>
        </div>
      </aside>
    </>
  );
}
