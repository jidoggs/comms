import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import { ThreeDots, Plus, Search } from '@/common/components/icons';

type SectionHeaderCardProps = {
  title: string;
  count: number;
  newData?: boolean;
};

const SectionHeaderCard = ({
  title,
  count,
  newData,
}: SectionHeaderCardProps) => {
  return (
    <div className="shadow-wordBox flex w-full items-center justify-between rounded-md bg-white p-2 font-semibold">
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
        />
        <CustomButton
          size="small"
          type="text"
          icon={<Plus />}
          description="Create Correspondence"
        />
        <CustomButton
          size="small"
          type="text"
          icon={<ThreeDots />}
          description="More"
        />
      </div>
    </div>
  );
};

export default SectionHeaderCard;
