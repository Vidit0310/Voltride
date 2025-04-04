
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  Battery, 
  Users, 
  Zap, 
  Timer, 
  Car,
  ThumbsUp,
  Star,
  Heart,
  Leaf,
  Filter
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Vehicle {
  id: string;
  name: string;
  model: string;
  batteryLevel: number;
  range: number;
  capacity: number;
  imageUrl: string;
  price: number;
  arrivalTime: number;
  rating?: number;
  features?: string[];
  emissionsSaved?: number;
  isPopular?: boolean;
}

interface VehicleSelectionProps {
  className?: string;
  onVehicleSelect?: (vehicle: Vehicle) => void;
}

const VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    name: 'Tesla',
    model: 'Model 3',
    batteryLevel: 87,
    range: 320,
    capacity: 5,
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 28.50,
    arrivalTime: 5,
    rating: 4.9,
    features: ['Autopilot', 'Premium Sound', 'Heated Seats'],
    emissionsSaved: 3.4,
    isPopular: true
  },
  {
    id: 'v2',
    name: 'Polestar',
    model: 'Polestar 2',
    batteryLevel: 92,
    range: 300,
    capacity: 4,
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 32.75,
    arrivalTime: 7,
    rating: 4.7,
    features: ['Google Assistant', 'Pilot Assist', 'Panoramic Roof'],
    emissionsSaved: 3.2
  },
  {
    id: 'v3',
    name: 'Lucid',
    model: 'Air',
    batteryLevel: 95,
    range: 450,
    capacity: 5,
    imageUrl: 'https://images.unsplash.com/photo-1655410405837-538ac5d70ad8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 42.00,
    arrivalTime: 11,
    rating: 4.8,
    features: ['Dream Drive Assist', 'Glass Canopy Roof', 'Premium Audio'],
    emissionsSaved: 4.1
  },
  {
    id: 'v4',
    name: 'Rivian',
    model: 'R1S',
    batteryLevel: 81,
    range: 280,
    capacity: 7,
    imageUrl: 'https://images.unsplash.com/photo-1633414654227-2b5e5e91c3c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 36.50,
    arrivalTime: 9,
    rating: 4.6,
    features: ['Off-Road Ready', 'Extra Cargo Space', '7 Seat Capacity'],
    emissionsSaved: 3.8
  },
];

