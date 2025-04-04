
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  LocateFixed, 
  Locate, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Search,
  Loader2,
  X,
  CreditCard,
  UsersRound,
  Heart,
  Sparkles,
  Info
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

interface BookRideProps {
  className?: string;
  onBookingSubmit?: (booking: BookingFormData) => void;
}

interface BookingFormData {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  isRideShare?: boolean;
  paymentMethod?: string;
  specialRequirements?: string;
  isFavorite?: boolean;
}

interface LocationSuggestion {
  id: string;
  name: string;
  address: string;
}

// Mock location suggestions
const PICKUP_SUGGESTIONS: LocationSuggestion[] = [
  { id: 'loc1', name: 'Current Location', address: 'Using GPS' },
  { id: 'loc2', name: 'Home', address: '123 Main St, San Francisco' },
  { id: 'loc3', name: 'Work', address: '456 Market St, San Francisco' },
  { id: 'loc4', name: 'San Francisco Airport', address: 'SFO, San Francisco' },
];

const DESTINATION_SUGGESTIONS: LocationSuggestion[] = [
  { id: 'loc3', name: 'Work', address: '456 Market St, San Francisco' },
  { id: 'loc4', name: 'San Francisco Airport', address: 'SFO, San Francisco' },
  { id: 'loc5', name: 'Golden Gate Park', address: 'San Francisco, CA' },
  { id: 'loc6', name: 'Fisherman\'s Wharf', address: 'San Francisco, CA' },
];

// Saved favorite trips
const SAVED_TRIPS = [
  { id: 'trip1', name: 'Home to Work', pickup: 'Home', destination: 'Work' },
  { id: 'trip2', name: 'Home to Airport', pickup: 'Home', destination: 'San Francisco Airport' },
];

// Payment methods
const PAYMENT_METHODS = [
  { id: 'card1', name: 'Personal Card', type: 'Visa', last4: '4242' },
  { id: 'card2', name: 'Business Card', type: 'Mastercard', last4: '5555' },
  { id: 'apple', name: 'Apple Pay', type: 'wallet', last4: '' },
];

