'use client';

import { useMemo, useState } from 'react';
import { Calculator, Droplets, Send, Thermometer } from 'lucide-react';
import { Link } from '@/i18n/navigation';

type Locale = 'tr' | 'en' | string;

interface Props {
  locale: Locale;
}

const copy = {
  tr: {
    label: 'Kapasite Hesaplama',
    title: 'Soğutma Kulesi Kapasite Hesaplama Aracı',
    description:
      'Debi ve sıcaklık farkına göre yaklaşık ısı yükünü hesaplayın; sonucu teklif talebinize ekleyin.',
    flow: 'Su debisi',
    inlet: 'Giriş suyu sıcaklığı',
    outlet: 'Çıkış suyu sıcaklığı',
    wetBulb: 'Yaş termometre sıcaklığı',
    m3h: 'm3/h',
    celsius: 'C',
    result: 'Yaklaşık kapasite',
    delta: 'Soğutma farkı',
    approach: 'Yaklaşım',
    formula: 'Q = debi x 1.163 x sıcaklık farkı',
    quote: 'Sonuçla Teklif Al',
    reset: 'Varsayılan değerlere dön',
    valid: 'Ön değerlendirme için uygundur. Nihai seçim için su kalitesi, rakım ve proses şartları birlikte değerlendirilmelidir.',
    invalid: 'Giriş sıcaklığı çıkış sıcaklığından, çıkış sıcaklığı da yaş termometre sıcaklığından yüksek olmalıdır.',
    warning:
      'Yaklaşım değeri tipik seçim aralığının dışında. Proses şartları için mühendislik kontrolü önerilir.',
  },
  en: {
    label: 'Capacity Calculator',
    title: 'Cooling Tower Capacity Calculator',
    description:
      'Estimate heat rejection from flow rate and temperature difference, then attach the result to your quote request.',
    flow: 'Water flow rate',
    inlet: 'Inlet water temperature',
    outlet: 'Outlet water temperature',
    wetBulb: 'Wet bulb temperature',
    m3h: 'm3/h',
    celsius: 'C',
    result: 'Estimated capacity',
    delta: 'Cooling range',
    approach: 'Approach',
    formula: 'Q = flow x 1.163 x temperature difference',
    quote: 'Request Quote With Result',
    reset: 'Reset defaults',
    valid: 'Suitable for preliminary review. Final selection should also consider water quality, altitude and process conditions.',
    invalid: 'Inlet temperature must be higher than outlet temperature, and outlet temperature must be higher than wet bulb temperature.',
    warning:
      'The approach value is outside the typical selection range. Engineering review is recommended for these process conditions.',
  },
} as const;

function toNumber(value: string): number {
  return Number(value.replace(',', '.'));
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 1 }).format(value);
}

