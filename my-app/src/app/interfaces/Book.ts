export interface IBook {
  id: string;
  name: string;
  price: number;
  description: string;
  coverImage: string;
  updateAt: string;
  createAt: string;
  quantityStock: number;
  cdCode: string;
  publisherCode: string;
}

export class Book {
  constructor(
    public id: string = '',
    public name: string = '',
    public price: number = 0,
    public description: string = '',
    public coverImage: string = '',
    public updateAt: string = '',
    public createAt: string = '',
    public quantityStock: number = 0,
    public cdCode: string = '',
    public publisherCode: string = ''
  ) {}
}
