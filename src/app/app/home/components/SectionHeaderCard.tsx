import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import { ThreeDots, Plus, Search } from '@/common/components/icons';

type SectionHeaderCardProps = {
  title: string;
  count: number;
};

const SectionHeaderCard = ({ title, count }: SectionHeaderCardProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1 font-semibold shadow-md">
      <div className="flex items-center gap-x-2.5">
        <Title className="text-sm font-medium">{title}</Title>
        <div className="rounded-10 size-6 border border-gray-400 text-center">
          <Title type="sm" className="text-sm font-medium">
            {count}
          </Title>
        </div>
      </div>
      <div className="flex items-center">
        <CustomButton size="small" type="text" icon={<Search />} />
        <CustomButton
          size="small"
          type="text"
          icon={<Plus />}
          title="Add Correspondence"
        />
        <CustomButton
          size="small"
          type="text"
          icon={<ThreeDots />}
          title="More"
        />
      </div>
    </div>
  );
};

export default SectionHeaderCard;
