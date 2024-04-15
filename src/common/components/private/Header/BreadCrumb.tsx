import React from 'react';
import { Breadcrumb } from 'antd';
import { useBreadCrumbs } from '@/common/hooks';

function BreadCrumb() {
  const { crumbs } = useBreadCrumbs();
  return <Breadcrumb items={[...crumbs]} separator={''} />;
}

export default BreadCrumb;
