import { ReactNode } from "react";
import React from "react";
export interface IBasedProps extends React.HTMLAttributes<HTMLDivElement> {
children: ReactNode;
className?: string;
}