import React, { useContext } from 'react';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
import { useSession } from '@/common/hooks';
import { useDepartment } from '@/app/admin/hooks';
import { CascadeContext } from '..';
import useMembers from '@/app/admin/hooks/useMembers';
import { queryHandler } from '@/service/request';

const Options = () => {
  const id = useContext(CascadeContext)?.dataList?.department?.id;
  const { isBasicUser } = useSession();

  const { inviteUserSwr: inviteDepartmentUserSwr, messageContext } =
    useDepartment({
      invite: !isBasicUser,
    });
  return (
    <>
      {messageContext}
      {isBasicUser ? null : (
        <SectionMoreOptions
          inviteIsLoading={inviteDepartmentUserSwr.isMutating}
          inviteTrigger={inviteDepartmentUserSwr.trigger}
          otherInviteData={{ department: id }}
          acceptedFeature={['invite', 'details']}
        />
      )}
    </>
  );
};

function Members() {
  const contextInfo = useContext(CascadeContext);
  const { isBasicUser } = useSession();
  const query = queryHandler({
    department: contextInfo?.dataList?.department?.id,
  });

  const { getListSwr } = useMembers({ query, get_all: !isBasicUser });

  const list = getListSwr.data?.data || [];

  return (
    <SectionContainer
      items={list}
      title={`${contextInfo?.dataList?.department?.title} (${list.length} members)`}
      step="person"
      clickHandler={contextInfo?.clickHandler}
      activeIdentifier={contextInfo?.dataList?.department?.id}
      moreOptions={<Options />}
      loader={getListSwr.isLoading}
    />
  );
}

export default Members;
