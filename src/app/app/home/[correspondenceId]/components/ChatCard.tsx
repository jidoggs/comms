'use client';
import SideMenu from '@/app/app/home/[correspondenceId]/components/SideMenu';
import { MoreFile } from '@/common/components/icons';
import Title from '@/common/components/Title';
import { mergeClassName } from '@/common/utils';
import { Avatar, Tooltip } from 'antd';
// import dayjs from 'dayjs';
import React from 'react';
import { initalChatState } from './pages/Minutes';
import { StateDispatch } from '@/types';

type Props = {
  name?: string;
  image?: string;
  setCorrespondenceFile: StateDispatch<FileList | null>;
  setOpenCorrespondence: StateDispatch<boolean>;
  chatId: number;
  cardPosition: string;
  chatState: typeof initalChatState;
  setChatState: StateDispatch<typeof initalChatState>;
};

const ChatCard = ({
  name,
  image,
  setCorrespondenceFile,
  setOpenCorrespondence,
  chatId,
  cardPosition,
  chatState,
  setChatState,
}: Props) => {
  const fileSend = (event: any) => {
    const files = event.target.files;
    if (files) {
      // Check if any file is selected
      if (!files.length) {
        return; // Handle the case where no file is selected (optional)
      }

      // Check if the first file (assuming single file upload) is a PDF
      const file = files[0];
      if (!file.type.includes('application/pdf')) {
        //   alert('Please upload a PDF file.'); // Or display an error message
        // <Alert message="Please upload a PDF file." type="error" />;
        return;
      }

      setOpenCorrespondence(true);
      setCorrespondenceFile(files);
    }
  };

  // const formattedDate = dayjs('4:22pm, 16 Feb 2024').format('YYYY-MM-DD');
  const formattedDate = '4:22pm, 16 Feb 2024';

  return (
    <div
      className="my-3 flex flex-row items-center gap-3 sm:my-0"
      onMouseEnter={() => {
        setChatState({
          activeChatId: chatId,
          activeChatOptions: true, // You might want to reset the flag here
        });
      }}
      onMouseLeave={() => {
        setChatState({
          activeChatId: 0,
          activeChatOptions: false, // You might want to reset the flag here
        });
      }}
    >
      <div
        // className=""
        className={mergeClassName(
          'w-full bg-custom-white_100 md:w-[400px]',
          cardPosition === 'left'
            ? 'order-1 rounded-xl rounded-bl-none'
            : 'order-2 rounded-xl rounded-br-none'
        )}
      >
        <div className="flex flex-row items-center justify-between px-2">
          <div className="my-5 flex flex-row items-center gap-3">
            <Avatar
              src={
                image ||
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              }
              className="mr-2"
              size="default"
            />
            <Title type="h2" className="name">
              {name || `${chatId} @First Offices`}
            </Title>
          </div>
          <Tooltip placement="top" title={'Options'} className="cursor-pointer">
            <MoreFile />
          </Tooltip>
        </div>
        <div className="flex flex-col items-start justify-between px-2 py-3">
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
          <Title
            type="p"
            className="my-2 text-sm font-[450] leading-[17.71px] text-custom-main"
          >
            Kindly provide advise on the Nigerian Breweries correspondence. Also
            find attached additional information to help with your findings.
            Regards.
          </Title>
          <div className="my-2 h-px w-full bg-custom-gray_500" />
          <div className="flex w-full flex-row items-center justify-between">
            <Title
              type="p"
              className="text-sm leading-[17.71px] text-custom-gray_600"
            >
              {formattedDate}
            </Title>
            <div className="flex flex-row gap-2">
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                size="default"
                //   className="mr-2"
              />
              {/* <div className="flex flex-row"> */}
              <Avatar.Group
                maxCount={3}
                maxPopoverTrigger="click"
                size="default"
                maxStyle={{
                  color: '#f56a00',
                  backgroundColor: '#fde3cf',
                  cursor: 'pointer',
                }}
              >
                {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> */}
                <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>

                <Avatar style={{ backgroundColor: '#87d068' }}>JS</Avatar>

                <Avatar style={{ backgroundColor: '#1677ff' }}>OS</Avatar>
                <Avatar style={{ backgroundColor: '#1677ff' }}>+10</Avatar>
              </Avatar.Group>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      {chatState?.activeChatId === chatId && (
        <div
          className={mergeClassName(
            'hidden sm:inline-flex',
            cardPosition === 'left' ? 'order-2' : 'order-1'
          )}
        >
          <SideMenu />
        </div>
      )}
    </div>
  );
};

export default ChatCard;
