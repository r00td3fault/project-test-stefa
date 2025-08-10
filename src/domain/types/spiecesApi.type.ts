export type speciesApiType = {
  message: string;
  total_records: number;
  total_pages: number;
  previous: any;
  next: any;
  results: resultSpeciesApi[];
  apiVersion: string;
  timestamp: string;
  support: Support;
  social: Social;
}

export type resultSpeciesApi = {
  uid: string;
  name: string;
  url: string;
}

type Support = {
  contact: string;
  donate: string;
  partnerDiscounts: PartnerDiscounts;
}

type PartnerDiscounts = {
  saberMasters: SaberMasters;
  heartMath: HeartMath;
}

type SaberMasters = {
  link: string;
  details: string;
}

type HeartMath = {
  link: string;
  details: string;
}

type Social = {
  discord: string;
  reddit: string;
  github: string;
}