import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

interface Service {
    id: number;
    title: string;
    description: string;
    icon: string;
    order: number;
    is_active: boolean;
}

interface Props {
    service: Service;
}

export default function ServiceEdit({ service }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: service.title,
        description: service.description,
        icon: null as File | null,
        order: service.order,
        is_active: service.is_active,
        _method: 'PUT',
    });

    const [iconPreview, setIconPreview] = useState<string>(service.icon ? `/storage/${service.icon}` : '');

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setData('icon', file);
            setIconPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/services/${service.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Service" />

            <div className="container py-8">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold mb-8">Edit Service</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                            />
                            {errors.title && (
                                <p className="text-sm text-red-500">{errors.title}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={4}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="icon">Icon</Label>
                            <Input
                                id="icon"
                                type="file"
                                accept="image/*"
                                onChange={handleIconChange}
                            />
                            {errors.icon && (
                                <p className="text-sm text-red-500">{errors.icon}</p>
                            )}
                            {iconPreview && (
                                <div className="mt-2">
                                    <img
                                        src={iconPreview}
                                        alt="Icon preview"
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order">Order</Label>
                            <Input
                                id="order"
                                type="number"
                                value={data.order}
                                onChange={e => setData('order', Number(e.target.value))}
                            />
                            {errors.order && (
                                <p className="text-sm text-red-500">{errors.order}</p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                            />
                            <Label htmlFor="is_active">Active</Label>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                Update Service
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
} 