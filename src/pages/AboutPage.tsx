import { PageSection } from '../components/PageSection';

export function AboutPage() {
  return (
    <PageSection eyebrow="About" title="What Black Domain Is">
      <p>
        Placeholder for a short, human description of Black Domain as a quiet
        digital museum, research lab, and playground.
      </p>
      <div className="content-grid">
        <article>
          <h2>GNOSIS & Law</h2>
          <p>Placeholder for compressed non-worship, non-ego framing.</p>
        </article>
        <article>
          <h2>Reality Segment</h2>
          <p>
            Placeholder for transparent AI, hardware, cloud, audit, and people
            costs.
          </p>
        </article>
        <article>
          <h2>Roles</h2>
          <p>Placeholder for optional role-based team notes.</p>
        </article>
      </div>
    </PageSection>
  );
}
