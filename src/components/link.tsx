import React from "react";

export { Link };

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

function Link({ href, children, ...rest }: LinkProps) {
  if (!href.startsWith("/")) throw new Error("Link href should start with /");
  href = import.meta.env.BASE_URL + href;
  href = normalize(href);
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

function normalize(url: string): string {
  return "/" + url.split("/").filter(Boolean).join("/");
}
