import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
}

export type Icon = React.FunctionComponent<IconProps>;