export function CapacityCalculator({ locale }: Props) {
  const t = copy[locale === 'en' ? 'en' : 'tr'];
  const [flow, setFlow] = useState('120');
  const [inlet, setInlet] = useState('35');
  const [outlet, setOutlet] = useState('30');
  const [wetBulb, setWetBulb] = useState('24');

  const values = useMemo(() => {
    const flowM3h = toNumber(flow);
    const inletC = toNumber(inlet);
    const outletC = toNumber(outlet);
    const wetBulbC = toNumber(wetBulb);
    const deltaC = inletC - outletC;
    const approachC = outletC - wetBulbC;
    const isValid =
      Number.isFinite(flowM3h) &&
      Number.isFinite(inletC) &&
      Number.isFinite(outletC) &&
      Number.isFinite(wetBulbC) &&
      flowM3h > 0 &&
      deltaC > 0 &&
      approachC > 0;

    return {
      flowM3h,
      inletC,
      outletC,
      wetBulbC,
      deltaC,
      approachC,
      capacityKw: isValid ? flowM3h * 1.163 * deltaC : 0,
      isValid,
      hasWarning: isValid && (approachC < 3 || approachC > 8),
    };
  }, [flow, inlet, outlet, wetBulb]);

  const quoteHref = {
    pathname: '/contact' as const,
    query: {
      source: 'capacity-calculator',
      capacity_kw: String(Math.round(values.capacityKw)),
      flow_m3h: flow,
      inlet_c: inlet,
      outlet_c: outlet,
      wet_bulb_c: wetBulb,
    },
  };

  const inputs = [
    { label: t.flow, unit: t.m3h, value: flow, setValue: setFlow, icon: Droplets, min: 1, step: 1 },
    { label: t.inlet, unit: t.celsius, value: inlet, setValue: setInlet, icon: Thermometer, min: -10, step: 0.5 },
    { label: t.outlet, unit: t.celsius, value: outlet, setValue: setOutlet, icon: Thermometer, min: -10, step: 0.5 },
    { label: t.wetBulb, unit: t.celsius, value: wetBulb, setValue: setWetBulb, icon: Thermometer, min: -10, step: 0.5 },
  ];

  return (
    <section className="section-py bg-(--deep)">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center border border-(--cyan) text-(--cyan)">
              <Calculator size={18} />
            </span>
            <span className="text-xs uppercase tracking-[3px] text-(--cyan) font-[family-name:var(--font-display)]">
              {t.label}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-(--white) font-[family-name:var(--font-display)] uppercase tracking-wide">
            {t.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-(--mist)">{t.description}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {inputs.map(({ label, unit, value, setValue, icon: Icon, min, step }) => (
              <label key={label} className="block border border-(--color-border) bg-(--panel) p-5">
                <span className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-(--silver)">
                  <Icon size={15} className="text-(--cyan)" />
                  {label}
                </span>
                <span className="flex items-center gap-3">
                  <input
                    type="number"
                    min={min}
                    step={step}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    className="w-full border border-(--color-border) bg-(--deep) px-4 py-3 text-lg font-semibold text-(--white) outline-none transition-colors focus:border-(--cyan)"
                  />
                  <span className="w-14 text-sm text-(--mist)">{unit}</span>
                </span>
              </label>
            ))}
          </div>

          <div className="border border-(--cyan)/50 bg-(--void) p-6">
            <div className="text-xs uppercase tracking-[3px] text-(--silver)">{t.result}</div>
            <div className="mt-3 text-5xl font-bold text-(--cyan) font-[family-name:var(--font-display)]">
              {values.isValid ? formatNumber(values.capacityKw) : '-'}
              <span className="ml-2 text-lg text-(--mist)">kW</span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="border border-(--color-border) p-4">
                <div className="text-xs uppercase tracking-wider text-(--silver)">{t.delta}</div>
                <div className="mt-2 text-xl font-semibold text-(--white)">
                  {values.isValid ? formatNumber(values.deltaC) : '-'} {t.celsius}
                </div>
              </div>
              <div className="border border-(--color-border) p-4">
                <div className="text-xs uppercase tracking-wider text-(--silver)">{t.approach}</div>
                <div className="mt-2 text-xl font-semibold text-(--white)">
                  {values.isValid ? formatNumber(values.approachC) : '-'} {t.celsius}
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs uppercase tracking-wider text-(--silver)">{t.formula}</p>
            <p className={`mt-4 text-sm leading-relaxed ${values.isValid ? 'text-(--mist)' : 'text-red-300'}`}>
              {values.isValid ? (values.hasWarning ? t.warning : t.valid) : t.invalid}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={quoteHref}
                locale={locale}
                className={`btn-fill justify-center gap-2 ${values.isValid ? '' : 'pointer-events-none opacity-50'}`}
                aria-disabled={!values.isValid}
              >
                <Send size={16} />
                {t.quote}
              </Link>
              <button
                type="button"
                onClick={() => {
                  setFlow('120');
                  setInlet('35');
                  setOutlet('30');
                  setWetBulb('24');
                }}
                className="btn-outline justify-center"
              >
                {t.reset}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
