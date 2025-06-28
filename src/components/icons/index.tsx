import React from 'react';

interface IconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const getSizeClasses = (size: 'sm' | 'md' | 'lg' | 'xl' = 'md') => {
  switch (size) {
    case 'sm': return 'w-4 h-4';
    case 'md': return 'w-5 h-5';
    case 'lg': return 'w-6 h-6';
    case 'xl': return 'w-8 h-8';
    default: return 'w-5 h-5';
  }
};

// Bus Icon (used in Modal and RSVPForm)
export const BusIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${getSizeClasses(size)} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 6v6" />
    <path d="M15 6v6" />
    <path d="M2 12h19.6" />
    <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
    <circle cx="7" cy="18" r="2" />
    <path d="M9 18h5" />
    <circle cx="16" cy="18" r="2" />
  </svg>
);

// Clock Icon (used in ScheduleSection and ShabbatSection)
export const ClockIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg 
    className={`${getSizeClasses(size)} ${className}`} 
    fill="currentColor" 
    viewBox="0 0 20 20"
  >
    <path 
      fillRule="evenodd" 
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
      clipRule="evenodd" 
    />
  </svg>
);

// Location Icon (used in ScheduleSection and ShabbatSection)
export const LocationIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg 
    className={`${getSizeClasses(size)} ${className}`} 
    fill="currentColor" 
    viewBox="0 0 20 20"
  >
    <path 
      fillRule="evenodd" 
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
      clipRule="evenodd" 
    />
  </svg>
);

// Calendar Icon (alternative to clock for dates)
export const CalendarIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${getSizeClasses(size)} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// Heart Icon (for wedding/love themes)
export const HeartIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${getSizeClasses(size)} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// Ring Icon (for wedding themes)
export const RingIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${getSizeClasses(size)} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Users Icon (for guest lists)
export const UsersIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${getSizeClasses(size)} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// Check Icon (for confirmations)
export const CheckIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${getSizeClasses(size)} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

// X Icon (for close/cancel)
export const XIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${getSizeClasses(size)} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Arrow Right Icon
export const ArrowRightIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${getSizeClasses(size)} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);

// Arrow Left Icon
export const ArrowLeftIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${getSizeClasses(size)} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12,19 5,12 12,5" />
  </svg>
);

// Phone Icon
export const PhoneIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${getSizeClasses(size)} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// Mail Icon
export const MailIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${getSizeClasses(size)} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// Star Icon
export const StarIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${getSizeClasses(size)} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

// Heart Crack Icon (for sorry/regret messages)
export const HeartCrackIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${getSizeClasses(size)} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="m12 13-1-1 2-2-3-3 2-2" />
  </svg>
);

// Party Popper Icon (for celebration/thank you messages)
export const PartyIcon: React.FC<IconProps> = ({ className = '', size = 'md' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`${getSizeClasses(size)} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5.8 11.3 2 22l10.7-3.79" />
    <path d="M4 3h.01" />
    <path d="M22 8h.01" />
    <path d="M15 2h.01" />
    <path d="M22 20h.01" />
    <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
    <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" />
    <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" />
    <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
  </svg>
); 