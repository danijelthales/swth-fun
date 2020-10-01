export class Asset {
  price: number;
  name: string;
  show: boolean;
  logo: string;
  coingeckoname?: string;
  value?: number;
  newname?: string;

  constructor(price: number, name: string) {
    this.price = price;
    this.name = name;
  }
}
