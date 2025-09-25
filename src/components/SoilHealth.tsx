import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Droplets, Zap, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SoilMetric {
  name: string;
  value: number;
  unit: string;
  status: 'low' | 'medium' | 'good' | 'high';
  recommendation: string;
  icon: React.ReactNode;
}

const SoilHealth = () => {
  const [soilData, setSoilData] = useState<SoilMetric[]>([
    {
      name: 'Nitrogen (N)',
      value: 245,
      unit: 'kg/ha',
      status: 'medium',
      recommendation: 'Apply organic compost or urea fertilizer',
      icon: <Leaf className="h-4 w-4" />
    },
    {
      name: 'Phosphorus (P)',
      value: 18,
      unit: 'ppm',
      status: 'low',
      recommendation: 'Use DAP or SSP fertilizer',
      icon: <Zap className="h-4 w-4" />
    },
    {
      name: 'Potassium (K)',
      value: 280,
      unit: 'ppm',
      status: 'good',
      recommendation: 'Maintain current levels',
      icon: <Shield className="h-4 w-4" />
    },
    {
      name: 'Organic Carbon',
      value: 0.75,
      unit: '%',
      status: 'medium',
      recommendation: 'Add organic matter like compost',
      icon: <Droplets className="h-4 w-4" />
    }
  ]);

  const [soilTips] = useState([
    {
      title: 'Crop Rotation',
      description: 'Rotate crops to maintain soil fertility and prevent pest buildup',
      priority: 'high'
    },
    {
      title: 'Cover Crops',
      description: 'Plant cover crops during off-season to prevent soil erosion',
      priority: 'medium'
    },
    {
      title: 'Composting',
      description: 'Add homemade compost to improve soil organic matter',
      priority: 'high'
    },
    {
      title: 'Minimal Tillage',
      description: 'Reduce tillage to preserve soil structure and microbial life',
      priority: 'medium'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'good': return 'text-green-600 bg-green-50';
      case 'high': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'low': return 25;
      case 'medium': return 60;
      case 'good': return 85;
      case 'high': return 95;
      default: return 50;
    }
  };

  const refreshSoilData = async () => {
    try {
      toast({
        title: "Analyzing Soil",
        description: "Fetching latest soil health data..."
      });
      
      // Simulate API call to Soil Health Dashboard
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Analysis Complete",
        description: "Soil health data updated successfully."
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Could not fetch soil data. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="bg-gradient-earth text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Soil Health Analysis
          </CardTitle>
          <Button
            onClick={refreshSoilData}
            variant="outline"
            size="sm"
            className="bg-background/20 border-background/30 hover:bg-background/30 text-primary-foreground"
          >
            Refresh Data
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="metrics">Soil Metrics</TabsTrigger>
            <TabsTrigger value="tips">Health Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics" className="space-y-4">
            {soilData.map((metric, index) => (
              <Card key={index} className="border border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {metric.icon}
                      <h3 className="font-semibold">{metric.name}</h3>
                    </div>
                    <Badge className={getStatusColor(metric.status)} variant="outline">
                      {metric.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">
                        {metric.value} {metric.unit}
                      </span>
                    </div>
                    
                    <Progress value={getProgressValue(metric.status)} className="h-2" />
                    
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Recommendation:</strong> {metric.recommendation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Overall Soil Health Score</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Based on current analysis, your soil health is <strong>Good (72/100)</strong>
                  </p>
                  <Progress value={72} className="h-3" />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-4">
            {soilTips.map((tip, index) => (
              <Card key={index} className="border border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-1 rounded-full ${
                      tip.priority === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                    }`}>
                      {tip.priority === 'high' ? (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                      <Badge 
                        variant="outline" 
                        className={`mt-2 ${tip.priority === 'high' ? 'border-red-200 text-red-700' : 'border-yellow-200 text-yellow-700'}`}
                      >
                        {tip.priority} priority
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Data Source:</strong> Soil Health Dashboard API provides comprehensive soil analysis 
                based on latest laboratory tests and field surveys. 
                {!process.env.SOIL_HEALTH_API_KEY && ' API integration pending - showing sample data.'}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SoilHealth;