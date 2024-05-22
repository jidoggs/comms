import { MinuteData } from '@/types';

export type HomeContextType = {
  minuteData: MinuteData[];
  isMinutesFetching: boolean;
  queuedList: any;
  ongoingList: any;
  selectedMinute: MinuteData | undefined;
  triggerSelectedMinute: (value: MinuteData) => void;
} | null;
