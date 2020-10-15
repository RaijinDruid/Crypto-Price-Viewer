import React, { useRef, useEffect } from "react";
import { createChart } from "lightweight-charts";
import { theme } from "../../../theme";

const CandleStickGraph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = createChart(chartRef.current, {
        width: 848,
        height: 442,
      });
      const candleSeries = chart.addCandlestickSeries({
        wickUpColor: "#00943f",
        upColor: "#59FFA0",
      });
      chart.applyOptions({
        layout: {
          backgroundColor: theme.colors.dark1,
          textColor: "#fff",
          fontSize: 12,
          fontFamily: "'Trebuchet MS', Roboto, Ubuntu, sans-serif",
        },
        timeScale: {
          rightOffset: 3,
          barSpacing: 10,
          fixLeftEdge: true,
          visible: true,
          timeVisible: true,
          secondsVisible: true,
        },
        priceScale: {
          position: "right",
        },
      });
      candleSeries.setData(data);
    }
  }, [data]);

  return <div ref={chartRef} />;
};

export default CandleStickGraph;
