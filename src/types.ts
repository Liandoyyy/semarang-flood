export interface FloodPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  water_level_cm: number;
  status: string;
  rainfall_mm: number;
  trend: string;
  desc: string;
  last_updated: string;
}

export interface SummaryData {
  total_points: number;
  flood_zones_active: number;
  total_affected_areas: number;
  evacuated_people: number;
  forecast_confidence: number;
}
