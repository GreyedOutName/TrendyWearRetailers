"use client";

import { useMemo, useState } from "react";
import RevenueChart from "./components/RevenueChart";
import {
  FiBox,
  FiShoppingBag,
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
  FiArrowLeft,
} from "react-icons/fi";

type FilterMode = "last7days" | "month" | "year";
type MetricType = "products" | "orders" | "revenue" | "growth";

type TopBuyer = {
  id: number;
  name: string;
  company: string;
  orders: number;
  spent: string;
  avatar: string;
};

type AnalyticsModeData = {
  metrics: {
    totalProducts: { value: string; trend: string; note: string };
    totalOrders: { value: string; trend: string; note: string };
    totalRevenue: { value: string; trend: string; note: string };
    growthRate: { value: string; trend: string; note: string };
  };
  chartTitle: string;
  chartValue: string;
  chartChange: string;
  chartCaption: string;
  series: {
    revenue: number[];
    orders: number[];
    products: number[];
    growth: number[];
  };
  labels: string[];
  highlights: {
    bestPeriod: string;
    bestPeriodSub: string;
    bestYear: string;
    bestYearSub: string;
  };
  productBreakdown: { name: string; count: number }[];
  orderBreakdown: { label: string; value: string; sub: string }[];
  revenueBreakdown: { label: string; value: string; sub: string }[];
  growthBreakdown: { label: string; value: string; sub: string }[];
};

const filterOptions: { label: string; value: FilterMode }[] = [
  { label: "Last 7 Days", value: "last7days" },
  { label: "Month-by-Month", value: "month" },
  { label: "Year-on-Year", value: "year" },
];

