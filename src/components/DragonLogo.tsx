/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { SITE_CONFIG } from '../config';

interface LogoProps {
  className?: string;
  showText?: boolean;
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export default function DragonLogo({
  className = '',
  showText = true,
  theme = 'dark',
  size = 'md',
}: LogoProps) {
  const [hasError, setHasError] = useState(false);
  const [customLogo, setCustomLogo] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ag_custom_logo') || SITE_CONFIG.defaultLogoUrl || null;
    }
    return SITE_CONFIG.defaultLogoUrl || null;
  });
  const [logoStyle, setLogoStyle] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ag_logo_style') || 'default';
    }
    return 'default';
  });

  // CMS Enable status variable defining layout controls visibility
  const [isCmsEnabled, setIsCmsEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ag_cms_enabled') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const checkCustomLogo = () => {
      const stored = localStorage.getItem('ag_custom_logo') || SITE_CONFIG.defaultLogoUrl || null;
      setCustomLogo(stored);
      if (stored) {
        setHasError(false);
      }
      const style = localStorage.getItem('ag_logo_style') || 'default';
      setLogoStyle(style || 'default');
    };

    const checkCmsEnabled = () => {
      setIsCmsEnabled(localStorage.getItem('ag_cms_enabled') === 'true');
    };

    window.addEventListener('storage', checkCustomLogo);
    window.addEventListener('logo_changed', checkCustomLogo);
    window.addEventListener('cms_state_changed', checkCmsEnabled);
    
    // Initial run to capture immediately set state
    checkCmsEnabled();

    return () => {
      window.removeEventListener('storage', checkCustomLogo);
      window.removeEventListener('logo_changed', checkCustomLogo);
      window.removeEventListener('cms_state_changed', checkCmsEnabled);
    };
  }, []);

  const handleImageError = () => {
    setHasError(true);
  };

  // Sizing scales conforming to brand design guidelines - slightly larger to guarantee crystal clear readability of structural details
  const sizeClasses = {
    sm: 'h-10 w-10 md:h-11 md:w-11',
    md: 'h-13 w-13 md:h-15 md:w-15',
    lg: 'h-24 w-24 md:h-28 md:w-28',
  };

  const textSizes = {
    sm: 'text-[11px]',
    md: 'text-xs md:text-[14px] lg:text-base',
    lg: 'text-xl md:text-2xl',
  };

  const isLogoHidden = logoStyle === 'hidden';
  const isLogoEmpty = logoStyle === 'empty';

  return (
    <div className={`flex items-center gap-3 ${className}`} id="brand-logo-container">
      {!isLogoHidden && (
        (customLogo && !hasError) ? (
          /* Official Uploaded Logo Image on transparent background - uncropped container to support standard corporate geometry shapes */
          <div 
            className={`relative shrink-0 transition-all duration-300 hover:scale-105 bg-transparent ${sizeClasses[size]}`}
            id="official-logo-flat-transparent"
          >
            <img
              src={customLogo}
              alt="AG Capital Advisory Custom Logo"
              className="w-full h-full object-contain filter logo-gold-glow"
              style={{ filter: 'url(#remove-white-bg) drop-shadow(0px 2px 5px rgba(0,0,0,0.25))' }}
              onError={handleImageError}
              referrerPolicy="no-referrer"
            />
          </div>
        ) : null
      )}

      {showText && (
        <div className="flex flex-col select-none text-left shrink-0" id="brand-logo-text-group">
          <span
            className={`font-sans font-bold tracking-wider leading-none mb-1 whitespace-nowrap ${textSizes[size]} ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
            style={{ letterSpacing: '0.12em' }}
          >
            AG CAPITAL ADVISORY
          </span>
          <span
            className="font-mono text-[8px] md:text-[9px] tracking-widest text-[#C9A227] leading-none uppercase whitespace-nowrap"
            style={{ transform: 'scale(0.9)', transformOrigin: 'left' }}
          >
            — BEYOND THE ROUND —
          </span>
        </div>
      )}

      {/* Direct CMS Image Upload Action Button - Only rendered if CMS is active via secret query settings */}
      {isCmsEnabled && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            const event = new Event('open_logo_editor');
            window.dispatchEvent(event);
          }}
          className="ml-3 px-2 py-1 space-x-1 rounded bg-[#0A0D14]/80 border border-[#C9A227]/30 hover:border-[#C9A227] text-[#C9A227] hover:text-white hover:bg-[#C9A227]/10 text-[9px] font-mono tracking-wider transition-all duration-300 flex items-center shrink-0 cursor-pointer shadow-md select-none"
          title="Upload Custom Logo / Thay đổi logo"
          id="dragon-logo-direct-upload-btn"
        >
          <Upload size={9} />
          <span>UPLOAD</span>
        </button>
      )}

      {/* Real-time browser-native transparent alpha key shader for white color background removal */}
      <svg width="0" height="0" className="absolute pointer-events-none opacity-0" style={{ width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="remove-white-bg" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              -2 -2 -2 5.8 -0.1
            " />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
