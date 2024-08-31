export interface Prize {
  id: string;
  name: string;
  description: string;
  url: string;
  min_amount: number;
  status: string;
  international_delivery: boolean;
  event_id: string;
}

export interface PrizeDTO {
  name: string;
  description: string;
  url: string;
  min_amount: number;
  status: string;
  international_delivery: boolean;
  event_id: string;
}
