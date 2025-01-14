'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

const AudioSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={'relative flex w-full touch-none select-none items-center'}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-[#83dff1]/20">
      <SliderPrimitive.Range className="absolute h-full bg-[#83dff1]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-[#83dff1]/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:border-[#83dff1] hover:bg-accent" />
  </SliderPrimitive.Root>
));
AudioSlider.displayName = SliderPrimitive.Root.displayName;

export { AudioSlider };