const analyticsByMode: Record<FilterMode, AnalyticsModeData> = {
  last7days: {
    metrics: {
      totalProducts: { value: "1,247", trend: "+12%", note: "vs previous 7 days" },
      totalOrders: { value: "328", trend: "+8%", note: "vs previous 7 days" },
      totalRevenue: { value: "₱485K", trend: "+24%", note: "vs previous 7 days" },
      growthRate: { value: "15.2%", trend: "+3.5%", note: "weekly growth rate" },
    },
    chartTitle: "Sales Snapshot",
    chartValue: "₱485K",
    chartChange: "+24%",
    chartCaption: "Performance in the last 7 days",
    series: {
      revenue: [36, 52, 44, 68, 60, 74, 84],
      orders: [12, 20, 18, 30, 28, 35, 40],
      products: [5, 8, 10, 15, 18, 20, 22],
      growth: [2, 3, 4, 6, 5, 7, 8],
    },
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    highlights: {
      bestPeriod: "Saturday",
      bestPeriodSub: "Highest sales day",
      bestYear: "2025",
      bestYearSub: "Strongest annual run",
    },
    productBreakdown: [
      { name: "Button Down Shirt", count: 142 },
      { name: "Notched Collar Shirt", count: 126 },
      { name: "Graphic T-Shirt", count: 118 },
      { name: "The Modern Polo", count: 94 },
      { name: "Sleeveless Knit Top", count: 76 },
      { name: "Wide-Leg Trousers", count: 64 },
    ],
    orderBreakdown: [
      { label: "Completed Orders", value: "264", sub: "80.5% of all orders" },
      { label: "Pending Orders", value: "38", sub: "Awaiting fulfillment" },
      { label: "Cancelled Orders", value: "26", sub: "7.9% cancellation rate" },
    ],
    revenueBreakdown: [
      { label: "Gross Revenue", value: "₱485K", sub: "Total collected this period" },
      { label: "Average Order Value", value: "₱1,478", sub: "Per completed order" },
      { label: "Best Revenue Day", value: "Saturday", sub: "Highest earnings day" },
    ],
    growthBreakdown: [
      { label: "Growth Rate", value: "15.2%", sub: "Compared to previous 7 days" },
      { label: "Fastest Growth Day", value: "Thursday", sub: "Biggest upward jump" },
      { label: "Retention Lift", value: "+3.5%", sub: "Returning customer growth" },
    ],
  },
  month: {
    metrics: {
      totalProducts: { value: "1,247", trend: "+9%", note: "vs previous month" },
      totalOrders: { value: "1,964", trend: "+11%", note: "vs previous month" },
      totalRevenue: { value: "₱2.1M", trend: "+18%", note: "vs previous month" },
      growthRate: { value: "12.4%", trend: "+2.1%", note: "monthly growth rate" },
    },
    chartTitle: "Monthly Revenue",
    chartValue: "₱2.1M",
    chartChange: "+18%",
    chartCaption: "Performance this month",
    series: {
      revenue: [28, 36, 46, 50, 58, 61, 67, 69, 72, 76, 82, 88],
      orders: [110, 135, 158, 170, 184, 195, 210, 228, 240, 252, 266, 280],
      products: [44, 52, 60, 68, 72, 79, 83, 87, 95, 102, 109, 116],
      growth: [3, 4, 5, 6, 7, 8, 8, 9, 10, 11, 11, 12],
    },
    labels: ["W1", "W2", "W3", "W4"],
    highlights: {
      bestPeriod: "November",
      bestPeriodSub: "Top performing month",
      bestYear: "2025",
      bestYearSub: "Best yearly revenue",
    },
    productBreakdown: [
      { name: "Button Down Shirt", count: 428 },
      { name: "Notched Collar Shirt", count: 392 },
      { name: "Graphic T-Shirt", count: 364 },
      { name: "The Modern Polo", count: 310 },
      { name: "Sleeveless Knit Top", count: 228 },
      { name: "Wide-Leg Trousers", count: 196 },
    ],
    orderBreakdown: [
      { label: "Completed Orders", value: "1,642", sub: "83.6% fulfillment rate" },
      { label: "Pending Orders", value: "201", sub: "Processing this month" },
      { label: "Cancelled Orders", value: "121", sub: "6.1% cancellation rate" },
    ],
    revenueBreakdown: [
      { label: "Gross Revenue", value: "₱2.1M", sub: "Total collected this month" },
      { label: "Average Order Value", value: "₱1,284", sub: "Per completed order" },
      { label: "Best Revenue Week", value: "Week 4", sub: "Strongest closing week" },
    ],
    growthBreakdown: [
      { label: "Growth Rate", value: "12.4%", sub: "Compared to previous month" },
      { label: "Strongest Week", value: "Week 4", sub: "Best growth momentum" },
      { label: "Retention Lift", value: "+2.1%", sub: "Repeat buyer increase" },
    ],
  },
  year: {
    metrics: {
      totalProducts: { value: "1,247", trend: "+14%", note: "vs previous year" },
      totalOrders: { value: "18,420", trend: "+16%", note: "vs previous year" },
      totalRevenue: { value: "₱18.7M", trend: "+27%", note: "vs previous year" },
      growthRate: { value: "19.8%", trend: "+4.7%", note: "annual growth rate" },
    },
    chartTitle: "Yearly Revenue",
    chartValue: "₱18.7M",
    chartChange: "+27%",
    chartCaption: "Performance this year",
    series: {
      revenue: [20, 30, 38, 35, 52, 60, 58, 64, 76, 72, 88, 96],
      orders: [900, 980, 1060, 1120, 1240, 1320, 1410, 1490, 1620, 1710, 1840, 1960],
      products: [120, 132, 145, 158, 171, 184, 190, 201, 216, 228, 240, 252],
      growth: [6, 8, 9, 8, 11, 13, 12, 14, 16, 15, 18, 20],
    },
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    highlights: {
      bestPeriod: "2025",
      bestPeriodSub: "Best performing year",
      bestYear: "2025",
      bestYearSub: "Highest order volume",
    },
    productBreakdown: [
      { name: "Button Down Shirt", count: 1220 },
      { name: "Notched Collar Shirt", count: 1148 },
      { name: "Graphic T-Shirt", count: 1084 },
      { name: "The Modern Polo", count: 972 },
      { name: "Sleeveless Knit Top", count: 688 },
      { name: "Wide-Leg Trousers", count: 604 },
    ],
    orderBreakdown: [
      { label: "Completed Orders", value: "15,980", sub: "86.7% fulfillment rate" },
      { label: "Pending Orders", value: "1,364", sub: "In current queue" },
      { label: "Cancelled Orders", value: "1,076", sub: "5.8% cancellation rate" },
    ],
    revenueBreakdown: [
      { label: "Gross Revenue", value: "₱18.7M", sub: "Total annual revenue" },
      { label: "Average Order Value", value: "₱1,170", sub: "Per completed order" },
      { label: "Best Revenue Month", value: "November", sub: "Peak seasonal month" },
    ],
    growthBreakdown: [
      { label: "Growth Rate", value: "19.8%", sub: "Compared to previous year" },
      { label: "Best Growth Month", value: "November", sub: "Highest momentum" },
      { label: "Retention Lift", value: "+4.7%", sub: "Annual repeat-customer gain" },
    ],
  },
};

