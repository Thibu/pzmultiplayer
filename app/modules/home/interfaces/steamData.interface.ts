export interface SteamAppNewsResponse {
    appnews: AppNews;
  }
  
  export interface AppNews {
    appid: number;
    count: number;
    newsitems: NewsItem[];
  }
  
  export interface NewsItem {
    appid: number;
    gid: string;
    title: string;
    url: string;
    is_external_url: boolean;
    author: string;
    contents: string;
    date: number; // Unix timestamp (seconds)
    feed_type: number;
    feedlabel: string;
    feedname: string;
  }