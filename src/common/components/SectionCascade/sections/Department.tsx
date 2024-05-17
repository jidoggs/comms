import React, { useContext } from 'react';
import { CascadeContext } from '..';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
import { useDepartment, useOffice } from '@/app/admin/hooks';
import { useSession } from '@/common/hooks';
import { queryHandler } from '@/service/request';

interface Props {
  showMembers?: boolean;
}

type OptionsType = {
  query: string;
};

const Options = ({ query }: OptionsType) => {
  const contextInfo = useContext(CascadeContext);
  const parastatalId = contextInfo?.dataList?.parastatal?.data?._id;
  const officeInfo = contextInfo?.dataList?.office;

  const { isPrimaryAdmin, isSecondaryAdmin } = useSession();
  const { createSwr } = useDepartment({
    can_create: isPrimaryAdmin || isSecondaryAdmin,
    query,
  });
  const officeService = useOffice({
    can_invite: isPrimaryAdmin || isSecondaryAdmin,
    can_delete_by_id: isPrimaryAdmin || isSecondaryAdmin,
    can_update_by_id: isPrimaryAdmin || isSecondaryAdmin,
    _id: officeInfo?.data?._id,
  });

  return (
    <>
      {isPrimaryAdmin || isSecondaryAdmin ? (
        <SectionMoreOptions
          addTrigger={createSwr.trigger}
          addIsLoading={createSwr.isMutating}
          otherAddData={{
            office: officeInfo?.data?._id,
            parastatal: parastatalId,
          }}
          acceptedFeature={['add', 'invite', 'details']}
          inviteIsLoading={officeService.inviteUserSwr.isMutating}
          inviteTrigger={officeService.inviteUserSwr.trigger}
          deleteIsLoading={officeService.deleteItemSwr.isMutating}
          deleteTrigger={officeService.deleteItemSwr.trigger}
          updateIsLoading={officeService.updateItemSwr.isMutating}
          updateTrigger={officeService.updateItemSwr.trigger}
          otherInviteData={{ office: officeInfo?.data?._id }}
          inviteLink={query}
          title={{
            current: 'department',
            parent: 'office',
          }}
          moreData={officeInfo?.data}
        />
      ) : null}
    </>
  );
};

function Department({ showMembers }: Props) {
  const contextInfo = useContext(CascadeContext);
  const { isPrimaryAdmin, data: user } = useSession();
  const query = queryHandler({
    parastatal: contextInfo?.dataList?.parastatal?.data?._id,
    office: contextInfo?.dataList?.office?.data?._id,
  });

  const { getListSwr, getItemSwr } = useDepartment({
    can_get_all: isPrimaryAdmin,
    can_get_by_id: !isPrimaryAdmin,
    _id: user?.department?.[0]?._id, // this is for users that do not have permisson to get list
    query,
  });

  const list = getListSwr.data?.data || [];
  const singleton = getItemSwr.data?.data?._id ? [getItemSwr.data?.data] : [];
  const data = isPrimaryAdmin ? list : singleton;

  return (
    <>
      <SectionContainer
        items={data}
        title={`${contextInfo?.dataList?.office?.data?.name} (${data.length} departments)`}
        step="department"
        clickHandler={contextInfo?.clickCascadeItemHandler}
        activeIdentifier={contextInfo?.dataList?.department?.data?._id}
        moreOptions={<Options query={query} />}
        hasChild={showMembers}
        showTick={!showMembers}
        loader={getListSwr.isLoading}
      />
    </>
  );
}

export default Department;
