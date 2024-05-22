import React, { Suspense, useCallback, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAnimation } from 'framer-motion';
import { DetailContextType, MultiSelectType } from '../../types';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ContextWrapper } from '@/types';
// import useCorrespondence from '@/app/app/hooks/useCorrespondence';
import dayjs from 'dayjs';
import { useSession, useTabChange } from '@/common/hooks';

export const DetailContext = React.createContext<DetailContextType>(null);

const initialMutliSelect = {
  isMultiSelectMode: false,
  selectedItems: [],
};

function DetailContextWrapper({ children }: ContextWrapper) {
  const params = useSearchParams();

  const pathname = usePathname();
  const { data: user } = useSession();
  const [openCorrespondenceDetails, setOpenCorrespondenceDetails] =
    useState<boolean>(false);
  const [correspondenceFile, setCorrespondenceFile] = useState<FileList | null>(
    null
  );
  const contentControls = useAnimation();

  const [multiSelect, setMultiSelect] =
    useState<MultiSelectType>(initialMutliSelect);

  const turnMultiSelectOnHandler = () => {
    setMultiSelect((prev) => ({ ...prev, isMultiSelectMode: true }));
  };
  const turnMultiSelectOFFHandler = () => {
    setMultiSelect({ ...initialMutliSelect });
  };

  const { currentTab, handleTabChange } = useTabChange({
    defaultKey: `${pathname}?${params.toString()}&tab=minutes`,
  });

  const selectItemHandler = useCallback((e: CheckboxChangeEvent) => {
    const { checked, name } = e.target;
    if (!name) return;
    if (checked) {
      setMultiSelect((prev) => ({
        ...prev,
        selectedItems: [...prev.selectedItems, name],
      }));
    } else {
      const otherSelectedItems = multiSelect.selectedItems.filter(
        (item) => item !== name
      );
      setMultiSelect((prev) => ({
        ...prev,
        selectedItems: [...otherSelectedItems],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDetailsHandler = () => {
    setOpenCorrespondenceDetails(true);
    contentControls.start({ width: '66.666%' });
  };
  const closeDetailsHandler = () => {
    setOpenCorrespondenceDetails(false);
    contentControls.start({ width: '100%' });
  };

  const handleUpdateFile = (files: FileList) => {
    if (files) {
      // Check if any file is selected
      if (!files.length) {
        return; // Handle the case where no file is selected (optional)
      }
      openDetailsHandler();
      setCorrespondenceFile(files);
    }
  };

  // const { getCorrMinListSwr } = useMinute({
  //   can_get_all: true,
  //   _id: correspondenceId.toString(),
  // });

  // const minuteData = getCorrMinListSwr?.data?.data || [];

  const sampleTimeline = {
    name: 'Adbul Jabar',
    office: 'HM Trade & Inv...',
    date: dayjs(new Date(), 'DD MMM YYYY, h:mmA'),
    img: '/images/user2.jpeg',
  };

  return (
    <Suspense fallback={null}>
      <DetailContext.Provider
        value={{
          openCorrespondenceDetails,
          openDetailsHandler,
          closeDetailsHandler,
          correspondenceFile,
          handleUpdateFile,
          tabChangeHandler: handleTabChange,
          activeTab: currentTab,
          contentControls,
          turnMultiSelectOnHandler,
          turnMultiSelectOFFHandler,
          selectItemHandler,
          multiSelect,
          // minuteData,
          sampleTimeline,
          user,
          // onSearch,
          // recipientData,
        }}
      >
        {children}
      </DetailContext.Provider>
    </Suspense>
  );
}

export default DetailContextWrapper;
