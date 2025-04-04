
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bolt, Car, Calendar, MapPin, Users, Clock, 
  BarChart3, Battery, Leaf, ArrowUpRight, 
  ArrowDownRight, TrendingUp, CircleDollarSign,
  Bell, Share2, Wrench, Award, Shield, BatteryCharging
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, AreaChart, Area, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin"); // Redirect to sign-in if not logged in
    }
  }, []);
  const { toast } = useToast();
  
  const [stats] = useState({
    totalRides: 26,
    totalDistance: 412,
    energySaved: 68,
    co2Reduced: 213,
    costSaved: 182.50,
    treeEquivalent: 18
  });
  
  const [batteryLevel] = useState(72);
  const [chargingStations] = useState([
    { id: 1, name: 'Home Station', distance: '0.2 km', available: true, power: '11 kW', type: 'Level 2' },
    { id: 2, name: 'Downtown Supercharger', distance: '3.4 km', available: true, power: '150 kW', type: 'Level 3' },
    { id: 3, name: 'Mall Parking', distance: '5.7 km', available: false, power: '22 kW', type: 'Level 2' },
    { id: 4, name: 'Highway Station', distance: '12.3 km', available: true, power: '250 kW', type: 'Level 3' },
  ]);
  
  const [upcomingRides] = useState([
    { id: 1, date: 'Today, 3:00 PM', from: 'Home', to: 'Office', distance: '12 km' },
    { id: 2, date: 'Tomorrow, 9:30 AM', from: 'Office', to: 'Client Meeting', distance: '8 km' },
    { id: 3, date: 'May 24, 2:15 PM', from: 'Office', to: 'Home', distance: '12 km' }
  ]);

  const [rideSharingRequests] = useState([
    { id: 1, user: 'Alex M.', from: 'Downtown', to: 'Suburbs', date: 'Today, 5:30 PM', matched: false },
    { id: 2, user: 'Jamie L.', from: 'Office Park', to: 'City Center', date: 'Tomorrow, 8:15 AM', matched: true },
  ]);

  const [maintenanceSchedule] = useState([
    { id: 1, service: 'Tire Rotation', due: 'In 2 weeks', status: 'Upcoming', severity: 'low' },
    { id: 2, service: 'Battery Check', due: 'In 1 month', status: 'Scheduled', severity: 'medium' },
    { id: 3, service: 'Brake Inspection', due: 'Overdue by 2 weeks', status: 'Urgent', severity: 'high' },
  ]);

  const [notifications] = useState([
    { id: 1, message: 'Battery level below 30%. Consider charging soon.', time: '2 hours ago', type: 'warning', read: false },
    { id: 2, message: 'Maintenance reminder: Tire rotation due next week', time: '1 day ago', type: 'info', read: true },
    { id: 3, message: 'You saved 12kg of CO2 on your last trip!', time: '2 days ago', type: 'success', read: true },
  ]);

  const [badges] = useState([
    { id: 1, name: 'Eco Warrior', description: 'Saved over 200kg of CO2', icon: <Leaf className="h-6 w-6 text-accent" /> },
    { id: 2, name: 'Power Saver', description: 'Achieved 95% charging efficiency', icon: <BatteryCharging className="h-6 w-6 text-primary" /> },
    { id: 3, name: 'Green Commuter', description: '50 electric rides completed', icon: <Award className="h-6 w-6 text-amber-500" /> },
  ]);

  const [weeklyData] = useState([
    { day: 'Mon', rides: 3, distance: 45, co2Saved: 14.3, energyUsed: 12.5 },
    { day: 'Tue', rides: 5, distance: 62, co2Saved: 19.8, energyUsed: 18.2 },
    { day: 'Wed', rides: 2, distance: 28, co2Saved: 8.9, energyUsed: 8.1 },
    { day: 'Thu', rides: 4, distance: 57, co2Saved: 18.2, energyUsed: 16.7 },
    { day: 'Fri', rides: 6, distance: 79, co2Saved: 25.3, energyUsed: 22.4 },
    { day: 'Sat', rides: 2, distance: 32, co2Saved: 10.2, energyUsed: 9.5 },
    { day: 'Sun', rides: 1, distance: 18, co2Saved: 5.7, energyUsed: 5.1 }
  ]);

  const [monthlyCO2Data] = useState([
    { month: 'Jan', co2Saved: 62.5 },
    { month: 'Feb', co2Saved: 71.3 },
    { month: 'Mar', co2Saved: 84.7 },
    { month: 'Apr', co2Saved: 92.1 },
    { month: 'May', co2Saved: 101.5 },
    { month: 'Jun', co2Saved: 110.8 },
  ]);

  const [efficiencyComparison] = useState([
    { name: 'Electric', value: 85, color: '#22c56d' },
    { name: 'Gasoline', value: 15, color: '#dc2626' }
  ]);

  const [vehicleData] = useState({
    model: 'Tesla Model 3',
    efficiency: '157 Wh/km',
    lastCharge: 'Yesterday, 9:30 PM',
    estimatedRange: '325 km',
    nextService: 'In 3,225 km',
    chargingStatus: 'Not charging'
  });

  const [trends] = useState([
    { name: 'CO2 Emissions', value: '23.7% decrease', icon: <ArrowDownRight className="h-4 w-4 text-eco-600" />, positive: true },
    { name: 'Energy Efficiency', value: '12.4% increase', icon: <ArrowUpRight className="h-4 w-4 text-eco-600" />, positive: true },
    { name: 'Weekly Distance', value: '8.2% increase', icon: <ArrowUpRight className="h-4 w-4 text-volt-600" />, positive: true },
    { name: 'Cost Savings', value: '15.1% increase', icon: <ArrowUpRight className="h-4 w-4 text-eco-600" />, positive: true }
  ]);

  const [fuelComparison] = useState([
    { category: 'Energy', electric: 187, gasoline: 452 },
    { category: 'Cost', electric: 45, gasoline: 112 },
    { category: 'CO2', electric: 28, gasoline: 184 },
    { category: 'Maintenance', electric: 32, gasoline: 87 }
  ]);

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications",
    });
  };

  const handleMaintenanceAction = (serviceId: number) => {
    toast({
      title: "Maintenance Scheduled",
      description: "Your maintenance appointment has been scheduled",
    });
  };

  const handleShareRide = (rideId: number) => {
    toast({
      title: "Ride Shared",
      description: "Your ride details have been shared",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-24">
        <div className="space-y-8">
          {/* Welcome Section with Notification Bell */}
          <div className="flex justify-between items-center">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">Welcome back, Rider</h1>
              <p className="text-muted-foreground text-lg">Here's an overview of your electric rides and impact.</p>
            </div>
            <div className="flex space-x-4 items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Notifications</SheetTitle>
                    <SheetDescription>Stay updated on your vehicle and rides</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`p-3 border rounded-lg ${notification.read ? 'bg-background' : 'bg-primary/5'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className={`text-sm ${notification.read ? 'font-normal' : 'font-medium'}`}>{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                          {notification.type === 'warning' && <Shield className="h-5 w-5 text-amber-500" />}
                          {notification.type === 'info' && <Bell className="h-5 w-5 text-primary" />}
                          {notification.type === 'success' && <Leaf className="h-5 w-5 text-accent" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Users className="mr-2 h-4 w-4" />
                Ride Sharing
              </Button>
            </div>
          </div>
          
          {/* Key Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Rides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">{stats.totalRides}</span>
                  </div>
                  <div className="text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded-full">
                    +5 this week
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Distance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">{stats.totalDistance} km</span>
                  </div>
                  <div className="text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded-full">
                    +78 km this week
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">CO₂ Reduced</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-accent" />
                    <span className="text-2xl font-bold">{stats.co2Reduced} kg</span>
                  </div>
                  <div className="text-xs text-accent font-medium px-2 py-1 bg-accent/10 rounded-full">
                    +43 kg this week
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Cost Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CircleDollarSign className="h-5 w-5 text-accent" />
                    <span className="text-2xl font-bold">${stats.costSaved}</span>
                  </div>
                  <div className="text-xs text-accent font-medium px-2 py-1 bg-accent/10 rounded-full">
                    +$32.50 this week
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Environmental Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CO2 Emission Savings Chart */}
            <Card className="shadow-sm col-span-1 lg:col-span-2 overflow-hidden">
              <CardHeader>
                <CardTitle>CO₂ Emissions Saved</CardTitle>
                <CardDescription>Monthly progression of your environmental impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={monthlyCO2Data}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c56d" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#22c56d" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis unit=" kg" />
                      <Tooltip content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 border rounded shadow-sm">
                              <p className="font-medium">{payload[0].payload.month}</p>
                              <p className="text-accent">
                                {`CO₂ Saved: ${payload[0].value} kg`}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Equivalent to planting {Math.round(Number(payload[0].value) / 12)} trees
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }} />
                      <Area 
                        type="monotone" 
                        dataKey="co2Saved" 
                        stroke="#22c56d" 
                        fillOpacity={1} 
                        fill="url(#colorCO2)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Badges */}
            <Card className="shadow-sm col-span-1 flex flex-col">
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Eco badges you've earned</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-4">
                  {badges.map((badge) => (
                    <div key={badge.id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {badge.icon}
                      </div>
                      <div>
                        <div className="font-medium">{badge.name}</div>
                        <div className="text-xs text-muted-foreground">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <div className="text-center mb-3">
                    <div className="text-lg font-bold text-accent">{stats.treeEquivalent}</div>
                    <div className="text-sm text-muted-foreground">Trees Worth of CO₂ Absorbed</div>
                  </div>
                  
                  <div className="h-[100px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={efficiencyComparison}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={45}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {efficiencyComparison.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-2 border rounded shadow-sm">
                                <p className="font-medium">{payload[0].name}</p>
                                <p className="text-sm">
                                  {`${payload[0].value}% efficiency`}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Maintenance Schedule & Ride Sharing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Maintenance Schedule */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Maintenance Schedule</CardTitle>
                    <CardDescription>Keep your vehicle in top condition</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    <Wrench className="mr-2 h-4 w-4" />
                    Service History
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceSchedule.map((item) => (
                    <div key={item.id} className={`flex items-center justify-between p-3 border rounded-lg ${
                      item.severity === 'high' ? 'border-red-200 bg-red-50' : 
                      item.severity === 'medium' ? 'border-amber-200 bg-amber-50' : 
                      'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          item.severity === 'high' ? 'bg-red-100' : 
                          item.severity === 'medium' ? 'bg-amber-100' : 
                          'bg-gray-100'
                        }`}>
                          <Wrench className={`h-4 w-4 ${
                            item.severity === 'high' ? 'text-red-600' : 
                            item.severity === 'medium' ? 'text-amber-600' : 
                            'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <div className="font-medium">{item.service}</div>
                          <div className="text-xs text-muted-foreground">{item.due}</div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={item.severity === 'high' ? "destructive" : "secondary"}
                        onClick={() => handleMaintenanceAction(item.id)}
                      >
                        Schedule
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Maintenance Tasks
                </Button>
              </CardFooter>
            </Card>

            {/* Ride Sharing */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Ride Sharing</CardTitle>
                    <CardDescription>Share your rides and reduce emissions together</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    New Feature
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rideSharingRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{request.user}</div>
                          <div className="text-xs text-muted-foreground">
                            {request.from} to {request.to} • {request.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {request.matched && (
                          <Badge variant="outline" className="bg-accent/10 text-accent">
                            Matched
                          </Badge>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleShareRide(request.id)}
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full mt-4">
                    <Users className="mr-2 h-4 w-4" />
                    Find Ride Sharing Partners
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Vehicle & Usage Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Battery Status */}
            <Card className="shadow-sm col-span-1">
              <CardHeader>
                <CardTitle>Battery Status</CardTitle>
                <CardDescription>Current vehicle battery level</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Battery className="h-5 w-5 text-primary" />
                  <span className="text-xl font-bold">{batteryLevel}%</span>
                </div>
                <Progress 
                  value={batteryLevel} 
                  className={`h-3 ${batteryLevel < 30 ? 'bg-red-200' : batteryLevel < 60 ? 'bg-amber-200' : 'bg-accent/20'}`}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Est. Range</div>
                    <div className="text-sm font-medium">{Math.round(batteryLevel * 1.8)} km</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Time to Full</div>
                    <div className="text-sm font-medium">{Math.round((100 - batteryLevel) * 0.9)} min</div>
                  </div>
                </div>
                
                <div className="mt-4 border rounded-md p-3 bg-muted/30">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Vehicle Details</span>
                    <span className="text-primary">{vehicleData.model}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Efficiency</span>
                    <span>{vehicleData.efficiency}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Last Charge</span>
                    <span>{vehicleData.lastCharge}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Next Service</span>
                    <span>{vehicleData.nextService}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full">Find Charging Stations</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Nearby Charging Stations</SheetTitle>
                      <SheetDescription>Find available stations to charge your vehicle</SheetDescription>
                    </SheetHeader>
                    <div className="py-4">
                      <div className="relative mb-4">
                        <Input placeholder="Search charging stations..." className="pr-10" />
                        <MapPin className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="space-y-3 mt-4">
                        {chargingStations.map(station => (
                          <div key={station.id} className="p-3 border rounded-lg flex justify-between items-center">
                            <div>
                              <div className="font-medium">{station.name}</div>
                              <div className="text-xs text-muted-foreground">{station.distance} • {station.power}</div>
                              <div className="flex items-center mt-1 gap-1">
                                <span className={`w-2 h-2 rounded-full ${station.available ? 'bg-accent' : 'bg-red-500'}`}></span>
                                <span className={`text-xs ${station.available ? 'text-accent' : 'text-red-500'}`}>
                                  {station.available ? 'Available' : 'Occupied'}
                                </span>
                              </div>
                            </div>
                            <Button size="sm" disabled={!station.available}>Navigate</Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <Button variant="outline" size="sm" className="w-full">Schedule Smart Charging</Button>
              </CardFooter>
            </Card>
            
            {/* Weekly Usage */}
            <Card className="shadow-sm col-span-1 lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between flex-col md:flex-row gap-4">
                  <div>
                    <CardTitle>Weekly Performance</CardTitle>
                    <CardDescription>Detailed statistics of your rides</CardDescription>
                  </div>
                  <Tabs defaultValue="distance" className="w-full md:w-[250px]">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="distance">Distance</TabsTrigger>
                      <TabsTrigger value="co2">CO₂ Saved</TabsTrigger>
                      <TabsTrigger value="energy">Energy</TabsTrigger>
                    </TabsList>
                    <TabsContent value="distance">
                      <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis unit=" km" />
                            <Tooltip content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-white p-3 border rounded shadow-sm">
                                    <p className="font-medium">{payload[0].payload.day}</p>
                                    <p className="text-primary">
                                      {`Distance: ${payload[0].value} km`}
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                      {`${payload[0].payload.rides} rides`}
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }} />
                            <Bar 
                              dataKey="distance" 
                              fill="#0288d1" 
                              radius={[4, 4, 0, 0]} 
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                    <TabsContent value="co2">
                      <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis unit=" kg" />
                            <Tooltip content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-white p-3 border rounded shadow-sm">
                                    <p className="font-medium">{payload[0].payload.day}</p>
                                    <p className="text-accent">
                                      {`CO₂ Saved: ${payload[0].value} kg`}
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                      {`${payload[0].payload.distance} km traveled`}
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }} />
                            <Bar 
                              dataKey="co2Saved" 
                              fill="#22c56d" 
                              radius={[4, 4, 0, 0]} 
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                    <TabsContent value="energy">
                      <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis unit=" kWh" />
                            <Tooltip content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-white p-3 border rounded shadow-sm">
                                    <p className="font-medium">{payload[0].payload.day}</p>
                                    <p className="text-primary">
                                      {`Energy Used: ${payload[0].value} kWh`}
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                      {`Efficiency: ${(payload[0].value as any / payload[0].payload.distance).toFixed(2)} kWh/km`}
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }} />
                            <Bar 
                              dataKey="energyUsed" 
                              fill="#9b87f5" 
                              radius={[4, 4, 0, 0]} 
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardHeader>
            </Card>
          </div>
          
          {/* Comparison & Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trends */}
            <Card className="shadow-sm col-span-1">
              <CardHeader>
                <CardTitle>Current Trends</CardTitle>
                <CardDescription>Performance metrics this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trends.map((trend, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        {trend.icon}
                        <span className="text-sm font-medium">{trend.name}</span>
                      </div>
                      <span className={`text-sm font-medium ${trend.positive ? 'text-accent' : 'text-red-500'}`}>
                        {trend.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* EV vs. Gas Comparison */}
            <Card className="shadow-sm col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Electric vs. Gasoline Comparison</CardTitle>
                <CardDescription>Performance comparison for your driving patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={fuelComparison}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="category" type="category" />
                      <Tooltip content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          const metric = payload[0].name === "electric" ? "Electric" : "Gasoline";
                          let unit = "";
                          
                          switch(data.category) {
                            case "Energy": unit = "kWh"; break;
                            case "Cost": unit = "$"; break;
                            case "CO2": unit = "kg"; break;
                            case "Maintenance": unit = "$"; break;
                            default: unit = "";
                          }
                          
                          return (
                            <div className="bg-white p-3 border rounded shadow-sm">
                              <p className="font-medium">{data.category}</p>
                              <p className={payload[0].name === "electric" ? "text-primary" : "text-red-500"}>
                                {`${metric}: ${payload[0].value} ${unit}`}
                              </p>
                              {payload.length > 1 && (
                                <p className={payload[1].name === "electric" ? "text-primary" : "text-red-500"}>
                                  {`${payload[1].name === "electric" ? "Electric" : "Gasoline"}: ${payload[1].value} ${unit}`}
                                </p>
                              )}
                              {data.category === "CO2" && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {`${Math.round(((data.gasoline - data.electric) / data.gasoline) * 100)}% reduction with electric`}
                                </p>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }} />
                      <Legend />
                      <Bar dataKey="electric" name="Electric" fill="#0288d1" />
                      <Bar dataKey="gasoline" name="Gasoline" fill="#dc2626" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Upcoming Rides */}
          <div>
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Rides</CardTitle>
                    <CardDescription>Your scheduled electric journeys</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Calendar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingRides.map(ride => (
                    <div key={ride.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div className="flex gap-4">
                        <div className="bg-primary/10 p-3 rounded-md">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{ride.from} to {ride.to}</h4>
                          <p className="text-sm text-muted-foreground">{ride.date} • {ride.distance}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShareRide(ride.id)}
                        >
                          <Share2 className="mr-1 h-4 w-4" />
                          Share
                        </Button>
                        <Button variant="ghost" size="sm">Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  <Car className="mr-2 h-4 w-4" />
                  Book a New Ride
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
