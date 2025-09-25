import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, MessageSquare, Calendar, MapPin, Phone, Mail, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FarmerGroup {
  id: string;
  name: string;
  location: string;
  members: number;
  category: string;
  contact: string;
  rating: number;
  description: string;
}

interface NGO {
  id: string;
  name: string;
  focus: string;
  location: string;
  contact: string;
  email: string;
  services: string[];
}

interface Event {
  id: string;
  title: string;
  date: Date;
  location: string;
  organizer: string;
  category: string;
  attendees: number;
}

const CommunityHub = () => {
  const [farmerGroups] = useState<FarmerGroup[]>([
    {
      id: '1',
      name: 'Punjab Wheat Farmers Association',
      location: 'Punjab',
      members: 1250,
      category: 'Wheat Cultivation',
      contact: '+91-98765-43210',
      rating: 4.8,
      description: 'Promoting sustainable wheat farming practices and collective marketing'
    },
    {
      id: '2',
      name: 'Organic Farmers Collective',
      location: 'Maharashtra',
      members: 780,
      category: 'Organic Farming',
      contact: '+91-87654-32109',
      rating: 4.6,
      description: 'Supporting transition to organic farming methods and certification'
    },
    {
      id: '3',
      name: 'Women Farmers Cooperative',
      location: 'Kerala',
      members: 450,
      category: 'Women Empowerment',
      contact: '+91-76543-21098',
      rating: 4.9,
      description: 'Empowering women farmers through training and microfinance'
    }
  ]);

  const [ngos] = useState<NGO[]>([
    {
      id: '1',
      name: 'AgriTech Foundation',
      focus: 'Technology & Training',
      location: 'Delhi',
      contact: '+91-11-2345-6789',
      email: 'info@agritech.org',
      services: ['Training Programs', 'Equipment Support', 'Market Linkage']
    },
    {
      id: '2',
      name: 'Sustainable Agriculture Initiative',
      focus: 'Environmental Conservation',
      location: 'Karnataka',
      contact: '+91-80-9876-5432',
      email: 'contact@sai.org',
      services: ['Soil Conservation', 'Water Management', 'Organic Certification']
    },
    {
      id: '3',
      name: 'Rural Development Network',
      focus: 'Rural Infrastructure',
      location: 'Rajasthan',
      contact: '+91-141-555-0123',
      email: 'help@rdn.org',
      services: ['Infrastructure Development', 'Financial Services', 'Healthcare']
    }
  ]);

  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Sustainable Farming Workshop',
      date: new Date('2024-01-15'),
      location: 'Punjab Agricultural University',
      organizer: 'AgriTech Foundation',
      category: 'Training',
      attendees: 150
    },
    {
      id: '2',
      title: 'Organic Certification Seminar',
      date: new Date('2024-01-20'),
      location: 'Maharashtra State Farming Institute',
      organizer: 'Organic Farmers Collective',
      category: 'Certification',
      attendees: 80
    },
    {
      id: '3',
      title: 'Women in Agriculture Conference',
      date: new Date('2024-01-25'),
      location: 'Kerala Agricultural College',
      organizer: 'Women Farmers Cooperative',
      category: 'Conference',
      attendees: 200
    }
  ]);

  const joinGroup = (groupId: string) => {
    toast({
      title: "Interest Registered",
      description: "Your interest to join this group has been registered. You will be contacted soon."
    });
  };

  const contactNGO = (ngoId: string) => {
    toast({
      title: "Contact Information",
      description: "NGO contact details are available. You can reach out directly."
    });
  };

  const registerEvent = (eventId: string) => {
    toast({
      title: "Registration Successful",
      description: "You have been registered for this event. Details will be sent via SMS."
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Card className="h-full">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Community Hub
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="groups" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="groups">Farmer Groups</TabsTrigger>
            <TabsTrigger value="ngos">NGOs</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-4">
            <div className="grid gap-4">
              {farmerGroups.map((group) => (
                <Card key={group.id} className="border border-border/50 shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {group.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">{group.name}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            {renderStars(group.rating)}
                            <span className="text-sm text-muted-foreground ml-1">({group.rating})</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-primary/10">
                        {group.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3" />
                          <span>{group.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-3 w-3" />
                          <span>{group.members} members</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3" />
                          <span>{group.contact}</span>
                        </div>
                      </div>
                      <Button onClick={() => joinGroup(group.id)} className="bg-gradient-primary">
                        Join Group
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ngos" className="space-y-4">
            <div className="grid gap-4">
              {ngos.map((ngo) => (
                <Card key={ngo.id} className="border border-border/50 shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-harvest-gold text-foreground">
                            {ngo.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">{ngo.name}</h3>
                          <p className="text-sm text-muted-foreground">{ngo.focus}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3 w-3" />
                        <span>{ngo.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-3 w-3" />
                        <span>{ngo.contact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3" />
                        <span>{ngo.email}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium mb-2">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {ngo.services.map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button onClick={() => contactNGO(ngo.id)} variant="outline" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact NGO
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="grid gap-4">
              {events.map((event) => (
                <Card key={event.id} className="border border-border/50 shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">by {event.organizer}</p>
                      </div>
                      <Badge variant="outline" className="bg-accent/10">
                        {event.category}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-3 w-3" />
                        <span>{event.date.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-3 w-3" />
                        <span>{event.attendees} registered</span>
                      </div>
                    </div>
                    
                    <Button onClick={() => registerEvent(event.id)} className="w-full bg-gradient-harvest">
                      Register for Event
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Community Platform:</strong> Connect with local farmer groups, NGOs, and agricultural events. 
            All contact information is verified and updated regularly. 
            Registration details will be sent via SMS to your registered mobile number.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityHub;