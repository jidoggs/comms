import React, { useLayoutEffect, useState } from 'react';
import { ContextWapper, DetailContextType } from '../../types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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

  const tabChangeHandler = (state: string) => {
    router.push(`${pathname}?tab=${state}`);
  };

  useLayoutEffect(() => {
    if (!activeTab) {
      router.replace(`${pathname}?tab=minutes`);
    }
  }, [activeTab]);

  const openDetailsHandler = () => {
    setOpenCorrespondenceDetails(true);
  };
  const closeDetailsHandler = () => {
    setOpenCorrespondenceDetails(false);
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
      }}
    >
      {children}
    </DetailContext.Provider>
  );
}

export default DetailContextWrapper;
