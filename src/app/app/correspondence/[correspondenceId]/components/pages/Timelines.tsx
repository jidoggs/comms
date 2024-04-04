import React from 'react';
import { Avatar, Timeline } from 'antd';
import { TimelineDot } from '@/common/components/icons';
// import Title from '@/common/components/Title';
// import { useIntials } from '@/common/hooks/corrUtils';
import { correspondenceTimeline } from '@/common/mockData/corrTimeline';
import dayjs, { Dayjs } from 'dayjs';
import TimelineComponent from '@/common/components/TimelineComponent/TimelineComponent';
// import Title from '@/common/components/Title';

export const FormattedDate = ({ date }: { date: Dayjs }) => {
  return (
    <span className="date">{dayjs(date).format('DD MMM YYYY, h:mm A')}</span>
  );
};

const Timelines = () => {
  const now = dayjs();
  // const yesterday = now.subtract(1, 'day');
  // const lastWeek = now.subtract(1, 'week');
  // const lastMonth = now.subtract(1, 'month');

  // const generateInitials = (name: string) =>
  //   name
  //     .split(' ')
  //     .slice(0, 2)
  //     .map((n) => <h1 key={n}>{n[0].toUpperCase()}</h1>);

  // const generateInitials = (name: string) =>
  //   name
  //     .split(' ')
  //     .map((name) => name[0].toUpperCase())
  //     .join('');

  // console.log('correspondenceTimeline', correspondenceTimeline);

  return (
    <div className="relative flex size-full flex-col items-center justify-center">
      <div className="mt-6 flex size-full items-center justify-center overflow-y-auto">
        <Timeline
          className="pt-5"
          items={correspondenceTimeline.map((timeline) => {
            const isToday = dayjs(timeline.date).isSame(now, 'day');
            const isYesterday = dayjs(timeline.date).isSame(
              now.subtract(1, 'day'),
              'day'
            );
            const isLastWeek =
              dayjs(timeline.date).isBefore(now, 'week') && !isYesterday;
            const isLastMonth =
              dayjs(timeline.date).isBefore(now, 'month') && !isLastWeek;

            return {
              dot: isToday ? (
                <TimelineDot />
              ) : isYesterday ? (
                <div className="text-xs font-medium text-custom-gray_400">
                  Yesterday
                </div>
              ) : isLastWeek ? (
                <div className="text-xs font-medium text-custom-gray_400">
                  Last Week
                </div>
              ) : isLastMonth ? (
                <div className="text-xs font-medium text-custom-gray_400">
                  Last Month
                </div>
              ) : (
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  size="default"
                  className="rounded-full border border-custom-main"
                />
              ),
              children: isToday ? (
                <div className="h-10"></div>
              ) : (
                <TimelineComponent timeline={timeline} />
              ),
            };
          })}
          // items={correspondenceTimeline.map((timeline): any => ({

          //   dot: getDot(timeline.date, now, yesterday, lastWeek, lastMonth),
          //   children: getChildren(
          //     timeline.date,
          //     now,
          //     yesterday,
          //     lastWeek,
          //     lastMonth,
          //     timeline
          //   ),
          // }))}
          // items={correspondenceTimeline.map((timeline): any => ({
          //   // if(timeline?.date === now){
          //   //    {
          //   //   dot: <TimelineDot />,
          //   //   children: <div className="h-10"></div>,
          //   //   // dot: <TimelineDot />,
          //   // },
          //   // }
          //   //  {
          //   //   dot: <TimelineDot />,
          //   //   children: <div className="h-10"></div>,
          //   //   // dot: <TimelineDot />,
          //   // },
          //   dot:
          //     timeline?.date === now ? (
          //       <TimelineDot />
          //     ) : (
          //       <Avatar
          //         src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          //         size="default"
          //         className="rounded-full border border-custom-main"
          //         //   className="mr-2"
          //       />
          //     ),
          //   children:
          //     timeline?.date === now ? (
          //       <div className="h-10"></div>
          //     ) : (
          //       <div className="ml-5 flex flex-row items-center justify-start gap-3">
          //         <Avatar
          //           size="default"
          //           className="rounded-full border border-custom-main"
          //         >
          //           {/* {generateInitials(`${timeline.name}`)} */}
          //         </Avatar>
          //         <div className="flex flex-col gap-2">
          //           <div className="circular text-sm font-medium leading-[17.71px] text-custom-main">
          //             {timeline.name}
          //           </div>
          //           <p className="circular text-sm font-450 leading-[15.18px] text-custom-gray_600">
          //             <span className="office">{timeline.office} </span>-
          //             <span className="date">
          //               {' '}
          //               <FormattedDate date={timeline.date} />
          //             </span>
          //           </p>
          //         </div>
          //       </div>
          //     ),
          // }))}
          // items={[
          //   {
          //     dot: <TimelineDot />,
          //     children: <div className="h-10"></div>,
          //     // dot: <TimelineDot />,
          //   },
          //   {
          //     dot: <Title>Today</Title>,
          //     // dot: <TimelineDot />,
          //     children: (
          //       <div className="ml-5 flex flex-row items-center justify-start gap-3">
          //         <Avatar
          //           size="large"
          //           className="rounded-full border border-custom-main"
          //         >
          //           {useIntials('Akan Gambe')}
          //         </Avatar>
          //         <div className="flex flex-col gap-2">
          //           <div className="circular text-sm font-medium leading-[17.71px] text-custom-main">
          //             Akan Gambe
          //           </div>
          //           <p className="circular text-sm font-450 leading-[15.18px] text-custom-gray_600">
          //             <span className="office">Chief of Staff to... </span>-
          //             <span className="date"> 30 Jan 2024, 4:22pm</span>
          //           </p>
          //         </div>
          //       </div>
          //     ),
          //   },
          //   {
          //     dot: <Title>Today</Title>,
          //     // dot: <TimelineDot />,
          //     children: (
          //       <div className="ml-5 flex flex-row items-center justify-start gap-3">
          //         <Avatar
          //           size="large"
          //           className="rounded-full border border-custom-main"
          //         >
          //           {useIntials('Akan Gambe')}
          //         </Avatar>
          //         <div className="flex flex-col gap-2">
          //           <div className="circular text-sm font-medium leading-[17.71px] text-custom-main">
          //             Akan Gambe
          //           </div>
          //           <p className="circular text-sm font-450 leading-[15.18px] text-custom-gray_600">
          //             <span className="office">Chief of Staff to... </span>-
          //             <span className="date"> 30 Jan 2024, 4:22pm</span>
          //           </p>
          //         </div>
          //       </div>
          //     ),
          //   },
          //   {
          //     dot: (
          //       <Avatar
          //         src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          //         size="large"
          //         className="rounded-full border border-custom-main"
          //         //   className="mr-2"
          //       />
          //     ),
          //     children: <div className="h-20"></div>,
          //   },
          //   {
          //     dot: (
          //       <Avatar
          //         src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          //         size="large"
          //         className="rounded-full border border-custom-main"
          //         //   className="mr-2"
          //       />
          //     ),
          //     children: <div className="h-20">G</div>,
          //   },
          //   {
          //     dot: <Title>Today</Title>,
          //     children: <div className="h-20"> </div>,
          //   },
          //   {
          //     dot: (
          //       <Avatar
          //         src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          //         size="large"
          //         className="rounded-full border border-custom-main"
          //         //   className="mr-2"
          //       />
          //     ),
          //     children: (
          //       <div className="flex flex-col gap-2">
          //         <div className="circular text-sm font-medium leading-[17.71px] text-custom-main">
          //           Akan Gambe
          //         </div>
          //         <p className="circular text-sm font-450 leading-[15.18px] text-custom-gray_600">
          //           <span className="office">Chief of Staff to... </span>-
          //           <span className="date"> 30 Jan 2024, 4:22pm</span>
          //         </p>
          //       </div>
          //     ),
          //   },
          // ]}
        />
      </div>
    </div>
  );
};

