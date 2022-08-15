import internal from "stream";

export interface CategoryData {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

export interface CategoryState {
  state: CategoryData;
}
