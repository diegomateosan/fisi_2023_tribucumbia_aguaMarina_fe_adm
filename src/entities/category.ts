import internal from "stream";

export interface Category {
  success: boolean;
  message: string;
  data: [
    {
      id: number;
      name: string;
      description: string;
      image_url: string;
    }
  ];
  statusCode: number;
}
