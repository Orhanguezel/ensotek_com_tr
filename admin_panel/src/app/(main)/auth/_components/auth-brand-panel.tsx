"use client";

import Image from "next/image";
import { useGetSiteSettingByKeyQuery } from "@/integrations/hooks";
import { useGetThemeAdminQuery } from "@/integrations/hooks";
import { motion } from "framer-motion";

const LOGO_FALLBACK = "/logo/png/ensotek_logo_512.png";

type Props = {
  heading: string;
  subtext: string;
};

export function AuthBrandPanel({ heading, subtext }: Props) {
  const { data: logoSetting } = useGetSiteSettingByKeyQuery("site_logo");
  const { data: configSetting } = useGetSiteSettingByKeyQuery("ui_admin_config");
  const { data: themeTokens } = useGetThemeAdminQuery();

  const logoVal = logoSetting?.value as any;
  const configVal = configSetting?.value as any;

  const logoUrl: string = logoVal?.url || LOGO_FALLBACK;
  const logoAlt: string = logoVal?.alt || "Logo";
  const appName: string = configVal?.branding?.app_name || "Ensotek";

  // Dynamic colors from theme if available
  const primaryColor = (themeTokens?.colors as any)?.primary || "#1a56db";

  return (
    <div className="relative hidden overflow-hidden bg-slate-950 lg:flex lg:w-1/2">
      {/* Premium Background Mesh */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-primary/20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[30%] -right-[10%] h-[50%] w-[50%] rounded-full bg-blue-500/20 blur-[100px] animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute -bottom-[20%] left-[20%] h-[60%] w-[60%] rounded-full bg-indigo-500/20 blur-[140px] animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 flex w-full flex-col items-center justify-center p-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Floating Logo Container */}
          <div className="relative mx-auto flex size-40 items-center justify-center rounded-3xl bg-white/5 p-8 backdrop-blur-xl border border-white/10 shadow-2xl">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative size-full"
            >
              <Image src={logoUrl} alt={logoAlt} fill className="object-contain filter drop-shadow-2xl" />
            </motion.div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-white/5 px-4 py-1.5 border border-white/10 backdrop-blur-md">
              <div className="size-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{appName}</span>
            </div>
            
            <div className="space-y-3">
              <h1 className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-6xl font-bold tracking-tight text-transparent leading-tight">
                {heading}
              </h1>
              <p className="mx-auto max-w-md text-lg text-white/40 font-medium leading-relaxed">
                {subtext}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer Info */}
        <div className="absolute bottom-12 left-0 w-full px-12">
          <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-widest text-white/20">
            <span>Premium Admin Suite</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
