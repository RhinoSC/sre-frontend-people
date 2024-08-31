export interface DonationWithoutBidDetails {
  id: string;
  name: string;
  email: string;
  time_mili: number;
  amount: number;
  description: string;
  to_bid: boolean;
  event_id: string;
}

export interface Donation {
  id: string;
  name: string;
  email: string;
  time_mili: number;
  amount: number;
  description: string;
  to_bid: boolean;
  event_id: string;
  bid_details: BidDetailsDonation;
  new_bid_details?: BidDetailsDonation;
}

export interface DonationDTO {
  name: string;
  email: string;
  time_mili: number;
  amount: number;
  description: string;
  to_bid: boolean;
  event_id: string;
  bid_details?: BidDetailsDonationDTO;
}

export interface BidDetailsDonation {
  bid_id: string;
  bidname: string;
  goal: number;
  current_amount: number;
  bid_description: string;
  type: string;
  create_new_options: boolean;
  run_id: string;
  option_id: string;
  option_name: string;
  option_amount: number;
}

export interface BidDetailsDonationDTO {
  bid_id: string;
  create_new_options: boolean;
  type: string;
  option_id?: string;
  option_name?: string;
}
