import React from 'react';

type Props = {
  handleClick?: VoidFunction; //eslint-disable-line
};

function AddCorrespondence({ handleClick }: Props) {
  return (
    <div className="hover:bg-custom-white_100">
      <button
        className="group flex items-center gap-x-2.5 py-1.5 pl-5 text-sm text-custom-main"
        onClick={handleClick}
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
