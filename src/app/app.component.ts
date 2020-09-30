import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {Asset} from '@models/assets';

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
  usdtAsset: Asset;
  linkAsset: Asset;
  dotAsset: Asset;
  bnbAsset: Asset;
  bchAsset: Asset;
  zilAsset: Asset;
  snxAsset: Asset;
  ontAsset: Asset;
  atomAsset: Asset;
  nexAsset: Asset;

  lamboCollectibleAsset: Asset;
  toyotaYarisAsset: Asset;
  teslaCyberTruckAsset: Asset;
  JaguarFPaceAsset: Asset;
  rangeRoverSportAsset: Asset;
  kiaSeltosAsset: Asset;
  teslaModelXAsset: Asset;
  lamboghiniHuracanEvoAsset: Asset;


  constructor(private httpClient: HttpClient) {
    this.swthAsset = new Asset(0, 'swth');
    this.assetsToShow.push(this.swthAsset);
    this.swthAsset.value = 500000;
    this.swthAsset.coingeckoname = 'switcheo';
    this.swthAsset.logo = 'switcheo';

    this.btcAsset = new Asset(0, 'btc');
    this.assetsToShow.push(this.btcAsset);
    this.btcAsset.coingeckoname = 'bitcoin';
    this.btcAsset.logo = 'bitcoin';

    this.ethAsset = new Asset(0, 'eth');
    this.assetsToShow.push(this.ethAsset);
    this.ethAsset.coingeckoname = 'ethereum';
    this.ethAsset.logo = 'ethereum';

    this.neoAsset = new Asset(0, 'neo');
    this.assetsToShow.push(this.neoAsset);
    this.neoAsset.coingeckoname = 'neo';
    this.neoAsset.logo = 'neo';

    this.usdtAsset = new Asset(0, 'usdt');
    this.assetsToShow.push(this.usdtAsset);
    this.usdtAsset.coingeckoname = 'tether';
    this.usdtAsset.logo = 'tether';

    this.lamboCollectibleAsset = new Asset(830, 'Lamborghini Aventador SVJ collectible');
    this.assetsToShow.push(this.lamboCollectibleAsset);
    this.lamboCollectibleAsset.logo = 'collectible';

    this.kiaSeltosAsset = new Asset(24190, 'Kia Seltos');
    this.assetsToShow.push(this.kiaSeltosAsset);
    this.kiaSeltosAsset.logo = 'seltos';

    this.teslaCyberTruckAsset = new Asset(43890, 'Tesla Cybertruck');
    this.assetsToShow.push(this.teslaCyberTruckAsset);
    this.teslaCyberTruckAsset.logo = 'cybertruck';

    this.lamboghiniHuracanEvoAsset = new Asset(232730, 'Lamborghini Huracan EVO');
    this.assetsToShow.push(this.lamboghiniHuracanEvoAsset);
    this.lamboghiniHuracanEvoAsset.logo = 'huracan';

    this.toyotaYarisAsset = new Asset(17220, 'Toyota Yaris');
    this.remainingAssets.push(this.toyotaYarisAsset);
    this.toyotaYarisAsset.logo = 'yaris';

    this.JaguarFPaceAsset = new Asset(49720, 'Jaguar F-PACE');
    this.remainingAssets.push(this.JaguarFPaceAsset);
    this.JaguarFPaceAsset.logo = 'epace';

    this.rangeRoverSportAsset = new Asset(76450, 'Range Rover Sport');
    this.remainingAssets.push(this.rangeRoverSportAsset);
    this.rangeRoverSportAsset.logo = 'rangeSport';

    this.teslaModelXAsset = new Asset(87890, 'Tesla Model X');
    this.remainingAssets.push(this.teslaModelXAsset);
    this.teslaModelXAsset.logo = 'teslaX';


    this.bnbAsset = new Asset(0, 'bnb');
    this.remainingAssets.push(this.bnbAsset);
    this.bnbAsset.coingeckoname = 'binancecoin';
    this.bnbAsset.logo = 'binancecoin';


    this.zilAsset = new Asset(0, 'zil');
    this.remainingAssets.push(this.zilAsset);
    this.zilAsset.coingeckoname = 'zilliqa';
    this.zilAsset.logo = 'zilliqa';

    this.ontAsset = new Asset(0, 'ont');
    this.remainingAssets.push(this.ontAsset);
    this.ontAsset.coingeckoname = 'ontology';
    this.ontAsset.logo = 'ontology';

    this.snxAsset = new Asset(0, 'snx');
    this.remainingAssets.push(this.snxAsset);
    this.snxAsset.coingeckoname = 'havven';
    this.snxAsset.logo = 'havven';

    this.atomAsset = new Asset(0, 'atom');
    this.remainingAssets.push(this.atomAsset);
    this.atomAsset.coingeckoname = 'cosmos';
    this.atomAsset.logo = 'cosmos';

    this.dotAsset = new Asset(0, 'dot');
    this.remainingAssets.push(this.dotAsset);
    this.dotAsset.coingeckoname = 'polkadot';
    this.dotAsset.logo = 'polkadot';

    this.nexAsset = new Asset(0, 'nex');
    this.remainingAssets.push(this.nexAsset);
    this.nexAsset.coingeckoname = 'neon-exchange';
    this.nexAsset.logo = 'neon-exchange';

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

  drop(event: CdkDragDrop<Asset[]>) {
    moveItemInArray(this.assetsToShow, event.previousIndex, event.currentIndex);
  }


}
