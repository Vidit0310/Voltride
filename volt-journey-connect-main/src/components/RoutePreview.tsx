
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation, LocateFixed, Clock, Car, Zap, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { transform } from 'ol/proj';

interface RoutePreviewProps {
  className?: string;
  pickup?: string;
  destination?: string;
  estimatedTime?: number;
  estimatedDistance?: number;
}

const RoutePreview: React.FC<RoutePreviewProps> = ({
  className,
  pickup = 'Current Location',
  destination = 'San Francisco Airport',
  estimatedTime = 24,
  estimatedDistance = 18.5
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);
  const animationRef = useRef<number | null>(null);
  const [activeTab, setActiveTab] = useState('map');
  const [showTraffic, setShowTraffic] = useState(false);
  
  // Calculate estimated values
  const estimatedCO2Saved = (estimatedDistance * 0.18).toFixed(1);
  const estimatedFuelSaved = (estimatedDistance * 0.04).toFixed(1);
  const estimatedArrivalTime = new Date(Date.now() + estimatedTime * 60000);
  
  // Geocode addresses to coordinates (simplified mock implementation)
  const getCoordinates = (address: string): [number, number] => {
    const mockLocations: Record<string, [number, number]> = {
      'Current Location': [-122.431297, 37.773972], // San Francisco
      'San Francisco Airport': [-122.3786, 37.6213],
      'Golden Gate Park': [-122.4869, 37.7695],
      'Fisherman\'s Wharf': [-122.4169, 37.8083],
      'Home': [-122.4194, 37.7749],
      'Work': [-122.4141, 37.7833],
    };
    
    return mockLocations[address] || (address.toLowerCase().includes('san francisco') 
      ? [-122.4194, 37.7749] // Default SF coordinates
      : [-122.431297, 37.773972]); // Default fallback
  };
  
  useEffect(() => {
    if (!mapContainer.current || activeTab !== 'map') return;
    
    // Clean up previous animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Get coordinates
    const pickupCoords = getCoordinates(pickup);
    const destinationCoords = getCoordinates(destination);
    
    // Transform coordinates to Web Mercator
    const pickupPoint = fromLonLat(pickupCoords);
    const destinationPoint = fromLonLat(destinationCoords);
    
    // Create route line feature
    const routeFeature = new Feature({
      geometry: new LineString([pickupPoint, destinationPoint])
    });
    
    // Create vector source for route
    const routeSource = new VectorSource({
      features: [routeFeature]
    });
    
    // Create pickup marker feature
    const pickupFeature = new Feature({
      geometry: new Point(pickupPoint),
      type: 'pickup'
    });
    
    // Create destination marker feature
    const destinationFeature = new Feature({
      geometry: new Point(destinationPoint),
      type: 'destination'
    });
    
    // Create a moving dot feature
    const dotFeature = new Feature({
      geometry: new Point(pickupPoint),
      type: 'dot'
    });
    
    // Create vector source for markers
    const markerSource = new VectorSource({
      features: [pickupFeature, destinationFeature, dotFeature]
    });
    
    // Style for markers and route
    const styles = {
      'route': new Style({
        stroke: new Stroke({
          color: '#0ca5eb',
          width: 4
        })
      }),
      'pickup': new Style({
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({ color: '#22c56d' }),
          stroke: new Stroke({ color: 'white', width: 2 })
        })
      }),
      'destination': new Style({
        image: new CircleStyle({
          radius: 8,
          fill: new Fill({ color: '#0ca5eb' }),
          stroke: new Stroke({ color: 'white', width: 2 })
        })
      }),
      'dot': new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color: '#22c56d' }),
          stroke: new Stroke({ color: 'white', width: 2 })
        })
      })
    };
    
    // Style function
    const styleFunction = (feature: Feature) => {
      const type = feature.get('type');
      return type ? styles[type as keyof typeof styles] : styles['route'];
    };
    
    // Create route layer
    const routeLayer = new VectorLayer({
      source: routeSource,
      style: styles['route'],
      zIndex: 1
    });
    
    // Create marker layer
    const markerLayer = new VectorLayer({
      source: markerSource,
      style: styleFunction,
      zIndex: 2
    });
    
    // Create map
    map.current = new Map({
      target: mapContainer.current,
      layers: [
        new TileLayer({
          source: new OSM(),
          zIndex: 0
        }),
        routeLayer,
        markerLayer
      ],
      view: new View({
        center: [(pickupPoint[0] + destinationPoint[0]) / 2, (pickupPoint[1] + destinationPoint[1]) / 2],
        zoom: 12
      })
    });
    
    // Fit view to route
    const extent = [...pickupPoint, ...destinationPoint];
    map.current.getView().fit([
      Math.min(extent[0], extent[2]), 
      Math.min(extent[1], extent[3]), 
      Math.max(extent[0], extent[2]), 
      Math.max(extent[1], extent[3])
    ], {
      padding: [50, 50, 50, 50],
      duration: 1000
    });
    
    // Animate the dot along the route
    const animateDotSimple = () => {
      const start = pickupPoint;
      const end = destinationPoint;
      const progress = (Date.now() % 3000) / 3000;
      
      const currentX = start[0] + (end[0] - start[0]) * progress;
      const currentY = start[1] + (end[1] - start[1]) * progress;
      
      // Update dot position
      dotFeature.getGeometry()?.setCoordinates([currentX, currentY]);
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animateDotSimple);
    };
    
    // Start animation
    animateDotSimple();
    
    // Cleanup
    return () => {
      if (map.current) {
        map.current.setTarget(undefined);
        map.current = null;
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [pickup, destination, activeTab]);
  
  return (
    <Card className={cn('overflow-hidden p-4', className)}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Route Information</h3>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{estimatedTime} min ({estimatedDistance} mi)</span>
          </div>
        </div>
        
        <Tabs defaultValue="map" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="map">Map</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="eco">Eco Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">
                Estimated arrival: {estimatedArrivalTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowTraffic(!showTraffic)} 
                className="text-xs h-7"
              >
                {showTraffic ? 'Hide Traffic' : 'Show Traffic'}
              </Button>
            </div>
            
            <div className="relative h-40 rounded-lg overflow-hidden bg-gray-50">
              <div ref={mapContainer} className="absolute inset-0 w-full h-full"></div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="pt-2 space-y-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Trip Progress</div>
              <div className="relative pt-1">
                <Progress value={0} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Not started</span>
                  <span>Drop-off</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm font-medium">Estimated Arrival</div>
              <div className="text-sm">
                {estimatedArrivalTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm font-medium">Journey Details</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Distance:</div>
                <div className="font-medium">{estimatedDistance} miles</div>
                
                <div>Duration:</div>
                <div className="font-medium">{estimatedTime} minutes</div>
                
                <div>Traffic Conditions:</div>
                <div className="font-medium text-green-600">Light</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-3">
              <Car className="h-4 w-4" />
              <span>Driver will pick you up in a modern, comfortable electric vehicle.</span>
            </div>
          </TabsContent>
          
          <TabsContent value="eco" className="pt-2 space-y-3">
            <div className="space-y-2">
              <div className="text-sm font-medium">Environmental Impact</div>
              <div className="px-3 py-2 bg-green-50 rounded-lg">
                <div className="flex items-center text-green-700">
                  <Leaf className="h-4 w-4 mr-2" />
                  <span className="font-medium">CO₂ Emissions Saved</span>
                </div>
                <div className="mt-1 text-2xl font-bold text-green-700">
                  {estimatedCO2Saved} kg <span className="text-sm font-normal">of CO₂</span>
                </div>
                <div className="mt-1 text-xs text-green-600">
                  Equivalent to planting {(parseFloat(estimatedCO2Saved) * 0.3).toFixed(1)} trees
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Energy Efficiency</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="px-3 py-2 bg-blue-50 rounded-lg">
                  <div className="flex items-center text-sm text-blue-700">
                    <Zap className="h-4 w-4 mr-1" />
                    <span>Battery Usage</span>
                  </div>
                  <div className="mt-1 text-xl font-bold text-blue-700">
                    {(estimatedDistance * 0.25).toFixed(1)} kWh
                  </div>
                </div>
                
                <div className="px-3 py-2 bg-amber-50 rounded-lg">
                  <div className="flex items-center text-sm text-amber-700">
                    <Car className="h-4 w-4 mr-1" />
                    <span>Gas Saved</span>
                  </div>
                  <div className="mt-1 text-xl font-bold text-amber-700">
                    {estimatedFuelSaved} gal
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 mt-2">
              By choosing an electric vehicle, you're helping reduce greenhouse gas emissions and dependence on fossil fuels.
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between pt-2 border-t">
          <div className="flex-1">
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <LocateFixed className="h-4 w-4 mr-1 text-volt-600" />
              <span>Pick up</span>
            </div>
            <div className="font-medium">{pickup}</div>
          </div>
          
          <div className="flex-1 text-right">
            <div className="flex items-center justify-end text-sm text-gray-500 mb-1">
              <span>Destination</span>
              <MapPin className="h-4 w-4 ml-1 text-eco-600" />
            </div>
            <div className="font-medium">{destination}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RoutePreview;
