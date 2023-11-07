import React, { ReactElement } from "react";

export default function AuthLayout({ children }: { children: ReactElement }) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      {children}
    </div>
  );
}
