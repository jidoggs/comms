import React, { useContext } from 'react';
import { CorrespondenceContextNew } from '../service-context/NewCorrespondenceContext';

function AddCorrespondence() {
  const contextInfo = useContext(CorrespondenceContextNew);
  return (
    <div className="hover:bg-custom-white_100">
      <button
        className="group flex items-center gap-x-2.5 py-1.5 pl-5 text-sm text-custom-main"
        onClick={contextInfo?.handleAdd}
      >
        <span>+</span>
        <span className="rounded-lg px-2 py-3 group-hover:bg-custom-gray_500">
          Add correspondence
        </span>
      </button>
    </div>
  );
}

export default AddCorrespondence;
