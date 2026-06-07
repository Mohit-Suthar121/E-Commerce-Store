import React from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

// Mocking 30 days of standard commercial sales data
const mockSalesData = Array.from({ length: 30 }, (_, i) => ({
  date: `Jun ${i + 1}`,
  amount: Math.floor(Math.random() * 40000) + 80000 // Values oscillating between ₹80,000 and ₹120,000
}))

// Custom interactive popup element that matches your layout cards perfectly
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0b0b0b] border border-neutral-900 rounded-xl p-3 shadow-2xl flex flex-col gap-0.5">
        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
          {payload[0].payload.date}
        </span>
        <span className="text-sm font-bold font-mono text-emerald-400">
          ₹{payload[0].value.toLocaleString()}
        </span>
      </div>
    )
  }
  return null
}

const SalesChart = () => {
  return (
    <div className="w-full h-90 bg-[#0b0b0b] border border-neutral-900 rounded-2xl p-5 flex flex-col gap-4 shadow-xl select-none">
      
      {/* CHART CONTENT HEADER METRICS LINK */}
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest pl-0.5">
          Revenue Streams
        </span>
        <h2 className="text-lg font-bold text-neutral-100 tracking-tight">
          Last 30 Days Activity
        </h2>
      </div>

      {/* REACT FLEXIBLE GRAPH CANVAS CONTAINER */}
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockSalesData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
            
            {/* DEFINITION GRADIENT: Generates the premium neon background fade hook */}
            <defs>
              <linearGradient id="salesGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.12}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.00}/>
              </linearGradient>
            </defs>

            {/* Subtle background reference structural lines */}
            <CartesianGrid strokeDasharray="3 3" stroke="#171717" vertical={false} />

            {/* HORIZONTAL DATE LABELS AXIS */}
            <XAxis 
              dataKey="date" 
              stroke="#404040" 
              fontSize={10}
              fontFamily="monospace"
              tickLine={false}
              axisLine={false}
              dy={10}
              // Only showing a subset of labels so mobile screens don't overlap strings
              interval={6} 
            />

            {/* VERTICAL CURRENCY AMOUNT AXIS */}
            <YAxis 
              stroke="#404040" 
              fontSize={10}
              fontFamily="monospace"
              tickLine={false}
              axisLine={false}
              dx={-5}
              tickFormatter={(val) => `₹${val / 1000}k`}
            />

            {/* DYNAMIC TRACKING TOOLTIP POPUP OVERLAY */}
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#262626', strokeWidth: 1 }} />

            {/* ACTIVE INTERACTIVE CORE GRAPH PATH VECTOR */}
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#10b981" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#salesGlow)" 
              activeDot={{ r: 4, stroke: '#060606', strokeWidth: 2, fill: '#10b981' }}
            />

          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}

export default SalesChart