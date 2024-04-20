import React, { Suspense, useCallback, useLayoutEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAnimation } from 'framer-motion';
import { ContextWapper, DetailContextType, MultiSelectType } from '../../types';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

export const DetailContext = React.createContext<DetailContextType>(null);

const initialMutliSelect = {
  isMultiSelectMode: false,
  selectedItems: [],
};

function DetailContextWrapper({ children }: ContextWapper) {
  const pathname = usePathname();
  const router = useRouter();
  const activeTab = useSearchParams().get('tab') as string;
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

  const tabChangeHandler = (state: string) => {
    router.push(`${pathname}?tab=${state}`);
  };

  useLayoutEffect(() => {
    if (!activeTab) {
      router.replace(`${pathname}?tab=minutes`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

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
  return (
    <Suspense fallback={null}>
      <DetailContext.Provider
        value={{
          openCorrespondenceDetails,
          openDetailsHandler,
          closeDetailsHandler,
          correspondenceFile,
          handleUpdateFile,
          tabChangeHandler,
          activeTab,
          contentControls,
          turnMultiSelectOnHandler,
          turnMultiSelectOFFHandler,
          selectItemHandler,
          multiSelect,
        }}
      >
        {children}
      </DetailContext.Provider>
    </Suspense>
  );
}

export default DetailContextWrapper;
