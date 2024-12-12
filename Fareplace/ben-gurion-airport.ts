import axios from 'axios';
import { Departure, DepartureBoards, SUPPORTED_AIRPORTS } from './departure-boards';

export class BenGurionDepartureBoards implements DepartureBoards {

    supportedAirports(): string[] {
      return SUPPORTED_AIRPORTS;
    }
    async departuresFor(airport: string): Promise<Departure[]> {
  
       // Validate airport before making the request
       if (!this.supportedAirports().includes(airport)) {
        throw new Error(`Airport ${airport} is not supported`);
      }
  
      try {
        // Fetch raw data using the API service
        const rawData =  await BenGurionAirportAPI.fetchDepartures(airport);
  
        // Transform the data using the API service's transformation method
        return BenGurionAirportAPI.transformDepartures(rawData);
      } catch (error) {
        console.error('Error in departures retrieval:', error);
        throw error;
      }
    }
  }

export class BenGurionAirportAPI {
  private static readonly API_URL = 'https://www.iaa.gov.il/umbraco/surface/FlightBoardSurface/Search';
  private static readonly FLIGHT_TYPE = 'Outgoing';
  private static readonly UI_CULTURE = 'en-US';

  static async fetchDepartures(airportCode: string): Promise<any[]> {
    try {
      const response = await axios.post(
        this.API_URL,
        new URLSearchParams({
          FlightType: this.FLIGHT_TYPE,
          AirportId: airportCode,
          UICulture: this.UI_CULTURE
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          }
        }
      );

      return response.data.Flights;
    } catch (error) {
      console.error('Error fetching departures:', error);
      throw new Error('Failed to fetch departure information');
    }
  }

  static transformDepartures(rawData: any[]): Departure[] {
    return rawData.map(flight => ({
      airline: flight.Airline || 'Unknown',
      destinationCity: flight.City || 'Unknown',
      flightCode: flight.Flight || 'Unknown',
      scheduleDate: flight.ScheduledDate || 'Unknown',
      scheduleTime: flight.ScheduledTime || 'Unknown',
      updateDate: flight.UpdatedDate || 'Unknown',
      updateTime: flight.UpdatedTime || 'Unknown'
    }));
  }

}