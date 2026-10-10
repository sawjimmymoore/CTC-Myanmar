import NextLink from "next/link";
import type { ComponentProps } from "react";
/** Lets components copied from the Vite/react-router sites keep their `to=` prop. */
export function Link({ to, ...p }: Omit<ComponentProps<typeof NextLink>, "href"> & { to: string }) { return <NextLink href={to} {...p} />; }
