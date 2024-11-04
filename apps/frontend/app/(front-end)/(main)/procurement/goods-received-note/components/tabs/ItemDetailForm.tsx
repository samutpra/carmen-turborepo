import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormAction, GoodsReceiveNoteItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import React from "react";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui-custom/dialog";

interface ItemDetailFormProps {
  item: GoodsReceiveNoteItem | null;
  mode: FormAction | FormAction.CREATE;
  handleItemChange?: (
    id: string,
    field: keyof GoodsReceiveNoteItem,
    value: string | number | boolean
  ) => void;
  onClose: () => void;
  onSave: (item: GoodsReceiveNoteItem) => void;
}

export default function ItemDetailForm({
  item: initialItem,
  mode: initialMode,
  handleItemChange,
  onClose,
  onSave,
}: ItemDetailFormProps) {
  const [mode, setMode] = useState<FormAction>(initialMode);
  const [item, setItem] = useState<GoodsReceiveNoteItem>(
    initialItem || {
      id: Date.now().toString(),
      location: "",
      name: "",
      description: "",
      baseUnit: "",
      orderedQuantity: 0,
      receivedQuantity: 0,
      isFreeOfCharge: false,
      deliveryDate: new Date(),
      currency: "USD",
      exchangeRate: 1,
      baseUnitPrice: 0,
      baseCurrency: "USD",
      baseQuantity: 0,
      baseSubTotalAmount: 0,
      baseNetAmount: 0,
      baseTaxAmount: 0,
      baseTotalAmount: 0,
      baseDiscountAmount: 0,
      baseDiscountRate: 0,
      baseTaxRate: 0,
      conversionRate: 1,
      extraCost: 0,
      inventoryRestockLevel: 0,
      purchaseOrderRef: "",
      lotNumber: "",
      deliveryPoint: "",
      taxIncluded: false,
      discountRate: 0,
      taxRate: 0,
      subTotalAmount: 0,
      discountAmount: 0,
      taxAmount: 0,
      totalAmount: 0,
      adjustments: {
        discount: false,
        tax: false,
      },
      jobCode: "",
      unit: "",
      unitPrice: 0,
      netAmount: 0,
      inventoryOnHand: 0,
      inventoryOnOrder: 0,
      inventoryReorderThreshold: 0,
      lastPurchasePrice: 0,
      lastOrderDate: new Date(),
      lastVendor: "",

      // Add other required fields with default values
    }
  );

  const handleEdit = () => {
    setMode(FormAction.EDIT);
  };

  const handleCancel = () => {
    if (mode === FormAction.CREATE) {
      onClose();
    } else {
      setMode(FormAction.VIEW);
    }
  };

  const handleSave = () => {
    onSave(item);
    if (mode === FormAction.CREATE) {
      onClose();
    } else {
      setMode(FormAction.VIEW);
    }
  };

  const handleChange = (
    field: keyof GoodsReceiveNoteItem,
    value: string | number | boolean
  ) => {
    setItem((prev) => ({ ...prev, [field]: value }));
    if (handleItemChange && item.id) {
      handleItemChange(item.id, field, value);
    }
  };

  return (
    <>
      <DialogHeader>
        <div className="flex justify-between w-full items-center">
          <div className="flex justify-between w-full items-center">
            <DialogTitle>
              {mode === "edit"
                ? "Edit Item"
                : mode === FormAction.VIEW
                  ? "View Item"
                  : "Add New Item"}
            </DialogTitle>

            <div>
              {mode === FormAction.VIEW && (
                <Button size="sm" onClick={handleEdit}>
                  Edit
                </Button>
              )}
              {(mode === "edit" || mode === FormAction.CREATE) && (
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="sm">
              <XIcon className="h-4 w-4" />
            </Button>
          </DialogClose>
        </div>
      </DialogHeader>

      <div className="text-sm">
        <div className="flex flex-col justify-start gap-2">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-semibold mb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-1">
                  <Label htmlFor={`location-${item.id}`}>Location*</Label>
                  <Input
                    id={`location-${item.id}`}
                    value={item.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    readOnly={mode === FormAction.VIEW}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="col-span-1">
                  <Label htmlFor={`name-${item.id}`}>Product Name</Label>
                  <Input
                    id={`name-${item.id}`}
                    value={item.notes}
                    onChange={(e) => handleChange("name", e.target.value)}
                    readOnly={mode === FormAction.VIEW}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`description-${item.id}`}>Description</Label>
                  <Input
                    id={`description-${item.id}`}
                    value={item.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    readOnly={mode === FormAction.VIEW}
                    className="h-8 text-sm"
                  />
                </div>

                <div className="col-span-1">
                  <Label htmlFor={`poReference-${item.id}`}>
                    PO Reference
                  </Label>
                  <Input
                    id={`poReference-${item.id}`}
                    value={item.purchaseOrderRef}
                    onChange={(e) => handleChange("purchaseOrderRef", e.target.value)}
                    readOnly={mode === FormAction.VIEW}
                    className="h-8 text-sm"
                  />
                </div>

                <div className="col-span-1">
                  <Label htmlFor={`jobCode-${item.id}`}>
                    Job Code
                  </Label>
                  <Input
                    id={`jobCode-${item.id}`}
                    value={item.jobCode}
                    onChange={(e) => handleChange("jobCode", e.target.value)}
                    readOnly={mode === FormAction.VIEW}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
            </div>

            <Separator className="my-3" />

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-semibold">
                  Quantity and Delivery
                </h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    On Hand
                  </Button>
                  <Button variant="outline" size="sm">
                    On Order
                  </Button>

                </div>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-1">
                  <Label htmlFor={`baseUnit-${item.id}`}>Ord. Unit</Label>
                  <Input
                    id={`baseUnit-${item.id}`}
                    value={item.baseUnit}
                    onChange={(e) => handleChange("baseUnit", e.target.value)}
                    readOnly={mode === FormAction.VIEW}
                    className="h-8 text-sm"
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    Kg | 1 Bag = 0.5 Kg
                  </div>
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`orderedQuantity-${item.id}`}>
                    Order Quantity
                  </Label>
                  <Input
                    id={`orderedQuantity-${item.id}`}
                    type="number"
                    value={item.orderedQuantity || ""}
                    onChange={(e) =>
                      handleChange(
                        "orderedQuantity",
                        parseFloat(e.target.value)
                      )
                    }
                    readOnly={mode === FormAction.VIEW}
                    className="h-8 text-sm"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {(item.orderedQuantity * item.conversionRate).toFixed(2)}{" "}
                    {item.baseUnit}
                  </div>
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`receivedQuantity-${item.id}`}>
                    Receiving Quantity
                  </Label>
                  <Input
                    id={`receivedQuantity-${item.id}`}
                    type="number"
                    value={item.receivedQuantity || ""}
                    onChange={(e) =>
                      handleChange(
                        "receivedQuantity",
                        parseFloat(e.target.value)
                      )
                    }
                    readOnly={mode === FormAction.VIEW}
                    className="h-8 text-sm"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {(item.receivedQuantity * item.conversionRate).toFixed(2)}{" "}
                    {item.baseUnit}
                  </div>
                </div>
                <div className="col-span-1">
                  <Label htmlFor={`isFoc-${item.id}`}>FOC</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Input
                      id={`isFoc-${item.id}`}
                      type="checkbox"
                      checked={item.isFreeOfCharge}
                      onChange={(e) =>
                        handleChange("isFreeOfCharge", e.target.checked)
                      }
                      readOnly={mode === FormAction.VIEW}
                      className="w-4 h-4"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`lotNumber-${item.id}`}>Lot Number</Label>
                  <Input
                    id={`lotNumber-${item.id}`}
                    value={item.lotNumber}
                    onChange={(e) => handleChange("lotNumber", e.target.value)}
                    readOnly={mode === FormAction.VIEW}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`deliveryPoint-${item.id}`}>
                    Delivery Point
                  </Label>
                  <Input
                    id={`deliveryPoint-${item.id}`}
                    value={item.deliveryPoint}
                    onChange={(e) =>
                      handleChange("deliveryPoint", e.target.value)
                    }
                    readOnly={mode === FormAction.VIEW}
                    className="h-8 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2 bg-gray-100 p-2 text-sm">
                <div>
                  <Label className="text-xs">On Hand</Label>
                  <div className="text-sm">{item.inventoryOnHand} Kg</div>
                </div>
                <div>
                  <Label className="text-xs">On Ordered</Label>
                  <div className="text-sm">{item.inventoryOnOrder} Kg</div>
                </div>
                <div>
                  <Label className="text-xs">Reorder Level</Label>
                  <div className="text-sm">
                    {item.inventoryReorderThreshold} Kg
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-3" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-base font-semibold mb-2">Pricing</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor={`currency-${item.id}`}>Currency</Label>
                    <Input
                      id={`currency-${item.id}`}
                      value={item.currency || "USD"}
                      onChange={(e) => handleChange("currency", e.target.value)}
                      readOnly={mode === FormAction.VIEW}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`exchangeRate-${item.id}`}>
                      Exch. Rate
                    </Label>
                    <Input
                      id={`exchangeRate-${item.id}`}
                      type="number"
                      value={item.exchangeRate || 1}
                      onChange={(e) =>
                        handleChange("exchangeRate", parseFloat(e.target.value))
                      }
                      readOnly={mode === FormAction.VIEW}
                      className="h-8 text-sm text-right"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`baseUnitPrice-${item.id}`}>Price</Label>
                    <Input
                      id={`baseUnitPrice-${item.id}`}
                      type="number"
                      value={item.baseUnitPrice}
                      onChange={(e) =>
                        handleChange(
                          "baseUnitPrice",
                          parseFloat(e.target.value)
                        )
                      }
                      readOnly={mode === FormAction.VIEW}
                      className="h-8 text-sm text-right"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`taxIncluded-${item.id}`}>Tax Incl.</Label>
                    <div className="flex items-center h-[38px]">
                      <Checkbox
                        id={`taxIncluded-${item.id}`}
                        checked={item.taxIncluded}
                        onCheckedChange={(checked) =>
                          handleChange("taxIncluded", checked as boolean)
                        }
                        disabled={mode === FormAction.VIEW}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor={`discountAdjustment-${item.id}`}>
                      Adj. Disc. Rate (%)
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`discountAdjustment-${item.id}`}
                        checked={item.adjustments?.discount}
                        onCheckedChange={(checked) =>
                          handleChange("adjustments", checked)
                        }
                        disabled={mode === FormAction.VIEW}
                      />
                      <Input
                        id={`discountRate-${item.id}`}
                        type="number"
                        value={item.discountRate || 0}
                        onChange={(e) =>
                          handleChange(
                            "discountRate",
                            parseFloat(e.target.value)
                          )
                        }
                        readOnly={mode === FormAction.VIEW}
                        className="h-8 text-sm text-right"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`overrideDiscount-${item.id}`}>
                      Override Discount Amount
                    </Label>
                    <Input
                      id={`overrideDiscount-${item.id}`}
                      type="number"
                      placeholder="Enter to override"
                      value={item.discountAmount || ""}
                      onChange={(e) =>
                        handleChange(
                          "discountAmount",
                          parseFloat(e.target.value)
                        )
                      }
                      readOnly={mode === FormAction.VIEW}
                      className="h-8 text-sm text-right"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor={`taxAdjustment-${item.id}`}>
                      Adj. Tax Rate (%)
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`taxAdjustment-${item.id}`}
                        checked={item.adjustments?.tax}
                        onCheckedChange={(checked) =>
                          handleChange("adjustments", checked)
                        }
                        disabled={mode === FormAction.VIEW}
                      />
                      <Input
                        id={`taxRate-${item.id}`}
                        type="number"
                        value={item.taxRate || 0}
                        onChange={(e) =>
                          handleChange("taxRate", parseFloat(e.target.value))
                        }
                        readOnly={mode === FormAction.VIEW}
                        className="h-8 text-sm text-right"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`taxAmount-${item.id}`}>
                      Override Tax Amount
                    </Label>
                    <Input
                      id={`taxAmount-${item.id}`}
                      type="number"
                      placeholder="Enter to override"
                      value={item.taxAmount || ""}
                      onChange={(e) =>
                        handleChange("taxAmount", parseFloat(e.target.value))
                      }
                      readOnly={mode === FormAction.VIEW}
                      className="h-8 text-sm text-right"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 bg-gray-100 p-2 text-sm text-muted-foreground">
                  <div>
                    <Label className="text-xs">Last Price</Label>
                    <div className="text-sm">
                      {item.lastPurchasePrice?.toFixed(2) || "0.00"} per Kg
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Last Order Date</Label>
                    <div className="text-sm">
                      {item.lastOrderDate
                        ? new Date(item.lastOrderDate).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Last Vendor</Label>
                    <div className="text-sm">{item.lastVendor || "N/A"}</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold mb-2">
                  Calculated Amounts
                </h3>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-4 font-semibold text-muted-foreground mb-2 text-sm">
                    <div>Description</div>
                    <div className="text-right">
                      Total Amount ({item.currency})
                    </div>
                    <div className="text-right text-xs">
                      Base Amount ({item.baseCurrency})
                    </div>
                  </div>
                  {[
                    {
                      label: "Subtotal Amount",
                      total: item.subTotalAmount,
                      base: item.baseSubTotalAmount,
                    },
                    {
                      label: "Discount Amount",
                      total: item.discountAmount,
                      base: item.baseDiscountAmount,
                    },
                    {
                      label: "Net Amount",
                      total: item.netAmount,
                      base: item.baseNetAmount,
                    },
                    {
                      label: "Tax Amount",
                      total: item.taxAmount,
                      base: item.baseTaxAmount,
                    },
                    {
                      label: "Total Amount",
                      total: item.totalAmount,
                      base: item.baseTotalAmount,
                    },
                  ].map((row, index) => (
                    <React.Fragment key={row.label}>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>{row.label}</div>
                        <div className="text-right">
                          {row.total?.toFixed(2) || "0.00"}
                        </div>
                        <div className="text-right text-muted-foreground text-xs">
                          {row.base?.toFixed(2) || "0.00"}
                        </div>
                      </div>
                      {index < 4 && <Separator className="my-1" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
