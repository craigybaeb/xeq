"use client";

import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./HydrationWrapper.module.css"; // optional for styling

export default function HydrationWrapper({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className={styles.loadingContainer}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
      </div>
    );

  return <>{children}</>;
}
