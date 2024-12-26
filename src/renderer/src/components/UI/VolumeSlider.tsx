'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  onToggleMute?: () => void;
  isMuted?: boolean;
}

const VolumeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  VolumeSliderProps
>(({ className, onToggleMute, isMuted, ...props }, ref) => (
  <div className="flex items-center gap-2">
    <button
      onClick={onToggleMute}
      className="hover:text-blue-500 transition-colors"
      aria-label={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
    <SliderPrimitive.Root
      ref={ref}
      className={'relative flex w-28 touch-none select-none items-center'}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-blue-500/20">
        <SliderPrimitive.Range className="absolute h-full bg-blue-500" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-3 w-3 rounded-full border border-blue-500/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:border-blue-500 hover:bg-accent" />
    </SliderPrimitive.Root>
  </div>
));
VolumeSlider.displayName = 'VolumeSlider';

export { VolumeSlider };
