import Archive from '@/common/components/icons/Archive';
import Briefcase from '@/common/components/icons/Briefcase';
import Document from '@/common/components/icons/Document';
import Sound from '@/common/components/icons/Sound';

export const documents = [
  {
    icon: Archive,
    value: 'Export of bewery products',
    isActive: false,
    key: 'export',
    children: [
      {
        icon: Document,
        value: 'Export of bewery product',
        isActive: false,
        id: 1,
      },
      {
        icon: Briefcase,
        value: 'Project',
        isActive: false,
        id: 2,
      },
      {
        icon: Document,
        value: 'We will need a meet',
        isActive: false,
        id: 3,
      },
      {
        icon: Sound,
        value: 'We will need a meet...',
        isActive: false,
        id: 4,
      },
    ],
  },
  {
    icon: Archive,
    value: 'BOI - Export of bewery products',
    isActive: false,
    key: 'boi',
    children: [
      {
        icon: Document,
        value: 'BOI 1',
        isActive: false,
        id: 1,
      },
      {
        icon: Briefcase,
        value: 'BOI 2',
        isActive: false,
        id: 2,
      },
      {
        icon: Document,
        value: 'BOI 3',
        isActive: false,
        id: 3,
      },
    ],
  },
  {
    icon: Archive,
    value: 'Customer - Export of bewery...',
    isActive: false,
    key: 'customer',
    children: [
      {
        icon: Document,
        value: 'Customer 1',
        isActive: false,
        id: 1,
      },
      {
        icon: Briefcase,
        value: 'Customer 2',
        isActive: false,
        id: 2,
      },
      {
        icon: Document,
        value: 'Customer 3',
        isActive: false,
        id: 3,
      },
      {
        icon: Document,
        value: 'Customer 4',
        isActive: false,
        id: 4,
      },
      {
        icon: Document,
        value: 'Customer 5',
        isActive: false,
        id: 5,
      },
    ],
  },
];
