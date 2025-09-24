export interface Statistics {
  id: string | number;
  title: string;
  value: number | string;
  description?: string;
  category?: string;
  date?: string;
  percentage?: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface StatisticsResponse {
  data: Statistics[];
  total: number;
  lastUpdated?: string;
}

export interface StatisticsApiResponse {
  success: boolean;
  message?: string;
  statistics: Statistics[] | StatisticsResponse;
}