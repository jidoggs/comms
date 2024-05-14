'use client';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import Search from '@/common/components/icons/Search';
import ThreeDots from '@/common/components/icons/ThreeDots';
import CreateCorrespondence from '../../components/actions/CreateCorrespondence';

type SectionHeaderCardProps = {
  title: string;
  count: number;
  newData?: boolean;
  searchHandler?: () => void;
  moreHandler?: () => void;
};

const SectionHeaderCard = ({
  title,
  count,
  newData,
  moreHandler,
  searchHandler,
}: SectionHeaderCardProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-md bg-white p-2 font-semibold shadow-wordBox">
      <div className="flex items-center gap-x-2.5">
        <Title semibold className="text-base text-custom-gray_200">
          {title}
        </Title>
        {newData ? (
          <div className="size-1 rounded-full bg-custom-red_100" />
        ) : null}
        <div className="rounded-10 border border-gray-400 px-2 py-0.5 text-center">
          <Title tag="span">{count}</Title>
        </div>
      </div>
      <div className="flex items-center gap-x-1">
        <CustomButton
          size="small"
          type="text"
          icon={<Search />}
          description="Search"
          onClick={searchHandler}
        />
        <CreateCorrespondence />
        <CustomButton
          size="small"
          type="text"
          icon={<ThreeDots />}
          description="More"
          onClick={moreHandler}
        />
      </div>
    </div>
  );
};

export default SectionHeaderCard;
