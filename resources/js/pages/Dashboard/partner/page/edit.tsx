import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface Partner {
    id: number;
    name: string;
    logo: string;
    website: string;
    order: number;
    is_active: boolean;
}

interface Props {
    partner: Partner;
}

export default function EditPartner({ partner }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: partner.name,
        logo: null as File | null,
        website: partner.website,
        order: partner.order,
        is_active: partner.is_active,
        _method: 'POST'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('partners.update', partner.id));
    };

    return (
        <AppLayout>
            <Head title="Edit Partner" />

            <div className="container mx-auto py-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h1 className="text-2xl font-bold mb-6">Edit Partner</h1>

                        <div className="mb-6">
                            <Label>Current Logo</Label>
                            <img 
                                src={`/storage/${partner.logo}`} 
                                alt={partner.name} 
                                className="w-32 h-32 object-contain mt-2 grayscale"
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="mt-1"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="logo">New Logo</Label>
                                <Input
                                    id="logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setData('logo', e.target.files?.[0] || null)}
                                    className="mt-1"
                                />
                                {errors.logo && (
                                    <p className="text-red-500 text-sm mt-1">{errors.logo}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="website">Website URL</Label>
                                <Input
                                    id="website"
                                    type="url"
                                    value={data.website}
                                    onChange={e => setData('website', e.target.value)}
                                    className="mt-1"
                                    placeholder="https://"
                                />
                                {errors.website && (
                                    <p className="text-red-500 text-sm mt-1">{errors.website}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="order">Display Order</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={data.order}
                                    onChange={e => setData('order', parseInt(e.target.value))}
                                    className="mt-1"
                                />
                                {errors.order && (
                                    <p className="text-red-500 text-sm mt-1">{errors.order}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={checked => setData('is_active', checked)}
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>

                            <div className="flex justify-end gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Update Partner
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 