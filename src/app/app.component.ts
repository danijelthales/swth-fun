import { CdkDragDrop } from '@angular/cdk/drag-drop';
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

  assetsToShow;
  remainingAssets;

  constructor(private httpClient: HttpClient) {
    this.assets = assets;
    this.assetsToShow = this.assets.filter((asset) => asset.show);
    this.remainingAssets = this.assets.filter((asset) => !asset.show);
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
      this.assetsToShow.forEach((a) => {
        if (a !== asset) {
          a.value = (asset.value * asset.price) / a.price;
        }
      });
      this.remainingAssets.forEach((a) => {
        if (a !== asset) {
          a.value = (asset.value * asset.price) / a.price;
        }
      });
    } else {
      const val = event.srcElement.value * 1.0;
      asset.value = val;

      this.assetsToShow.forEach((a) => {
        if (a !== asset) {
          a.value = (asset.value * asset.price) / a.price;
        }
      });
      this.remainingAssets.forEach((a) => {
        if (a !== asset) {
          a.value = (asset.value * asset.price) / a.price;
        }
      });
    }
  }

  public addAsset(event: any) {
    const name = event.target.value;
    this.remainingAssets.forEach((a, i) => {
      if (a.name === name) {
        this.remainingAssets.splice(i, 1);
        this.assetsToShow.push(a);
      }
    });
  }

  public removeAsset(asset: Asset) {
    this.assetsToShow.forEach((a, i) => {
      if (a === asset) {
        this.assetsToShow.splice(i, 1);
        this.remainingAssets.push(a);
      }
    });
  }

  drop(event: CdkDragDrop<Asset[]>) {
    this.assetsToShow = this.moveItem(
      this.assetsToShow,
      event.previousIndex,
      event.currentIndex
    );
  }

  private moveItem(
    array: Asset[],
    oldIndex: number,
    newIndex: number
  ): Asset[] {
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array; // for testing
  }
}
