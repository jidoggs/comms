import CustomButton from '@/common/components/CustomButton';
import { Send, Thrash } from '@/common/components/icons';
import React, { useContext } from 'react';
import ExpandButton from '../../components/ExpandData/ExpandButton';
import { CorrespondenceContextNew } from '../service-context/NewCorrespondenceContext';

type Props = {
  data: any;
};

export const TableRowActionContext = React.createContext<Props | null>(null);

function TableRowAction({ data }: Props) {
  const contextInfo = useContext(CorrespondenceContextNew);
  const icon = 'transition-all hover:scale-125 group/button-hover:scale-125';

  const deleteHandler = () => {
    contextInfo?.handleDelete(data?.id);
  };

  return (
    <TableRowActionContext.Provider value={{ data }}>
      <div className="hidden items-center gap-x-1 px-2.5 group-hover:flex">
        <ExpandButton className={icon} description="Preview" />
        <CustomButton
          icon={<Thrash size={18} className={icon} />}
          description="Delete"
          size="small"
          type="text"
          onClick={deleteHandler}
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