// const getDot = (
//   date: Dayjs,
//   now: Dayjs,
//   yesterday: Dayjs,
//   lastWeek: Dayjs,
//   lastMonth: Dayjs
// ) => {
//   if (dayjs(date).isSame(now, 'day')) {
//     return <Title>Today</Title>;
//   } else if (dayjs(date).isSame(yesterday, 'day')) {
//     return <Title>Yesterday</Title>;
//   } else if (dayjs(date).isAfter(lastWeek)) {
//     return <Title>Last Week</Title>;
//   } else if (dayjs(date).isAfter(lastMonth)) {
//     return <Title>Last Month</Title>;
//   } else {
//     return (
//       <Avatar
//         src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
//         size="default"
//         className="rounded-full border border-custom-main"
//       />
//     );
//   }
// };

// const getChildren = (
//   date: Dayjs,
//   now: Dayjs,
//   yesterday: Dayjs,
//   lastWeek: Dayjs,
//   lastMonth: Dayjs,
//   timeline: any
// ) => {
//   if (dayjs(date).isSame(now, 'day')) {
//     return <div className="h-10"></div>;
//   } else if (dayjs(date).isSame(yesterday, 'day')) {
//     return <div className="h-10"></div>;
//   } else if (dayjs(date).isAfter(lastWeek)) {
//     return (
//       <div className="ml-5 flex flex-row items-center justify-start gap-3">
//         <Avatar
//           size="default"
//           className="rounded-full border border-custom-main"
//         >
//           {/* Generate initials */}
//         </Avatar>
//         <div className="flex flex-col gap-2">
//           <div className="circular text-sm font-medium leading-[17.71px] text-custom-main">
//             {timeline.name}
//           </div>
//           <p className="circular text-sm font-450 leading-[15.18px] text-custom-gray_600">
//             <span className="office">{timeline.office} </span>-
//             <span className="date">
//               {' '}
//               <FormattedDate date={timeline.date} />
//             </span>
//           </p>
//         </div>
//       </div>
//     );
//   } else if (dayjs(date).isAfter(lastMonth)) {
//     return (
//       <div className="ml-5 flex flex-row items-center justify-start gap-3">
//         <Avatar
//           size="default"
//           className="rounded-full border border-custom-main"
//         >
//           {/* Generate initials */}
//         </Avatar>
//         <div className="flex flex-col gap-2">
//           <div className="circular text-sm font-medium leading-[17.71px] text-custom-main">
//             {timeline.name}
//           </div>
//           <p className="circular text-sm font-450 leading-[15.18px] text-custom-gray_600">
//             <span className="office">{timeline.office} </span>-
//             <span className="date">
//               {' '}
//               <FormattedDate date={timeline.date} />
//             </span>
//           </p>
//         </div>
//       </div>
//     );
//   } else {
//     return <div className="h-10"></div>;
//   }
// };

export default Timelines;
