export interface ThreadNavProps {
  threads?: string[];
}

export interface ThreadNavEmits {
  (e: 'create'): void;
}