const BookRide: React.FC<BookRideProps> = ({ className, onBookingSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [showSavedTrips, setShowSavedTrips] = useState(false);
  
  const [formData, setFormData] = useState<BookingFormData>({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: 1,
    isRideShare: false,
    paymentMethod: '',
    specialRequirements: '',
    isFavorite: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Show location suggestions
    if (name === 'pickup' && value) {
      setShowPickupSuggestions(true);
    } else if (name === 'destination' && value) {
      setShowDestinationSuggestions(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (onBookingSubmit) {
        onBookingSubmit(formData);
      } else {
        toast({
          title: "Ride Booked Successfully",
          description: "Your electric ride has been scheduled.",
        });
      }
    }, 1500);
  };

  const handleUseCurrentLocation = () => {
    setFormData(prev => ({ ...prev, pickup: 'Current Location' }));
    setShowPickupSuggestions(false);
    toast({
      title: "Using Current Location",
      description: "Your location has been set as the pickup point.",
    });
  };
  
  const handleSelectDate = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setFormData(prev => ({ ...prev, date: format(selectedDate, 'yyyy-MM-dd') }));
    }
  };
  
  const handleSelectLocationSuggestion = (type: 'pickup' | 'destination', suggestion: LocationSuggestion) => {
    setFormData(prev => ({ ...prev, [type]: suggestion.name }));
    if (type === 'pickup') {
      setShowPickupSuggestions(false);
    } else {
      setShowDestinationSuggestions(false);
    }
  };
  
  const clearInput = (name: string) => {
    setFormData(prev => ({ ...prev, [name]: '' }));
    if (name === 'pickup') {
      setShowPickupSuggestions(false);
    } else if (name === 'destination') {
      setShowDestinationSuggestions(false);
    }
  };
  
  const handleSelectTrip = (trip: typeof SAVED_TRIPS[0]) => {
    setFormData(prev => ({
      ...prev,
      pickup: trip.pickup,
      destination: trip.destination
    }));
    setShowSavedTrips(false);
    toast({
      title: "Saved Trip Selected",
      description: `Loaded trip: ${trip.name}`,
    });
  };
  
  const toggleFavorite = () => {
    setFormData(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
    
    toast({
      title: formData.isFavorite ? "Removed from Favorites" : "Added to Favorites",
      description: formData.isFavorite 
        ? "This trip has been removed from your favorites."
        : "This trip has been saved to your favorites.",
    });
  };
  
  const toggleRideShare = () => {
    setFormData(prev => ({ ...prev, isRideShare: !prev.isRideShare }));
  };

  return (
    <div className={cn('w-full max-w-md', className)}>
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Book Your Electric Ride</h3>
          
          <div className="flex space-x-2">
            <Popover>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8 rounded-full"
                      >
                        <Heart className={cn(
                          "h-4 w-4",
                          formData.isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
                        )} />
                      </Button>
                    </PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Saved Trips</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <PopoverContent className="w-72 p-0">
                <div className="p-4 border-b">
                  <h4 className="font-medium">Your Saved Trips</h4>
                </div>
                
                {SAVED_TRIPS.length > 0 ? (
                  <div className="max-h-60 overflow-auto">
                    {SAVED_TRIPS.map(trip => (
                      <div 
                        key={trip.id}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b"
                        onClick={() => handleSelectTrip(trip)}
                      >
                        <div className="font-medium">{trip.name}</div>
                        <div className="text-sm text-gray-500">
                          {trip.pickup} → {trip.destination}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No saved trips yet
                  </div>
                )}
                
                <div className="p-2 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFavorite}
                    className="text-xs"
                  >
                    {formData.isFavorite ? "Remove current" : "Save current"}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pickup" className="text-sm font-medium">
              Pickup Location
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-volt-600">
                <MapPin className="h-5 w-5" />
              </div>
              <Input
                id="pickup"
                name="pickup"
                value={formData.pickup}
                onChange={handleInputChange}
                onFocus={() => setShowPickupSuggestions(true)}
                placeholder="Enter pickup location"
                className="pl-10 pr-10 rounded-lg border-input"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                {formData.pickup && (
                  <button
                    type="button"
                    onClick={() => clearInput('pickup')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="text-volt-600 hover:text-volt-700"
                >
                  <LocateFixed className="h-5 w-5" />
                </button>
              </div>
              
              {showPickupSuggestions && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                  {PICKUP_SUGGESTIONS.filter(suggestion => 
                    suggestion.name.toLowerCase().includes(formData.pickup.toLowerCase()) ||
                    suggestion.address.toLowerCase().includes(formData.pickup.toLowerCase())
                  ).map(suggestion => (
                    <div
                      key={suggestion.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectLocationSuggestion('pickup', suggestion)}
                    >
                      <div className="font-medium">{suggestion.name}</div>
                      <div className="text-sm text-gray-500">{suggestion.address}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="destination" className="text-sm font-medium">
              Destination
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-volt-600">
                <Locate className="h-5 w-5" />
              </div>
              <Input
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                onFocus={() => setShowDestinationSuggestions(true)}
                placeholder="Enter destination"
                className="pl-10 pr-10 rounded-lg border-input"
                required
              />
              {formData.destination && (
                <button
                  type="button"
                  onClick={() => clearInput('destination')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              
              {showDestinationSuggestions && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                  {DESTINATION_SUGGESTIONS.filter(suggestion => 
                    suggestion.name.toLowerCase().includes(formData.destination.toLowerCase()) ||
                    suggestion.address.toLowerCase().includes(formData.destination.toLowerCase())
                  ).map(suggestion => (
                    <div
                      key={suggestion.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectLocationSuggestion('destination', suggestion)}
                    >
                      <div className="font-medium">{suggestion.name}</div>
                      <div className="text-sm text-gray-500">{suggestion.address}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">
                Date
              </Label>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal flex justify-between items-center",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-volt-600" />
                        {formData.date ? format(new Date(formData.date), "PPP") : <span>Pick a date</span>}
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleSelectDate}
                      initialFocus
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium">
                Time
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-volt-600">
                  <Clock className="h-4 w-4" />
                </div>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full pl-10 rounded-lg border-input h-10 bg-background border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  required
                >
                  <option value="">Select time</option>
                  {Array.from({ length: 24 }).map((_, i) => {
                    const hour = i < 10 ? `0${i}` : `${i}`;
                    return (
                      <React.Fragment key={hour}>
                        <option value={`${hour}:00`}>{`${hour}:00`}</option>
                        <option value={`${hour}:30`}>{`${hour}:30`}</option>
                      </React.Fragment>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="passengers" className="text-sm font-medium">
              Passengers
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-volt-600">
                <Users className="h-4 w-4" />
              </div>
              <div className="flex items-center pl-10">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, passengers: Math.max(1, prev.passengers - 1) }))}
                  className="h-10 w-10 flex items-center justify-center text-volt-600 border rounded-l-lg hover:bg-volt-50"
                >
                  -
                </button>
                <input
                  id="passengers"
                  name="passengers"
                  type="number"
                  min="1"
                  max="6"
                  value={formData.passengers}
                  onChange={handleInputChange}
                  className="h-10 w-16 text-center border-y focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, passengers: Math.min(6, prev.passengers + 1) }))}
                  className="h-10 w-10 flex items-center justify-center text-volt-600 border rounded-r-lg hover:bg-volt-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          
          {/* New features */}
          <div className="pt-2">
            <div className="border-t pt-4 space-y-4">
              {/* Ride Share Option */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <UsersRound className="h-4 w-4 text-volt-600" />
                  <Label htmlFor="rideShare" className="text-sm font-medium cursor-pointer">
                    Ride Share
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-60 text-xs">
                          Share your ride with others going in the same direction to reduce cost and emissions.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch
                  id="rideShare"
                  checked={formData.isRideShare}
                  onCheckedChange={toggleRideShare}
                />
              </div>
              
              {formData.isRideShare && (
                <div className="rounded-lg bg-volt-50 p-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-volt-100 text-volt-700">
                      Save up to 40%
                    </Badge>
                    <span className="text-gray-600">Trip may take 5-10 min longer</span>
                  </div>
                </div>
              )}
              
              {/* Payment Method */}
              <div className="space-y-2">
                <Label htmlFor="paymentMethod" className="text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-volt-600" />
                    <span>Payment Method</span>
                  </div>
                </Label>
                <Select 
                  value={formData.paymentMethod} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_METHODS.map(method => (
                      <SelectItem key={method.id} value={method.id}>
                        <div className="flex items-center space-x-2">
                          <span>{method.name}</span>
                          {method.last4 && <span className="text-gray-400 text-xs">•••• {method.last4}</span>}
                        </div>
                      </SelectItem>
                    ))}
                    <SelectItem value="add-new">
                      <span className="text-volt-600">+ Add new payment method</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Special Requirements */}
              <div className="space-y-2">
                <Label htmlFor="specialRequirements" className="text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-volt-600" />
                    <span>Special Requirements</span>
                  </div>
                </Label>
                <Input
                  id="specialRequirements"
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  placeholder="Child seat, wheelchair access, etc."
                  className="rounded-lg border-input"
                />
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full rounded-lg bg-volt-600 hover:bg-volt-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Finding rides...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Find Available EVs
            </>
          )}
        </Button>
        
        {/* Pricing Estimate */}
        {(formData.pickup && formData.destination) && (
          <div className="pt-2 border-t mt-4">
            <div className="text-sm text-gray-500 flex justify-between">
              <span>Estimated price:</span>
              <span className="font-medium text-volt-700">$24 - $36</span>
            </div>
            {formData.isRideShare && (
              <div className="text-xs text-green-600 flex justify-end items-center mt-1">
                <span>RideShare savings applied</span>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default BookRide;
