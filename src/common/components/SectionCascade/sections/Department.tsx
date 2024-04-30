import React, { useContext, useMemo } from 'react';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
import { useCache, useSession } from '@/common/hooks';
import { useDepartment, useOffice } from '@/app/admin/hooks';
import { queryHandler } from '@/service/request';
import { CascadeContext } from '..';

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
    create: !isBasicUser,
    query,
  });
  const officeService = useOffice({
    invite: !isBasicUser,
    delete: !isBasicUser,
    update: !isBasicUser,
    _id: officeId,
  });
  const officeInformation = useMemo(
    () => cachedData?.find((item: any) => item?._id === officeId),
    [officeId] //eslint-disable-line
  );

  return (
    <>
      {officeService.messageContext}
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
  const { isPrimaryAdmin, data: user } = useSession();
  const query = queryHandler({
    parastatal: contextInfo?.dataList?.parastatal?.id,
    office: contextInfo?.dataList?.office?.id,
  });

  const { getListSwr, getItemSwr } = useDepartment({
    get_all: isPrimaryAdmin,
    _id: user?.department?.[0]?._id, // this is for users that do not have permisson to get list
    get_id: !isPrimaryAdmin,
    query,
  });

  const list = getListSwr.data?.data || [];
  const singleton = getItemSwr.data?.data?._id ? [getItemSwr.data?.data] : [];
  const data = isPrimaryAdmin ? list : singleton;

  return (
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
  );
}

export default Department;
