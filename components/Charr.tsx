"use client";
import { useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

interface Props {
  labels: string[];
  title: string;
  data: number[];
}

const ChartComponent = ({ data, labels, title }: Props) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.width = 400;
      chartRef.current.height = 300;
      const chartInstance = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: title,
              data: data,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              type: "linear",
              beginAtZero: true,
            },
          },
        },
      });
      return () => {
        chartInstance.destroy();
      };
    }
  }, [data, labels, title]);

  return <div>
  <canvas
    ref={chartRef}
  />
</div>;
};

export default ChartComponent;
