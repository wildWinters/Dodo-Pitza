import React, { ReactNode } from "react";
export interface IBasedProps extends React.HTMLAttributes<HTMLDivElement> {
children?: ReactNode;
className?: string;
}