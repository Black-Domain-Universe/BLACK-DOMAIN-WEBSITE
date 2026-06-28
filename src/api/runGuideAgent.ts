import type { GuideMode, GuideRequest, GuideResponse } from '../types/guide.types';

export async function runGuideAgent(
  input: GuideRequest,
  mode: GuideMode,
): Promise<GuideResponse> {
  const safeMode = input.kidsMode ? ' Kids mode is active.' : '';

  return {
    content: `Stubbed Black Domain Guide response for ${mode}. This front-end placeholder does not call a backend, use API keys, provide financial advice, or pretend to be human.${safeMode}`,
    imagePrompt: mode === 'story-image' ? 'Safe placeholder image prompt for future review.' : null,
  };
}
