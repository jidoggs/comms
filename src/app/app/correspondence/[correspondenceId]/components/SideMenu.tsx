import React from 'react';
import CustomButton from '@/common/components/CustomButton';
import { Briefcase, Document, Users } from '@/common/components/icons';
import { mergeClassName } from '@/common/utils';

type Props = {
  className?: string;
  placement?: 'left' | 'right';
};

const SideMenu = ({ className, placement }: Props) => {
  return (
    <div
      className={mergeClassName(
        'rounded-xl border border-custom-gray_500 bg-custom-white_100 px-1',
        className
      )}
    >
      <div className="flex cursor-pointer flex-col items-center justify-center py-1">
        <div className="flex w-full flex-col items-center justify-center gap-y-2">
          <CustomButton
            icon={
              <Document
                size={18}
                className="invisible group-hover/minute:visible"
              />
            }
            size="small"
            type="text"
            description="Add note"
            borderBottom
            descriptionPlacement={placement}
          />
          <CustomButton
            icon={
              <Users
                size={18}
                className="invisible group-hover/minute:visible"
              />
            }
            size="small"
            type="text"
            description="Create project"
            descriptionPlacement={placement}
          />
          <CustomButton
            icon={
              <Briefcase
                size={18}
                className="invisible group-hover/minute:visible"
              />
            }
            size="small"
            type="text"
            description="Create a meeting"
            descriptionPlacement={placement}
          />
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
