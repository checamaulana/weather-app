export interface ForecastDay {
  day: string;
  temp: number;
  icon: string;
}

export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: ForecastDay[];
  loading: boolean;
  error: string | null;
}

export interface WeatherListItem {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
  }>;
  wind: {
    speed: number;
  };
}

export interface SuggestionCity {
  name: string;
  country: string;
  fullName?: string;
  lat?: number;
  lon?: number;
}
