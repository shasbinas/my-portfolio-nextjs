"use client";

import Link, { LinkProps } from "next/link";
import React, { PropsWithChildren, MouseEvent } from "react";

type ScrollLinkProps = LinkProps &
  PropsWithChildren<{
    href: string;
    className?: string;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  }>;

export default function ScrollLink({
  children,
  href,
  onClick,
  ...props
}: ScrollLinkProps) {
  const handleScroll = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // Only handle anchor links
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        // Update URL hash without scroll jump
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <Link href={href} onClick={handleScroll} {...props}>
      {children}
    </Link>
  );
}
