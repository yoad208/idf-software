export interface IGov {
  id?: string | undefined;
  gov_name: string;
  gov_place: string;
  place_description: string;
  location: {
    lat: number;
    lang: number;
  };
  fiber_type: string;
  fiber_len_UP: number;
  fiber_len_DOWN: number;
}
