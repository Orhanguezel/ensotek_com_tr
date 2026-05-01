/**
 * Navbar yüksekliğini ölçüp --navbar-h CSS değişkenine yazar.
 */
export function installNavbarHeightObserver() {
  if (typeof document === "undefined") return () => { };
  const root = document.documentElement;
  const write = (h: number) => {
    root.style.setProperty("--navbar-h", `${Math.round(h)}px`);
  };
  write(96); // Default

  const el = document.querySelector<HTMLElement>("header"); // header elementini kullanıyoruz
  if (!el) return () => { };

  const rafId = requestAnimationFrame(() => {
    const h = el.getBoundingClientRect().height || el.offsetHeight || 96;
    write(h);
  });

  const ro = new ResizeObserver((entries) => {
    const box = entries[0]?.contentRect;
    const h = box?.height ?? el.offsetHeight ?? 96;
    write(h);
  });

  ro.observe(el);

  return () => {
    cancelAnimationFrame(rafId);
    ro.disconnect();
  };
}

/**
 * Pürüzsüz ve Navbar offsetli kaydırma.
 */
export function scrollToSection(id: string, opts?: { instant?: boolean; retryCount?: number }) {
  if (typeof document === "undefined") return;

  const el = document.getElementById(id);
  
  if (!el) {
    const currentRetry = opts?.retryCount || 0;
    if (currentRetry < 5) {
      setTimeout(() => {
        scrollToSection(id, { ...opts, retryCount: currentRetry + 1 });
      }, 150);
    }
    return;
  }

  const navbarH = parseInt(
    getComputedStyle(document.documentElement)
      .getPropertyValue("--navbar-h")
      .replace("px", "")
  ) || 96;

  const top = el.getBoundingClientRect().top + window.pageYOffset - navbarH - 12;

  window.scrollTo({
    top,
    behavior: opts?.instant ? "auto" : "smooth",
  });
}
