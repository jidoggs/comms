import React from 'react';
import dynamic from 'next/dynamic';

const Skeleton = dynamic(() => import('antd/es/skeleton'));
const Avatar = dynamic(() => import('antd/es/skeleton/Avatar'));

function UserSkeleton() {
  return (
    <div className="flex items-center gap-x-2.5">
      <Avatar active />
      <Skeleton
        active
        paragraph={{ rows: 1, style: { marginTop: 4 }, width: 300 }}
      />
    </div>
  );
}

export default UserSkeleton;
