import { FormEvent, useState } from 'react';
import { runGuideAgent } from '../api/runGuideAgent';
import { PageSection } from '../components/PageSection';
import type { GuideMode } from '../types/guide.types';

export function GuidePage() {
  const [mode, setMode] = useState<GuideMode>('site-guide');
  const [prompt, setPrompt] = useState('');
  const [kidsMode, setKidsMode] = useState(false);
  const [response, setResponse] = useState('The Black Domain Guide is ready in stub mode.');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await runGuideAgent({ prompt, kidsMode }, mode);
    setResponse(result.imagePrompt ? `${result.content}\n\n${result.imagePrompt}` : result.content);
  }

  return (
    <PageSection eyebrow="Guide" title="Black Domain Guide">
      <p>
        Front-end-only placeholder for Story Mode, Story + Image Mode, and Site
        Guide. No backend, no API keys, and no real model calls are wired here.
      </p>
      <form className="guide-panel" onSubmit={handleSubmit}>
        <label>
          Mode
          <select value={mode} onChange={(event) => setMode(event.target.value as GuideMode)}>
            <option value="site-guide">Site Guide</option>
            <option value="story">Story Mode</option>
            <option value="story-image">Story + Image Mode</option>
          </select>
        </label>
        <label>
          Prompt
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Ask for art, games, lore, or simple explanations."
          />
        </label>
        <label className="inline-check">
          <input
            type="checkbox"
            checked={kidsMode}
            onChange={(event) => setKidsMode(event.target.checked)}
          />
          Kids mode
        </label>
        <button type="submit">Run Stub Guide</button>
      </form>
      <pre className="guide-response">{response}</pre>
      <aside className="clarity-strip">
        <h2>Constraints</h2>
        <p>
          GNOSIS / non-ego tone, no human impersonation, no financial or legal
          advice, and stricter filtering for kids mode.
        </p>
      </aside>
    </PageSection>
  );
}
