import { cn } from '@/lib/utils';
import { IBasedProps } from '../../footer/footer';

export const HeaderWrapper: React.FC<IBasedProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <> 
    <header
      className={cn(
        ` 
          rounded-[30px] 
          flex items-center justify-between 
          px-[67px] mt-[44px] mb-[42px] 
          gap-[50px] 
        `,
        className
      )}
      {...props}
    >
      {children}
    </header>
      <div className='border-b-[1px] border-b-[rgba(237,237,237,1)]' />
    </>
  );
};




