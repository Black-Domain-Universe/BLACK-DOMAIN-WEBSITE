import { PageSection } from '../components/PageSection';

export function MarketplacePage() {
  return (
    <PageSection eyebrow="Marketplace" title="Marketplace / MP">
      <p>
        Placeholder for clear, honest commerce and membership copy. This page
        does not execute payments, wallet actions, trading, or contracts.
      </p>
      <div className="content-grid">
        <article>
          <h2>Visitor</h2>
          <p>Placeholder tier: gallery, free games, and Guide access.</p>
        </article>
        <article>
          <h2>Patron / Collector</h2>
          <p>Placeholder tier: limited drops, prints, and extra content.</p>
        </article>
        <article>
          <h2>Builder / Partner</h2>
          <p>Placeholder tier: tools, consulting, and collaborations.</p>
        </article>
      </div>
      <aside className="clarity-strip">
        <h2>Money Clarity</h2>
        <p>
          Placeholder for plain-language funding context: hardware, humans,
          audits, and tools cost real resources.
        </p>
      </aside>
    </PageSection>
  );
}
