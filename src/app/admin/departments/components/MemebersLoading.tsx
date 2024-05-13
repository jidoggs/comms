import dynamic from 'next/dynamic';
import React from 'react';

const UserSkeleton = dynamic(
  () => import('../../../../common/components/CustomSkeleton/UserSkeleton')
);

type Props = {
  items: number;
};

function MemebersLoading({ items }: Props) {
  const count = new Array(items).fill('0');
  return (
    <div className="flex flex-col gap-y-2.5">
      {count.map((_, index) => (
        <UserSkeleton key={index} />
      ))}
    </div>
  );
}

export default MemebersLoading;
