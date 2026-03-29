"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

type Props = {
    labels: string[];
    data: number[];
};

export default function RevenueChart({ labels, data }: Props) {
    const chartData = {
        labels,
        datasets: [
            {
                label: "Revenue",
                data,
                fill: true,
                tension: 0.4,
                borderColor: "#C1121F",
                backgroundColor: "rgba(193,18,31,0.08)",
                pointBackgroundColor: "#C1121F",
                pointRadius: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#9CA3AF", font: { size: 10 } },
            },
            y: {
                grid: { color: "#F1F5F9" },
                ticks: { color: "#9CA3AF", font: { size: 10 } },
            },
        },
    };

    return (
        <div className="w-full h-[180px]">
            <Line data={chartData} options={options} />
        </div>
    );
}