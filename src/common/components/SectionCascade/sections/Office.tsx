import React from 'react';
import SectionContainer from '../blocks/SectionContainer';
import { iHandleClick } from '@/types';
import useSession from '@/common/hooks/useSession';
import useOffice from '@/app/admin/hooks/useOffice';
import SectionMoreOptions from '../blocks/SectionMoreOptions';

interface Props {
  dataList: Record<string, string>;
  clickHandler: iHandleClick;
}

const Options = () => {
  const { isBasicUser } = useSession();
  const { createSwr } = useOffice({
    create: !isBasicUser,
  });
  return (
    <SectionMoreOptions
      addTrigger={createSwr.trigger}
      addIsLoading={createSwr.isMutating}
      // inviteIsLoading={createSwr.isMutating}
      // inviteTrigger={createSwr.trigger}
    />
  );
};

function Office({ clickHandler, dataList }: Props) {
  const { isPrimaryAdmin, isBasicUser } = useSession();

  const { getListSwr, getItemSwr } = useOffice({
    get_all: isPrimaryAdmin,
    _id: '', // you should get this from user object
    parastatal: '', // you should get this from user object
    get_id: !isPrimaryAdmin,
  });

  const list = getListSwr.data?.data || [];
  const singleton = getItemSwr.data?.data?._id ? [getItemSwr.data?.data] : [];
  const data = isPrimaryAdmin ? list : singleton;

  return (
    <SectionContainer
      items={data}
      title={`${dataList.parastatal} (${data.length} offices)`}
      step="office"
      clickHandler={clickHandler}
      activeIdentifier={dataList.office}
      moreOptions={isBasicUser ? null : <Options />}
      hasChild
    />
  );
}

export default Office;
