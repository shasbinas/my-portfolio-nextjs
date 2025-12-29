"use client";

import NextLink, { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link({ href, children, onClick, ...props }: Props) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }

    const hrefString = href.toString();
    if (hrefString.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(hrefString.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        // Update URL hash without jumping
        window.history.pushState(null, "", hrefString);
      }
    }
  };

  return (
    <NextLink href={href} onClick={handleScroll} {...props}>
      {children}
    </NextLink>
  );
}
