import type { ProjectThreadWithName } from '@/services/thread/types';

export interface ThreadListProps {
  threads: ProjectThreadWithName[];
  loading: boolean;
}
