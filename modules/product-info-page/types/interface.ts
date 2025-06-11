import { ReactNode } from 'react';
import { HTMLAttributes } from 'react';

export interface IHeaderWrapper extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}
