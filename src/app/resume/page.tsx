import type { Metadata } from 'next';
import { Resume } from '@/components/resume';

export const metadata: Metadata = {
  title: 'Gabriel Sandim · Résumé',
  description: 'Frontend Engineer and AI engineering. React, React Native, TypeScript, Claude Code and MCP.',
};

export default function ResumePage() {
  return <Resume />;
}
