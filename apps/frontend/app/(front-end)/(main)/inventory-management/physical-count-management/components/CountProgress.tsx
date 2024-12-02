import { Progress } from '@/components/ui/progress'
import React from 'react'

interface Props {
    total: number
    completed: number
    className?: string
}
const CountProgress: React.FC<Props> = ({
    total,
    completed,
    className
}) => {
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0

    return (
        <div className={className}>
            <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm mt-1 text-muted-foreground">
                <span>{completed} of {total} items counted</span>
            </div>
        </div>
    )
}

export default CountProgress