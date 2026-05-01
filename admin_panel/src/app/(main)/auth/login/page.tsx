"use client";

import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocaleContext } from "@/i18n";
import { AuthBrandPanel } from "../_components/auth-brand-panel";
import { LoginForm } from "../_components/login-form";
import { useGetSiteSettingByKeyQuery } from "@/integrations/hooks";

function LoginFormFallback() {
  return (
    <div className="space-y-6">
      <div className="h-12 w-full animate-pulse rounded-xl bg-muted/50" />
      <div className="h-12 w-full animate-pulse rounded-xl bg-muted/50" />
      <div className="h-12 w-full animate-pulse rounded-xl bg-muted/50" />
      <div className="h-12 w-full animate-pulse rounded-xl bg-muted/50" />
    </div>
  );
}

export default function Login() {
  const { t } = useLocaleContext();
  const { data: configSetting } = useGetSiteSettingByKeyQuery("ui_admin_config");
  const configVal = configSetting?.value as any;
  const appName = configVal?.branding?.app_name || "Ensotek";

  return (
    <div className="flex min-h-dvh bg-white dark:bg-slate-950">
      <AuthBrandPanel 
        heading={t("admin.auth.login.welcomeBack")} 
        subtext={t("admin.auth.login.continueLogin")} 
      />

      {/* Sağ (form) */}
      <div className="relative flex w-full items-center justify-center p-8 lg:w-1/2">
        {/* Subtle Background Pattern for Mobile */}
        <div className="absolute inset-0 opacity-[0.03] lg:hidden" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 w-full max-w-md space-y-12"
        >
          {/* Mobile Header */}
          <div className="space-y-4 lg:hidden">
             <div className="size-12 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl mb-6">
                {appName[0]}
             </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t("admin.auth.login.title")}
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              {t("admin.auth.login.description")}
            </p>
          </div>

          <div className="space-y-8">
            <Suspense fallback={<LoginFormFallback />}>
              <LoginForm />
            </Suspense>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-center text-slate-500 dark:text-slate-500 text-sm font-medium">
                {t("admin.auth.login.noAccess")}{" "}
                <Link 
                  prefetch={false} 
                  href="mailto:ensotek@ensotek.com.tr" 
                  className="text-primary font-bold hover:underline underline-offset-4 decoration-2"
                >
                  {t("admin.auth.login.contactAdmin")}
                </Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Floating Accent for Right Side */}
        <div className="absolute top-0 right-0 p-8">
          <div className="flex items-center space-x-4">
             <div className="size-2 rounded-full bg-slate-200 dark:bg-slate-800" />
             <div className="size-2 rounded-full bg-slate-200 dark:bg-slate-800" />
             <div className="size-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
