import UTIL from "../util";
import axios from "axios";
import _ from "lodash";

// const binanceUrl = "https://binance.com/api/v3";
const binanceUrl = "/api";
const headers = { "Access-Control-Allow-Origin": "*" };
const getCandlestickData = async (symbol, interval) => {
  const labelData = (data, labels) => {
    return data.map((item) => {
      let data = _.zipObject(labels, item);
      //convert to UNIX timestmp
      data["time"] = data["time"] / 1000;
      return data;
    });
  };
  const binanceCandlesticks = await axios.get(`${binanceUrl}/klines?symbol=${symbol}&interval=${interval}&limit=1000`, { headers: headers });
  const binanceLabels = ["time", "open", "high", "low", "close", "volume", "closeTime", "quote", "noTrades", "base", "asset", "ignore"];
  const labelledData = labelData(binanceCandlesticks.data, binanceLabels);
  return labelledData;
};

/** Get the data for the coin/symbol bar above the chart for information such as:
 * -current price
 * 24 hour % change
 * 24 hour high
 * 24 hour trading volume
 **/
const getCoinData = async (symbol) => {
  let avgPrice = await axios.get(`${binanceUrl}/avgPrice?symbol=${symbol}`);
  avgPrice = UTIL.formatCurrency(avgPrice.data.price, avgPrice.data.price.length);
  let dailyData = await axios.get(`${binanceUrl}/ticker/24hr?symbol=${symbol}`);
  dailyData = dailyData.data;

  //Format the data into a more human readabe format
  dailyData.highPrice = UTIL.formatCurrency(dailyData.highPrice);
  dailyData.quoteVolume = UTIL.formatCurrency(dailyData.quoteVolume, 4);

  return { highPrice: dailyData.highPrice, avgPrice: avgPrice, quoteVolume: dailyData.quoteVolume, priceChangePercent: dailyData.priceChangePercent };
};

//Get list of symbols from Binance API
const getSymbols = async () => {
  const exchangeInfo = await axios.get(`${binanceUrl}/exchangeInfo`);
  let symbols = exchangeInfo.data.symbols.map((symbol) => symbol.symbol);
  return symbols;
};
export { getCoinData, getSymbols, getCandlestickData };
