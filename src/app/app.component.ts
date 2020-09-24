import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'swth-fun';

  assets: Asset[] = new Array();

  swthAsset: Asset;
  btcAsset: Asset;
  ethAsset: Asset;
  neoAsset: Asset;
  lamboCollectibleAsset: Asset;
  toyotaYarisAsset: Asset;
  teslaAsset: Asset;

  constructor(private httpClient: HttpClient) {
    this.swthAsset = new Asset('0', 'swth');
    this.assets.push(this.swthAsset);
    this.swthAsset.value = 500000;
    this.btcAsset = new Asset('0', 'btc');
    this.assets.push(this.btcAsset);
    this.ethAsset = new Asset('0', 'eth');
    this.assets.push(this.ethAsset);
    this.neoAsset = new Asset('0', 'neo');
    this.assets.push(this.neoAsset);
    this.lamboCollectibleAsset = new Asset('748', 'Lamborghini Aventador SVJ collectible');
    this.assets.push(this.lamboCollectibleAsset);
    this.toyotaYarisAsset = new Asset('15650', 'Toyota Yaris');
    this.assets.push(this.toyotaYarisAsset);
    this.teslaAsset = new Asset('39900', 'Tesla Cybertruck');
    this.assets.push(this.teslaAsset);

    this.getPrices();

  }

  public getPrices() {


    this.httpClient.get('https://api.coingecko.com/api/v3/coins/switcheo')
      .subscribe((data: object) => {
        const result = JSON.parse(JSON.stringify(data));
        this.swthAsset.price = result.market_data.current_price.usd;
        this.httpClient.get('https://api.coingecko.com/api/v3/coins/bitcoin')
          .subscribe((databtc: string) => {
            const resultbtc = JSON.parse(JSON.stringify(databtc));
            this.btcAsset.price = resultbtc.market_data.current_price.usd;
            this.httpClient.get('https://api.coingecko.com/api/v3/coins/ethereum')
              .subscribe((dataeth: string) => {
                const resulteth = JSON.parse(JSON.stringify(dataeth));
                this.ethAsset.price = resulteth.market_data.current_price.usd;
                this.httpClient.get('https://api.coingecko.com/api/v3/coins/neo')
                  .subscribe((dataneo: string) => {
                    const resultneo = JSON.parse(JSON.stringify(dataneo));
                    this.neoAsset.price = resultneo.market_data.current_price.usd;
                    this.calculateValues(this.swthAsset, null);
                  });
              });
          });
      });


  }


  public calculateValues(asset: Asset, event) {
    if (event == null) {
      this.btcAsset.value = this.swthAsset.value * this.swthAsset.price / this.btcAsset.price;
      this.ethAsset.value = this.swthAsset.value * this.swthAsset.price / this.ethAsset.price;
      this.neoAsset.value = this.swthAsset.value * this.swthAsset.price / this.neoAsset.price;
      this.lamboCollectibleAsset.value = this.swthAsset.value * this.swthAsset.price / this.lamboCollectibleAsset.price;
      this.toyotaYarisAsset.value = this.swthAsset.value * this.swthAsset.price / this.toyotaYarisAsset.price;
      this.teslaAsset.value = this.swthAsset.value * this.swthAsset.price / this.teslaAsset.price;
    } else {
      const val = event.srcElement.value * 1.0;
      asset.value = val;
      if (asset !== this.swthAsset) {
        this.swthAsset.value = asset.value / asset.price / this.swthAsset.price;
      }
      if (asset !== this.ethAsset) {
        this.ethAsset.value = this.swthAsset.value * this.swthAsset.price / this.ethAsset.price;
      }

      if (asset !== this.neoAsset) {
        this.neoAsset.value = this.swthAsset.value * this.swthAsset.price / this.neoAsset.price;
      }

      if (asset !== this.lamboCollectibleAsset) {
        this.lamboCollectibleAsset.value = this.swthAsset.value * this.swthAsset.price / this.lamboCollectibleAsset.price;
      }

      if (asset !== this.toyotaYarisAsset) {
        this.toyotaYarisAsset.value = this.swthAsset.value * this.swthAsset.price / this.toyotaYarisAsset.price;
      }

      if (asset !== this.teslaAsset) {
        this.teslaAsset.value = this.swthAsset.value * this.swthAsset.price / this.teslaAsset.price;
      }

    }
  }
}

class Asset {
  price: number;
  name: string;
  value: number;

  constructor(price, name) {
    this.price = price;
    this.name = name;
  }
}
