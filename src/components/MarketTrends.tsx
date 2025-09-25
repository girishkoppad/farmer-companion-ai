import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, BarChart3, Calendar, DollarSign } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MarketData {
  month: string;
  wheat: number;
  rice: number;
  onion: number;
  tomato: number;
}

interface CropDemand {
  crop: string;
  demand: string;
  forecast: string;
  recommendation: string;
}

const MarketTrends = () => {
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [timeRange, setTimeRange] = useState('6months');
  
  const marketData: MarketData[] = [
    { month: 'Jan', wheat: 2300, rice: 3800, onion: 2800, tomato: 2400 },
    { month: 'Feb', wheat: 2450, rice: 3900, onion: 3200, tomato: 2200 },
    { month: 'Mar', wheat: 2200, rice: 3750, onion: 4100, tomato: 2600 },
    { month: 'Apr', wheat: 2350, rice: 3850, onion: 3800, tomato: 3200 },
    { month: 'May', wheat: 2500, rice: 4000, onion: 3500, tomato: 2800 },
    { month: 'Jun', wheat: 2400, rice: 4200, onion: 3300, tomato: 2500 }
  ];

  const demandForecast: CropDemand[] = [
    {
      crop: 'Wheat',
      demand: 'High',
      forecast: 'Price increase expected',
      recommendation: 'Good time to sell stored wheat'
    },
    {
      crop: 'Rice',
      demand: 'Moderate',
      forecast: 'Stable prices',
      recommendation: 'Continue current cultivation'
    },
    {
      crop: 'Onion',
      demand: 'Very High',
      forecast: 'Significant price rise',
      recommendation: 'Consider increasing onion cultivation'
    },
    {
      crop: 'Tomato',
      demand: 'Low',
      forecast: 'Slight price decline',
      recommendation: 'Diversify or wait for better season'
    }
  ];

  const getDemandColor = (demand: string) => {
    switch (demand.toLowerCase()) {
      case 'very high': return 'bg-green-100 text-green-800 border-green-200';
      case 'high': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const refreshMarketData = async () => {
    try {
      toast({
        title: "Updating Market Data",
        description: "Fetching latest market trends and forecasts..."
      });
      
      // Simulate API call to UPAg Portal
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Data Updated",
        description: "Market trends and forecasts updated successfully."
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not fetch market data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const cropOptions = [
    { value: 'wheat', label: 'Wheat', color: '#8B5A2B' },
    { value: 'rice', label: 'Rice', color: '#22C55E' },
    { value: 'onion', label: 'Onion', color: '#8B5CF6' },
    { value: 'tomato', label: 'Tomato', color: '#EF4444' }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Market Trends & Forecasts
          </CardTitle>
          <div className="flex gap-2">
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="w-32 bg-background/20 border-background/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cropOptions.map(crop => (
                  <SelectItem key={crop.value} value={crop.value}>
                    {crop.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-background/20 border-background/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">3 Months</SelectItem>
                <SelectItem value="6months">6 Months</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={refreshMarketData}
              variant="outline"
              size="sm"
              className="bg-background/20 border-background/30 hover:bg-background/30"
            >
              <TrendingUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Price Trend Chart */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Price Trends (₹/Quintal)
          </h3>
          <div className="h-64 bg-muted/30 rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, 'Price']} />
                <Line 
                  type="monotone" 
                  dataKey={selectedCrop} 
                  stroke={cropOptions.find(c => c.value === selectedCrop)?.color} 
                  strokeWidth={3}
                  dot={{ fill: cropOptions.find(c => c.value === selectedCrop)?.color, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demand Forecast */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Demand Forecast & Recommendations
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {demandForecast.map((item, index) => (
              <Card key={index} className="border border-border/50 shadow-soft">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-foreground">{item.crop}</h4>
                    <Badge className={getDemandColor(item.demand)} variant="outline">
                      {item.demand} Demand
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary">{item.forecast}</p>
                    <p className="text-sm text-muted-foreground">{item.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Market Comparison */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Current Month Comparison</h3>
          <div className="h-64 bg-muted/30 rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[marketData[marketData.length - 1]]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value}`, 'Price']} />
                <Bar dataKey="wheat" fill="#8B5A2B" name="Wheat" />
                <Bar dataKey="rice" fill="#22C55E" name="Rice" />
                <Bar dataKey="onion" fill="#8B5CF6" name="Onion" />
                <Bar dataKey="tomato" fill="#EF4444" name="Tomato" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Data Source:</strong> Market trends are analyzed from UPAg Portal and various commodity exchanges. 
            Forecasts are based on historical data, weather patterns, and demand analysis. 
            API integration pending - showing sample data.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketTrends;