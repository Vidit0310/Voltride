
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedCar from './AnimatedCar';
import ChargingAnimation from './ChargingAnimation';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('[data-animate]');
    
    if (elements) {
      elements.forEach((el, index) => {
        const element = el as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 150 * index); // Increased delay between animations for smoother sequence
      });
    }
  }, []);
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-[90vh] pt-24 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-volt-50/30 to-white pointer-events-none"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">
        <div className="flex flex-col max-w-2xl text-center lg:text-left space-y-6">
          <div className="inline-flex items-center justify-center lg:justify-start px-3 py-1 rounded-full bg-volt-100 text-volt-700 text-sm font-medium mb-2" data-animate>
            Eco-friendly rides
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" data-animate>
            The Future of <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-volt-600 to-volt-400">
              Electric Mobility
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-xl" data-animate>
            Experience premium electric vehicle rides with zero emissions. 
            Fast, quiet, and eco-conscious transportation at your fingertips.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-2" data-animate>
            <Button asChild size="lg" className="rounded-full bg-volt-600 hover:bg-volt-700 text-white shadow-lg transition-all hover:shadow-xl">
              <Link to="/booking">
                Book a Ride
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="rounded-full border-volt-200 text-volt-700 hover:bg-volt-50">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mt-8 md:mt-12 max-w-lg mx-auto lg:mx-0" data-animate>
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-3xl font-bold text-volt-600">100%</h3>
              <p className="text-sm text-gray-600">Electric Fleet</p>
            </div>
            
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-3xl font-bold text-volt-600">0</h3>
              <p className="text-sm text-gray-600">Emissions</p>
            </div>
            
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-3xl font-bold text-volt-600">24/7</h3>
              <p className="text-sm text-gray-600">Availability</p>
            </div>
          </div>
        </div>
        
        <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl" data-animate>
          <div className="relative w-full aspect-[4/3]">
            <AnimatedCar className="w-full h-full" />
          </div>
          
          <div className="absolute -bottom-4 right-0 z-10">
            <ChargingAnimation />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-eco-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-volt-400/10 rounded-full blur-3xl"></div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-white" style={{
        clipPath: "polygon(0% 0%, 100% 100%, 100% 100%, 0% 100%)"
      }}></div>
    </div>
  );
};

export default Hero;
