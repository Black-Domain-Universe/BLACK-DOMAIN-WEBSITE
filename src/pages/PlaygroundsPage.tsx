import { PageSection } from '../components/PageSection';

export function PlaygroundsPage() {
  return (
    <PageSection eyebrow="Playgrounds" title="Kids / Family Playgrounds">
      <p>
        Placeholder for safe browser interactions, Team of Five mini quests,
        creative toys, and age-band markers.
      </p>
      <div className="content-grid">
        <article>
          <h2>Steward Games</h2>
          <p>Placeholder for Clio, Darrel, Neris, Lyra, and M05 activities.</p>
        </article>
        <article>
          <h2>Creative Toys</h2>
          <p>Placeholder for Build a Steward and safe prompt generation.</p>
        </article>
        <article>
          <h2>Free Play / Patron Extras</h2>
          <p>Placeholder labels only. No ads, no dark patterns.</p>
        </article>
      </div>
    </PageSection>
  );
}
