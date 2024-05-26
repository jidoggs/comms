import dayjs from 'dayjs';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAnimation } from 'framer-motion';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { usePagination, useSession, useTabChange } from '@/common/hooks';
import { DetailContextType, MultiSelectType } from '../../types';
import { ContextWrapper, MinuteData } from '@/types';
import useMinute from '@/app/app/hooks/useMinute';
import useSocketSubscription from '@/common/hooks/useSocketSubscription';
import { EVENTS } from '@/service/config/events';

export const DetailContext = React.createContext<DetailContextType>(null);
export const CorrsInfoContext = React.createContext<MinuteData | null>(null);

const initialMutliSelect = {
  isMultiSelectMode: false,
  selectedItems: [],
};

function DetailContextWrapper({ children }: ContextWrapper) {
  const params = useSearchParams();
  const correspondence = useSearchParams().get('corrs') || '';
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

  const pagination = usePagination();

  const { getCorrMinListSwr } = useMinute({
    can_get_all: true,
    _id: correspondence,
    limit: pagination.itemPerPage,
    page: pagination.currentPage,
  });

  const [liveData, setLiveData] = useState<MinuteData[]>([]);

  useEffect(() => {
    if (pagination.currentPage === 1) {
      setLiveData([...getCorrMinListSwr.data]);
    } else {
      setLiveData((prev) => [...getCorrMinListSwr.data, ...prev]);
    }
  }, [pagination.currentPage, getCorrMinListSwr.loading]); //eslint-disable-line

  const addToMinuteThread = (data: MinuteData) => {
    setLiveData((prev) => [...prev, data]);
  };

  useSocketSubscription(
    {
      broadcast: 'joinCorrespondence',
      payload: { correspondence },
      listenFor: EVENTS.MINIUTES.JOIN_CREATE_ROOM(correspondence, user._id),
    },
    (res) => {
      if (typeof res !== 'string' && res._id) {
        addToMinuteThread(res);
      }
    }
  );

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
          pagination,
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
          addToMinuteThread,
          multiSelect,
          minutesThread: liveData,
          loadingMinutesThread: getCorrMinListSwr.loading,
          sampleTimeline,
          user,
        }}
      >
        {children}
      </DetailContext.Provider>
    </Suspense>
  );
}

export default DetailContextWrapper;
