import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
}

export type Icon = React.FunctionComponent<Props>;
