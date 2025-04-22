"use client";

import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {toast} from "@/hooks/use-toast";

interface StockItem {
    id: string;
    name: string;
    quantity: number;
    reorderPoint: number;
}

const initialStockItems: StockItem[] = [
    {id: "1", name: "Screws", quantity: 150, reorderPoint: 50},
    {id: "2", name: "Nails", quantity: 80, reorderPoint: 100},
    {id: "3", name: "Bolts", quantity: 30, reorderPoint: 50},
    {id: "4", name: "Wood Planks", quantity: 120, reorderPoint: 30},
    {id: "5", name: "Metal Sheets", quantity: 60, reorderPoint: 20},
];

const StockOverview = () => {
    const [stockItems, setStockItems] = useState<StockItem[]>(initialStockItems);
    const [lowStockItems, setLowStockItems] = useState<StockItem[]>([]);
    const [addItemOpen, setAddItemOpen] = useState(false);
    const [newItem, setNewItem] = useState({name: "", quantity: 0, reorderPoint: 0});
    const [updateItem, setUpdateItem] = useState({id: "", quantity: 0});
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState("");

    useEffect(() => {
        // Filter items below the reorder point
        const lowStock = stockItems.filter((item) => item.quantity < item.reorderPoint);
        setLowStockItems(lowStock);
    }, [stockItems]);

    const handleAddItem = () => {
        if (!newItem.name || newItem.quantity <= 0 || newItem.reorderPoint <= 0) {
            toast({
                title: "Error",
                description: "Please fill in all fields with valid values.",
                variant: "destructive",
            });
            return;
        }

        const newItemWithId = {
            ...newItem,
            id: String(Date.now()), // Generate a unique ID
        };

        setStockItems([...stockItems, newItemWithId]);
        setNewItem({name: "", quantity: 0, reorderPoint: 0}); // Reset the form
        setAddItemOpen(false); // Close the dialog
        toast({
            title: "Success",
            description: `${newItem.name} added to stock.`,
        });
    };

    const handleUpdateStock = () => {
        if (!updateItem.id || updateItem.quantity <= 0) {
            toast({
                title: "Error",
                description: "Please enter a valid quantity.",
                variant: "destructive",
            });
            return;
        }

        const updatedStock = stockItems.map((item) =>
            item.id === updateItem.id ? {...item, quantity: updateItem.quantity} : item
        );
        setStockItems(updatedStock);
        setUpdateItem({id: "", quantity: 0});
        setUpdateDialogOpen(false);
        toast({
            title: "Stock Updated",
            description: `Stock level updated successfully.`,
        });
    };

    const openUpdateDialog = (itemId: string) => {
        setSelectedItemId(itemId);
        setUpdateItem({id: itemId, quantity: 0});
        setUpdateDialogOpen(true);
    };

    return (
        <div className="container mx-auto p-4">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Stock Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stockItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 border rounded-md">
                                <div>
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                    <p className="text-sm text-muted-foreground">Reorder Point: {item.reorderPoint}</p>
                                </div>
                                <Button size="sm" onClick={() => openUpdateDialog(item.id)}>
                                    Update Stock
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Low Stock Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                    {lowStockItems.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {lowStockItems.map((item) => (
                                <li key={item.id}>
                                    {item.name} - Current Stock: {item.quantity}, Reorder Point: {item.reorderPoint}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No items are currently below their reorder point.</p>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-end mb-4">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline">Add Item</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Add New Item</AlertDialogTitle>
                            <AlertDialogDescription>
                                Enter the details for the new tool or material.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="quantity" className="text-right">
                                    Quantity
                                </Label>
                                <Input
                                    type="number"
                                    id="quantity"
                                    value={newItem.quantity}
                                    onChange={(e) =>
                                        setNewItem({...newItem, quantity: parseInt(e.target.value)})
                                    }
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="reorderPoint" className="text-right">
                                    Reorder Point
                                </Label>
                                <Input
                                    type="number"
                                    id="reorderPoint"
                                    value={newItem.reorderPoint}
                                    onChange={(e) =>
                                        setNewItem({...newItem, reorderPoint: parseInt(e.target.value)})
                                    }
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleAddItem}>Add</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            {/* Update Stock Dialog */}
            <AlertDialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Update Stock</AlertDialogTitle>
                        <AlertDialogDescription>
                            Enter the new stock quantity for the selected item.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">
                                Quantity
                            </Label>
                            <Input
                                type="number"
                                id="quantity"
                                value={updateItem.quantity}
                                onChange={(e) =>
                                    setUpdateItem({...updateItem, quantity: parseInt(e.target.value)})
                                }
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleUpdateStock}>Update</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default StockOverview;
