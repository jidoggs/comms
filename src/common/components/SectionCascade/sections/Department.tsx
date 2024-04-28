import React, { useContext } from 'react';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
import { useSession } from '@/common/hooks';
import { useDepartment } from '@/app/admin/hooks';
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
  const officeId = contextInfo?.dataList?.office?.id;
  const { isBasicUser } = useSession();
  const { createSwr } = useDepartment({
    create: !isBasicUser,
    query,
  });
  return (
    <>
      {isBasicUser ? null : (
        <SectionMoreOptions
          addTrigger={createSwr.trigger}
          addIsLoading={createSwr.isMutating}
          otherAddData={{ office: officeId, parastatal: parastatalId }}
          // inviteIsLoading={createSwr.isMutating}
          // inviteTrigger={createSwr.trigger}
        />
      )}
    </>
  );
};

function Department({ showMembers }: Props) {
  const contextInfo = useContext(CascadeContext);
  const { isPrimaryAdmin } = useSession();
  const query = queryHandler({
    parastatal: contextInfo?.dataList?.parastatal?.id,
    office: contextInfo?.dataList?.office?.id,
  });

  const { getListSwr, getItemSwr } = useDepartment({
    get_all: isPrimaryAdmin,
    _id: '', // you should get this from user object
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
      clickHandler={contextInfo?.clickHandler}
      activeIdentifier={contextInfo?.dataList?.department?.id}
      moreOptions={<Options query={query} />}
      hasChild={showMembers}
      showTick={!showMembers}
      loader={getListSwr.isLoading}
    />
  );
}

export default Department;
