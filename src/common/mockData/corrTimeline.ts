import dayjs, { Dayjs } from 'dayjs';

export interface TimelineProps {
  name: string;
  office: string;
  date: Dayjs;
}

const names = [
  'Amaka Okafor',
  'Chidi Obinna',
  'Kofi Mensah',
  'Ebenezer Asamoah',
  'Aisha Buhari',
];

const offices = [
  'Ministry of Education',
  'Department of Health',
  'National Assembly',
  'Office of the President',
  'Ministry of Finance',
  'Ministry of Justice',
  'Department of Agriculture',
  'Department of Transportation',
  'Immigration Services',
  'Tax Authority',
];

export const correspondenceTimeline: TimelineProps[] = [];

// Today
correspondenceTimeline.push({
  name: names[Math.floor(Math.random() * names.length)],
  office: offices[Math.floor(Math.random() * offices.length)],
  date: dayjs(),
});

// Yesterday
correspondenceTimeline.push({
  name: names[Math.floor(Math.random() * names.length)],
  office: offices[Math.floor(Math.random() * offices.length)],
  date: dayjs()
    .subtract(1, 'day')
    .hour(Math.floor(Math.random() * 12) + 1)
    .minute(Math.floor(Math.random() * 60)),
});

// Last Week
for (let i = 0; i < 3; i++) {
  correspondenceTimeline.push({
    name: names[Math.floor(Math.random() * names.length)],
    office: offices[Math.floor(Math.random() * offices.length)],
    date: dayjs()
      .subtract(Math.floor(Math.random() * 7) + 2, 'days')
      .hour(Math.floor(Math.random() * 12) + 1)
      .minute(Math.floor(Math.random() * 60)),
  });
}

// Last Month
for (let i = 0; i < 2; i++) {
  correspondenceTimeline.push({
    name: names[Math.floor(Math.random() * names.length)],
    office: offices[Math.floor(Math.random() * offices.length)],
    date: dayjs()
      .subtract(Math.floor(Math.random() * 30) + 30, 'days')
      .hour(Math.floor(Math.random() * 12) + 1)
      .minute(Math.floor(Math.random() * 60)),
  });
}

// export const correspondenceTimeline: TimelineProps[] = [
//   {
//     name: 'Akan Gambe',
//     office: 'Chief of Staff to...',
//     date: dayjs('30 Jan 2024, 4:22pm', 'DD MMM YYYY, h:mmA'),
//   },
//   {
//     name: 'Akan Gambe',
//     office: 'Chief of Staff to...',
//     date: dayjs(),
//   },
//   {
//     name: 'Juliet Ibrahim',
//     office: 'MD of Loose Digital',
//     date: dayjs('30 Jan 2024, 4:22pm', 'DD MMM YYYY, h:mmA'),
//   },
//   {
//     name: 'Akande Katomburem',
//     office: '',
//     date: dayjs('30 Jan 2024, 4:22pm'),
//   },
//   {
//     name: 'John Doe',
//     office: 'Developer',
//     date: dayjs().subtract(1, 'day').hour(14).minute(30),
//   },
//   {
//     name: 'Janet Smith',
//     office: 'Designer',
//     date: dayjs().subtract(2, 'days').hour(10).minute(15),
//   },
//   {
//     name: 'Jane Smith',
//     office: 'Designer',
//     date: dayjs().subtract(2, 'days').hour(10).minute(15),
//   },
//   {
//     name: 'Michael Johnson',
//     office: 'Marketing Manager',
//     date: dayjs().subtract(3, 'days').hour(9).minute(45),
//   },
//   {
//     name: 'Emily Davis',
//     office: 'Project Manager',
//     date: dayjs().subtract(1, 'week').hour(11).minute(0),
//   },
//   {
//     name: 'David Brown',
//     office: 'CEO',
//     date: dayjs().subtract(2, 'weeks').hour(13).minute(45),
//   },
//   {
//     name: 'Sarah Wilson',
//     office: 'HR Manager',
//     date: dayjs().subtract(1, 'month').hour(9).minute(30),
//   },
//   {
//     name: 'John Doe',
//     office: 'Developer',
//     date: dayjs().subtract(1, 'day').hour(14).minute(30),
//   },
//   {
//     name: 'Jane Smith',
//     office: 'Designer',
//     date: dayjs().subtract(2, 'days').hour(10).minute(15),
//   },
//   {
//     name: 'Michael Johnson',
//     office: 'Marketing Manager',
//     date: dayjs().subtract(3, 'days').hour(9).minute(45),
//   },
//   {
//     name: 'Emily Davis',
//     office: 'Project Manager',
//     date: dayjs().subtract(1, 'week').hour(11).minute(0),
//   },
//   {
//     name: 'David Brown',
//     office: 'CEO',
//     date: dayjs().subtract(2, 'weeks').hour(13).minute(45),
//   },
//   {
//     name: 'Sarah Wilson',
//     office: 'HR Manager',
//     date: dayjs().subtract(1, 'month').hour(9).minute(30),
//   },
//   {
//     name: 'John Doe',
//     office: 'Developer',
//     date: dayjs().subtract(1, 'day').hour(14).minute(30),
//   },
//   {
//     name: 'Jane Smith',
//     office: 'Designer',
//     date: dayjs().subtract(2, 'days').hour(10).minute(15),
//   },
//   {
//     name: 'Michael Johnson',
//     office: 'Marketing Manager',
//     date: dayjs().subtract(3, 'days').hour(9).minute(45),
//   },
//   {
//     name: 'Emily Davis',
//     office: 'Project Manager',
//     date: dayjs().subtract(1, 'week').hour(11).minute(0),
//   },
//   {
//     name: 'David Brown',
//     office: 'CEO',
//     date: dayjs().subtract(2, 'weeks').hour(13).minute(45),
//   },
//   {
//     name: 'Sarah Wilson',
//     office: 'HR Manager',
//     date: dayjs().subtract(1, 'month').hour(9).minute(30),
//   },
// ];
