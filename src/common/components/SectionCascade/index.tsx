import React from 'react';
import Parastatal from './sections/Parastatal';
import Office from './sections/Office';
import Members from './sections/Members';
import Department from './sections/Department';
import { mergeClassName } from '@/common/utils';
import { iHandleClick } from '@/types';

type InfoType = {
  clickHandler: iHandleClick;
  dataList: Record<string, Record<string, string>>;
};

interface Props extends InfoType {
  className?: string;
  showMembers?: boolean;
}

type ContextValue = InfoType | null;

export const CascadeContext = React.createContext<ContextValue>(null);

function SectionCascade({ className, showMembers, ...props }: Props) {
  return (
    <CascadeContext.Provider value={{ ...props }}>
      <div
        className={mergeClassName(
          'w-max-[calc(100vw-220px)] flex h-full overflow-x-scroll border border-custom-gray_500 bg-custom-white_100',
          className
        )}
      >
        <Parastatal />
        {props?.dataList?.parastatal?.id ? <Office /> : null}
        {props?.dataList?.office?.id ? (
          <Department showMembers={showMembers} />
        ) : null}
        {props?.dataList?.department?.id && showMembers ? <Members /> : null}
      </div>
    </CascadeContext.Provider>
  );
}

export default SectionCascade;
