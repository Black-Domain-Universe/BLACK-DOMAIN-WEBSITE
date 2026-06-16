import { PageSection } from '../components/PageSection';

export function HomePage() {
  return (
    <PageSection eyebrow="Home" title="Black Domain Universe">
      <p>
        Art, stories, tools, and games for a quiet, high-integrity future.
      </p>
      <div className="content-grid">
        <article>
          <h2>Gallery</h2>
          <p>Placeholder for museum-grade GNOSIS art and story collections.</p>
        </article>
        <article>
          <h2>Playgrounds</h2>
          <p>Placeholder for steward games, quests, and creative toys.</p>
        </article>
        <article>
          <h2>Labs & Tools</h2>
          <p>Placeholder for engines, agents, experiments, and build notes.</p>
        </article>
      </div>
      <aside className="clarity-strip">
        <h2>How This Is Funded</h2>
        <p>
          Placeholder for factual funding notes: commissions, limited drops,
          patronage, marketplace sales, tools, and consulting.
        </p>
      </aside>
    </PageSection>
  );
}
