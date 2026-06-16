import type { ReactNode } from 'react';

interface PageSectionProps {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}

export function PageSection({ eyebrow, title, children }: PageSectionProps) {
  return (
    <section className="page-section">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      <div className="section-body">{children}</div>
    </section>
  );
}
