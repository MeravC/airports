import { BenGurionDepartureBoards } from './ben-gurion-airport';


type Departure = {
  // Airline name
  airline: string;
  // Destination city
  destinationCity: string;
  // Flight code such as "LY 001"
  flightCode: string;
  // Schedule date DD/MM (e.g. 01/01)
  scheduleDate: string;
  // Schedule time HH:MM (e.g. 13:00)
  scheduleTime: string;
  // Last update date DD/MM (e.g. 01/01)
  updateDate: string;
  // Last update time HH:MM (e.g. 13:00)
  updateTime: string;
}

interface DepartureBoards {
  /*
  * Returns a list of supported airport codes
  */
  supportedAirports(): string[];
  /*
  * Returns a list of departures for the given airport
  * @param airport the airport code
  * @returns a list of departures
  * @throws an error if the airport is not supported
  */
  departuresFor(airport: String): Promise<Departure[]>;
}

// List of supported airport codes
const SUPPORTED_AIRPORTS = ['LLBG'];


// Factory method to create departure board instances
class DepartureBoardFactory {
  static createDepartureBoard(airport: string): DepartureBoards {
    switch (airport) {
      case 'LLBG':
        return new BenGurionDepartureBoards();
      default:
        throw new Error(`No departure board implementation for airport: ${airport}`);
    }
  }
}

export {
  Departure,
  DepartureBoards,
  DepartureBoardFactory,
  SUPPORTED_AIRPORTS 
};

