import React, { useContext } from 'react';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
import { useSession } from '@/common/hooks';
import { useParastatals } from '@/app/admin/hooks';
import { CascadeContext } from '..';

const Options = () => {
  const { isPrimaryAdmin } = useSession();
  const { createSwr: createParastatals } = useParastatals({
    create: isPrimaryAdmin,
  });
  return (
    <SectionMoreOptions
      addTrigger={createParastatals.trigger}
      addIsLoading={createParastatals.isMutating}
      // inviteIsLoading={createSwr.isMutating}
      // inviteTrigger={createSwr.trigger}
    />
  );
};

function Parastatal() {
  const contextInfo = useContext(CascadeContext);
  const { isPrimaryAdmin } = useSession();
  const { getListSwr, getItemSwr } = useParastatals({
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
      clickHandler={contextInfo?.clickHandler}
      activeIdentifier={contextInfo?.dataList?.parastatal?.id}
      moreOptions={isPrimaryAdmin ? <Options /> : null}
      hasChild
      loader={getListSwr.isLoading}
    />
  );
}

export default Parastatal;
