import { Spin } from "antd";
// import { Radar } from "iconsax-react";

type FullPageLoaderProps = {
  background?: string;
  height?: string;
  fullscreen?: boolean;
};

export const Loader = ({ size }: { size?: number }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* <span className="text-green-minst animate-spin">
        <Radar size={size || "32"} />
      </span> */}
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
        <div className="content" />
      </Spin>
      <Loader />
    </div>
  );
}
