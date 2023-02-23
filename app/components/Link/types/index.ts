import type { ReactNode } from 'react';

export interface LinkProps {
  children: ReactNode;
  to: string;
  variant: 'success' | 'error' | 'confirm' | 'link';
}
