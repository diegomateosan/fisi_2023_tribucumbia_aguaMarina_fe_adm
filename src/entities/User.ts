export interface UserDefault {

 
      id: number;
      name: string;
      lastname: string;
      email: string;
      gender : string;
      dni: string;
      phone_number:string ;
      password: string;
      id_profile: string;

}



export interface UserState {
      state: UserDefault;
    }
    