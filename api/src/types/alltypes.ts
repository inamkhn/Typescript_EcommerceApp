export interface NewUserRequestBody {
  name: string;
  email: string;
  photo: string;
  gender: string;
  password: string;
  _id: string;
  dob: Date;
}

export interface LoginUserRequestBody {
  email: string;
  password: string;
}

export interface NewProductRequestBody {
  name: string;
  price: number;
  photo: string;
  stock: number;
  category: string;
}

export interface getallProduct {
  price: number;
  sort:string
  search:string
  category: string;
}

export interface updatedProductRequestBody {
  name: string;
  price: number;
  photo: string;
  stock: number;
  category: string;
  createdAt: Date; 
  updatedAt: Date;
}

export type OrderItemType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
};

export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
};


export interface NewOrderRequestBody {
  shippingInfo: ShippingInfoType;
  user: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  orderItems: OrderItemType[];
}


export interface newCpuponCode{
  code:string
  amount:number
}