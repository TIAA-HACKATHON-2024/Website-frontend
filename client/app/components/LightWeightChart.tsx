"use client";
import React, { useEffect, useRef } from "react";
import {
  createChart,
  LineData,
  ISeriesApi,
  LineSeriesOptions,
} from "lightweight-charts";
import axios from "axios";

const LightweightChart: React.FC<{ predictions: any }> = ({ predictions }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<ReturnType<typeof createChart> | null>(null);
  const lineSeriesPredictedRef = useRef<ISeriesApi<"Line"> | null>(null);
  const lineSeriesEqualRef = useRef<ISeriesApi<"Line"> | null>(null);

  useEffect(() => {
    const fetchData = async (predictions: any) => {
      try {
        const jsonData = {
          predictions: predictions,
        };

        console.log("jsondata: ", jsonData);

        const response = await axios.post(
          "https://predictweights.azurewebsites.net/api/predictweights/forecasting",
          jsonData
        );
        const data = response.data;

        console.log(data);

        const predictedData: LineData[] = Object.keys(data.Predicted).map(
          (date) => ({
            time: date,
            value: data.Predicted[date],
          })
        );

        const equalData: LineData[] = Object.keys(data.Equal).map((date) => ({
          time: date,
          value: data.Equal[date],
        }));

        if (chartContainerRef.current) {
          if (!chartInstanceRef.current) {
            chartInstanceRef.current = createChart(chartContainerRef.current, {
              width: chartContainerRef.current.clientWidth,
              height: 400,
            });

            // Create the first line series for Predicted
            lineSeriesPredictedRef.current =
              chartInstanceRef.current.addLineSeries({ color: "blue" });
            lineSeriesPredictedRef.current.setData(predictedData);

            // Create the second line series for Equal
            lineSeriesEqualRef.current = chartInstanceRef.current.addLineSeries(
              { color: "red" }
            );
            lineSeriesEqualRef.current.setData(equalData);

            const handleResize = () => {
              chartInstanceRef.current?.applyOptions({
                width: chartContainerRef.current?.clientWidth || 0,
              });
            };

            window.addEventListener("resize", handleResize);

            return () => {
              chartInstanceRef.current?.remove();
              chartInstanceRef.current = null;
              window.removeEventListener("resize", handleResize);
            };
          } else {
            // If chart already exists, update the data
            lineSeriesPredictedRef.current?.setData(predictedData);
            lineSeriesEqualRef.current?.setData(equalData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData(predictions);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        ref={chartContainerRef}
        style={{ width: "100%", maxWidth: "1200px" }}
      />
    </div>
  );
};

export default LightweightChart;
