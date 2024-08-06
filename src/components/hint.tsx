import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

type HintProps = {
  label: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
};

export default function Hint(props: HintProps) {
  const {
    label,
    children,
    side,
    align,
    sideOffset,
    alignOffset
  } = props;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>

        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          className="border-slate-800 bg-slate-800 text-white"
        >
          <p className="font-semibold capitalize">
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}