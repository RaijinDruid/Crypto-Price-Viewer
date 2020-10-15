import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CandleStickGraph from "../charts/candlestick";
import Loader from "../loader";
import _ from "lodash";
import Sidebar from "../sidebar";
import Coinbar from "../coinbar";
import Dropdown from "../dropdown";
import { getCandlestickData, getSymbols } from "../../api";
import SymbolSearch from "../symbolSearch";
import Button from "../button";
import Slider from "../slider";
import CustomSelect from "../select";

const Dashboard = () => {
  const [allSymbols, setAllSymbols] = useState([]);
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [interval, setDataInterval] = useState("1h");
  const [candleData, setCandleData] = useState({});
  const [loadedOnce, setLoadedOnce] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [confidence, setConfidence] = useState(0);
  const [user, setUser] = useState({ name: "Luke" });

  //hardcoded intervals couldn't find where to pull these from the API
  const INTERVALS = [["1m", "3m", "5m", "15m", "30m"], ["1h", "2h", "4h", "6h", "8h", "12h"], ["1d", "3d"], ["1w"], ["1M"]];
  const MODELS = [
    { value: "Ascending Triangle", label: "Ascending Triangle" },
    { value: "Channel Up", label: "Channel Up" },
    { value: "Channel Down", label: "Channel Down" },
    { value: "Channel Down2", label: "Channel Down2" },
    { value: "Channel Down3", label: "Channel Down3" },
    { value: "Channel Down4", label: "Channel Down4" },
    { value: "Channel Down5", label: "Channel Down5" },
  ];

  const loadBinanceData = async () => {
    setLoading(true);
    const candlestickData = await getCandlestickData(symbol, interval);
    const symbols = await getSymbols();
    setAllSymbols(symbols);
    setData(candlestickData);
    setLoading(false);
    setLoadedOnce(true);
  };

  /**
   * Custom method to set data, with very primitive caching for the session.
   * Used to reduce API calls whilst in DEV.
   **/
  const setData = (data) => {
    let temp = candleData;
    if (symbol in temp && !(interval in temp[symbol])) {
      temp[symbol][interval] = data;
    } else {
      let intervalData = { [symbol]: { [interval]: data } };
      temp = { ...temp, ...intervalData };
    }
    setCandleData(temp);
  };

  useEffect(() => {
    loadBinanceData();
  }, [symbol, interval]);

  return (
    <StyledDashboard>
      <div className='dashboard__wrapper'>
        <Sidebar isLoggedIn={isLoggedIn} user={user} setIsLoggedIn={setIsLoggedIn} />
        <div className='content'>
          {loadedOnce && !_.isEmpty(candleData) && (
            <>
              {symbol && (
                <>
                  <h1>{symbol}</h1>
                  <div className='component'>
                    <Coinbar symbol={symbol} />
                  </div>
                </>
              )}

              <div className='component graph'>
                <div className='intervals'>
                  <p>Interval:</p>
                  {INTERVALS &&
                    INTERVALS.map((intervals, index) => (
                      <Dropdown
                        defaultOption={intervals[0]}
                        list={intervals}
                        click={setDataInterval}
                        currentActive={interval}
                        key={`${intervals[0]}--${index}`}
                      />
                    ))}
                </div>
                {!loading && candleData[symbol] && candleData[symbol][interval] && <CandleStickGraph data={candleData[symbol][interval]} />}
                {loading && (
                  <div className='loader'>
                    <Loader />
                  </div>
                )}
              </div>
              <div className='component ai'>
                <div>
                  {MODELS && <CustomSelect options={MODELS} />}
                  <Slider data={confidence} setData={setConfidence} />
                </div>
                <div className='buttons'>
                  <Button text={"Train"} />
                  <Button text={"Deploy"} primary={true} />
                </div>
              </div>
            </>
          )}
          {!loadedOnce && <Loader fullHeight={true} message={`Loading ${symbol} data`} />}
        </div>
        <SymbolSearch symbols={allSymbols} currentSymbol={symbol} setSymbol={setSymbol} />
      </div>
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  background-color: ${(props) => props.theme.colors.dark0};
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  h1 {
    text-align: left;
    margin-right: auto;
    color: ${(props) => props.theme.colors.primary};
  }
  p,
  a {
    margin: 0;
    color: ${(props) => props.theme.colors.lightest};
  }
  .white {
    color: ${(props) => props.theme.colors.lightest};
  }
  .component {
    background-color: ${(props) => props.theme.colors.dark1};
    width: calc(100% - 40px);
    padding: 10px 20px;
    margin-bottom: 2px;
    &.graph {
      min-height: 442px;
      padding: 20px;
      .loader {
        width: 100%;
        min-height: 442px;
        display: flex;
        align-items: center;
      }
    }
  }
  .dashboard__wrapper {
    display: inline-flex;
    width: 100%;
    justify-content: flex-start;
  }
  .content {
    display: flex;
    width: 83.333%;
    max-width: 888px;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
  }
  .intervals {
    display: inline-flex;
    align-items: center;
    margin-bottom: 20px;
    p {
      margin-right: 20px;
    }
  }
  .ai {
    display: inline-flex;
    justify-content: center;
    padding: 20px 50px;
    width: calc(100% - 100px);
    & > div {
      margin: 0px 30px;
    }
    .buttons {
      display: flex;
      flex-direction: column;
    }
    .model-selector {
    }
  }
`;
export default Dashboard;
