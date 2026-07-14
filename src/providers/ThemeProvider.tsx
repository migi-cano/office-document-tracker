import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  return <>{children}</>;
}