import React from 'react';
import Parastatal from './sections/Parastatal';
import Office from './sections/Office';
import Members from './sections/Members';
import Department from './sections/Department';
import Conditional from '../Conditional';
import useOnboarding from '@/app/onboarding/hooks/useOnboarding';
import {
  UpdateItemType,
  initialDataList,
} from '@/common/hooks/useSectionCascade';
import { mergeClassName } from '@/common/utils';
import { iHandleClick } from '@/types';

type LevelType = keyof typeof initialDataList;

type InfoType = {
  clickCascadeItemHandler: iHandleClick;
  dataList: typeof initialDataList;
  updateCascadeItemHandler?: (values: UpdateItemType) => void;
  deleteCascadeItemHandler?: (level: LevelType) => void;
};

interface Props extends InfoType {
  className?: string;
  mode: 'onboarding' | 'management';
}

type ContextValue = InfoType | null;

export const CascadeContext = React.createContext<ContextValue>(null);

function SectionCascade({ className, mode, ...props }: Props) {
  const { onBoardingDepartment, onBoardingOffice } = useOnboarding();

  const checkCondition = (
    parentCascadeSection: LevelType,
    currentOnBoardingCascadeSection?: string
  ) => {
    return (
      (mode === 'management' &&
        props?.dataList?.[parentCascadeSection]?.id !== '') ||
      (mode === 'onboarding' &&
        props?.dataList?.[parentCascadeSection]?.id !== '' &&
        !!currentOnBoardingCascadeSection)
    );
  };

  return (
    <CascadeContext.Provider value={{ ...props }}>
      <div
        className={mergeClassName(
          'w-max-[calc(100vw-220px)] flex h-full overflow-x-scroll border border-custom-gray_500 bg-custom-white_100',
          className
        )}
      >
        <Parastatal />
        <Conditional
          condition={checkCondition('parastatal', onBoardingOffice)}
          trueArg={<Office />}
          falseArg={null}
        />
        <Conditional
          condition={checkCondition('office', onBoardingDepartment)}
          trueArg={<Department showMembers={mode === 'management'} />}
          falseArg={null}
        />
        <Conditional
          condition={checkCondition('department')}
          trueArg={<Members />}
          falseArg={null}
        />
      </div>
    </CascadeContext.Provider>
  );
}

export default SectionCascade;
