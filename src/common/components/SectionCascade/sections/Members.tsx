import React, { useContext } from 'react';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
import { useSession } from '@/common/hooks';
import { useDepartment } from '@/app/admin/hooks';
import { CascadeContext } from '..';

const Options = () => {
  const { isBasicUser } = useSession();
  const { createSwr } = useDepartment({
    create: !isBasicUser,
  });
  return (
    <>
      {isBasicUser ? null : (
        <SectionMoreOptions
          addTrigger={createSwr.trigger}
          addIsLoading={createSwr.isMutating}
          // inviteIsLoading={createSwr.isMutating}
          // inviteTrigger={createSwr.trigger}
        />
      )}
    </>
  );
};

function Members() {
  const contextInfo = useContext(CascadeContext);
  // const { isPrimaryAdmin, isBasicUser } = useSession();

  // const { getListSwr, getItemSwr } = useDepartment({
  //   get_all: isPrimaryAdmin,
  //   _id: '', // you should get this from user object
  //   get_id: !isPrimaryAdmin,
  // });

  // const list = getListSwr.data?.data || [];
  // const singleton = getItemSwr.data?.data?._id ? [getItemSwr.data?.data] : [];
  // const data = isPrimaryAdmin ? list : singleton;

  return (
    <SectionContainer
      items={[]}
      title={`${contextInfo?.dataList?.department?.title} (${0} members)`}
      step="person"
      clickHandler={contextInfo?.clickHandler}
      activeIdentifier={contextInfo?.dataList?.department?.id}
      moreOptions={<Options />}
      // loader={getListSwr.isLoading}
    />
  );
}

export default Members;
