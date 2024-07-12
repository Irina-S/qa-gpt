import type { ThreadItem } from '../../types';

export interface ThreadNavProps {
  threads?: ThreadItem[];
}

export interface ThreadNavEmits {
  (e: 'create', value: string): void;
  (e: 'select', value: ThreadItem): void;
}
