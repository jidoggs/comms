import { MinuteData } from '@/types';

export type HomeContextType = {
  isMinutesFetching: boolean;
  queuedList: MinuteData[];
  ongoingList: MinuteData[];
  isNewAccount: boolean;
  queuedListHasNewItem: boolean;
  ongoingListHasNewItem: boolean;
} | null;

export type SocketDataType = {
  queue: MinuteData[];
  ongoing: MinuteData[];
};
