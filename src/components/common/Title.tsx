// import { tW } from "@/util";
import React from "react";

type Props = {
  type?: "h1" | "h2" | "nav" | "p" | "btn" | "bread" | "sm";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function Title({ type, children, className, style }: Props) {
  let template: React.JSX.Element | null = null;

  switch (type) {
    case "h1":
      template = (
        <h1 style={style} className={"text-gray-minst-main text-xl font-bold"}>
          {children}
        </h1>
      );
      break;
    case "h2":
      template = (
        <h2 style={style} className={"text-gray-minst-main text-xl font-bold"}>
          {children}
        </h2>
      );
      break;
    case "nav":
      template = (
        <span
          style={style}
          className={"text-gray-minst-main text-base font-bold"}
        >
          {children}
        </span>
      );
      break;
    case "bread":
    case "sm":
      template = (
        <span
          style={style}
          className={"text-gray-minst-main text-sm font-normal"}
        >
          {children}
        </span>
      );
      break;
    case "btn":
      template = (
        <span
          style={style}
          className={"text-gray-minst-main text-base font-semibold"}
        >
          {children}
        </span>
      );
      break;

    default:
      template = (
        <p
          style={style}
          className={"text-gray-minst-main text-base font-normal"}
        >
          {children}
        </p>
      );
      break;
  }

  return <>{template}</>;
}

export default Title;
