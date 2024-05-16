import React, { useContext } from 'react';
import { CascadeContext } from '..';
import { useDepartment, useMembers } from '@/app/admin/hooks';
import { useSession } from '@/common/hooks';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
import { queryHandler } from '@/service/request';

const Options = () => {
  const departmentInfo = useContext(CascadeContext)?.dataList?.department;
  const { isPrimaryAdmin, isSecondaryAdmin } = useSession();

  const departmentService = useDepartment({
    can_invite: isPrimaryAdmin || isSecondaryAdmin,
    can_delete_by_id: isPrimaryAdmin || isSecondaryAdmin,
    can_update_by_id: isPrimaryAdmin || isSecondaryAdmin,
    _id: departmentInfo?.data?._id,
  });

  const inviteQuery = queryHandler({ department: departmentInfo?.data?._id });

  return (
    <>
      {isPrimaryAdmin || isSecondaryAdmin ? (
        <SectionMoreOptions
          inviteIsLoading={departmentService.inviteUserSwr.isMutating}
          inviteTrigger={departmentService.inviteUserSwr.trigger}
          deleteIsLoading={departmentService.deleteItemSwr.isMutating}
          deleteTrigger={departmentService.deleteItemSwr.trigger}
          updateIsLoading={departmentService.updateItemSwr.isMutating}
          updateTrigger={departmentService.updateItemSwr.trigger}
          otherInviteData={{ department: departmentInfo?.data?._id }}
          acceptedFeature={['invite', 'details']}
          inviteLink={inviteQuery}
          title={{
            current: 'member',
            parent: 'department',
          }}
          moreData={departmentInfo?.data}
        />
      ) : null}
    </>
  );
};

function Members() {
  const contextInfo = useContext(CascadeContext);
  const { isBasicUser } = useSession();
  const query = queryHandler({
    department: contextInfo?.dataList?.department?.data?._id,
  });

  const { getListSwr } = useMembers({ query, can_get_all: !isBasicUser });

  const list = getListSwr.data?.data || [];

  return (
    <SectionContainer
      items={list}
      title={`${contextInfo?.dataList?.department?.data?.name} (${list.length} members)`}
      step="person"
      clickHandler={contextInfo?.clickCascadeItemHandler}
      activeIdentifier={contextInfo?.dataList?.department?.data?._id}
      moreOptions={<Options />}
      loader={getListSwr.isLoading}
    />
  );
}

export default Members;
