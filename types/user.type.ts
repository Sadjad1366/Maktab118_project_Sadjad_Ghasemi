export interface IAdminReq {
  username: string;
  password: string;
}

export interface IAdminRes {
  status: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
  data: {
    user: {
      _id: string;
      firstname: string;
      lastname: string;
      username: string;
      password: string;
      phoneNumber: string;
      address: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      __v: 0;
      refreshToken: string
    };
  };
}

export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserByIdRes{
   "status": string,
"data": {
    "user": {
        "_id": string,
        "firstname":string,
        "lastname":string,
        "username": string,
        "phoneNumber": string,
        "address":string,
        "role":string,
        "createdAt": string,
        "updatedAt":string,
        "__v": number
    }
  }}
