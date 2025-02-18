import React from "react";
import { DeliveryPointCreateModel } from '@/dtos/delivery-point.dto';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface DeliveryPointSelectorProps {
    isEdit: boolean;
    isLoading: boolean;
    error: string | null;
    deliveryPoints: DeliveryPointCreateModel[];
    selectedDeliveryPoint: string;
    selectedDeliveryPointName: string;
    onDeliveryPointChange: (value: string) => void;
}

export const DeliveryPointSelector: React.FC<DeliveryPointSelectorProps> = ({
    isEdit,
    isLoading,
    error,
    deliveryPoints,
    selectedDeliveryPoint,
    selectedDeliveryPointName,
    onDeliveryPointChange,
}) => {
    if (isLoading) {
        return <p className="text-xs text-muted-foreground">Loading...</p>;
    }

    if (error) {
        return <p className="text-xs text-destructive">{error}</p>;
    }

    if (!isEdit) {
        return <p className="text-xs font-normal">{selectedDeliveryPointName}</p>;
    }

    return (
        <Select
            onValueChange={onDeliveryPointChange}
            value={selectedDeliveryPoint}
            data-testid="delivery-point-select"
        >
            <SelectTrigger
                className="h-8 w-full"
                data-testid="delivery-point-select-trigger"
                aria-label="Select delivery point"
            >
                <SelectValue placeholder="Select Value" />
            </SelectTrigger>
            <SelectContent
                data-testid="delivery-point-select-content"
                className="max-h-[300px]"
            >
                {deliveryPoints.length === 0 ? (
                    <SelectItem
                        value="empty"
                        disabled
                        className="text-xs text-muted-foreground"
                    >
                        No delivery points available
                    </SelectItem>
                ) : (
                    deliveryPoints.map((point) => (
                        <SelectItem
                            key={point.id}
                            value={point.id || ''}
                            data-testid={`delivery-point-select-item-${point.id}`}
                            className="cursor-pointer hover:bg-muted text-xs"
                        >
                            {point.name}
                        </SelectItem>
                    ))
                )}
            </SelectContent>
        </Select>
    );
};