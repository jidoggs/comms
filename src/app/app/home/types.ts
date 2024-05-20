import { APIResponseSuccessModel, MinuteData } from '@/types';

export type HomeContextType = {
  minuteData: APIResponseSuccessModel<MinuteData[]> | never[];
  queuedList: any;
  ongoingList: any;
  selectedMinute: MinuteData | undefined;
  triggerSelectedMinute: (value: MinuteData) => void;
} | null;
