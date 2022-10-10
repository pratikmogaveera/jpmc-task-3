import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number, // Price of stock ABD (ask + bid ) / 2
  price_def: number, // Price of stock DEF (ask + bid ) / 2
  ratio: number, // Ratio of price of stock ABD and DEF
  upperbound: number,
  lowerbound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row{
    const price_abc = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const price_def = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = price_abc / price_def
    const upperbound = 1 + 0.04
    const lowerbound = 1 - 0.04
    return{
        price_abc: price_abc,
        price_def: price_def,
        ratio: ratio,
        upperbound: upperbound,
        lowerbound: lowerbound,
        trigger_alert: (ratio > upperbound || ratio < lowerbound) ? ratio : undefined,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      };
    }
  }
