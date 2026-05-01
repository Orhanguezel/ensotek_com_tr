// ===================================================================
// FILE: src/modules/theme/defaults.ts
// ===================================================================

export const DEFAULT_THEME = {
  colors: {
    // Brand — Premium Blue
    primary: '#1a56db',       
    primaryDark: '#1e429f',   
    accent: '#e1effe',        

    // Surface
    background: '#ffffff',    
    surfaceBase: '#f9fafb',   
    surfaceRaised: '#ffffff', 
    surfaceMuted: '#f3f4f6',  

    // Text
    textStrong: '#111827',    
    textBody: '#4b5563',      
    textMuted: '#9ca3af',     

    // Border
    border: '#e5e7eb',        
    borderLight: '#f3f4f6',   

    // Nav / Footer
    navBg: '#ffffff',         
    navFg: '#111827',
    footerBg: '#111827',      
    footerFg: '#f9fafb',

    // Status
    success: '#059669',       
    warning: '#d97706',       
    danger: '#dc2626',        

    // Dark surface
    surfaceDarkBg: '#111827',       
    surfaceDarkText: '#e5e7eb',     
    surfaceDarkHeading: '#ffffff',  
  },

  typography: {
    fontHeading: 'Outfit, system-ui, sans-serif',
    fontBody: 'Inter, system-ui, sans-serif',
  },

  radius: '0.75rem',   
  darkMode: 'light',

  sectionBackgrounds: [
    { key: 'hero', bg: 'transparent' },
    { key: 'features', bg: '#f9fafb' },
    { key: 'products', bg: '#ffffff' },
    { key: 'cta', bg: '#1a56db', textColor: '#ffffff', headingColor: '#ffffff' },
  ],
};
