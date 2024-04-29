import React, { useContext } from 'react';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
import { useSession } from '@/common/hooks';
import { useOffice, useParastatals } from '@/app/admin/hooks';
import { queryHandler } from '@/service/request';
import { CascadeContext } from '..';

type OptionsType = {
  query: string;
};

const Options = ({ query }: OptionsType) => {
  const id = useContext(CascadeContext)?.dataList?.parastatal?.id;
  const { isBasicUser } = useSession();
  const { createSwr } = useOffice({
    create: !isBasicUser,
    query,
  });
  const { inviteUserSwr: inviteParastalUserSwr, messageContext } =
    useParastatals({
      invite: !isBasicUser,
    });
  const otherData = { parastatal: id };
  return (
    <>
      {messageContext}
      {isBasicUser ? null : (
        <SectionMoreOptions
          addTrigger={createSwr.trigger}
          addIsLoading={createSwr.isMutating}
          otherAddData={otherData}
          otherInviteData={otherData}
          inviteIsLoading={inviteParastalUserSwr.isMutating}
          inviteTrigger={inviteParastalUserSwr.trigger}
          acceptedFeature={['add', 'invite']}
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
      clickHandler={contextInfo?.clickHandler}
      activeIdentifier={contextInfo?.dataList?.office?.id}
      moreOptions={<Options query={query} />}
      hasChild
      loader={getListSwr.isLoading}
    />
  );
}

export default Office;
