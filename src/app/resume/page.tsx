import type { Metadata } from 'next';
import { Resume } from '@/components/resume';

export const metadata: Metadata = {
  title: 'Gabriel Sandim · Résumé',
  description: 'Full Stack Engineer and AI engineering. TypeScript, React, Node.js, LLM APIs, Vertex AI, Bedrock and Claude Code.',
};

export default function ResumePage() {
  return <Resume />;
}
