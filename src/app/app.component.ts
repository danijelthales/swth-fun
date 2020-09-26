import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Asset } from '@models/assets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'swth-fun';

  assetsToShow: Asset[] = new Array();
  remainingAssets: Asset[] = new Array();

  swthAsset: Asset;
  btcAsset: Asset;
  ethAsset: Asset;
  neoAsset: Asset;
  linkAsset: Asset;
  dotAsset: Asset;
  bnbAsset: Asset;
  bchAsset: Asset;

  lamboCollectibleAsset: Asset;
  toyotaYarisAsset: Asset;
  teslaAsset: Asset;

  constructor(private httpClient: HttpClient) {
    this.swthAsset = new Asset(0, 'swth');
    this.assetsToShow.push(this.swthAsset);
    this.swthAsset.value = 500000;
    this.swthAsset.coingeckoname = 'switcheo';

    this.btcAsset = new Asset(0, 'btc');
    this.assetsToShow.push(this.btcAsset);
    this.btcAsset.coingeckoname = 'bitcoin';

    this.ethAsset = new Asset(0, 'eth');
    this.assetsToShow.push(this.ethAsset);
    this.ethAsset.coingeckoname = 'ethereum';

    this.neoAsset = new Asset(0, 'neo');
    this.assetsToShow.push(this.neoAsset);
    this.neoAsset.coingeckoname = 'neo';

    this.lamboCollectibleAsset = new Asset(748, 'Lamborghini Aventador SVJ collectible');
    this.assetsToShow.push(this.lamboCollectibleAsset);
    this.toyotaYarisAsset = new Asset(15650, 'Toyota Yaris');
    this.assetsToShow.push(this.toyotaYarisAsset);
    this.teslaAsset = new Asset(39900, 'Tesla Cybertruck');
    this.assetsToShow.push(this.teslaAsset);

    this.linkAsset = new Asset(0, 'link');
    this.remainingAssets.push(this.linkAsset);
    this.linkAsset.coingeckoname = 'link';

    this.dotAsset = new Asset(0, 'dot');
    this.remainingAssets.push(this.dotAsset);
    this.dotAsset.coingeckoname = 'polkadot';


    this.bnbAsset = new Asset(0, 'bnb');
    this.remainingAssets.push(this.bnbAsset);
    this.bnbAsset.coingeckoname = 'binancecoin';

    this.bchAsset = new Asset(0, 'bch');
    this.remainingAssets.push(this.bchAsset);
    this.bchAsset.coingeckoname = 'bitcoin-cash';

    this.getPrices();

    setInterval(this.getPrices, 1000 * 60);

  }

  public getPrices() {

    this.assetsToShow.forEach(a => {
      if (a.coingeckoname) {
        this.httpClient.get('https://api.coingecko.com/api/v3/coins/' + a.coingeckoname)
          .subscribe((data: object) => {
            const result = JSON.parse(JSON.stringify(data));
            a.price = result.market_data.current_price.usd;
            this.calculateValues(this.swthAsset, null);
          });
      }
    });

    this.remainingAssets.forEach(a => {
      if (a.coingeckoname) {
        this.httpClient.get('https://api.coingecko.com/api/v3/coins/' + a.coingeckoname)
          .subscribe((data: object) => {
            const result = JSON.parse(JSON.stringify(data));
            a.price = result.market_data.current_price.usd;
            this.calculateValues(this.swthAsset, null);
          });
      }
    });

  }


  public calculateValues(asset: Asset, event) {
    if (event == null) {
      this.assetsToShow.forEach(a => {
        if (a !== asset) {
          a.value = asset.value * asset.price / a.price;
        }
      });
      this.remainingAssets.forEach(a => {
        if (a !== asset) {
          a.value = asset.value * asset.price / a.price;
        }
      });
    } else {
      const val = event.srcElement.value * 1.0;
      asset.value = val;

      this.assetsToShow.forEach(a => {
        if (a !== asset) {
          a.value = asset.value * asset.price / a.price;
        }
      });
      this.remainingAssets.forEach(a => {
        if (a !== asset) {
          a.value = asset.value * asset.price / a.price;
        }
      });

    }
  }

  public addAsset(event) {
    const name = event.target.value;
    this.remainingAssets.forEach(a => {
      if (a.name === name) {
        this.assetsToShow.push(a);
      }
    });
    this.remainingAssets = this.remainingAssets.filter(el => {
      return el.name !== name;
    });

  }

  public removeAsset(asset: Asset) {
    this.assetsToShow = this.assetsToShow.filter(el => {
      return el.name !== asset.name;
    });
    this.remainingAssets.push(asset);
  }


}