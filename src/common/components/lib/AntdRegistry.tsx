'use client';
import React from 'react';
import {
  createCache,
  extractStyle,
  StyleProvider,
} from '@ant-design/cssinjs/lib';
import type Entity from '@ant-design/cssinjs/es/Cache';
import { useServerInsertedHTML } from 'next/navigation';
import { ConfigProvider, ThemeConfig } from 'antd';
import { customThemeColor } from '@/common/utils';

const appTheme: ThemeConfig = {
  token: {
    colorPrimary: customThemeColor.blue_100,
    colorPrimaryHover: customThemeColor.gray_700,
    colorTextHeading: customThemeColor.main,
    colorTextLabel: customThemeColor.main,
    colorTextPlaceholder: customThemeColor.gray_600,
    colorTextSecondary: customThemeColor.gray_600,
    colorText: customThemeColor.gray_200,
    colorFillTertiary: customThemeColor.gray_800,
    colorBgContainer: customThemeColor.gray_100,
  },
  components: {
    Form: {
      fontWeightStrong: 500,
    },
    Button: {
      fontSize: 16,
      paddingInline: 16,
      controlHeight: 42,
      borderRadius: 8,
      lineHeight: 1,
      algorithm: true,

      defaultBg: customThemeColor.white_100,

      defaultColor: customThemeColor.blue_100,
      defaultBorderColor: customThemeColor.blue_100,

      colorBgTextHover: customThemeColor.blue_100,

      colorPrimary: customThemeColor.blue_100,
      colorPrimaryHover: customThemeColor.gray_700,
      colorPrimaryActive: customThemeColor.gray_700,
      colorText: customThemeColor.blue_100,
      textHoverBg: customThemeColor.white_200,
      colorBgTextActive: customThemeColor.gray_700,
      colorTextDisabled: customThemeColor.white_100,
    },
    Input: {
      paddingBlock: 10,
      paddingInline: 15,
      borderRadius: 8,
      fontSize: 16,
      colorText: customThemeColor.gray_600,
      colorBgContainer: customThemeColor.gray_900,
      fontWeightStrong: 400,
      colorBorderBg: customThemeColor.gray_800,
      colorTextPlaceholder: customThemeColor.gray_600,
      colorBgContainerDisabled: customThemeColor.gray_900,
      margin: 0,
      controlHeight: 44,
    },
    InputNumber: {
      paddingBlock: 10,
      paddingInline: 15,
      borderRadius: 8,
      fontSize: 16,
      colorText: customThemeColor.gray_600,
      colorBgContainer: customThemeColor.gray_900,
      fontWeightStrong: 400,
      colorBorderBg: customThemeColor.gray_800,
      colorTextPlaceholder: customThemeColor.gray_600,
      colorBgContainerDisabled: customThemeColor.gray_900,
      margin: 0,
      controlHeight: 48,
      lineHeight: 1,
    },

    Select: {
      controlHeight: 44,
      colorBgContainer: customThemeColor.gray_900,
      controlPaddingHorizontal: 15,
      borderRadius: 8,
      fontSize: 16,
      colorText: customThemeColor.gray_600,
      fontWeightStrong: 400,
      colorBorderBg: customThemeColor.gray_800,
    },
    Pagination: {
      itemActiveBg: customThemeColor.blue_100,
      colorText: customThemeColor.gray_600,
      colorPrimary: customThemeColor.white_200,
    },
    Table: {
      // headerBg: primary[500],
      // rowHoverBg: primary[300],
      fontSize: 16,
      borderRadius: 0,
      headerBorderRadius: 0,
      borderRadiusOuter: 0,
      colorText: customThemeColor.main,

      headerColor: customThemeColor.gray_300,
      cellFontSize: 14,
      fontWeightStrong: 500,
      fontSizeHeading1: 14,
      // font: 400,
      cellPaddingInline: 0,
      cellPaddingBlock: 5,
      borderColor: customThemeColor.black_200 + '1A',
      footerBg: customThemeColor.gray_100,
      rowSelectedBg: customThemeColor.gray_100,
      rowHoverBg: customThemeColor.white_100,
      rowSelectedHoverBg: customThemeColor.white_100,
      footerColor: customThemeColor.main,

    },
    Tabs: {
      itemColor: customThemeColor.gray_200,
      inkBarColor: customThemeColor.purple_100,
      // titleFontSizeLG: 14,
      // horizontalItemPaddingLG: '15px 0',
    },
    Calendar: {
      fullBg: customThemeColor.white_200,
      fullPanelBg: customThemeColor.white_200,
    },
    DatePicker: {
      cellActiveWithRangeBg: customThemeColor.white_200,
      cellRangeBorderColor: customThemeColor.gray_700,
    },
    Typography: {
      titleMarginTop: 0,
      titleMarginBottom: 0,
      margin: 0,
      fontWeightStrong: 700,
      lineHeight: 1,
      colorTextSecondary: 'red',
    },
    Layout: {
      headerBg: customThemeColor.white_100,
      headerPadding: '3.5px 20px',
      headerHeight: 40,
      bodyBg: customThemeColor.gray_100,
      siderBg: customThemeColor.blue_100,
    },
    Alert: {
      colorSuccessBg: customThemeColor.white_100,
      borderRadius: 8,
      colorSuccessText: customThemeColor.blue_100,
      colorSuccessTextActive: customThemeColor.blue_100,
      colorSuccess: customThemeColor.blue_100,
      colorSuccessActive: customThemeColor.blue_100,
      colorSuccessBorder: customThemeColor.blue_100,
    },
    Menu: {
      subMenuItemBg: customThemeColor.blue_100,
      itemActiveBg: customThemeColor.purple_100,
      itemBg: customThemeColor.blue_100,
      itemMarginBlock: 0,
      itemMarginInline: 0,
      itemPaddingInline: 0,
      iconMarginInlineEnd: 0,
      // horizontalLineHeight: 66,
      colorText: customThemeColor.white_100,
      itemColor: customThemeColor.white_100,
      itemHoverBg: customThemeColor.gray_700,
      itemHoverColor: customThemeColor.white_100,
      itemSelectedBg: customThemeColor.purple_100,
      itemSelectedColor: customThemeColor.white_100,
      itemHeight: 15,
      groupTitleFontSize: 16,
      fontSize: 12,
    },

    Dropdown: {
      colorText: customThemeColor.main,
      controlPaddingHorizontal: 15,
      controlHeight: 42,
      lineHeight: 1,
      paddingContentHorizontal: 30,
      fontSize: 16,
      borderRadiusLG: 8,
      fontWeightStrong: 600,
      controlItemBgHover: customThemeColor.white_200,
      controlItemBgActive: customThemeColor.white_200,
    },
    Breadcrumb: {
      linkColor: customThemeColor.gray_200,
      separatorColor: customThemeColor.gray_200,
      separatorMargin: 5,
      iconFontSize: 0,
      padding: 0,
      paddingXXS: 0,
    },
  },
};

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);

  useServerInsertedHTML(() => {
    return (
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    );
  });
  return (
    <StyleProvider cache={cache} hashPriority="high" autoClear>
      <ConfigProvider theme={appTheme}>{children}</ConfigProvider>
    </StyleProvider>
  );
};

export default StyledComponentsRegistry;
