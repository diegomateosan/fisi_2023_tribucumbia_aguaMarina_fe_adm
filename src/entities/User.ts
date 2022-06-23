export interface UserDefault {
  success: boolean;
  message: string;
  data: [
    {
      id: number;
      name: string;
      email: string;
      password: string;
    }
  ];
  statusCode: number;
}
