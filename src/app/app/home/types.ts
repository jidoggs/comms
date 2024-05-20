import { MinuteData } from '@/types';

export type HomeContextType = {
  minuteData: MinuteData[];
  queuedList: any;
  ongoingList: any;
  selectedMinute: MinuteData | undefined;
  triggerSelectedMinute: (value: MinuteData) => void;
} | null;
