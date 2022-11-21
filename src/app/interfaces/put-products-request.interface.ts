import { ICategory } from "./category.interface"
import { IOwner } from "./owner.interface"

export interface IPutProductsRequest {
    description: string,
    dueDate: number,
    id: number,
    name: string,
    quantity: number,
    amount: number,
    status: string,
    owner: IOwner
    category: ICategory,
  }