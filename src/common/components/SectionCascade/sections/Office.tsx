import React, { useContext, useMemo } from 'react';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
import { useCache, useSession } from '@/common/hooks';
import { useOffice, useParastatals } from '@/app/admin/hooks';
import { queryHandler } from '@/service/request';
import { CascadeContext } from '..';
import useOnboarding from '@/app/onboarding/hooks/useOnboarding';

type OptionsType = {
  query: string;
};

const Options = ({ query }: OptionsType) => {
  const parastatalInfo = useContext(CascadeContext)?.dataList?.parastatal;
  const parastatalId = parastatalInfo?.id;
  const cachedQuery = parastatalInfo?.key as string;
  const { cachedData } = useCache(cachedQuery);
  const { isBasicUser, isPrimaryAdmin } = useSession();
  const { createSwr } = useOffice({
    can_create: !isBasicUser,
    query,
  });
  const parastatalService = useParastatals({
    can_invite: !isBasicUser,
    can_delete_by_id: isPrimaryAdmin,
    can_update_by_id: isPrimaryAdmin,
    _id: parastatalId,
  });
  const otherData = { parastatal: parastatalId };
  const parastatalInformation = useMemo(
    () => cachedData?.find((item: any) => item?._id === parastatalId),
    [parastatalId] //eslint-disable-line
  );

  return (
    <>
      {isBasicUser ? null : (
        <SectionMoreOptions
          addTrigger={createSwr.trigger}
          addIsLoading={createSwr.isMutating}
          otherAddData={otherData}
          otherInviteData={otherData}
          inviteIsLoading={parastatalService.inviteUserSwr.isMutating}
          inviteTrigger={parastatalService.inviteUserSwr.trigger}
          deleteIsLoading={parastatalService.deleteItemSwr.isMutating}
          deleteTrigger={parastatalService.deleteItemSwr.trigger}
          updateIsLoading={parastatalService.updateItemSwr.isMutating}
          updateTrigger={parastatalService.updateItemSwr.trigger}
          acceptedFeature={['add', 'invite', 'details']}
          inviteLink={query}
          title={{
            current: 'office',
            parent: 'parastatal',
          }}
          moreData={parastatalInformation}
        />
      )}
    </>
  );
};

function Office() {
  const contextInfo = useContext(CascadeContext);
  const {
    isPrimaryAdmin,
    isSecondaryAdmin,
    data: user,
    isBasicUser,
  } = useSession();
  const { onBoardingOffice } = useOnboarding();
  const query = queryHandler({
    parastatal: contextInfo?.dataList?.parastatal?.id,
  });

  const { getListSwr, getItemSwr } = useOffice({
    can_get_all: isPrimaryAdmin || isSecondaryAdmin,
    can_get_by_id: !isPrimaryAdmin,
    _id: user?.office?.[0]?._id || onBoardingOffice, // this is for users that do not have permisson to get list
    query,
  });

  const list = getListSwr.data?.data || [];
  const singleton = getItemSwr.data?.data?._id ? [getItemSwr.data?.data] : [];
  const data = isPrimaryAdmin ? list : singleton;

  return (
    <>
      {isPrimaryAdmin ||
      isSecondaryAdmin ||
      (isBasicUser && onBoardingOffice) ? (
        <SectionContainer
          items={data}
          title={`${contextInfo?.dataList?.parastatal?.title} (${data.length} offices)`}
          step="office"
          clickHandler={contextInfo?.clickCascadeItemHandler}
          activeIdentifier={contextInfo?.dataList?.office?.id}
          moreOptions={<Options query={query} />}
          hasChild
          loader={getListSwr.isLoading}
        />
      ) : null}
    </>
  );
}

export default Office;
