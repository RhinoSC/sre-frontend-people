export interface Bid {
  id: string;
  bidname: string;
  goal: number;
  current_amount: number;
  description: string;
  type: string;
  create_new_options: boolean;
  status: string;
  bid_options: BidOption[];
  run_id: string;
}

export interface BidDTO {
  id?: string;
  bidname: string;
  goal: number;
  current_amount: number;
  description: string;
  type: string;
  create_new_options: boolean;
  status: string;
  bid_options: BidOption[];
  run_id?: string;
}

export interface BidOption {
  id: string;
  name: string;
  current_amount: number;
}