import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { CascadeContext } from '@/common/components/SectionCascade';
import Title from '@/common/components/Title';
import { useMembers } from '@/app/admin/hooks';
import { useDebounce } from '@/common/hooks';
import { queryHandler, searchQueryHandler } from '@/service/request';
import SearchIcon from '@/common/components/icons/Search';
import InfoCircle from '@/common/components/icons/InfoCircle';
import { iHandleChange } from '@/types';

const Result = dynamic(() => import('antd/es/result'));
const CustomInput = dynamic(
  () => import('../../../../../../common/components/CustomInput')
);
const CustomUser = dynamic(
  () => import('../../../../../../common/components/CustomUser')
);
const MemebersLoading = dynamic(() => import('../../MemebersLoading'));

function Members() {
  const contextInfo = useContext(CascadeContext);
  const [searchValue, setSearchValue] = useState('');
  const searchDebounce = useDebounce(searchValue);
  const searchBy = ['email', 'firstname', 'surname'];
  
  const search = searchQueryHandler(searchBy, searchDebounce);

  const query = queryHandler({
    parastatal: contextInfo?.dataList?.parastatal?.id,
    office: contextInfo?.dataList?.office?.id,
    department: contextInfo?.dataList?.department?.id,
    search,
  });

  const { getListSwr } = useMembers({
    can_get_all: true,
    query,
  });

  const searchHandler: iHandleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <section className="!mx-auto size-full min-w-[400px] max-w-4xl">
      <header className="flex items-center justify-between">
        <Title tag="h6" bold className="pb-2.5 pt-5">
          Members
        </Title>
        <CustomInput
          prefix={<SearchIcon />}
          className="group !w-12 !border-none !bg-transparent focus-within:!border focus-within:!border-custom-gray_700 focus-within:!shadow-none hover:!w-40 hover:!border hover:!border-custom-gray_700 hover:!bg-custom-gray_900 focus:!border focus:!border-custom-gray_700 focus:!bg-custom-gray_900"
          classNames={{
            prefix: '!m-0 group-hover:!m-1',
          }}
          value={searchValue}
          onChange={searchHandler}
        />
      </header>
      <div className="flex h-[calc(100vh-132px)] flex-col gap-y-2.5 overflow-y-scroll">
        {getListSwr.isLoading ? <MemebersLoading items={20} /> : null}
        {getListSwr.data?.data.length
          ? getListSwr.data?.data.map((item) => (
              <CustomUser data={item} key={item._id} />
            ))
          : null}
        {!getListSwr.isLoading && !getListSwr.data?.data.length ? (
          <Result
            title="No Data Available"
            className="flex h-[calc(100vh_-_13.225rem)] flex-col items-center justify-center"
            icon={<InfoCircle size={80} className="text-amber-400" />}
          />
        ) : null}
      </div>
    </section>
  );
}

export default Members;
