import React, { useContext, useMemo } from 'react';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
import { useCache, useSession } from '@/common/hooks';
import { useOffice, useParastatals } from '@/app/admin/hooks';
import { queryHandler } from '@/service/request';
import { CascadeContext } from '..';

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
    create: !isBasicUser,
    query,
  });
  const parastatalService = useParastatals({
    invite: !isBasicUser,
    delete: isPrimaryAdmin,
    update: isPrimaryAdmin,
    _id: parastatalId,
  });
  const otherData = { parastatal: parastatalId };
  const parastatalInformation = useMemo(
    () => cachedData?.find((item: any) => item?._id === parastatalId),
    [parastatalId] //eslint-disable-line
  );
  return (
    <>
      {parastatalService.messageContext}
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
  const { isPrimaryAdmin, data: user } = useSession();
  const query = queryHandler({
    parastatal: contextInfo?.dataList?.parastatal?.id,
  });

  const { getListSwr, getItemSwr } = useOffice({
    get_all: isPrimaryAdmin,
    _id: user?.office?.[0]?._id, // this is for users that do not have permisson to get list
    get_id: !isPrimaryAdmin,
    query,
  });

  const list = getListSwr.data?.data || [];
  const singleton = getItemSwr.data?.data?._id ? [getItemSwr.data?.data] : [];
  const data = isPrimaryAdmin ? list : singleton;

  return (
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
  );
}

export default Office;
