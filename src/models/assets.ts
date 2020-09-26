export class Asset {
    price: number;
    name: string;
    value: number;
    coingeckoname: string;

    constructor(price: number, name: string) {
        this.price = price;
        this.name = name;
    }
}
