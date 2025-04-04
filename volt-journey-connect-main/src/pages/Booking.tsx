import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BookRide from '@/components/BookRide';
import VehicleSelection from '@/components/VehicleSelection';
import RoutePreview from '@/components/RoutePreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { ArrowRight, CheckCircle2, ChevronLeft, Loader2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

interface BookingStepProps {
  title: string;
  number: number;
  currentStep: number;
  children: React.ReactNode;
}

const BookingStep: React.FC<BookingStepProps> = ({ title, number, currentStep, children }) => {
  const isActive = number === currentStep;
  const isCompleted = number < currentStep;
  
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <div 
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full mr-3 transition-colors",
            isActive && "bg-volt-600 text-white",
            isCompleted && "bg-eco-600 text-white",
            !isActive && !isCompleted && "bg-gray-100 text-gray-500"
          )}
        >
          {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : number}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      
      <div className={cn(
        "transition-all",
        isActive ? "opacity-100" : "opacity-50 pointer-events-none"
      )}>
        {children}
      </div>
    </div>
  );
};

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: 1
  });
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [searchParams] = useSearchParams();
  const [estimatedDistance, setEstimatedDistance] = useState(18.5);
  
  useEffect(() => {
    const step = searchParams.get('step');
    if (step && !isNaN(Number(step))) {
      setCurrentStep(Math.min(3, Math.max(1, Number(step))));
    }
  }, [searchParams]);
  
  const handleBookingSubmit = (data: any) => {
    setBookingDetails(data);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleVehicleSelect = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleConfirmBooking = () => {
    setIsConfirming(true);
    
    setTimeout(() => {
      setIsConfirming(false);
      
      toast({
        title: "Booking Confirmed!",
        description: "Your electric ride has been booked successfully. The driver is on the way.",
      });
      
      setCurrentStep(1);
      setSelectedVehicle(null);
    }, 2000);
  };
  
  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const estimatedArrival = selectedVehicle 
    ? new Date(Date.now() + selectedVehicle.arrivalTime * 60000)
    : null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center mb-8">
            <button 
              onClick={goBack} 
              className={cn(
                "mr-2 text-gray-600 hover:text-volt-600 transition-colors",
                currentStep === 1 && "opacity-50 cursor-not-allowed"
              )}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-2xl md:text-3xl font-bold">Book Your Electric Ride</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 rounded-xl p-4 mb-8">
                <div className="flex overflow-hidden rounded-lg bg-gray-100">
                  {[1, 2, 3].map((step) => (
                    <div 
                      key={step}
                      className={cn(
                        "flex-1 h-2 transition-colors",
                        currentStep >= step ? "bg-volt-600" : "bg-gray-200"
                      )}
                    />
                  ))}
                </div>
              </div>
              
              <BookingStep title="Enter Trip Details" number={1} currentStep={currentStep}>
                <BookRide onBookingSubmit={handleBookingSubmit} />
              </BookingStep>
              
              <BookingStep title="Select Vehicle" number={2} currentStep={currentStep}>
                <VehicleSelection onVehicleSelect={handleVehicleSelect} />
              </BookingStep>
              
              <BookingStep title="Confirm Booking" number={3} currentStep={currentStep}>
                {selectedVehicle && (
                  <div className="space-y-4">
                    <Card className="overflow-hidden border-volt-100 shadow-md">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/3 h-40 md:h-auto relative">
                            <div 
                              className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url('${selectedVehicle.imageUrl}')` }}
                            ></div>
                          </div>
                          
                          <div className="p-5 flex-1">
                            <div className="flex justify-between items-start mb-4">
                              <h4 className="text-lg font-semibold">{selectedVehicle.name} {selectedVehicle.model}</h4>
                              <div className="px-3 py-1 bg-volt-50 text-volt-700 rounded-full text-sm font-medium">
                                Arrives in {selectedVehicle.arrivalTime} min
                              </div>
                            </div>
                            
                            <div className="flex flex-col space-y-3">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm text-gray-600">Trip Cost:</div>
                                <div className="text-sm font-medium">${selectedVehicle.price.toFixed(2)}</div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm text-gray-600">Estimated Arrival:</div>
                                <div className="text-sm font-medium">
                                  {estimatedArrival ? estimatedArrival.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  }) : 'Calculating...'}
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm text-gray-600">Pickup:</div>
                                <div className="text-sm font-medium">{bookingDetails.pickup}</div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm text-gray-600">Destination:</div>
                                <div className="text-sm font-medium">{bookingDetails.destination}</div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm text-gray-600">Date & Time:</div>
                                <div className="text-sm font-medium">{bookingDetails.date} at {bookingDetails.time}</div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-2">
                                <div className="text-sm text-gray-600">Passengers:</div>
                                <div className="text-sm font-medium">{bookingDetails.passengers}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Button 
                      onClick={handleConfirmBooking}
                      className="w-full rounded-lg bg-volt-600 hover:bg-volt-700 text-white py-6"
                      disabled={isConfirming}
                    >
                      {isConfirming ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Confirming...
                        </>
                      ) : (
                        <>
                          Confirm Booking
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </BookingStep>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <div className="sticky top-24">
                <RoutePreview
                  pickup={bookingDetails.pickup || 'Current Location'}
                  destination={bookingDetails.destination || 'Destination'}
                  estimatedTime={selectedVehicle ? selectedVehicle.arrivalTime : 24}
                  estimatedDistance={estimatedDistance}
                />
                
                <Card className="mt-4 shadow-md border-gray-100">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-gray-600">Pickup:</div>
                        <div className="text-sm font-medium">{bookingDetails.pickup || '-'}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-gray-600">Destination:</div>
                        <div className="text-sm font-medium">{bookingDetails.destination || '-'}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-gray-600">Date:</div>
                        <div className="text-sm font-medium">{bookingDetails.date || '-'}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-gray-600">Time:</div>
                        <div className="text-sm font-medium">{bookingDetails.time || '-'}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-gray-600">Passengers:</div>
                        <div className="text-sm font-medium">{bookingDetails.passengers || '-'}</div>
                      </div>
                      
                      <Separator className="my-3" />
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-gray-600">Selected Vehicle:</div>
                        <div className="text-sm font-medium">
                          {selectedVehicle ? `${selectedVehicle.name} ${selectedVehicle.model}` : '-'}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-gray-600">Estimated Price:</div>
                        <div className="text-sm font-medium">
                          {selectedVehicle ? `$${selectedVehicle.price.toFixed(2)}` : '-'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-8 px-4 bg-gray-50">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} VoltRide. All rights reserved.
          </div>
          
          <Link to="/" className="text-volt-600 hover:text-volt-700">
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default Booking;