const recentOrders = [
  { id: "2847", time: "2 hours ago", amount: "₱2,450.50" },
  { id: "2846", time: "4 hours ago", amount: "₱1,899.00" },
  { id: "2845", time: "6 hours ago", amount: "₱5,670.00" },
];

const topBuyers: TopBuyer[] = [
  {
    id: 1,
    name: "Maggie Johnson",
    company: "Oasis Organic",
    orders: 24,
    spent: "₱48,200",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: 2,
    name: "Nathan Cruz",
    company: "Urban Lane",
    orders: 19,
    spent: "₱37,450",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 3,
    name: "Camille Reyes",
    company: "North Studio",
    orders: 16,
    spent: "₱31,980",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
];

const metricTitles: Record<MetricType, string> = {
  products: "Total Products Analytics",
  orders: "Total Orders Analytics",
  revenue: "Total Revenue Analytics",
  growth: "Growth Rate Analytics",
};

const metricAccent: Record<MetricType, string> = {
  products: "text-blue-500",
  orders: "text-purple-500",
  revenue: "text-green-500",
  growth: "text-orange-500",
};

export default function AdminDashboard() {
  const [mode, setMode] = useState<FilterMode>("last7days");
  const [detailMetric, setDetailMetric] = useState<MetricType | null>(null);

  const current = useMemo(() => analyticsByMode[mode], [mode]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-[#b81d24] tracking-wide">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Unified overview of store performance, activity, and buyers
          </p>
        </div>

        <div className="inline-flex rounded-2xl bg-[#F8F9F4] p-1 border border-gray-200">
          {filterOptions.map((option) => {
            const active = mode === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setMode(option.value)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  active
                    ? "bg-[#C1121F] text-white shadow-sm"
                    : "text-gray-600 hover:text-[#C1121F]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-4 gap-4 mb-5 shrink-0">
        <StatCard
          title="Total Products"
          value={current.metrics.totalProducts.value}
          trend={current.metrics.totalProducts.trend}
          note={current.metrics.totalProducts.note}
          icon={<FiBox className="text-xl text-blue-500" />}
          onClick={() => setDetailMetric("products")}
          active={detailMetric === "products"}
        />
        <StatCard
          title="Total Orders"
          value={current.metrics.totalOrders.value}
          trend={current.metrics.totalOrders.trend}
          note={current.metrics.totalOrders.note}
          icon={<FiShoppingBag className="text-xl text-purple-500" />}
          onClick={() => setDetailMetric("orders")}
          active={detailMetric === "orders"}
        />
        <StatCard
          title="Total Revenue"
          value={current.metrics.totalRevenue.value}
          trend={current.metrics.totalRevenue.trend}
          note={current.metrics.totalRevenue.note}
          icon={<FiDollarSign className="text-xl text-green-500" />}
          onClick={() => setDetailMetric("revenue")}
          active={detailMetric === "revenue"}
        />
        <StatCard
          title="Growth Rate"
          value={current.metrics.growthRate.value}
          trend={current.metrics.growthRate.trend}
          note={current.metrics.growthRate.note}
          icon={<FiTrendingUp className="text-xl text-orange-500" />}
          onClick={() => setDetailMetric("growth")}
          active={detailMetric === "growth"}
        />
      </div>

      {/* Main content */}
      {detailMetric ? (
        <MetricDetailView
          metric={detailMetric}
          current={current}
          onBack={() => setDetailMetric(null)}
        />
      ) : (
        <div className="grid grid-cols-[1.35fr_0.95fr] gap-4 min-h-0 flex-1">
          {/* Left side */}
          <div className="grid grid-rows-[1.1fr_0.9fr] gap-4 min-h-0">
            {/* Analytics card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-h-0 flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {current.chartTitle}
                  </h2>
                  <div className="flex items-end gap-3 mt-2">
                    <span className="text-4xl font-bold text-gray-900 tracking-tight">
                      {current.chartValue}
                    </span>
                    <span className="text-sm text-green-500 font-semibold mb-1">
                      {current.chartChange}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {current.chartCaption}
                  </p>
                </div>

                <div className="rounded-xl bg-[#F8F9F4] border border-gray-200 px-3 py-2 text-xs text-gray-600 font-semibold">
                  {filterOptions.find((f) => f.value === mode)?.label}
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-end min-h-0">
                <RevenueChart labels={current.labels} data={current.series.revenue} />

                <div className="mt-3 flex items-center justify-between text-xs text-gray-400 font-medium">
                  {current.labels.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom left row */}
            <div className="grid grid-cols-[1fr_1fr] gap-4 min-h-0">
              <CompactInfoCard
                title="Best Period"
                primary={current.highlights.bestPeriod}
                secondary={current.highlights.bestPeriodSub}
                accent="text-[#8c6b30]"
              />

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 min-h-0 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
                  <span className="text-xs font-semibold text-[#b81d24]">
                    Latest Orders
                  </span>
                </div>

                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-100 px-3 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          Order #{order.id}
                        </p>
                        <p className="text-xs text-gray-500">{order.time}</p>
                      </div>
                      <span className="text-sm font-bold text-green-600">
                        {order.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="grid grid-rows-[0.75fr_1.25fr] gap-4 min-h-0">
            <div className="grid grid-cols-2 gap-4 min-h-0">
              <CompactInfoCard
                title="Top Year"
                primary={current.highlights.bestYear}
                secondary={current.highlights.bestYearSub}
                accent="text-[#8c6b30]"
              />

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 min-h-0 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">Buyer Health</h3>
                  <FiUsers className="text-lg text-[#C1121F]" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 tracking-tight">
                    142
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Repeat buyers this period
                  </p>
                </div>
                <p className="text-xs text-green-500 font-semibold">
                  +9.4% returning customers
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 min-h-0 flex flex-col">
              <div className="flex items-center justify-between mb-4 shrink-0">
                <h2 className="text-lg font-bold text-gray-900">Top Buyers</h2>
                <span className="text-xs font-semibold text-[#b81d24]">
                  Highest spenders
                </span>
              </div>

              <div className="space-y-3 overflow-hidden">
                {topBuyers.map((buyer, index) => (
                  <div
                    key={buyer.id}
                    className="flex items-center justify-between rounded-2xl border border-gray-100 bg-[#FAFAFA] px-4 py-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 text-sm font-bold text-gray-400">
                        #{index + 1}
                      </div>
                      <img
                        src={buyer.avatar}
                        alt={buyer.name}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {buyer.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {buyer.company}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-[#003049]">
                        {buyer.spent}
                      </p>
                      <p className="text-xs text-gray-500">
                        {buyer.orders} orders
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricDetailView({
  metric,
  current,
  onBack,
}: {
  metric: MetricType;
  current: AnalyticsModeData;
  onBack: () => void;
}) {
  const breakdown =
    metric === "products"
      ? current.productBreakdown
      : metric === "orders"
      ? current.orderBreakdown
      : metric === "revenue"
      ? current.revenueBreakdown
      : current.growthBreakdown;

  const metricValue =
    metric === "products"
      ? current.metrics.totalProducts.value
      : metric === "orders"
      ? current.metrics.totalOrders.value
      : metric === "revenue"
      ? current.metrics.totalRevenue.value
      : current.metrics.growthRate.value;

  const metricTrend =
    metric === "products"
      ? current.metrics.totalProducts.trend
      : metric === "orders"
      ? current.metrics.totalOrders.trend
      : metric === "revenue"
      ? current.metrics.totalRevenue.trend
      : current.metrics.growthRate.trend;

  const metricNote =
    metric === "products"
      ? current.metrics.totalProducts.note
      : metric === "orders"
      ? current.metrics.totalOrders.note
      : metric === "revenue"
      ? current.metrics.totalRevenue.note
      : current.metrics.growthRate.note;

  return (
    <div className="grid grid-cols-[1.35fr_0.95fr] gap-4 min-h-0 flex-1">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-h-0 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#C1121F] hover:underline mb-3"
            >
              <FiArrowLeft />
              Back to Dashboard
            </button>

            <h2 className="text-xl font-bold text-gray-900">
              {metricTitles[metric]}
            </h2>

            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-bold text-gray-900 tracking-tight">
                {metricValue}
              </span>
              <span className={`text-sm font-semibold mb-1 ${metricAccent[metric]}`}>
                {metricTrend}
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-1">{metricNote}</p>
          </div>
        </div>

        {metric === "products" ? (
          <div className="grid grid-cols-2 gap-4 mt-2 flex-1 min-h-0">
            <div className="rounded-2xl border border-gray-100 bg-[#FAFAFA] p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                Product Totals
              </h3>
              <div className="space-y-3">
                {current.productBreakdown.map((product) => (
                  <div
                    key={product.name}
                    className="flex items-center justify-between rounded-xl bg-white border border-gray-100 px-4 py-3"
                  >
                    <span className="text-sm font-semibold text-gray-800">
                      {product.name}
                    </span>
                    <span className="text-sm font-bold text-[#003049]">
                      {product.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col">
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                Product Count Trend
              </h3>
              <div className="flex-1 flex flex-col justify-end">
                <RevenueChart
                  labels={current.labels}
                  data={current.series.products}
                />
                <div className="mt-3 flex items-center justify-between text-xs text-gray-400 font-medium">
                  {current.labels.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[1.15fr_0.85fr] gap-4 mt-2 flex-1 min-h-0">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 flex flex-col">
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                {metricTitles[metric]}
              </h3>
              <div className="flex-1 flex flex-col justify-end">
                <RevenueChart
                  labels={current.labels}
                  data={current.series[metric]}
                />
                <div className="mt-3 flex items-center justify-between text-xs text-gray-400 font-medium">
                  {current.labels.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-[#FAFAFA] p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                Summary
              </h3>
              <div className="space-y-3">
                {breakdown.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-white border border-gray-100 px-4 py-3"
                  >
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {item.label}
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      {item.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-rows-[0.75fr_1.25fr] gap-4 min-h-0">
        <CompactInfoCard
          title="Current Filter"
          primary={metricTitles[metric]}
          secondary="Using the same selected dashboard period"
          accent="text-[#8c6b30]"
        />

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 min-h-0 flex flex-col">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h2 className="text-lg font-bold text-gray-900">Top Buyers</h2>
            <span className="text-xs font-semibold text-[#b81d24]">
              Highest spenders
            </span>
          </div>

          <div className="space-y-3 overflow-hidden">
            {topBuyers.map((buyer, index) => (
              <div
                key={buyer.id}
                className="flex items-center justify-between rounded-2xl border border-gray-100 bg-[#FAFAFA] px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 text-sm font-bold text-gray-400">
                    #{index + 1}
                  </div>
                  <img
                    src={buyer.avatar}
                    alt={buyer.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {buyer.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {buyer.company}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-[#003049]">
                    {buyer.spent}
                  </p>
                  <p className="text-xs text-gray-500">{buyer.orders} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  trend,
  note,
  icon,
  onClick,
  active,
}: {
  title: string;
  value: string;
  trend: string;
  note: string;
  icon: React.ReactNode;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 shadow-sm border flex flex-col min-h-0 text-left transition-all duration-200 hover:shadow-md ${
        active ? "border-[#C1121F] ring-2 ring-[#C1121F]/20" : "border-gray-100"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          {title}
        </h2>
        {icon}
      </div>
      <div className="flex items-end gap-2 mb-1">
        <span className="text-3xl font-bold text-gray-900 tracking-tight">
          {value}
        </span>
        <span className="text-sm text-green-500 font-semibold mb-1">{trend}</span>
      </div>
      <p className="text-xs text-gray-500">{note}</p>
    </button>
  );
}

function CompactInfoCard({
  title,
  primary,
  secondary,
  accent,
}: {
  title: string;
  primary: string;
  secondary: string;
  accent?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 min-h-0 flex flex-col justify-between">
      <h3 className="text-sm font-bold text-gray-400 uppercase">{title}</h3>
      <div>
        <p className={`text-2xl font-bold ${accent ?? "text-gray-900"}`}>
          {primary}
        </p>
        <p className="text-sm text-gray-500 mt-1">{secondary}</p>
      </div>
    </div>
  );
}