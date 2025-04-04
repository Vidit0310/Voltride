
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCarProps {
  className?: string;
}

const AnimatedCar: React.FC<AnimatedCarProps> = ({ className }) => {
  return (
    <div className={cn('relative', className)}>
      {/* Car Body */}
      <div className="absolute inset-0 animate-float">
        <svg viewBox="0 0 640 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Car silhouette */}
          <path 
            d="M171.3 96H224v96H111.3l30.4-75.9C146.5 104 158.2 96 171.3 96zM272 192V96h81.2c13.1 0 24.8 8 29.6 20.1L412.7 192H272zm-64 0V96H171.3c-13.1 0-24.8 8-29.6 20.1L112 192h96zM512 224c17.7 0 32 14.3 32 32s-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32zm-192-32c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32v64c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32H83.2c-15.9 0-29.3-13.2-31.7-30.1C45.7 374.4 32 353.4 32 328c0-37 29.1-67.3 65.8-69C109.4 183.2 167.2 128 236.9 128h166.2c69.7 0 127.5 55.2 139.1 130c36.7 1.7 65.8 32 65.8 69c0 25.4-13.7 46.4-33.5 57.9c-2.4 17-15.8 30.1-31.7 30.1H576c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32v-64c0-17.7-14.3-32-32-32H320zM184.3 96c-13.1 0-24.8 8-29.6 20.1L124.7 192H272V96H184.3zM128 256c-17.7 0-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32s-14.3-32-32-32z" 
            fill="currentColor" 
            className="text-volt-600"
          />
          
          {/* Windows */}
          <path 
            d="M224 96h48v96h-48V96zm48 0h81.2l29.6 96H272V96z" 
            fill="currentColor" 
            className="text-volt-200" 
          />
          
          {/* Wheels */}
          <circle cx="128" cy="288" r="32" fill="currentColor" className="text-gray-900" />
          <circle cx="512" cy="288" r="32" fill="currentColor" className="text-gray-900" />
          
          {/* Headlights */}
          <circle cx="96" cy="192" r="10" fill="currentColor" className="text-yellow-200 animate-pulse-slow" />
          <circle cx="544" cy="192" r="10" fill="currentColor" className="text-yellow-200 animate-pulse-slow" />
          
          {/* EV charging icon */}
          <path 
            d="M300 240 L320 200 L340 240 L320 240 L320 280 L300 240" 
            fill="currentColor" 
            className="text-eco-400" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>
      
      {/* Shadow effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-black/20 rounded-full blur-md"></div>
    </div>
  );
};

export default AnimatedCar;
