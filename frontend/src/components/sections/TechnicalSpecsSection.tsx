import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeader } from '@/components/patterns/SectionHeader';

const SPEC_ROWS = 6;
const COLUMNS = ['parameter', 'counterflow', 'crossflow', 'closedCircuit'];

export function TechnicalSpecsSection() {
  const t = useTranslations('home.techSpecs');

  return (
    <section className="section-py bg-(--deep)" id="specs">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            label={t('label')}
            title={t('title')}
            description={t('subtitle')}
            className="mb-16"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-(--color-border)">
                  {COLUMNS.map((col) => (
                    <th
                      key={col}
                      className={`px-4 py-4 text-left text-xs tracking-[2px] uppercase font-[family-name:var(--font-display)] ${
                        col === 'parameter' ? 'text-(--silver)' : 'text-(--cyan)'
                      }`}
                    >
                      {t(`col.${col}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: SPEC_ROWS }, (_, i) => (
                  <tr
                    key={i}
                    className="border-b border-(--color-border) hover:bg-(--panel) transition-colors group"
                  >
                    <td className="px-4 py-4 text-sm text-(--mist) font-medium">
                      {t(`row${i + 1}.param`)}
                    </td>
                    {['counterflow', 'crossflow', 'closedCircuit'].map((col) => (
                      <td key={col} className="px-4 py-4 text-sm text-(--light)">
                        {t(`row${i + 1}.${col}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
