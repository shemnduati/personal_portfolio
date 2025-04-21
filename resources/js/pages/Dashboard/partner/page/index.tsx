import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Partner {
    id: number;
    name: string;
    logo: string;
    website: string;
    order: number;
    is_active: boolean;
}

interface Props {
    partners: Partner[];
}

export default function Partners({ partners }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this partner?')) {
            router.delete(`/admin/partners/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Partners" />

            <div className="container mx-auto py-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Partners</h1>
                        <Link href={route('partners.create')}>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Partner
                            </Button>
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Logo</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Website</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {partners.map((partner) => (
                                    <TableRow key={partner.id}>
                                        <TableCell>
                                            <img 
                                                src={`/storage/${partner.logo}`} 
                                                alt={partner.name} 
                                                className="w-16 h-16 object-contain grayscale"
                                            />
                                        </TableCell>
                                        <TableCell>{partner.name}</TableCell>
                                        <TableCell>
                                            <a 
                                                href={partner.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {partner.website}
                                            </a>
                                        </TableCell>
                                        <TableCell>{partner.order}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                partner.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {partner.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Link href={route('partners.edit', partner.id)}>
                                                    <Button variant="ghost" size="sm">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(partner.id)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {partners.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8">
                                            No partners found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 