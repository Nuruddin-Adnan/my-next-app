import { Skeleton } from "antd";

export default function Loading() {
  return (
    <div className="max-w-xs">
      <Skeleton active />
    </div>
  );
}
