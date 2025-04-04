
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { BatteryCharging } from 'lucide-react';

interface ChargingAnimationProps {
  className?: string;
}

const ChargingAnimation: React.FC<ChargingAnimationProps> = ({ className }) => {
  const [batteryLevel, setBatteryLevel] = useState(20);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => {
        const newLevel = prev + 1;
        return newLevel > 100 ? 20 : newLevel;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={cn('flex flex-col items-center justify-center p-4', className)}>
      <div className="relative w-20 h-10 border-2 border-volt-600 rounded-md flex items-center justify-center">
        {/* Battery tip */}
        <div className="absolute -right-1 top-1/2 transform translate-x-full -translate-y-1/2 w-1 h-4 bg-volt-600 rounded-r-sm"></div>
        
        {/* Battery fill */}
        <div 
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-volt-400 to-volt-600 transition-all duration-300 ease-in-out"
          style={{ width: `${batteryLevel}%` }}
        ></div>
        
        {/* Battery charging bolt */}
        <BatteryCharging className="relative z-10 w-6 h-6 text-white" />
      </div>
      
      <div className="mt-2 text-sm font-medium text-volt-700">{batteryLevel}%</div>
    </div>
  );
};

export default ChargingAnimation;
