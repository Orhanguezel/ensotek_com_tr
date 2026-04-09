import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type SectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  align = 'left',
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {label && (
        <span className="section-label-et">{label}</span>
      )}
      <h2 className="section-title-et">{title}</h2>
      {description && (
        <p className={cn('section-subtitle-et', align === 'center' && 'mx-auto')}>{description}</p>
      )}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
