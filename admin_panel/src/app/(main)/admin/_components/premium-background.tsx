"use client";

import React from "react";

export function PremiumBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden opacity-0 transition-opacity duration-1000 [html[data-theme-preset=premium]_&]:opacity-100">
      {/* Primary Glow */}
      <div 
        className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      
      {/* Secondary Glow */}
      <div 
        className="absolute top-[40%] -right-[5%] h-[30%] w-[30%] rounded-full bg-primary/5 blur-[100px] animate-pulse"
        style={{ animationDuration: '12s', animationDelay: '2s' }}
      />
      
      {/* Bottom Glow */}
      <div 
        className="absolute -bottom-[10%] left-[20%] h-[35%] w-[50%] rounded-full bg-primary/5 blur-[150px] animate-pulse"
        style={{ animationDuration: '10s', animationDelay: '1s' }}
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
