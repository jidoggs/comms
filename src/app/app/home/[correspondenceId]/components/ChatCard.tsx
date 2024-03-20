/* eslint-disable no-unused-vars */
import { MoreFile } from '@/common/components/icons';
import Title from '@/common/components/Title';
import { Divider, Tooltip } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';

type Props = {
  name?: string;
  image?: string;
  setCorrespondenceFile?: any;
  setOpenCorrespondence?: any;
};

const ChatCard = ({
  name,
  image,
  setCorrespondenceFile,
  setOpenCorrespondence,
}: Props) => {
  const fileSend = (event: any) => {
    const files = event.target.files;
    if (files) {
      setOpenCorrespondence(true);
      setCorrespondenceFile(files);
    }
  };

  //   const formattedDate = dayjs('4:22pm, 16 Feb 2024').format('YYYY-MM-DD');
  const formattedDate = '4:22pm, 16 Feb 2024';
  //   const formattedDate = dayjs('4:22pm, 16 Feb 2024').format(
  //     'hh:mm DD-MMM-YYYY'
  //   );

  //   console.log(formattedDate);

  return (
    <div className="my-5 rounded-lg bg-white">
      <div className="flex flex-row items-center justify-between px-2">
        <div className="my-2 flex flex-row items-center gap-3">
          <Image
            width={50}
            height={50}
            className="size-[50px] rounded-full border border-red-500"
            src={image || ''}
            alt=""
          />
          <Title type="h2" className="name">
            {name || '@First Offices'}
          </Title>
        </div>
        <Tooltip placement="top" title={'Options'}>
          <MoreFile />
        </Tooltip>
      </div>
      <div className="flex flex-col items-start justify-between p-2">
        <div className="w-1/2 flex-col items-center justify-end gap-5 rounded-lg border border-green-500 p-5">
          <h1 className="text-center text-black">Upload PDF in Next js</h1>
          <input
            type="file"
            name=""
            id=""
            onChange={(e) => fileSend(e)}
            className="w-full rounded-lg border border-black"
            prefix="Chhose File"
          />
        </div>
        <Title type="p" className="my-3">
          Kindly provide advise on the Nigerian Breweries correspondence. Also
          find attached additional information to help with your findings.
          Regards
        </Title>
        <Divider className="border-red my-2" />
        <div>
          <Title type="p" className="text-[#808191]">
            {formattedDate}
          </Title>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
