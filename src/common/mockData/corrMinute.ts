export interface CorrespondenceMinute {
  id: number;
  type: string;
  details: {
    minute?: string;
    file?: FileList | string;
    meetingTitle?: string;
    meetingDate?: string;
    meetingUrl?: string;
    participants?: string;
    meetingDesc?: string;
  };
  userDetails: {
    name: string;
    title: string;
    office: string;
  };
  dateTime: string;
  secondary: string[];
}

export const correspondenceMinute = [
  {
    id: 1,
    type: 'text',
    minuteDetails: {
      minuteText:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi delectus odio expedita recusandae, corporis officiis laudantium accusamus mollitia inventore accusantium et voluptatum fuga commodi eos consectetur vel dignissimos repudiandae distinctio?',
    },
    userDetails: {
      name: 'Wole Adun',
      title: 'HM',
      office: 'Trade & Investments',
      image: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    dateTime: '4:22pm, 16 Feb 2024',
    secondary: ['K', 'S', 'I'],
  },
  {
    id: 2,
    type: 'document',
    minuteDetails: {
      file: '/file/sample.pdf',
    },
    userDetails: {
      name: 'Wole Adun',
      title: 'HM',
      office: 'Trade & Investments',
    },
    dateTime: '4:22pm, 16 Feb 2024',
    secondary: ['P', 'T', 'O'],
  },
  {
    id: 3,
    type: 'text',
    minuteDetails: {
      minuteText:
        'Kindly provide advise on the Nigerian Breweries correspondence. Also find attached additional information to help with your findings. Regards',
    },
    userDetails: {
      name: 'Jane Doe',
      title: 'SD',
      office: 'Trade & Investments',
    },
    dateTime: '4:22pm, 16 Feb 2024',
    secondary: ['K', 'S', 'I'],
  },
  {
    id: 3.1,
    type: 'document',
    minuteDetails: {
      file: '/file/sample.pdf',
    },
    userDetails: {
      name: 'Wole Adun',
      title: 'HM',
      office: 'Trade & Investments',
    },
    dateTime: '4:22pm, 16 Feb 2024',
    secondary: ['P', 'T', 'O'],
  },
  {
    id: 3.3,
    type: 'meeting',
    minuteDetails: {
      meetingTitle: 'Export of Brewery Products',
      meetingDate: 'Friday, 16 February 2024 . 12:30pm - 1:30pm',
      meetingUrl: 'https://meet.google.com/qrm-smti-liv',
      participants: ['P', 'T', 'O', 'Q'],
      meetingDesc:
        'Kindly provide advise on the Nigerian Breweries correspondence. Also find attached additional information to help with your findings. Regards',
    },
    userDetails: {
      name: 'Wole Adun',
      title: 'HM',
      office: 'Trade & Investments',
    },
    dateTime: '4:22pm, 16 Feb 2024',
    secondary: ['P', 'T', 'O'],
  },
  {
    id: 4,
    type: 'document',
    minuteDetails: {
      file: '/file/sample.pdf',
    },
    userDetails: {
      name: 'Wole Adun',
      title: 'HM',
      office: 'Trade & Investments',
    },
    dateTime: '4:22pm, 16 Feb 2024',
    secondary: ['P', 'T', 'O'],
  },
  {
    id: 5,
    type: 'text',
    minuteDetails: {
      minuteText: 'I hope this message finds you well',
    },
    userDetails: {
      name: 'Jane Doe',
      title: 'SD',
      office: 'Trade & Investments',
    },
    dateTime: '4:22pm, 16 Feb 2024',
    secondary: ['K', 'S', 'I'],
  },
  {
    id: 6,
    type: 'document',
    minuteDetails: {
      file: '/file/sample.pdf',
    },
    userDetails: {
      name: 'Wole Adun',
      title: 'HM',
      office: 'Trade & Investments',
    },
    dateTime: '4:22pm, 16 Feb 2024',
    secondary: ['P', 'T', 'O'],
  },
  {
    id: 7,
    type: 'text',
    minuteDetails: {
      minuteText:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi delectus odio expedita recusandae, corporis officiis laudantium accusamus mollitia inventore accusantium et voluptatum fuga commodi eos consectetur vel dignissimos repudiandae distinctio?',
    },
    userDetails: {
      name: 'Jane Doe',
      title: 'SD',
      office: 'Trade & Investments',
    },
    dateTime: '4:22pm, 16 Feb 2024',
    secondary: ['K', 'S', 'I'],
  },
];
