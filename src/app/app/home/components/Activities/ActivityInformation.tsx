import AvatarGroup from '@/common/components/Avatar/AvatarGroup';
import CustomAvatar from '@/common/components/Avatar/CustomAvatar';
import Title from '@/common/components/Title';
import {
  Location,
  NotificationBell,
  StickyNote,
} from '@/common/components/icons';
import { dummyAvatarData } from '@/common/mockData';
import { generateInitials } from '@/common/utils';
import React, { ReactNode } from 'react';

type ItemProps = {
  icon?: ReactNode;
  value: string | ReactNode;
};

function ActivityInformationItem({ icon, value }: ItemProps) {
  return (
    <div className="flex items-start gap-x-2.5 p-1">
      <span>{icon}</span>
      {typeof value === 'string' ? <Title type="sm">{value}</Title> : value}
    </div>
  );
}

function ActivityInformation() {
  return (
    <div>
      <div className="space-y-2.5 py-4">
        <ActivityInformationItem value="Friday, 16 February 2024 . 12:30pm - 1:30pm" />
        <ActivityInformationItem
          icon={<NotificationBell size={22} />}
          value="30 minutes before"
        />
        <ActivityInformationItem
          icon={<Location size={22} />}
          value="https://meet.google.com/qrm-smti-liv"
        />
        <ActivityInformationItem
          icon={<CustomAvatar size={30} src="/images/user1.jpeg" />}
          value={
            <AvatarGroup
              maxCount={3}
              size={26}
              maxPopoverPlacement="bottom"
              avatarData={dummyAvatarData}
            />
          }
        />
        <ActivityInformationItem
          icon={<StickyNote size={22} />}
          value={`
          Kindly provide advise on the Nigerian Breweries correspondence. 
          Also find attached additional information to help with your findings. 
          Regards
          `}
        />
      </div>
      <div className="border-t border-custom-gray_500 pt-4">
        <div className="flex items-center gap-x-1 p-1">
          <CustomAvatar size={22} src="/images/user1.jpeg">
            {generateInitials('Jane Doe')}
          </CustomAvatar>
          <Title type="sm" className="font-medium text-custom-gray_200">
            Jane Doe
          </Title>
        </div>
      </div>
    </div>
  );
}

export default ActivityInformation;
