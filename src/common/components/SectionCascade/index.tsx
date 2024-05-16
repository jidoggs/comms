import React from 'react';
import dynamic from 'next/dynamic';
import Conditional from '../Conditional';
import useOnboarding from '@/app/onboarding/hooks/useOnboarding';
import {
  UpdateItemType,
  initialDataList,
} from '@/common/hooks/useSectionCascade';
import { mergeClassName } from '@/common/utils';

const Parastatal = dynamic(() => import('./sections/Parastatal'));
const Office = dynamic(() => import('./sections/Office'));
const Members = dynamic(() => import('./sections/Members'));
const Department = dynamic(() => import('./sections/Department'));

type LevelType = keyof typeof initialDataList;

type InfoType = {
  clickCascadeItemHandler: (type: string, data: any) => void;
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
        !!props?.dataList?.[parentCascadeSection]?.data?._id) ||
      (mode === 'onboarding' &&
        !!props?.dataList?.[parentCascadeSection]?.data?._id &&
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
