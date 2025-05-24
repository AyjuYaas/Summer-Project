import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { axiosInstance } from "../../../../lib/Axios";
import { useAdminStore } from "../../../../store/useAdminStore";

ChartJS.register(ArcElement, Tooltip, Legend);

// Define the shape of your API response
interface StatusData {
  status: string;
  percent: number;
}

const TherapistStatusChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<"doughnut"> | null>(
    null
  );

  const { pendingTherapists } = useAdminStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<StatusData[]>(
          "/admin/get-therapist/stats"
        );

        const labels = res.data.map(
          (item) => item.status.charAt(0).toUpperCase() + item.status.slice(1)
        );
        const values = res.data.map((item) => item.percent);

        const data: ChartData<"doughnut"> = {
          labels,
          datasets: [
            {
              label: "% of Therapists",
              data: values,
              backgroundColor: ["#4caf50", "#ffcb05", "#f44336"],
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data", error);
      }
    };

    fetchData();
  }, [pendingTherapists]);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div className="w-full max-w-100 m-auto flex flex-col gap-5 justify-end">
      <div className="text-end text-4xl flex flex-col text-main-text">
        <span className="font-light">Therapist </span>
        <span className="font-fancy">Validation Status</span>
      </div>
      <Doughnut data={chartData} />
    </div>
  );
};

export default TherapistStatusChart;
