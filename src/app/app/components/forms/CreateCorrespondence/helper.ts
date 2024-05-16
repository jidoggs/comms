import { CorrespondenceData, FormItems } from '@/types';

export const correspondenceFormInputs: FormItems<CorrespondenceData>[] = [
  {
    name: 'sender',
    label: 'Sender - Who sent it',
    placeholder: 'Aa',
    type: 'input',
    rules: [{ required: true, message: 'Sender is required' }],
  },
  {
    name: 'creator',
    label: 'Recipient (Primary)',
    placeholder: 'Add people, offices and departments. Comma separated',
    type: 'select',
    rules: [{ required: true, message: 'Recipient is required' }],
  },
  {
    name: 'subject',
    label: 'Subject',
    placeholder: 'Aa',
    type: 'input',
    rules: [{ required: true, message: 'Subject is required' }],
  },
  {
    name: 'minute',
    label: 'Minute',
    placeholder: 'Aa',
    type: 'textArea',
    // rules: [{ required: true, message: 'Minute is required' }],
  },
  {
    name: 'date_of_correspondence',
    label: 'Date of correspondence',
    placeholder: 'Aa',
    type: 'date',
    rules: [{ required: true, message: 'Date of correspondence is required' }],
  },
  {
    name: 'reference_number',
    label: 'Ref. No',
    placeholder: 'Aa',
    type: 'input',
    rules: [{ required: true, message: 'Ref. No is required' }],
  },
];
