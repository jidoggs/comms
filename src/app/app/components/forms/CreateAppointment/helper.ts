import { FormItems } from '@/app/app/correspondence/components/ExpandData/types';
import { createAppointment } from './type';




export const correspondenceCreateMeeting: FormItems<createAppointment>[] = [
  {
    name: 'Location',
    label: 'Location',
    placeholder: 'Add a meeting link or a physical address',
  },

  {
    name: 'Guests',
    label: 'Guests',

    placeholder: 'Add people by name or email',
  },
  {
    name: 'Note',
    label: 'Note',
    placeholder: 'Aa',
  },
];
