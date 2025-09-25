import axios from 'axios';

// API Service for integrating with government data sources
class APIService {
  private baseURL: string = '';

  // Agmarknet API for mandi prices
  async fetchMandiPrices(commodity: string, state: string, district: string) {
    try {
      // Note: Actual Agmarknet API endpoint structure
      const response = await axios.get(
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070`,
        {
          params: {
            'api-key': process.env.AGMARKNET_API_KEY || 'demo-key',
            format: 'json',
            limit: 100,
            filters: {
              commodity: commodity,
              state: state,
              district: district
            }
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching mandi prices:", error);
      // Return mock data when API is not available
      return this.getMockMandiPrices(commodity, state, district);
    }
  }

  // Soil Health Dashboard API
  async fetchSoilHealthData(district: string) {
    try {
      // Note: This is a placeholder URL - actual endpoint varies by state
      const response = await axios.get(
        `https://soilhealth.dac.gov.in/api/soil/${district}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.SOIL_HEALTH_API_KEY || 'demo-key'}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching soil health data:", error);
      return this.getMockSoilHealthData(district);
    }
  }

  // UPAg Portal API for market trends
  async fetchMarketTrends(crop: string, timeRange: string) {
    try {
      const response = await axios.get(
        `https://upag.gov.in/api/market-trends`,
        {
          params: {
            crop: crop,
            range: timeRange,
            'api-key': process.env.UPAG_API_KEY || 'demo-key'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching market trends:", error);
      return this.getMockMarketTrends(crop, timeRange);
    }
  }

  // Weather API integration
  async fetchWeatherData(latitude: number, longitude: number) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            lat: latitude,
            lon: longitude,
            appid: process.env.OPENWEATHER_API_KEY || 'demo-key',
            units: 'metric'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return this.getMockWeatherData();
    }
  }

  // Mock data methods for when APIs are not available
  private getMockMandiPrices(commodity: string, state: string, district: string) {
    return {
      records: [
        {
          commodity: commodity,
          state: state,
          district: district,
          market: `${district} Mandi`,
          min_price: Math.floor(Math.random() * 1000) + 2000,
          max_price: Math.floor(Math.random() * 1000) + 3000,
          modal_price: Math.floor(Math.random() * 1000) + 2500,
          price_date: new Date().toISOString().split('T')[0]
        }
      ]
    };
  }

  private getMockSoilHealthData(district: string) {
    return {
      district: district,
      nitrogen: Math.floor(Math.random() * 300) + 200,
      phosphorus: Math.floor(Math.random() * 50) + 10,
      potassium: Math.floor(Math.random() * 400) + 150,
      organic_carbon: Math.random() * 2,
      ph: Math.random() * 3 + 6,
      test_date: new Date().toISOString().split('T')[0],
      recommendations: [
        'Apply organic compost for better soil structure',
        'Consider crop rotation with legumes',
        'Maintain proper drainage during monsoon'
      ]
    };
  }

  private getMockMarketTrends(crop: string, timeRange: string) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return {
      crop: crop,
      timeRange: timeRange,
      data: months.map(month => ({
        month: month,
        price: Math.floor(Math.random() * 1000) + 2000,
        demand: Math.random() > 0.5 ? 'High' : 'Moderate',
        forecast: Math.random() > 0.5 ? 'Price increase expected' : 'Stable prices'
      }))
    };
  }

  private getMockWeatherData() {
    return {
      main: {
        temp: Math.floor(Math.random() * 20) + 20,
        humidity: Math.floor(Math.random() * 40) + 40,
        pressure: Math.floor(Math.random() * 50) + 1000
      },
      weather: [
        {
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        }
      ],
      wind: {
        speed: Math.random() * 10
      },
      name: 'Your Location'
    };
  }
}

export const apiService = new APIService();
export default apiService;