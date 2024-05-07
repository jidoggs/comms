import React from 'react';
import DocumentItem from './DocumentItem';
import ArrowRight from '@/common/components/icons/ArrowRight';

type Props = {
  items: any[];
  itemClickHandler: (doc: any, step: number) => void; //eslint-disable-line
  step: number;
};

function DocumentsContainer({ items, itemClickHandler, step }: Props) {
  const handleClick = (id: string) => {
    itemClickHandler(id, step);
  };

  return (
    <div className="flex flex-col gap-y-2.5 border-r border-custom-gray_500 bg-custom-white_100 px-1 py-2.5">
      {items.map((doc, index) => (
        <DocumentItem
          key={index}
          icon={doc.icon ? <doc.icon size={16} /> : null}
          value={doc?.value}
          onClick={() => handleClick(doc)}
          className={doc?.isActive ? 'bg-custom-gray_500 ' : ''}
          hasChild={
            <span className="flex flex-1 justify-end">
              <ArrowRight size={12} />
            </span>
          }
        />
      ))}
    </div>
  );
}

export default DocumentsContainer;
