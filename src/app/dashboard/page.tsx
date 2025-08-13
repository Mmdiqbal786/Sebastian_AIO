/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Layout from "@/app/components/Dashboard/Layout";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useMemo } from "react";

// --- Colors tuned to your screenshots ---
const countryColors = [
  "#64B5F6", // Sweden (light blue)
  "#C5E1A5", // United Kingdom (green)
  "#FFE082", // Netherlands (amber)
  "#EF9A9A", // South Africa (red-ish)
  "#C5CAE9", // Germany (lavender)
  "#81D4FA", // France (sky)
];

export default function DashboardPage() {
  // Team Members by Country (top-right card)
  const teamMembers = useMemo(
    () => [
      { name: "France", value: 2 },
      { name: "Netherlands", value: 1 },
      { name: "Germany", value: 1 },
      { name: "United Kingdom", value: 1 },
      { name: "South Africa", value: 1 },
      { name: "Sweden", value: 1 },
    ],
    []
  );

  const teamTotal = useMemo(
    () => teamMembers.reduce((s, d) => s + d.value, 0),
    [teamMembers]
  );

  // Payroll Share % by Country (bottom-right pie)
  const payrollShare = [
    { name: "Sweden", value: 38 },
    { name: "United Kingdom", value: 16 },
    { name: "Netherlands", value: 18 },
    { name: "South Africa", value: 14 },
    { name: "Germany", value: 15 },
  ];

  // Payroll Summary stacked bars (bottom-left big chart)
  const payrollSummary = [
    { month: "Jul 24", Technology: 3, Operations: 0, Product: 0 },
    { month: "Aug 24", Technology: 14, Operations: 49, Product: 2 },
    { month: "Sep 24", Technology: 15, Operations: 34, Product: 3 },
    { month: "Oct 24", Technology: 28, Operations: 27, Product: 5 },
    { month: "Nov 24", Technology: 22, Operations: 39, Product: 6 },
    { month: "Dec 24", Technology: 21, Operations: 11, Product: 3 },
    { month: "Jan 25", Technology: 21, Operations: 3, Product: 2 },
    { month: "Feb 25", Technology: 21, Operations: 4, Product: 3 },
    { month: "Mar 25", Technology: 21, Operations: 2, Product: 3 },
    { month: "Apr 25", Technology: 14, Operations: 3, Product: 4 },
    { month: "May 25", Technology: 17, Operations: 2, Product: 3 },
    { month: "Jun 25", Technology: 15, Operations: 3, Product: 3 },
    { month: "Jul 25", Technology: 16, Operations: 3, Product: 2 },
  ];

  // bar colors to match the legend (Technology, Operations, Product)
  const tech = "#64B5F6";
  const ops = "#C5E1A5";
  const prod = "#FFE082";

  // small colored dot for legends
  const Dot = ({ color }: { color: string }) => (
    <span
      className="inline-block w-3 h-3 rounded-full mr-2"
      style={{ backgroundColor: color }}
    />
  );

  // label number inside pie slices (like screenshots)
  const pieLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, value } =
      props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-black"
        fontSize={14}
        fontWeight={700}
      >
        {value}
      </text>
    );
  };

  const pieLabelPercent = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, value } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-black"
        fontSize={14}
        fontWeight={700}
      >
        {value}
      </text>
    );
  };

  return (
    <Layout>
      <div className="px-4 py-20 md:px-6">
        {/* header */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Welcome to your Tarmack account, Deepak!
        </h1>

        {/* main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN (spans 2) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payroll */}
            <div className="bg-white rounded-xl shadow border border-gray-200">
              <div className="px-5 pt-5 pb-3">
                <h3 className="text-lg font-semibold">Payroll</h3>
              </div>
              <div className="border-t text-sm px-5 py-3 grid grid-cols-4 font-semibold text-gray-700">
                <div>Period</div>
                <div>Team Count</div>
                <div>Total</div>
                <div>Status</div>
              </div>
              <div className="px-5 py-4">
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded">
                  Review and Approve
                </button>
              </div>
            </div>

            {/* Agreements + Invoices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
                <h3 className="text-lg font-semibold mb-2">Agreements</h3>
                <p className="text-gray-700">
                  You have <b>24</b> Employee agreements available in your
                  Tarmack account.
                </p>
                <button className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded">
                  Access My Agreements
                </button>
              </div>
              <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
                <h3 className="text-lg font-semibold mb-2">Invoices</h3>
                <div className="flex items-center">
                  <div className="w-24 h-16 bg-gray-100 rounded mr-4 flex items-center justify-center">
                    {/* placeholder illustration */}
                    <span className="text-xs text-gray-400">image</span>
                  </div>
                  <p className="text-gray-700">
                    You have 0 Invoices to be reviewed
                  </p>
                </div>
              </div>
            </div>

            {/* Expenses + Leaves + Timesheets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
                <h3 className="text-lg font-semibold mb-2">Expenses</h3>
                <div className="flex items-center">
                  <div className="w-24 h-16 bg-gray-100 rounded mr-4 flex items-center justify-center">
                    <span className="text-xs text-gray-400">image</span>
                  </div>
                  <p className="text-gray-700">
                    You have 0 Expenses to be reviewed
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
                <h3 className="text-lg font-semibold mb-2">Leaves</h3>
                <div className="flex items-center">
                  <div className="w-24 h-16 bg-gray-100 rounded mr-4 flex items-center justify-center">
                    <span className="text-xs text-gray-400">image</span>
                  </div>
                  <p className="text-gray-700">
                    You currently have no leaves to be approved.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
                <h3 className="text-lg font-semibold mb-2">Timesheets</h3>
                <div className="flex items-center">
                  <div className="w-24 h-16 bg-gray-100 rounded mr-4 flex items-center justify-center">
                    <span className="text-xs text-gray-400">image</span>
                  </div>
                  <p className="text-gray-700">
                    You currently have no timesheets to be reviewed.
                  </p>
                </div>
              </div>
            </div>

            {/* Payroll Summary stacked bar */}
            <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
              <div className="flex items-center gap-6 mb-2">
                <h3 className="text-lg font-semibold">Payroll Summary</h3>
                <div className="text-sm text-gray-700 flex items-center gap-5">
                  <span>
                    <Dot color={tech} />
                    Technology
                  </span>
                  <span>
                    <Dot color={ops} />
                    Operations
                  </span>
                  <span>
                    <Dot color={prod} />
                    Product
                  </span>
                </div>
              </div>
              <div className="w-full h-[380px]">
                <ResponsiveContainer>
                  <BarChart data={payrollSummary} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis
                      tickFormatter={(v) => `$${v}k`}
                      width={40}
                      domain={[0, "dataMax+5"]}
                    />
                    <Tooltip
                      formatter={(v: number) => [`$${v}k`, "Amount"]}
                    />
                    <Bar dataKey="Technology" stackId="a" fill={tech} />
                    <Bar dataKey="Operations" stackId="a" fill={ops} />
                    <Bar dataKey="Product" stackId="a" fill={prod} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Team Members by Country pie */}
            <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
              <h3 className="text-lg font-semibold mb-4">
                Team Members by Country
              </h3>

              <div className="flex items-center">
                <div className="w-2/3 h-56">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={teamMembers}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        labelLine={false}
                        label={pieLabel}
                      >
                        {teamMembers.map((_, i) => (
                          <Cell
                            key={i}
                            fill={countryColors[i % countryColors.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/3 text-center">
                  <div className="text-5xl font-bold">{teamTotal}</div>
                  <div className="text-gray-600 mt-1">Team Members</div>
                </div>
              </div>

              {/* legend */}
              <div className="grid grid-cols-2 gap-y-2 text-sm mt-4">
                {teamMembers.map((c, i) => (
                  <div key={c.name} className="flex items-center">
                    <Dot color={countryColors[i % countryColors.length]} />
                    {c.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Payroll Share % by Country pie */}
            <div className="bg-white rounded-xl shadow border border-gray-200 p-5">
              <h3 className="text-lg font-semibold">Payroll Share % by Country</h3>
              <p className="text-xs text-gray-500 mb-3">Jul 1 - Jul 31, 2025</p>

              <div className="h-64">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={payrollShare}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      labelLine={false}
                      label={pieLabelPercent}
                    >
                      {payrollShare.map((_, i) => (
                        <Cell
                          key={i}
                          fill={countryColors[i % countryColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => [`${v}%`, "Share"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* legend (order matches your screenshot) */}
              <div className="flex flex-wrap gap-5 text-sm mt-2">
                <span><Dot color={countryColors[0]} />Sweden</span>
                <span><Dot color={countryColors[1]} />United Kingdom</span>
                <span><Dot color={countryColors[2]} />Netherlands</span>
                <span><Dot color={countryColors[3]} />South Africa</span>
                <span><Dot color={countryColors[4]} />Germany</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
