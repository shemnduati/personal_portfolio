import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    order: number;
    is_active: boolean;
}

export default function ServiceIndex({ services }: { services: Service[] }) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

    const handleDelete = async (service: Service) => {
        setServiceToDelete(service);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (serviceToDelete) {
            router.delete(`/admin/services/${serviceToDelete.id}`, {
                onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                    setServiceToDelete(null);
                },
            });
        }
    };

    const getImageUrl = (path: string) => {
        if (!path) return '';
        return path.startsWith('http') ? path : `/storage/${path}`;
    };

    return (
        <AppLayout>
            <Head title="Services" />

            <div className="container p-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold">Services</h1>
                    <Button asChild>
                        <Link href="/admin/services/create">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Service
                        </Link>
                    </Button>
                </div>

                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Icon</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Order</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {services && services.length > 0 ? (
                                services.map((service) => (
                                    <TableRow key={service.id}>
                                        <TableCell>
                                            {service.icon && (
                                                <img
                                                    src={getImageUrl(service.icon)}
                                                    alt={service.title}
                                                    className="w-10 h-10 object-cover rounded"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>{service.title}</TableCell>
                                        <TableCell className="max-w-md">
                                            <div className="truncate">{service.description}</div>
                                        </TableCell>
                                        <TableCell>{service.order}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded text-xs ${
                                                    service.is_active
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {service.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="icon" asChild>
                                                <Link href={`/admin/services/${service.id}/edit`}>
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleDelete(service)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-4">
                                        No services found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Service</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this service? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
} 