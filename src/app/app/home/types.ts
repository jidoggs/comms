import { MinuteData } from '@/types';

export type HomeContextType = {
  isMinutesFetching: boolean;
  queuedList: MinuteData[];
  ongoingList: MinuteData[];
  isNewAccount: boolean;
} | null;
