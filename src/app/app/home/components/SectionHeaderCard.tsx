import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import { ThreeDots, Plus, Search } from '@/common/components/icons';

type SectionHeaderCardProps = {
  title: string;
  count: number;
  newData?: boolean;
  searchHandler?: VoidFunction; //eslint-disable-line
  createHandler?: VoidFunction; //eslint-disable-line
  moreHandler?: VoidFunction; //eslint-disable-line
};

const SectionHeaderCard = ({
  title,
  count,
  newData,
  createHandler,
  moreHandler,
  searchHandler,
}: SectionHeaderCardProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-md bg-white p-2 font-semibold shadow-wordBox">
      <div className="flex items-center gap-x-2.5">
        <Title className="text-base font-medium text-custom-gray_200">
          {title}
        </Title>
        {newData ? (
          <div className="size-1 rounded-full bg-custom-red_100" />
        ) : null}
        <div className="rounded-10 border border-gray-400 px-2 py-0.5 text-center">
          <Title type="sm" className="text-sm font-medium">
            {count}
          </Title>
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
        <CustomButton
          size="small"
          type="text"
          icon={<Plus />}
          description="Create Correspondence"
          onClick={createHandler}
        />
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
