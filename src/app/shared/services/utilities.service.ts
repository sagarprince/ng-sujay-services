import { Injectable } from '@angular/core';

import * as numberToWords from './numbersToWords';

@Injectable()
export class UtilitiesService {

  constructor() { }

  convertNumberToWords(amount: number): string {
    let amountStr = amount.toFixed(2);
    let amountParts = amountStr.split('.');
    let beforeDecimal = amountParts[0];
    let afterDeciaml = (amountParts.length === 2) ? amountParts[1] : -1;
    let wordString = numberToWords.toWords(beforeDecimal) + ' rupees ';
    if (afterDeciaml !== -1) {
      wordString += 'and ' + numberToWords.toWords(afterDeciaml) + ' paise';
    }
    return wordString;
  }

}
