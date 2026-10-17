export interface Feature {
  id: string;
  label: string;
  default: boolean;
}

export interface Site {
  id: string;
  label: string;
  features: Feature[];
}
