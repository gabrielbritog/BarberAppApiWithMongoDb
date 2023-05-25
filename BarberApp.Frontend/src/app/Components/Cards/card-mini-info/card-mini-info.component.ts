import { Component, Input } from '@angular/core';
import { CardMiniInfoModel } from './card-mini-info-model';

@Component({
  selector: 'app-card-mini-info',
  templateUrl: './card-mini-info.component.html',
  styleUrls: ['./card-mini-info.component.scss']
})
export class CardMiniInfoComponent {
  @Input() infos: CardMiniInfoModel[] = [];

  getComparedValue(info: CardMiniInfoModel) {

    if (!info.compareValue)
      return 0;

    if (!info.showAsPercentage)
      return info.currentValue - info.compareValue;

    const changedPercentage = info.currentValue * 100 / info.compareValue;

    return info.currentValue > info.compareValue ? changedPercentage : -changedPercentage;
  }

  getAbsValue(info: CardMiniInfoModel) {
    const absValue = Math.abs(this.getComparedValue(info));
    return Math.round(absValue);
  }

  formatToMoney(value: number | string) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
