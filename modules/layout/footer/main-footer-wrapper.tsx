import React, { ReactNode } from "react";
// Bad code 
export interface IBasedProps extends React.HTMLAttributes<HTMLDivElement> {
children?: ReactNode;
className?: string;
}