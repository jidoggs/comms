import React from 'react';
import SpinLoader from '../../icons/SpinLoader';

function PageLoader() {
  return (
    <div className="text-green-minst flex h-screen items-center justify-center">
      <SpinLoader size="56" />
    </div>
  );
}

export default PageLoader;
