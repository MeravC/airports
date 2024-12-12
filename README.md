# Airport Departure Board Application

## Overview

This application provides a flexible and extensible system for retrieving departure information from different airports. Currently supporting Ben Gurion Airport (LLBG), the system is designed to be easily expandable to include more airports in the future.

## Features

- Retrieve real-time departure information for supported airports
- Modular and extensible architecture
- Simple REST API endpoint for departure information
- Error handling for unsupported airports and API failures

## Technologies Used

- TypeScript
- Express.js
- Axios (for HTTP requests)
- Node.js

## Project Structure

```
project-root/
│
├── src/
│   ├── index.ts             # Main application entry point
│   ├── departure-boards.ts  # Core interfaces and factory
│   ├── ben-gurion-airport.ts# Ben Gurion Airport specific implementation
│   └── routes/
│       └── departures.ts    # Express router for departure routes
│
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/MeravC/airports
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the application
   ```bash
   npm start
   ```

## API Endpoints

### Get Departures

- **URL:** `/airport=:airportCode`
- **Method:** `GET`
- **URL Params:** 
  - `airportCode` [string] - Currently supports only 'LLBG'
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of departure objects
    ```json
    [
      {
        "airline": "El Al",
        "destinationCity": "New York",
        "flightCode": "LY 001",
        "scheduleDate": "01/01",
        "scheduleTime": "13:00",
        "updateDate": "01/01",
        "updateTime": "12:55"
      }
    ]
    ```

## Error Handling

The application provides robust error handling:
- Validates supported airports
- Handles API request failures
- Provides informative error messages
- Uses appropriate HTTP status codes

## Limitations

- Currently supports only Ben Gurion Airport (LLBG)
- Relies on external airport API for real-time information

## Future Improvements

- Add more airport implementations
- Implement caching mechanism
- Add comprehensive logging
- Create configuration management
- Add DB
