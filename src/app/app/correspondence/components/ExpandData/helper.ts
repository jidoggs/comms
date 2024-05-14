import { CorrespondenceData, FormItems } from '@/types';

export const correspondenceFormInputs: FormItems<CorrespondenceData>[] = [
  {
    name: 'sender',
    label: 'Sender - Who sent it',
    placeholder: 'Aa',
    rules: [{ required: true, message: 'Sender is required' }],
  },
  {
    name: 'creator',
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
    name: 'reference_number',
    label: 'Ref. No',
    placeholder: 'Aa',
    rules: [{ required: true, message: 'Ref. No is required' }],
  },
];
