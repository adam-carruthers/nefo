import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return <React.StrictMode>{children}</React.StrictMode>;
}

export { Layout };
