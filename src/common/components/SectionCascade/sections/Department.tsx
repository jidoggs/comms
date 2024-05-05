import React, { useContext, useMemo } from 'react';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
import { useCache, useSession } from '@/common/hooks';
import { useDepartment, useOffice } from '@/app/admin/hooks';
import { queryHandler } from '@/service/request';
import { CascadeContext } from '..';
import useOnboarding from '@/app/onboarding/hooks/useOnboarding';

interface Props {
  showMembers?: boolean;
}

type OptionsType = {
  query: string;
};

const Options = ({ query }: OptionsType) => {
  const contextInfo = useContext(CascadeContext);
  const parastatalId = contextInfo?.dataList?.parastatal?.id;
  const officeInfo = contextInfo?.dataList?.office;
  const officeId = officeInfo?.id;
  const cachedQuery = officeInfo?.key as string;
  const { cachedData } = useCache(cachedQuery);
  const { isBasicUser } = useSession();
  const { createSwr } = useDepartment({
    can_create: !isBasicUser,
    query,
  });
  const officeService = useOffice({
    can_invite: !isBasicUser,
    can_delete_by_id: !isBasicUser,
    can_update_by_id: !isBasicUser,
    _id: officeId,
  });
  const officeInformation = useMemo(
    () => cachedData?.find((item: any) => item?._id === officeId),
    [officeId] //eslint-disable-line
  );

  return (
    <>
      {isBasicUser ? null : (
        <SectionMoreOptions
          addTrigger={createSwr.trigger}
          addIsLoading={createSwr.isMutating}
          otherAddData={{ office: officeId, parastatal: parastatalId }}
          acceptedFeature={['add', 'invite', 'details']}
          inviteIsLoading={officeService.inviteUserSwr.isMutating}
          inviteTrigger={officeService.inviteUserSwr.trigger}
          deleteIsLoading={officeService.deleteItemSwr.isMutating}
          deleteTrigger={officeService.deleteItemSwr.trigger}
          updateIsLoading={officeService.updateItemSwr.isMutating}
          updateTrigger={officeService.updateItemSwr.trigger}
          otherInviteData={{ office: officeId }}
          inviteLink={query}
          title={{
            current: 'department',
            parent: 'office',
          }}
          moreData={officeInformation}
        />
      )}
    </>
  );
};

function Department({ showMembers }: Props) {
  const contextInfo = useContext(CascadeContext);
  const {
    isPrimaryAdmin,
    data: user,
    isBasicUser,
    isSecondaryAdmin,
  } = useSession();
  const { onBoardingDepartment } = useOnboarding();
  const query = queryHandler({
    parastatal: contextInfo?.dataList?.parastatal?.id,
    office: contextInfo?.dataList?.office?.id,
  });

  const { getListSwr, getItemSwr } = useDepartment({
    can_get_all: isPrimaryAdmin,
    can_get_by_id: !isPrimaryAdmin,
    _id: user?.department?.[0]?._id || onBoardingDepartment, // this is for users that do not have permisson to get list
    query,
  });

  const list = getListSwr.data?.data || [];
  const singleton = getItemSwr.data?.data?._id ? [getItemSwr.data?.data] : [];
  const data = isPrimaryAdmin ? list : singleton;

  return (
    <>
      {isPrimaryAdmin ||
      isSecondaryAdmin ||
      (isBasicUser && onBoardingDepartment) ? (
        <SectionContainer
          items={data}
          title={`${contextInfo?.dataList?.office?.title} (${data.length} departments)`}
          step="department"
          clickHandler={contextInfo?.clickCascadeItemHandler}
          activeIdentifier={contextInfo?.dataList?.department?.id}
          moreOptions={<Options query={query} />}
          hasChild={showMembers}
          showTick={!showMembers}
          loader={getListSwr.isLoading}
        />
      ) : null}
    </>
  );
}

export default Department;
