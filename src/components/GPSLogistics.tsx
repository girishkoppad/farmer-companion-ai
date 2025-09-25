import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Truck, MapPin, Clock, Package, Navigation, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Shipment {
  id: string;
  type: 'delivery' | 'pickup';
  item: string;
  quantity: string;
  origin: string;
  destination: string;
  driver: string;
  phone: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'delayed';
  progress: number;
  estimatedTime: string;
  trackingCode: string;
}

interface LogisticsProvider {
  id: string;
  name: string;
  rating: number;
  coverage: string[];
  speciality: string;
  contact: string;
}

const GPSLogistics = () => {
  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: '1',
      type: 'delivery',
      item: 'Fertilizer (Urea)',
      quantity: '10 bags',
      origin: 'Delhi Warehouse',
      destination: 'Your Farm, Punjab',
      driver: 'Rajesh Kumar',
      phone: '+91-98765-43210',
      status: 'in-transit',
      progress: 65,
      estimatedTime: '2 hours',
      trackingCode: 'TRK001234'
    },
    {
      id: '2',
      type: 'pickup',
      item: 'Wheat Produce',
      quantity: '50 quintals',
      origin: 'Your Farm, Punjab',
      destination: 'Delhi Mandi',
      driver: 'Suresh Singh',
      phone: '+91-87654-32109',
      status: 'pending',
      progress: 0,
      estimatedTime: 'Tomorrow 9 AM',
      trackingCode: 'TRK001235'
    },
    {
      id: '3',
      type: 'delivery',
      item: 'Seeds (Hybrid)',
      quantity: '25 kg',
      origin: 'Haryana Depot',
      destination: 'Your Farm, Punjab',
      driver: 'Vikram Yadav',
      phone: '+91-76543-21098',
      status: 'delivered',
      progress: 100,
      estimatedTime: 'Completed',
      trackingCode: 'TRK001236'
    }
  ]);

  const [providers] = useState<LogisticsProvider[]>([
    {
      id: '1',
      name: 'AgriTrans Logistics',
      rating: 4.8,
      coverage: ['Punjab', 'Haryana', 'Delhi', 'UP'],
      speciality: 'Agricultural Inputs',
      contact: '+91-11-2345-6789'
    },
    {
      id: '2',
      name: 'FarmFresh Transport',
      rating: 4.6,
      coverage: ['Punjab', 'Rajasthan', 'Maharashtra'],
      speciality: 'Produce Transport',
      contact: '+91-22-9876-5432'
    },
    {
      id: '3',
      name: 'Rural Connect Cargo',
      rating: 4.4,
      coverage: ['All India'],
      speciality: 'Equipment Delivery',
      contact: '+91-80-5555-0123'
    }
  ]);

  const [selectedProvider, setSelectedProvider] = useState('all');
  const [currentLocation, setCurrentLocation] = useState({ lat: 30.7333, lng: 76.7794 }); // Chandigarh

  // Simulate real-time tracking updates
  useEffect(() => {
    const interval = setInterval(() => {
      setShipments(prev => prev.map(shipment => {
        if (shipment.status === 'in-transit' && shipment.progress < 100) {
          const newProgress = Math.min(shipment.progress + Math.random() * 5, 100);
          const newStatus = newProgress >= 100 ? 'delivered' : 'in-transit';
          return { ...shipment, progress: newProgress, status: newStatus };
        }
        return shipment;
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-transit': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'delayed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'in-transit': return <Truck className="h-4 w-4" />;
      case 'delivered': return <Package className="h-4 w-4" />;
      case 'delayed': return <Navigation className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const trackShipment = (trackingCode: string) => {
    toast({
      title: "Tracking Updated",
      description: `Latest location for ${trackingCode} has been fetched from GPS.`
    });
  };

  const contactDriver = (phone: string, driver: string) => {
    toast({
      title: "Contact Driver",
      description: `You can call ${driver} at ${phone} for updates.`
    });
  };

  const bookDelivery = () => {
    toast({
      title: "Booking Request",
      description: "Your delivery booking request has been submitted. You will be contacted shortly."
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Location Updated",
            description: "Your current location has been updated for better tracking."
          });
        },
        () => {
          toast({
            title: "Location Access Denied",
            description: "Please enable location services for accurate tracking.",
            variant: "destructive"
          });
        }
      );
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="bg-gradient-earth text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            GPS Logistics Tracking
          </CardTitle>
          <div className="flex gap-2">
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger className="w-40 bg-background/20 border-background/30">
                <SelectValue placeholder="All Providers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                {providers.map(provider => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={getCurrentLocation}
              variant="outline"
              size="sm"
              className="bg-background/20 border-background/30 hover:bg-background/30"
            >
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Active Shipments */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Package className="h-4 w-4" />
            Active Shipments
          </h3>
          <div className="space-y-4">
            {shipments.map((shipment) => (
              <Card key={shipment.id} className="border border-border/50 shadow-soft">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        shipment.type === 'delivery' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        {shipment.type === 'delivery' ? (
                          <Package className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Truck className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{shipment.item}</h4>
                        <p className="text-sm text-muted-foreground">{shipment.quantity}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(shipment.status)} variant="outline">
                      {getStatusIcon(shipment.status)}
                      <span className="ml-1">{shipment.status.replace('-', ' ').toUpperCase()}</span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span><strong>From:</strong> {shipment.origin}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span><strong>To:</strong> {shipment.destination}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-3 w-3 text-muted-foreground" />
                        <span><strong>Driver:</strong> {shipment.driver}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span><strong>ETA:</strong> {shipment.estimatedTime}</span>
                      </div>
                    </div>
                    
                    {shipment.status === 'in-transit' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{Math.round(shipment.progress)}%</span>
                        </div>
                        <Progress value={shipment.progress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => trackShipment(shipment.trackingCode)}
                        variant="outline"
                        size="sm"
                      >
                        <Navigation className="h-3 w-3 mr-1" />
                        Track: {shipment.trackingCode}
                      </Button>
                      <Button
                        onClick={() => contactDriver(shipment.phone, shipment.driver)}
                        variant="outline"
                        size="sm"
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Contact Driver
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Logistics Providers */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Available Logistics Providers
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider) => (
              <Card key={provider.id} className="border border-border/50 shadow-soft">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">{provider.name}</h4>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{provider.rating}</span>
                        <div className="text-yellow-400">★</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <p><strong>Speciality:</strong> {provider.speciality}</p>
                      <p><strong>Coverage:</strong> {provider.coverage.join(', ')}</p>
                      <p><strong>Contact:</strong> {provider.contact}</p>
                    </div>
                    
                    <Button onClick={bookDelivery} className="w-full bg-gradient-primary">
                      Book Delivery
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>GPS Tracking:</strong> Real-time location tracking powered by Google Maps API. 
            Location data is updated every 5 minutes for active shipments. 
            Maps API integration pending - showing sample tracking data.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GPSLogistics;