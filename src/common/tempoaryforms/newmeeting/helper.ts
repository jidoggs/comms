import { FormItems } from '@/types';
import { CorrespondenceData } from './type';

export const correspondenceFormInputs: FormItems<CorrespondenceData>[] = [
  {
    name: 'sent_by',
    label: 'Sender - Who sent it',
    placeholder: 'Aa',
    rules: [{ required: true, message: 'Sender is required' }],
  },
  {
    name: 'recipient',
    label: 'Recipient (Primary)',
    placeholder: 'Add people, offices and departments. Comma separated',
    rules: [{ required: true, message: 'Recipient is required' }],
  },
  {
    name: 'subject',
    label: 'Subject',
    placeholder: 'Aa',
    rules: [{ required: true, message: 'Subject is required' }],
  },
  {
    name: 'comment',
    label: 'Comment',
    placeholder: 'Aa',
    rules: [{ required: true, message: 'Comment is required' }],
  },
  {
    name: 'created_at',
    label: 'Date of correspondence',
    placeholder: 'Aa',
    rules: [{ required: true, message: 'Date of correspondence is required' }],
  },
  {
    name: 'ref_no',
    label: 'Ref. No',
    placeholder: 'Aa',
    rules: [{ required: true, message: 'Ref. No is required' }],
  },
];
