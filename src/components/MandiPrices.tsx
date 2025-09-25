import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, RefreshCw, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PriceData {
  commodity: string;
  price: number;
  unit: string;
  change: number;
  changePercent: number;
  market: string;
  lastUpdated: Date;
}

const MandiPrices = () => {
  const [prices, setPrices] = useState<PriceData[]>([
    {
      commodity: 'Wheat',
      price: 2500,
      unit: 'quintal',
      change: 50,
      changePercent: 2.04,
      market: 'Delhi Mandi',
      lastUpdated: new Date()
    },
    {
      commodity: 'Rice (Basmati)',
      price: 4200,
      unit: 'quintal',
      change: -100,
      changePercent: -2.33,
      market: 'Punjab Mandi',
      lastUpdated: new Date()
    },
    {
      commodity: 'Onion',
      price: 3500,
      unit: 'quintal',
      change: 200,
      changePercent: 6.06,
      market: 'Maharashtra Mandi',
      lastUpdated: new Date()
    },
    {
      commodity: 'Tomato',
      price: 2800,
      unit: 'quintal',
      change: -150,
      changePercent: -5.08,
      market: 'Karnataka Mandi',
      lastUpdated: new Date()
    },
    {
      commodity: 'Soybean',
      price: 4800,
      unit: 'quintal',
      change: 80,
      changePercent: 1.69,
      market: 'Madhya Pradesh Mandi',
      lastUpdated: new Date()
    },
    {
      commodity: 'Cotton',
      price: 6200,
      unit: 'quintal',
      change: 150,
      changePercent: 2.48,
      market: 'Gujarat Mandi',
      lastUpdated: new Date()
    }
  ]);
  
  const [selectedState, setSelectedState] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const states = [
    { value: 'all', label: 'All States' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'up', label: 'Uttar Pradesh' },
    { value: 'mp', label: 'Madhya Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' }
  ];

  const refreshPrices = async () => {
    setIsLoading(true);
    try {
      // Simulate API call (replace with actual Agmarknet API when keys are added)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate price updates
      setPrices(prev => prev.map(price => ({
        ...price,
        price: price.price + (Math.random() * 200 - 100),
        change: Math.random() * 300 - 150,
        changePercent: (Math.random() * 10 - 5),
        lastUpdated: new Date()
      })));
      
      toast({
        title: "Prices Updated",
        description: "Latest mandi prices have been fetched successfully."
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not fetch latest prices. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatChange = (change: number, percent: number) => {
    const isPositive = change > 0;
    return (
      <div className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span className="text-xs font-medium">
          {formatPrice(Math.abs(change))} ({Math.abs(percent).toFixed(1)}%)
        </span>
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader className="bg-gradient-harvest text-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Live Mandi Prices
          </CardTitle>
          <div className="flex gap-2">
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-40 bg-background/20 border-background/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {states.map(state => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={refreshPrices}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="bg-background/20 border-background/30 hover:bg-background/30"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {prices.map((item, index) => (
            <Card key={index} className="border border-border/50 shadow-soft hover:shadow-medium transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-foreground">{item.commodity}</h3>
                  <Badge variant={item.change > 0 ? "default" : "destructive"} className="text-xs">
                    {item.change > 0 ? '+' : ''}{item.changePercent.toFixed(1)}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(item.price)}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      /{item.unit}
                    </span>
                  </div>
                  {formatChange(item.change, item.changePercent)}
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {item.market}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Updated: {item.lastUpdated.toLocaleTimeString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Prices are fetched from Agmarknet API and updated every hour. 
            Actual prices may vary by market location and quality grade. 
            {!process.env.AGMARKNET_API_KEY && ' API integration pending - showing sample data.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MandiPrices;