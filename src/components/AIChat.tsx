import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, Bot, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Smart Crop Advisory assistant. I can help you with mandi prices, soil health, crop recommendations, and more. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual Gemini API call when keys are added)
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getSimulatedResponse(inputText),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const getSimulatedResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('price') || lowerQuery.includes('mandi')) {
      return 'Current mandi prices in your area: Wheat ₹2,500/quintal, Rice ₹3,200/quintal, Onion ₹4,500/quintal. Prices are updated daily from Agmarknet API.';
    } else if (lowerQuery.includes('soil') || lowerQuery.includes('health')) {
      return 'Based on soil health data, your area shows moderate nitrogen levels. I recommend organic compost application and consider crop rotation with legumes to improve soil fertility.';
    } else if (lowerQuery.includes('weather') || lowerQuery.includes('rain')) {
      return 'Weather forecast shows moderate rainfall expected in the next 3 days. Good time for transplanting. Monitor your crops for any pest activity due to humidity increase.';
    } else if (lowerQuery.includes('crop') || lowerQuery.includes('recommend')) {
      return 'For your region and current season, I recommend considering maize or soybean. Both have good market demand and suitable growing conditions. Would you like specific variety recommendations?';
    } else {
      return 'I understand your query. Once the Gemini API is connected, I\'ll provide more detailed and personalized assistance for all your farming needs including market prices, weather, soil health, and crop recommendations.';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full max-h-[600px] bg-gradient-to-br from-card to-muted/30">
      <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          AI Crop Advisor
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-[500px]">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex gap-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-harvest-gold text-foreground'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-harvest-gold flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-muted/30">
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about mandi prices, soil health, crop recommendations..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputText.trim()}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;