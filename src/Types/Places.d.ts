export type TPlace = {
  description: string;
  place_id: string;
};

export type TLocation = TPlace & {
  latitude: number;
  longitude: number;
};
