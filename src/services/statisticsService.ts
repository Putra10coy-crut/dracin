import { Statistics, StatisticsResponse, StatisticsApiResponse } from '@/types/statistics';

// URL untuk production (Vercel) dan development
const STATISTICS_URL = process.env.NODE_ENV === 'production' 
  ? 'https://drive.google.com/uc?export=download&id=1-5Q8zt1Fr-Uh4Mk4KoNQB27Zv2ty4ARy'
  : 'https://drive.google.com/uc?export=download&id=1-5Q8zt1Fr-Uh4Mk4KoNQB27Zv2ty4ARy';

export class StatisticsService {
  private static instance: StatisticsService;
  private cache: Statistics[] | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 menit

  public static getInstance(): StatisticsService {
    if (!StatisticsService.instance) {
      StatisticsService.instance = new StatisticsService();
    }
    return StatisticsService.instance;
  }

  private isCacheValid(): boolean {
    return this.cache !== null && 
           Date.now() - this.cacheTimestamp < this.CACHE_DURATION;
  }

  public async fetchStatistics(): Promise<Statistics[]> {
    // Gunakan cache jika masih valid
    if (this.isCacheValid()) {
      return this.cache!;
    }

    try {
      const response = await fetch(STATISTICS_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        // Untuk deployment di Vercel
        next: { revalidate: 300 } // revalidate setiap 5 menit
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle berbagai format response yang mungkin
      let statistics: Statistics[] = [];
      
      if (Array.isArray(data)) {
        statistics = data;
      } else if (data.data && Array.isArray(data.data)) {
        statistics = data.data;
      } else if (data.statistics && Array.isArray(data.statistics)) {
        statistics = data.statistics;
      } else if (typeof data === 'object' && data !== null) {
        // Jika data adalah object, convert ke array
        statistics = Object.entries(data).map(([key, value]: [string, any]) => ({
          id: key,
          title: value.title || key,
          value: value.value || value,
          description: value.description,
          category: value.category,
          date: value.date,
          percentage: value.percentage,
          trend: value.trend
        }));
      }

      // Validasi dan normalisasi data
      statistics = statistics.map((item, index) => ({
        id: item.id || index.toString(),
        title: item.title || `Statistik ${index + 1}`,
        value: item.value || 0,
        description: item.description,
        category: item.category,
        date: item.date,
        percentage: item.percentage,
        trend: item.trend
      }));

      // Update cache
      this.cache = statistics;
      this.cacheTimestamp = Date.now();

      return statistics;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      
      // Return cache jika ada error dan cache tersedia
      if (this.cache) {
        console.warn('Using cached statistics due to fetch error');
        return this.cache;
      }
      
      // Return data dummy jika tidak ada cache
      return this.getFallbackStatistics();
    }
  }

  public async getStatisticsByCategory(category: string): Promise<Statistics[]> {
    const allStats = await this.fetchStatistics();
    return allStats.filter(stat => stat.category === category);
  }

  public async getStatisticsById(id: string | number): Promise<Statistics | null> {
    const allStats = await this.fetchStatistics();
    return allStats.find(stat => stat.id.toString() === id.toString()) || null;
  }

  private getFallbackStatistics(): Statistics[] {
    return [
      {
        id: '1',
        title: 'Total Movies',
        value: 150,
        description: 'Total film dalam database',
        category: 'movies',
        trend: 'up',
        percentage: 12
      },
      {
        id: '2',
        title: 'Active Users',
        value: 1250,
        description: 'Pengguna aktif bulan ini',
        category: 'users',
        trend: 'up',
        percentage: 8
      },
      {
        id: '3',
        title: 'Total Views',
        value: 45000,
        description: 'Total tayangan film',
        category: 'engagement',
        trend: 'stable',
        percentage: 0
      }
    ];
  }

  public clearCache(): void {
    this.cache = null;
    this.cacheTimestamp = 0;
  }
}

// Export instance untuk penggunaan langsung
export const statisticsService = StatisticsService.getInstance();