import React, { useContext } from 'react';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
import { useSession } from '@/common/hooks';
import { useParastatals } from '@/app/admin/hooks';
import { CascadeContext } from '..';
import useOnboarding from '@/app/onboarding/hooks/useOnboarding';

const Options = () => {
  const { isPrimaryAdmin } = useSession();
  const { createSwr: createParastatals } = useParastatals({
    can_create: isPrimaryAdmin,
  });
  return (
    <SectionMoreOptions
      addTrigger={createParastatals.trigger}
      addIsLoading={createParastatals.isMutating}
      acceptedFeature={['add']}
      title={{ current: 'parastatal' }}
    />
  );
};

function Parastatal() {
  const contextInfo = useContext(CascadeContext);
  const { isPrimaryAdmin, data: user } = useSession();
  const { onBoardingParastatal } = useOnboarding();
  const { getListSwr, getItemSwr } = useParastatals({
    can_get_all: isPrimaryAdmin,
    can_get_by_id: !isPrimaryAdmin,
    _id: user?.parastatal?._id || onBoardingParastatal, // this is for users that do not have permisson to get list
  });

  const list = getListSwr.data?.data || [];
  const singleton = getItemSwr.data?.data?._id ? [getItemSwr.data?.data] : [];
  const data = isPrimaryAdmin ? list : singleton;

  return (
    <SectionContainer
      items={data}
      title="Parastatals"
      step="parastatals"
      clickHandler={contextInfo?.clickCascadeItemHandler}
      activeIdentifier={contextInfo?.dataList?.parastatal?.id}
      moreOptions={isPrimaryAdmin ? <Options /> : null}
      hasChild
      loader={getListSwr.isLoading}
    />
  );
}

export default Parastatal;
