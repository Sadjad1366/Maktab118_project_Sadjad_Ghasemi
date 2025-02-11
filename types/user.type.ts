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
  __v?:number
}

export interface IUserLoginReq {
  username: string;
  password: string;
}

export interface IUserLoginRes {
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
      refreshToken: string;
    };
  };
}

export interface IUserSignupReq {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  confirmPassword?: string;
  phoneNumber: string;
  address: string;
}
export interface IUserSignupRes {
  status: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
  data: {
    user: {
      firstname: string;
      lastname: string;
      username: string;
      password: string;
      confirmPassword?: string;
      phoneNumber: string;
      address: string;
      role: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
      refreshToken: string;
    };
  };
}

export interface IUserByIdRes {
  status: string;
  data: {
    user: {
      _id: string;
      firstname: string;
      lastname: string;
      username: string;
      phoneNumber: string;
      address: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      deliveryDate?:string;
      __v: number;
    };
  };
}

export interface IUserPayment {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: string;
  deliveryDate: string;
}
