import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCoinData } from "../../api";
const Coinbar = ({ symbol }) => {
  const [change, setChange] = useState(null);
  const [changeIsPositive, setChangeIsPositive] = useState(true);
  const [avgPrice, setAvgPrice] = useState(null);
  const [highPrice, setHighPrice] = useState(null);
  const [volume, setVolume] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const symbolData = async () => {
    setLoaded(false);
    const symbolData = await getCoinData(symbol);
    let { priceChangePercent, avgPrice, highPrice, quoteVolume } = symbolData;

    if (priceChangePercent.includes("-")) {
      setChangeIsPositive(false);
    }
    setChange(priceChangePercent);
    setAvgPrice(avgPrice);
    setHighPrice(highPrice);
    setVolume(quoteVolume);
    setLoaded(true);
  };

  useEffect(() => {
    symbolData();
  }, [symbol]);

  return (
    <StyledCoinbar>
      <div className='col'>
        <p className='label'>Price</p>
        <p className='value price'>
          {loaded && <span className='symbol mr'>$</span>}
          {loaded && avgPrice}
        </p>
      </div>
      <div className='col'>
        <p className='label'>% (24h)</p>
        {change && (
          <p className='center-vertical value'>
            <span className={changeIsPositive ? "positive" : "negative"}>
              <span className='symbol'>{changeIsPositive ? "+" : ""}</span>
              {loaded && change}
              {loaded && <span className='symbol'>%</span>}
            </span>
          </p>
        )}
      </div>
      <div className='col'>
        <p className='label'>High (24h)</p>
        {highPrice && <p className='center-vertical value'>{loaded && <span className='symbol mr'>${highPrice}</span>}</p>}
      </div>
      <div className='col'>
        <p className='label'>Volume (24h)</p>
        {volume && loaded && <p className='center-vertical value'>{volume}</p>}
      </div>
    </StyledCoinbar>
  );
};

const StyledCoinbar = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  p {
    &.center-vertical {
      display: inline-flex;
      align-items: center;
    }
  }
  .positive {
    color: ${(props) => props.theme.colors.positive};
  }
  .negative {
    color: ${(props) => props.theme.colors.negative};
  }
  .symbol {
    &.mr {
      margin-right: 5px;
    }
  }
  .label {
    color: ${(props) => props.theme.colors.lightGrey};
    margin: 0;
    margin-bottom: 10px;
    font-size: 14px;
  }
  .value {
    font-size: 18px;
    font-weight: bold;
    &.price {
      font-size: 22px;
    }
  }
  .col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px 30px 10px 0px;
    min-height: 53px;
  }
`;

export default Coinbar;
