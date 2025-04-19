import React from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

interface Props {
    category?: Category;
    isEditing?: boolean;
}

export default function CategoryForm({ category, isEditing = false }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name ?? '',
        slug: category?.slug ?? '',
        description: category?.description ?? ''
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard'
        },
        {
            title: 'Categories',
            href: '/admin/categories'
        },
        {
            title: isEditing ? 'Edit Category' : 'Create Category',
            href: isEditing ? `/admin/categories/${category?.id}/edit` : '/admin/categories/create'
        }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEditing && category) {
            put(`/admin/categories/${category.id}`, {
                onSuccess: () => {
                    toast.success('Category updated successfully');
                },
                onError: () => {
                    toast.error('Failed to update category');
                }
            });
        } else {
            post('/admin/categories', {
                onSuccess: () => {
                    toast.success('Category created successfully');
                },
                onError: () => {
                    toast.error('Failed to create category');
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEditing ? 'Edit Category' : 'Create Category'} />
            
            <div className="container mx-auto py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{isEditing ? 'Edit Category' : 'Create Category'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    error={errors.name}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={e => setData('slug', e.target.value)}
                                    error={errors.slug}
                                />
                                {errors.slug && (
                                    <p className="text-sm text-red-500">{errors.slug}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    error={errors.description}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">{errors.description}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.visit('/admin/categories')}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {isEditing ? 'Update' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 