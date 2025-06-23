import React from "react";
import "./Layout.css";

function Layout({ children }: { children: React.ReactNode }) {
  return <React.StrictMode>{children}</React.StrictMode>;
}

export { Layout };
