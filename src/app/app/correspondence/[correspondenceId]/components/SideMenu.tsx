import React, { useContext } from 'react';
import { NoteContext } from '../service-context/NotesContextWapper';
import CreateProject from '@/app/app/components/actions/CreateProject';
import CreateMeeting from '@/app/app/components/actions/CreateMeeting';
import CustomButton from '@/common/components/CustomButton';
import { mergeClassName } from '@/common/utils';
import Document from '@/common/components/icons/Document';

type Props = {
  className?: string;
  placement?: 'left' | 'right';
};

const SideMenu = ({ className, placement }: Props) => {
  const contextInfo = useContext(NoteContext);

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
              <Document size={18} className="invisible group-hover:visible" />
            }
            size="small"
            type="text"
            description="Add note"
            borderBottom
            descriptionPlacement={placement}
            onClick={contextInfo?.showNoteHandler}
          />
          <CreateProject
            descriptionPlacement={placement}
            className={{
              icon: 'invisible group-hover:visible',
            }}
          />
          <CreateMeeting
            descriptionPlacement={placement}
            className={{
              icon: 'invisible group-hover:visible',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
