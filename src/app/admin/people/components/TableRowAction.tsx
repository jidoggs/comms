import React from 'react';
import CustomButton from '@/common/components/CustomButton';
import { MoreFile } from '@/common/components/icons';

type Props = {
  data: any;
};

export const TableRowActionContext = React.createContext<Props | null>(null);

function TableRowAction({ data }: Props) {
  const icon = 'transition-all hover:scale-125 group/button-hover:scale-125';
  return (
    <TableRowActionContext.Provider value={{ data }}>
      <div className="hidden items-center gap-x-1 px-2.5 group-hover:flex">
        <CustomButton
          icon={<MoreFile className={icon} />}
          size="small"
          type="text"
        />
      </div>
    </TableRowActionContext.Provider>
  );
}

export default TableRowAction;
