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

interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
    company_logo: string | null;
    avatar: string | null;
    order: number;
    is_active: boolean;
}

interface Props {
    testimonials: Testimonial[];
}

export default function TestimonialIndex({ testimonials }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            router.delete(`/admin/testimonials/${id}`);
        }
    };

    const getImageUrl = (path: string | null) => {
        if (!path) return null;
        return path.startsWith('http') ? path : `/storage/${path}`;
    };

    return (
        <AppLayout>
            <Head title="Testimonials" />

            <div className="container mx-auto py-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Testimonials</h1>
                        <Link href={route('testimonials.create')}>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Testimonial
                            </Button>
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Avatar</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Quote</TableHead>
                                    <TableHead>Company Logo</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {testimonials.map((testimonial) => (
                                    <TableRow key={testimonial.id}>
                                        <TableCell>
                                            {testimonial.avatar && (
                                                <img
                                                    src={getImageUrl(testimonial.avatar)}
                                                    alt={testimonial.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{testimonial.name}</TableCell>
                                        <TableCell>{testimonial.role}</TableCell>
                                        <TableCell className="max-w-xs truncate">{testimonial.quote}</TableCell>
                                        <TableCell>
                                            {testimonial.company_logo && (
                                                <img
                                                    src={getImageUrl(testimonial.company_logo)}
                                                    alt="Company Logo"
                                                    className="h-8 object-contain"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>{testimonial.order}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                testimonial.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {testimonial.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Link href={route('testimonials.edit', testimonial.id)}>
                                                    <Button variant="ghost" size="sm">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(testimonial.id)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {testimonials.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8">
                                            No testimonials found
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