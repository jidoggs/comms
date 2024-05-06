import React, { useContext, useMemo } from 'react';
import { CascadeContext } from '..';
import { useDepartment, useMembers } from '@/app/admin/hooks';
import { useCache, useSession } from '@/common/hooks';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
import { queryHandler } from '@/service/request';

const Options = () => {
  const departmentInfo = useContext(CascadeContext)?.dataList?.department;
  const departmentId = departmentInfo?.id;
  const cachedQuery = departmentInfo?.key as string;
  const { isPrimaryAdmin, isSecondaryAdmin } = useSession();
  const { cachedData } = useCache(cachedQuery);
  const departmentService = useDepartment({
    can_invite: isPrimaryAdmin || isSecondaryAdmin,
    can_delete_by_id: isPrimaryAdmin || isSecondaryAdmin,
    can_update_by_id: isPrimaryAdmin || isSecondaryAdmin,
    _id: departmentId,
  });

  const departmentInformation = useMemo(
    () => cachedData?.find((item: any) => item?._id === departmentId),
    [departmentId] //eslint-disable-line
  );

  const inviteQuery = queryHandler({ department: departmentId });

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
          otherInviteData={{ department: departmentId }}
          acceptedFeature={['invite', 'details']}
          inviteLink={inviteQuery}
          title={{
            current: 'member',
            parent: 'department',
          }}
          moreData={departmentInformation}
        />
      ) : null}
    </>
  );
};

function Members() {
  const contextInfo = useContext(CascadeContext);
  const { isBasicUser } = useSession();
  const query = queryHandler({
    department: contextInfo?.dataList?.department?.id,
  });

  const { getListSwr } = useMembers({ query, can_get_all: !isBasicUser });

  const list = getListSwr.data?.data || [];

  return (
    <SectionContainer
      items={list}
      title={`${contextInfo?.dataList?.department?.title} (${list.length} members)`}
      step="person"
      clickHandler={contextInfo?.clickCascadeItemHandler}
      activeIdentifier={contextInfo?.dataList?.department?.id}
      moreOptions={<Options />}
      loader={getListSwr.isLoading}
    />
  );
}

export default Members;
