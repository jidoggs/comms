import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, Timeline } from 'antd';
import { TimelineDot } from '@/common/components/icons';
import Title from '@/common/components/Title';

const Timelines = () => {
  // const generateInitials = (name: string) =>
  //   name
  //     .split(' ')
  //     .slice(0, 2)
  //     .map((n) => <h1 key={n}>{n[0].toUpperCase()}</h1>);

  const generateInitials = (name: string) =>
    name
      .split(' ')
      .map((name) => name[0].toUpperCase())
      .join('');

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="relative flex h-[70vh] w-full flex-col items-center justify-center"
    >
      <div className="flex size-full items-center justify-center">
        <Timeline
          items={[
            {
              dot: <Title>Today</Title>,
              // dot: <TimelineDot />,
              children: (
                <div className="ml-5 flex flex-row items-center justify-start gap-3">
                  <Avatar
                    size="default"
                    className="rounded-full border border-custom-main"
                  >
                    {generateInitials('Akan Gambe')}
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <div className="circular text-sm font-medium leading-[17.71px] text-custom-main">
                      Akan Gambe
                    </div>
                    <p className="circular text-sm font-[450] leading-[15.18px] text-custom-gray_600">
                      <span className="office">Chief of Staff to... </span>-
                      <span className="date"> 30 Jan 2024, 4:22pm</span>
                    </p>
                  </div>
                </div>
              ),
            },
            {
              dot: (
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  size="default"
                  className="rounded-full border border-custom-main"
                  //   className="mr-2"
                />
              ),
              children: (
                <div className="flex flex-col gap-2">
                  <div className="circular text-sm font-medium leading-[17.71px] text-custom-main">
                    Akan Gambe
                  </div>
                  <p className="circular text-sm font-[450] leading-[15.18px] text-custom-gray_600">
                    <span className="office">Chief of Staff to... </span>-
                    <span className="date"> 30 Jan 2024, 4:22pm</span>
                  </p>
                </div>
              ),
            },
            {
              dot: <TimelineDot />,
              children: 'Solve initial network problems 2015-09-01',
            },
            {
              dot: <TimelineDot />,
              color: 'red',
              children: 'Technical testing 2015-09-01',
            },
            {
              dot: <TimelineDot />,
              children: 'Network problems being solved 2015-09-01',
            },
          ]}
        />
      </div>
    </motion.div>
  );
};

export default Timelines;
