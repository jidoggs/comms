import { Spin } from "antd";
import { SpinLoader } from "./icons";

type FullPageLoaderProps = {
  background?: string;
  height?: string;
  fullscreen?: boolean;
};

export const Loader = ({ size }: { size?: number }) => {
  return (
    <div className="flex items-center justify-center size-full">
      <span className="animate-spin">
        <SpinLoader size={size} />
      </span>
    </div>
  );
};

export default function FullPageLoader({
  background,
  height,
  fullscreen,
}: FullPageLoaderProps) {
  return (
    <div
      style={{
        background: background || "#f6f4f9",
        height: height ? height : "100vh",
        width: "100%",
      }}
      className="flex items-center justify-center"
    >
      <Spin fullscreen={fullscreen} size="large">
        <div /* className="content" */ />
      </Spin>
      <Loader />
    </div>
  );
}
