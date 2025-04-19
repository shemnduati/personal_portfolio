import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard'
    },
    {
        title: 'Categories',
        href: '/admin/categories'
    }
];

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    categories: Category[];
}

export default function CategoryIndex({ categories }: Props) {
    const handleDelete = (category: Category) => {
        if (confirm(`Are you sure you want to delete the category "${category.name}"?`)) {
            router.delete(`/admin/categories/${category.id}`, {
                onSuccess: () => {
                    toast.success('Category deleted successfully');
                },
                onError: () => {
                    toast.error('Failed to delete category');
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            
            <div className="container mx-auto py-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Categories</CardTitle>
                        <Button
                            onClick={() => router.visit('/admin/categories/create')}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Category
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4">Name</th>
                                        <th className="text-left py-3 px-4">Slug</th>
                                        <th className="text-left py-3 px-4">Description</th>
                                        <th className="text-right py-3 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category) => (
                                        <tr key={category.id} className="border-b">
                                            <td className="py-3 px-4">{category.name}</td>
                                            <td className="py-3 px-4">{category.slug}</td>
                                            <td className="py-3 px-4">{category.description}</td>
                                            <td className="py-3 px-4 text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => router.visit(`/admin/categories/${category.id}/edit`)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(category)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 