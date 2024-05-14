import React from 'react';
import CreateCorrespondence from '../../components/actions/CreateCorrespondence';

function AddCorrespondence() {
  return (
    <div className="flex py-2 hover:bg-custom-white_100">
      <CreateCorrespondence type="full" />
    </div>
  );
}

export default AddCorrespondence;
