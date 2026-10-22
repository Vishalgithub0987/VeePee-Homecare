'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { BUSINESS_CONFIG } from '@/lib/business';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export function FloatingNurseAssistant() {
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isPermanentlyDismissed, setIsPermanentlyDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const whatsappHref = buildWhatsAppUrl(BUSINESS_CONFIG.defaultConsultationMessage);

  // Preview Message Loop: appears for 10 seconds, disappears, then loops continuously
  useEffect(() => {
    if (isPermanentlyDismissed) return;

    let timer: NodeJS.Timeout;

    if (isPreviewVisible) {
      // While visible, stay displayed for 10 seconds (paused while hovered)
      if (!isHovered) {
        timer = setTimeout(() => {
          setIsPreviewVisible(false);
        }, 10000); // 10 seconds visible
      }
    } else {
      // While hidden, wait 5 seconds before appearing again in the loop
      timer = setTimeout(() => {
        setIsPreviewVisible(true);
      }, 5000); // 5 seconds hidden pause
    }

    return () => clearTimeout(timer);
  }, [isPreviewVisible, isPermanentlyDismissed, isHovered]);

  return (
    <aside
      aria-label="Direct nurse consultation on WhatsApp"
      className="floating-nurse-assistant"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        bottom: 'clamp(1.25rem, 3.5vh, 2rem)',
        right: 'clamp(1rem, 2.5vw, 1.75rem)',
        zIndex: 'var(--z-floating)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.55rem',
      }}
    >
      {/* Small Preview Bubble: "Need care? Contact us on WhatsApp" (10s Initial Display & Looping Cycle) */}
      {!isPermanentlyDismissed && (
        <div
          className={`nurse-preview-bubble-wrap ${isPreviewVisible ? 'is-visible' : 'is-hidden'}`}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="nurse-preview-bubble"
            aria-label="Need care? Contact us on WhatsApp"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: 'var(--color-white)',
              color: 'var(--color-text-main)',
              padding: '0.42rem 0.85rem 0.42rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 8px 24px rgba(18, 55, 52, 0.12), 0 1px 3px rgba(0, 0, 0, 0.05)',
              border: '1px solid var(--color-border)',
              textDecoration: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              lineHeight: 1.2,
              position: 'relative',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 22,
                height: 22,
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-whatsapp-light)',
                flexShrink: 0,
              }}
            >
              <WhatsAppIcon size={13} fill="var(--color-whatsapp)" />
            </span>

            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-main)',
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              <strong style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Need care?</strong>{' '}
              Contact us on WhatsApp
            </span>

            {/* Bubble Tail Pointing Down to the Avatar Icon Below */}
            <span className="bubble-tail" aria-hidden="true" />
          </a>

          {/* Dismiss button for the preview bubble */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsPermanentlyDismissed(true);
            }}
            aria-label="Dismiss preview"
            style={{
              position: 'absolute',
              top: -6,
              right: -6,
              width: 18,
              height: 18,
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-text-secondary)',
              color: 'var(--color-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              opacity: 0.7,
              transition: 'opacity var(--transition-fast), transform var(--transition-fast)',
              border: '1.5px solid var(--color-white)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}
            className="preview-close-btn"
          >
            <X size={10} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* Floating Image Icon Alone */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="nurse-avatar-icon-btn"
        aria-label="Chat with Vee Pee Home Care Nurse Assistant on WhatsApp"
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 58,
          height: 58,
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: '0 8px 24px rgba(18, 55, 52, 0.22)',
          textDecoration: 'none',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        {/* Nurse Photo Image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            backgroundColor: 'var(--color-soft-mint)',
          }}
        >
          <Image
            src="/images/assistant/nurse-assistant.jpg"
            alt="Vee Pee Healthcare Nurse Assistant"
            fill
            sizes="58px"
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          />
        </div>

        {/* Online Active Signal */}
        <span
          className="online-signal-indicator"
          style={{
            position: 'absolute',
            bottom: 1,
            right: 1,
            width: 15,
            height: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
          aria-label="Nurse assistant online and active"
          title="Online & Ready to Help"
        >
          {/* Animated Wave / Ping */}
          <span className="online-ping" />
          {/* Solid Green Core */}
          <span className="online-dot" />
        </span>
      </a>

      <style jsx>{`
        /* Popping animation on the avatar icon */
        .nurse-avatar-icon-btn {
          animation: avatarPop 4.5s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
          transition: transform var(--transition-normal), box-shadow var(--transition-normal);
        }

        .nurse-avatar-icon-btn:hover {
          animation-play-state: paused;
          transform: scale(1.1) translateY(-2px);
          box-shadow: 0 12px 32px rgba(18, 55, 52, 0.32) !important;
        }

        @keyframes avatarPop {
          0%, 100% {
            transform: scale(1);
          }
          12% {
            transform: scale(1.14);
          }
          22% {
            transform: scale(0.96);
          }
          32% {
            transform: scale(1.06);
          }
          42% {
            transform: scale(1);
          }
        }

        /* Online Active Signal Pulse */
        .online-ping {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: var(--radius-full);
          background-color: #22C55E;
          opacity: 0.75;
          animation: pingSignal 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .online-dot {
          position: relative;
          width: 11px;
          height: 11px;
          border-radius: var(--radius-full);
          background-color: #16A34A;
          border: 2px solid #FFFFFF;
          box-shadow: 0 0 4px rgba(22, 163, 74, 0.6);
        }

        @keyframes pingSignal {
          0% {
            transform: scale(0.9);
            opacity: 0.85;
          }
          70%, 100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }

        /* Small Preview Bubble Styles (Positioned Above Avatar) */
        .nurse-preview-bubble-wrap {
          transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .nurse-preview-bubble-wrap.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .nurse-preview-bubble-wrap.is-hidden {
          opacity: 0;
          transform: translateY(8px) scale(0.94);
          pointer-events: none;
        }

        .nurse-preview-bubble {
          transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
        }

        .nurse-preview-bubble:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(18, 55, 52, 0.18);
          border-color: var(--color-primary) !important;
        }

        /* Downward Pointing Tail into Avatar */
        .bubble-tail {
          position: absolute;
          bottom: -6px;
          right: 23px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid var(--color-white);
          filter: drop-shadow(0 1.5px 1px rgba(18, 55, 52, 0.08));
        }

        .preview-close-btn:hover {
          opacity: 1 !important;
          transform: scale(1.15);
        }

        @media (max-width: 768px) {
          .floating-nurse-assistant {
            bottom: clamp(1rem, 3.5vh, 1.75rem) !important;
            right: clamp(0.85rem, 3vw, 1.25rem) !important;
          }
        }

        @media (max-width: 520px) {
          .floating-nurse-assistant {
            bottom: 1rem !important;
            right: 0.85rem !important;
          }
          .nurse-avatar-icon-btn {
            width: 50px !important;
            height: 50px !important;
          }
          .nurse-preview-bubble-wrap {
            max-width: calc(100vw - 2rem);
          }
          .nurse-preview-bubble {
            padding: 0.38rem 0.75rem 0.38rem 0.65rem !important;
            font-size: 0.76rem !important;
          }
          .bubble-tail {
            right: 19px !important;
          }
        }
      `}</style>
    </aside>
  );
}
