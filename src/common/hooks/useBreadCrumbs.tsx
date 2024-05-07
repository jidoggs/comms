import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import ArrowRight from '../components/icons/ArrowRight';


const generateBreadCrumbs = (
  path: string,
  router: AppRouterInstance,
  params: string
): Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] => {
  const pathArr = path.split('/').slice(2);
  const paramsQuery = params.split('+').join('%20').split('&');
  // const paramsSplit = params
  //   .split('+')
  //   .join(' ')
  //   .split('&')
  //   .join('=')
  //   .split('=')
  //   .filter((_, idx) => idx % 2 !== 0);

  const separator: BreadcrumbSeparatorType = {
    type: 'separator',
    separator: <ArrowRight />,
  };
  const routes = [];
  for (let i = 0; i < pathArr.length; i++) {
    const val: Partial<BreadcrumbItemType & BreadcrumbSeparatorType> = {};
    // const tempTitle = paramsSplit[i - 1] ? paramsSplit[i - 1] : pathArr[i];
    const tempTitle = pathArr[i].split('_').join(' ');
    const queryGroup = paramsQuery.slice(0, i).join('&');
    const query = queryGroup ? `?${queryGroup}` : '';

    // val.title = tempTitle[0].toUpperCase() + tempTitle.substring(1);
    val.title = tempTitle;
    val.href = '/app/' + pathArr.slice(0, i + 1).join('/') + query;
    val.className = 'text-custom-gray_200 capitalize';
    val.onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      router.push(e.currentTarget.href);
    };
    routes.push(val);
    routes.push(separator);
  }

  return routes.slice(0, routes.length - 1);
};

function useBreadCrumbs() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams().toString();
  const crumbs = generateBreadCrumbs(pathname, router, params);
  const clickAble = crumbs.filter((itm) => itm.href);
  const prevPage = clickAble?.[clickAble.length - 1]?.href;
  return {
    crumbs,
    prevPage,
  };
}

export default useBreadCrumbs;
