import React from 'react';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
import useParastals from '@/app/admin/hooks/useParastals';
import useSession from '@/common/hooks/useSession';
import { iHandleClick } from '@/types';

interface Props {
  dataList: Record<string, string>;
  clickHandler: iHandleClick;
}

const Options = () => {
  const { isPrimaryAdmin } = useSession();
  const { createSwr } = useParastals({
    create: isPrimaryAdmin,
  });
  return (
    <SectionMoreOptions
      addTrigger={createSwr.trigger}
      addIsLoading={createSwr.isMutating}
      // inviteIsLoading={createSwr.isMutating}
      // inviteTrigger={createSwr.trigger}
    />
  );
};

function Parastatal({ clickHandler, dataList }: Props) {
  const { isPrimaryAdmin } = useSession();
  const { getListSwr, getItemSwr } = useParastals({
    get_all: isPrimaryAdmin,
    _id: '', // you should get this from user object
    get_id: !isPrimaryAdmin,
  });

  const list = getListSwr.data?.data || [];
  const singleton = getItemSwr.data?.data?._id ? [getItemSwr.data?.data] : [];
  const data = isPrimaryAdmin ? list : singleton;

  return (
    <SectionContainer
      items={data}
      title="Parastatals"
      step="parastatals"
      clickHandler={clickHandler}
      activeIdentifier={dataList.parastatal}
      moreOptions={isPrimaryAdmin ? <Options /> : null}
      hasChild
    />
  );
}

export default Parastatal;
