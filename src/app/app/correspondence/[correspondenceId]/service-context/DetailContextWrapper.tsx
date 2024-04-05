import React, { useLayoutEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAnimation } from 'framer-motion';
import { ContextWapper, DetailContextType } from '../../types';

export const DetailContext = React.createContext<DetailContextType>(null);

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
      }}
    >
      {children}
    </DetailContext.Provider>
  );
}

export default DetailContextWrapper;
