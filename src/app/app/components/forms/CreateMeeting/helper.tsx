import DatePicker from '@/common/components/icons/DatePicker';
import { MeetingData } from './types';
import Location from '@/common/components/icons/Location';
import Users from '@/common/components/icons/Users';
import { FormItems } from '@/types';

export const createMeetingFormInputs: FormItems<MeetingData>[] = [
  {
    name: 'name',
    label: 'Name of appointment',
    placeholder: 'Aa',
    rules: [{ required: true, message: 'Name of appointment is required' }],
  },
  {
    name: 'date_time',
    label: (
      <span className="flex items-center gap-x-2.5">
        <DatePicker size={22} /> <span>Date & time</span>
      </span>
    ),
    placeholder: '',
    rules: [{ required: true, message: 'Date & time is required' }],
  },
  {
    name: 'location',
    label: (
      <span className="flex items-center gap-x-2.5">
        <Location size={22} /> <span>Location</span>
      </span>
    ),
    placeholder: 'Add a meeting link or physical address',
    rules: [{ required: true, message: 'Location is required' }],
  },
  {
    name: 'guests',
    label: (
      <span className="flex items-center gap-x-2.5">
        <Users size={22} /> <span>Guests</span>
      </span>
    ),
    placeholder: 'Add people by name or email',
    rules: [{ required: true, message: 'Guests is required' }],
  },
  {
    name: 'note',
    label: (
      <span className="flex items-center gap-x-2.5">
        <Users size={22} /> <span>Note</span>
      </span>
    ),
    placeholder: 'Aa',
    rules: [{ required: true, message: 'Note is required' }],
  },
];
