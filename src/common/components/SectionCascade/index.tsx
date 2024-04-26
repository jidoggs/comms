import React from 'react';
import Parastatal from './sections/Parastatal';
import Office from './sections/Office';
import Members from './sections/Members';
import Department from './sections/Department';
import { mergeClassName } from '@/common/utils';
import { iHandleClick } from '@/types';

interface Props {
  dataList: Record<string, string>;
  clickHandler: iHandleClick;
  className?: string;
  showMembers?: boolean;
}

function DepartmentOfficesCascade({
  clickHandler,
  dataList,
  className,
  showMembers,
}: Props) {
  return (
    <div
      className={mergeClassName(
        'flex w-full border border-custom-gray_500 bg-custom-white_100',
        className
      )}
    >
      <Parastatal clickHandler={clickHandler} dataList={dataList} />
      {dataList.parastatal ? (
        <Office clickHandler={clickHandler} dataList={dataList} />
      ) : null}
      {dataList.office ? (
        <Department
          clickHandler={clickHandler}
          dataList={dataList}
          showMembers={showMembers}
        />
      ) : null}
      {dataList.department && showMembers ? (
        <Members clickHandler={clickHandler} dataList={dataList} />
      ) : null}
    </div>
  );
}

export default DepartmentOfficesCascade;
