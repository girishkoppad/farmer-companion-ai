import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sprout, 
  TrendingUp, 
  Users, 
  Truck, 
  MessageCircle, 
  Leaf,
  Sun,
  Droplets,
  Thermometer,
  Wind,
  BarChart3
} from 'lucide-react';
import AIChat from '@/components/AIChat';
import MandiPrices from '@/components/MandiPrices';
import SoilHealth from '@/components/SoilHealth';
import MarketTrends from '@/components/MarketTrends';
import CommunityHub from '@/components/CommunityHub';
import GPSLogistics from '@/components/GPSLogistics';
import heroImage from '@/assets/hero-farming.jpg';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock weather data
  const weatherData = {
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
    rainfall: 0
  };

  // Dashboard metrics
  const dashboardMetrics = [
    {
      title: 'Today\'s Weather',
      value: `${weatherData.temperature}°C`,
      subtext: weatherData.condition,
      icon: <Sun className="h-5 w-5" />,
      color: 'bg-gradient-harvest'
    },
    {
      title: 'Soil Health Score',
      value: '72/100',
      subtext: 'Good Condition',
      icon: <Leaf className="h-5 w-5" />,
      color: 'bg-gradient-earth'
    },
    {
      title: 'Active Shipments',
      value: '3',
      subtext: '2 In Transit',
      icon: <Truck className="h-5 w-5" />,
      color: 'bg-gradient-primary'
    },
    {
      title: 'Market Trend',
      value: '+5.2%',
      subtext: 'Wheat Prices Up',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'bg-gradient-primary'
    }
  ];

  const quickActions = [
    {
      title: 'Check Mandi Prices',
      description: 'Latest commodity prices',
      icon: <BarChart3 className="h-4 w-4" />,
      action: () => setActiveTab('prices')
    },
    {
      title: 'AI Crop Advisor',
      description: 'Get farming advice',
      icon: <MessageCircle className="h-4 w-4" />,
      action: () => setActiveTab('chat')
    },
    {
      title: 'Soil Analysis',
      description: 'Check soil health',
      icon: <Leaf className="h-4 w-4" />,
      action: () => setActiveTab('soil')
    },
    {
      title: 'Track Delivery',
      description: 'GPS logistics tracking',
      icon: <Truck className="h-4 w-4" />,
      action: () => setActiveTab('logistics')
    }
  ];

  const handleQuickAction = (action: () => void) => {
    action();
    toast({
      title: "Navigation",
      description: "Switching to requested section..."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">Smart Crop Advisory</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto px-4">
              Your AI-powered farming companion for real-time insights, market data, and agricultural guidance
            </p>
            <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
              Powered by Government APIs & AI
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 h-12">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Sprout className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger value="prices" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Prices
            </TabsTrigger>
            <TabsTrigger value="soil" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              Soil Health
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Dashboard Metrics */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {dashboardMetrics.map((metric, index) => (
                <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow">
                  <CardContent className="p-6">
                    <div className={`${metric.color} text-primary-foreground p-3 rounded-lg inline-flex items-center gap-2 mb-4`}>
                      {metric.icon}
                      <span className="font-medium">{metric.title}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.subtext}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Weather Details */}
            <Card className="shadow-medium">
              <CardHeader className="bg-gradient-to-r from-sky-blue/20 to-primary/20 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5" />
                  Today's Weather Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="flex items-center gap-3">
                    <Thermometer className="h-5 w-5 text-harvest-gold" />
                    <div>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="font-semibold">{weatherData.temperature}°C</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Droplets className="h-5 w-5 text-sky-blue" />
                    <div>
                      <p className="text-sm text-muted-foreground">Humidity</p>
                      <p className="font-semibold">{weatherData.humidity}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wind className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Wind Speed</p>
                      <p className="font-semibold">{weatherData.windSpeed} km/h</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Droplets className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Rainfall</p>
                      <p className="font-semibold">{weatherData.rainfall} mm</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      onClick={() => handleQuickAction(action.action)}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-start gap-2 hover:shadow-soft transition-all"
                    >
                      <div className="flex items-center gap-2 w-full">
                        {action.icon}
                        <span className="font-medium">{action.title}</span>
                      </div>
                      <span className="text-xs text-muted-foreground text-left">
                        {action.description}
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* GPS Logistics Preview */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="shadow-medium">
                <CardHeader className="bg-gradient-earth text-primary-foreground rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    GPS Logistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <GPSLogistics />
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                {/* AI Chat Preview */}
                <AIChat />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <AIChat />
          </TabsContent>

          <TabsContent value="prices">
            <MandiPrices />
          </TabsContent>

          <TabsContent value="soil">
            <SoilHealth />
          </TabsContent>

          <TabsContent value="trends">
            <MarketTrends />
          </TabsContent>

          <TabsContent value="community">
            <CommunityHub />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-muted/50 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Sprout className="h-5 w-5 text-primary" />
                Smart Crop Advisory
              </h3>
              <p className="text-sm text-muted-foreground">
                Empowering farmers with AI-powered insights and real-time agricultural data 
                from government sources.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Data Sources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Agmarknet API - Mandi Prices</li>
                <li>• Soil Health Dashboard - Soil Data</li>
                <li>• UPAg Portal - Market Trends</li>
                <li>• Google Gemini AI - Smart Advisor</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Real-time Mandi Prices</li>
                <li>• AI-powered Crop Advice</li>
                <li>• Soil Health Analysis</li>
                <li>• GPS Logistics Tracking</li>
                <li>• Community Connections</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
            <p>© 2024 Smart Crop Advisory. Built for Indian farmers with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;