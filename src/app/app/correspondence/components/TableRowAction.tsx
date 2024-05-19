import React from 'react';
import CustomButton from '@/common/components/CustomButton';
// import ExpandButton from './ExpandData/ExpandButton';
import Send from '@/common/components/icons/Send';
import MoreFile from '@/common/components/icons/MoreFile';

type Props = {
  data: any;
};

export const TableRowActionContext = React.createContext<Props | null>(null);

function TableRowAction({ data }: Props) {
  const icon = 'transition-all hover:scale-125 group/button-hover:scale-125';
  return (
    <TableRowActionContext.Provider value={{ data }}>
      <div className="hidden items-center gap-x-1 px-2.5 group-hover:flex">
        {/* <ExpandButton className={icon} /> */}
        <CustomButton
          icon={<MoreFile size={18} className={icon} />}
          description="View More"
          size="small"
          type="text"
        />
        <div className="h-8 w-px  border-l border-custom-gray_500" />
        <CustomButton
          icon={<Send size={18} className={icon} />}
          description="Send"
          size="small"
        />
      </div>
    </TableRowActionContext.Provider>
  );
}

export default TableRowAction;
