import React from 'react';
import SectionContainer from '../blocks/SectionContainer';
import SectionMoreOptions from '../blocks/SectionMoreOptions';
// import useParastals from '@/app/admin/hooks/useParastatals';
import useSession from '@/common/hooks/useSession';
import { iHandleClick } from '@/types';
import useParastatals from '@/app/admin/hooks/useParastatals';

interface Props {
  dataList: Record<string, string>;
  clickHandler: iHandleClick;
}

const Options = ({ selectedParastatalId }: any) => {
  const { isPrimaryAdmin } = useSession();
  // console.log('items', items);
  // console.log('keyIdentifier', keyIdentifier);

  const { createSwr: createParastatals } = useParastatals({
    create: isPrimaryAdmin,
  });
  return (
    <SectionMoreOptions
      addTrigger={createParastatals.trigger}
      addIsLoading={createParastatals.isMutating}
      selectedParastatalId={selectedParastatalId}
      // inviteIsLoading={createSwr.isMutating}
      // inviteTrigger={createSwr.trigger}
    />
  );
};

function Parastatal({ clickHandler, dataList }: Props) {
  const { isPrimaryAdmin } = useSession();
  const { getListSwr, getItemSwr } = useParastatals({
    get_all: isPrimaryAdmin,
    _id: '', // you should get this from user object
    get_id: !isPrimaryAdmin,
  });

  const list = getListSwr.data?.data || [];
  const singleton = getItemSwr.data?.data?._id ? [getItemSwr.data?.data] : [];
  const data = isPrimaryAdmin ? list : singleton;

  const selectedParastatal =
    data && data.find((d) => d.name === dataList.parastatal);

  // console.log('data', data);
  // console.log('dataList.parastatal', dataList.parastatal);
  // console.log('selectedParastatal', selectedParastatal);

  return (
    <SectionContainer
      items={data}
      title="Parastatals"
      step="parastatals"
      clickHandler={clickHandler}
      activeIdentifier={dataList.parastatal}
      moreOptions={
        isPrimaryAdmin ? (
          <Options
            selectedParastatalId={selectedParastatal && selectedParastatal._id}
          />
        ) : null
      }
      hasChild
    />
  );
}

export default Parastatal;
