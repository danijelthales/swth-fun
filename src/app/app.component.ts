import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { assets } from '@data/assets.data';
import { Asset } from '@models/assets';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'swth-fun';

  disclaimer =
    'The figures shown on Swthla are mid-market rates (updated every minute), which are for information purposes only. Rates for actual transactions may vary, hence these rates are not intended to be used for investment purposes. Car prices are for reference only and may vary by region. The product names, logos, and brands are property of their respective owners.';

  assets: Asset[] = new Array();
  swthAsset: Asset;

  constructor(private httpClient: HttpClient) {
    this.assets = assets;
    this.swthAsset = assets[0];
    this.getPrices(this.assets);
    const source = interval(1000 * 60);
    source.subscribe((val) => this.getPrices(this.assets));
  }

  public getPrices(assets) {
    assets.forEach((a) => {
      if (a.coingeckoname) {
        this.httpClient
          .get('https://api.coingecko.com/api/v3/coins/' + a.coingeckoname)
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
      this.assets.forEach((a) => {
        if (a !== asset) {
          a.value = (asset.value * asset.price) / a.price;
        }
      });
    } else {
      const val = event.srcElement.value * 1.0;
      asset.value = val;

      this.assets.forEach((a) => {
        if (a !== asset) {
          a.value = (asset.value * asset.price) / a.price;
        }
      });
    }
  }

  public addAsset(event: any) {
    const name = event.target.value;
    this.assets.forEach((a) => {
      if (a.name === name) {
        a.show = true;
      }
    });
  }

  public removeAsset(asset: Asset) {
    this.assets.forEach((a) => {
      if (a === asset) {
        a.show = false;
      }
    });
  }

  drop(event: CdkDragDrop<Asset[]>) {
    moveItemInArray(this.assets, event.previousIndex, event.currentIndex);
  }
}
