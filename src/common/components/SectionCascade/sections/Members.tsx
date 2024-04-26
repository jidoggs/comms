import React from 'react';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
import useSession from '@/common/hooks/useSession';
import useDepartment from '@/app/admin/hooks/useDepartment';
import { iHandleClick } from '@/types';

interface Props {
  dataList: Record<string, string>;
  clickHandler: iHandleClick;
}

const Options = () => {
  const { isBasicUser } = useSession();
  const { createSwr } = useDepartment({
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

function Members({ clickHandler, dataList }: Props) {
  const { isPrimaryAdmin, isBasicUser } = useSession();

  const { getListSwr, getItemSwr } = useDepartment({
    get_all: isPrimaryAdmin,
    _id: '', // you should get this from user object
    get_id: !isPrimaryAdmin,
  });

  const list = getListSwr.data?.data || [];
  const singleton = getItemSwr.data?.data?._id ? [getItemSwr.data?.data] : [];
  const data = isPrimaryAdmin ? list : singleton;

  return (
    <SectionContainer
      items={data}
      title={`${dataList.office} (${data.length} members)`}
      step="person"
      clickHandler={clickHandler}
      activeIdentifier={dataList.department}
      moreOptions={isBasicUser ? null : <Options />}
    />
  );
}

export default Members;
