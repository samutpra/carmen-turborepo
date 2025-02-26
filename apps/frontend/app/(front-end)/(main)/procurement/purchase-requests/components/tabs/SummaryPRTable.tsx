'use client'
import React from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
    TableHeader,
} from "@/components/ui/table";

interface ItemsDetails {
    currency: string;
    currencyRate: number;
    baseSubTotalPrice: number;
    subTotalPrice: number;
    baseNetAmount: number;
    netAmount: number;
    baseDiscAmount: number;
    discountAmount: number;
    baseTaxAmount: number;
    taxAmount: number;
    baseTotalAmount: number;
    totalAmount: number;
    discountRate: number;
    taxRate: number;
}

interface Props {
    item: ItemsDetails
    currencyBase: string;
    currencyCurrent: string;
}

const SummaryPRTable: React.FC<Props> = ({
    item,
    currencyBase,
    currencyCurrent
}) => {

    const data = [
        {
            Label: "Subtotal Amount",
            localCurrency: currencyBase,
            localAmt: item.baseSubTotalPrice ?? 0,
            currentCurrency: currencyCurrent,
            currentAmt: item.subTotalPrice ?? 0,
        }, {
            Label: "Discount Amount",
            localCurrency: currencyBase,
            localAmt: item.baseDiscAmount ?? 0,
            currentCurrency: currencyCurrent,
            currentAmt: item.discountAmount ?? 0,
        }, {
            Label: "Net Amount",
            localCurrency: currencyBase,
            localAmt: item.baseNetAmount ?? 0,
            currentCurrency: currencyCurrent,
            currentAmt: item.netAmount ?? 0,
        }, {
            Label: "Tax Amount",
            localCurrency: currencyBase,
            localAmt: item.baseTaxAmount ?? 0,
            currentCurrency: currencyCurrent,
            currentAmt: item.taxAmount ?? 0,
        }, {
            Label: "Total Amount",
            localCurrency: currencyBase,
            localAmt: item.baseTotalAmount ?? 0,
            currentCurrency: currencyCurrent,
            currentAmt: item.totalAmount ?? 0,
        }
    ];
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="font-bold whitespace-nowrap">Description</TableHead>
                    <TableHead className="text-right font-bold whitespace-nowrap">Total Amount ({currencyCurrent})</TableHead>
                    <TableHead className="text-right text-gray-500 text-xs whitespace-nowrap hidden md:flex items-center justify-end w-full">Base Amount ({currencyBase})</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>

                {data.map((item) => (
                    <TableRow key={item.Label}>
                        <TableCell className="whitespace-nowrap">{item.Label}</TableCell>
                        <TableCell className="text-right font-bold whitespace-nowrap">{item.currentAmt}</TableCell>
                        <TableCell className="hidden md:block text-right text-xs text-gray-500 whitespace-nowrap">{item.localAmt}</TableCell>

                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default SummaryPRTable