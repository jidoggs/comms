import { ThreeDots, Plus, Search } from '@/common/components/icons';

type SectionHeaderCardProps = {
  title: string;
  count: number;
};

const SectionHeaderCard = ({ title, count }: SectionHeaderCardProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-md bg-white px-2 py-1 font-semibold shadow-md">
      <div className="flex items-center justify-between gap-2">
        <p>{title}</p>
        <div className="size-6 rounded border border-gray-400 text-center">
          <p>{count}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-1">
        <button className="text-custom-main p-2">
          <Search />
        </button>
        <button className="text-custom-main p-2">
          <Plus />
        </button>
        <button className="text-custom-main p-2">
          <ThreeDots />
        </button>
      </div>
    </div>
  );
};

export default SectionHeaderCard;
