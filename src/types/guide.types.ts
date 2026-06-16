export type GuideMode = 'story' | 'story-image' | 'site-guide';

export interface GuideRequest {
  prompt: string;
  kidsMode: boolean;
}

export interface GuideResponse {
  content: string;
  imagePrompt: string | null;
}
