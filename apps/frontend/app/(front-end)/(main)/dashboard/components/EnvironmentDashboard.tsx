import React from 'react'
import { formatLargeNumber } from '../utils'
import MetricCard from './MetricCard';
import { energyData, scopeData } from '../mock_data/data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

type TooltipValue = string | number;

const EnvironmentDashboard = () => {

    const latestYear = energyData[energyData.length - 1];
    const previousYear = energyData[energyData.length - 2];
    const energyChange = latestYear && previousYear
        ? ((latestYear.energy - previousYear.energy) / previousYear.energy * 100).toFixed(1)
        : '0.0';


    return (
        <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold">Environmental Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard
                    title="Total Energy Usage"
                    value={latestYear?.energy || 0}
                    unit="kWh"
                    subtext={`${energyChange}% vs previous year`}
                />
                <MetricCard
                    title="Current Scope 1"
                    value={scopeData[scopeData.length - 1]?.scope1 || 0}
                    unit="tCO2e"
                    subtext="Direct emissions"
                />
                <MetricCard
                    title="Current Scope 2"
                    value={scopeData[scopeData.length - 1]?.scope2 || 0}
                    unit="tCO2e"
                    subtext="Indirect emissions"
                />
                <MetricCard
                    title="Current Scope 3"
                    value={scopeData[scopeData.length - 1]?.scope3 || 0}
                    unit="tCO2e"
                    subtext="Value chain emissions"
                />
            </div>
            <div>

            </div>
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="h-[calc(100vh-800px)]">
                    <CardHeader>
                        <CardTitle>Emissions by Scope Over Time (tCO2e)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-80px)]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={scopeData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="scope1" name="Scope 1" fill="#0ea5e9" />
                                <Bar dataKey="scope2" name="Scope 2" fill="#6366f1" />
                                <Bar dataKey="scope3" name="Scope 3" fill="#7dd3fc" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div> */}
        </div>
    )
}

export default EnvironmentDashboard