const VehicleSelection: React.FC<VehicleSelectionProps> = ({ className, onVehicleSelect }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [currentFilter, setCurrentFilter] = useState<'all' | 'nearest' | 'cheapest' | 'highest-rated'>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showEcoInfo, setShowEcoInfo] = useState(false);
  
  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle.id);
    
    if (onVehicleSelect) {
      onVehicleSelect(vehicle);
    } else {
      toast({
        title: "Vehicle Selected",
        description: `You've selected the ${vehicle.name} ${vehicle.model}.`,
      });
    }
  };
  
  const filteredVehicles = () => {
    if (currentFilter === 'nearest') {
      return [...VEHICLES].sort((a, b) => a.arrivalTime - b.arrivalTime);
    } else if (currentFilter === 'cheapest') {
      return [...VEHICLES].sort((a, b) => a.price - b.price);
    } else if (currentFilter === 'highest-rated') {
      return [...VEHICLES].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return VEHICLES;
  };
  
  const getBatteryColor = (level: number) => {
    if (level >= 80) return 'text-eco-600';
    if (level >= 50) return 'text-amber-500';
    return 'text-red-500';
  };
  
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
      toast({
        title: "Removed from favorites",
        description: "This vehicle has been removed from your favorites.",
      });
    } else {
      setFavorites([...favorites, id]);
      toast({
        title: "Added to favorites",
        description: "This vehicle has been added to your favorites.",
      });
    }
  };

  const formatRating = (rating?: number) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };
  
  return (
    <div className={cn('w-full max-w-2xl space-y-6', className)}>
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h3 className="text-xl font-semibold">Available Electric Vehicles</h3>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center space-x-1"
              >
                <Filter className="h-4 w-4 mr-1" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setCurrentFilter('all')}>
                All Vehicles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentFilter('nearest')}>
                Nearest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentFilter('cheapest')}>
                Lowest Price
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentFilter('highest-rated')}>
                Highest Rated
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            size="sm" 
            variant={currentFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setCurrentFilter('all')}
            className={currentFilter === 'all' ? 'bg-volt-600 hover:bg-volt-700' : ''}
          >
            All
          </Button>
          <Button 
            size="sm" 
            variant={currentFilter === 'nearest' ? 'default' : 'outline'}
            onClick={() => setCurrentFilter('nearest')}
            className={currentFilter === 'nearest' ? 'bg-volt-600 hover:bg-volt-700' : ''}
          >
            Nearest
          </Button>
          <Button 
            size="sm" 
            variant={currentFilter === 'cheapest' ? 'default' : 'outline'}
            onClick={() => setCurrentFilter('cheapest')}
            className={currentFilter === 'cheapest' ? 'bg-volt-600 hover:bg-volt-700' : ''}
          >
            Cheapest
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredVehicles().map((vehicle) => (
          <Card 
            key={vehicle.id}
            className={cn(
              'overflow-hidden transition-all duration-300 hover:shadow-lg border',
              selectedVehicle === vehicle.id 
                ? 'border-volt-500 shadow-md' 
                : 'border-gray-100'
            )}
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 relative">
                  <div className="relative w-full h-48 md:h-full overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${vehicle.imageUrl}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <Badge className="absolute top-3 left-3 bg-volt-600 text-white">
                      {vehicle.arrivalTime} min away
                    </Badge>
                    
                    <button
                      onClick={(e) => toggleFavorite(vehicle.id, e)}
                      className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center"
                    >
                      <Heart 
                        className={cn(
                          "h-4 w-4", 
                          favorites.includes(vehicle.id) 
                            ? "fill-red-500 text-red-500" 
                            : "text-gray-600"
                        )} 
                      />
                    </button>
                    
                    <div className={cn(
                      "absolute top-12 right-3 px-2 py-1 rounded-full text-xs font-medium flex items-center",
                      getBatteryColor(vehicle.batteryLevel),
                      "bg-white/90"
                    )}>
                      <Battery className="h-3 w-3 mr-1" />
                      {vehicle.batteryLevel}%
                    </div>
                    
                    {vehicle.isPopular && (
                      <div className="absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-amber-500 text-white flex items-center">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Popular Choice
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-5 w-full md:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold">
                        <div className="flex items-center">
                          <Car className="h-5 w-5 mr-2 text-volt-500" />
                          {vehicle.name} {vehicle.model}
                        </div>
                      </h4>
                      <div className="flex items-center">
                        <div className="flex items-center mr-3">
                          <Star className="h-4 w-4 text-amber-400 mr-1" />
                          <span className="text-sm font-medium">{formatRating(vehicle.rating)}</span>
                        </div>
                        <div className="text-lg font-bold text-volt-600">${vehicle.price.toFixed(2)}</div>
                      </div>
                    </div>
                    
                    <div className="mt-1 flex flex-wrap gap-1">
                      {vehicle.features?.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 font-normal">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg">
                        <Zap className="h-4 w-4 mb-1 text-volt-500" />
                        <span className="text-xs text-gray-500">Range</span>
                        <span className="font-medium">{vehicle.range} mi</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg">
                        <Users className="h-4 w-4 mb-1 text-volt-500" />
                        <span className="text-xs text-gray-500">Capacity</span>
                        <span className="font-medium">{vehicle.capacity}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg">
                        <Timer className="h-4 w-4 mb-1 text-volt-500" />
                        <span className="text-xs text-gray-500">Arrival</span>
                        <span className="font-medium">{vehicle.arrivalTime} min</span>
                      </div>
                    </div>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Dialog open={showEcoInfo} onOpenChange={setShowEcoInfo}>
                            <DialogTrigger asChild>
                              <div className="mt-3 flex items-center text-xs text-green-600 cursor-pointer hover:underline">
                                <Leaf className="h-3 w-3 mr-1" />
                                Saves ~{vehicle.emissionsSaved} kg CO₂ per trip
                              </div>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Environmental Impact</DialogTitle>
                                <DialogDescription>
                                  This shows the estimated environmental benefits of choosing this electric vehicle compared to a gasoline car.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="flex justify-between items-center border-b pb-2">
                                  <span>CO₂ emissions saved:</span>
                                  <span className="font-medium text-green-600">{vehicle.emissionsSaved} kg</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                  <span>Equivalent to trees planted:</span>
                                  <span className="font-medium">{Math.round(vehicle.emissionsSaved * 0.3)} trees</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span>Gallons of gas saved:</span>
                                  <span className="font-medium">{(vehicle.emissionsSaved * 0.11).toFixed(1)} gallons</span>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to see environmental impact details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {vehicle.arrivalTime < 6 ? 'Arrives in less than 5 minutes!' : `${vehicle.arrivalTime} minutes to arrival`}
                    </div>
                    <Button 
                      onClick={() => handleSelectVehicle(vehicle)}
                      className={cn(
                        'rounded-full px-4',
                        selectedVehicle === vehicle.id
                          ? 'bg-volt-600 hover:bg-volt-700 text-white'
                          : 'bg-transparent hover:bg-volt-50 text-volt-600 border border-volt-200'
                      )}
                    >
                      {selectedVehicle === vehicle.id ? 'Selected' : 'Select'}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehicleSelection;
