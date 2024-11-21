import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { scopeData } from '../mock_data/data'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const EmissionsScope = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Emissions by Scope Over Time (tCO2e)</CardTitle>
            </CardHeader>
            <CardContent>
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
    )
}

export default EmissionsScope