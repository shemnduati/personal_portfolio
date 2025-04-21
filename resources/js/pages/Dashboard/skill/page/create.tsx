import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface FormData {
    name: string;
    description: string;
    icon: File | null;
    proficiency: number;
    order: number;
    is_active: boolean;
}

export default function SkillCreate() {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        name: '',
        description: '',
        icon: null,
        proficiency: 0,
        order: 0,
        is_active: true,
    });

    const [iconPreview, setIconPreview] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('proficiency', data.proficiency.toString());
        formData.append('order', data.order.toString());
        formData.append('is_active', data.is_active.toString());
        
        if (data.icon) {
            formData.append('icon', data.icon);
        }

        post('/admin/skills', {
            data: formData,
            forceFormData: true,
        });
    };

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('icon', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIconPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setIconPreview(null);
        }
    };

    return (
        <AppLayout>
            <Head title="Create Skill" />

            <div className="container mx-auto py-6">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h1 className="text-2xl font-bold mb-6">Create Skill</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="proficiency">Proficiency (%)</Label>
                                    <Input
                                        id="proficiency"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={data.proficiency}
                                        onChange={e => setData('proficiency', parseInt(e.target.value))}
                                    />
                                    {errors.proficiency && (
                                        <p className="text-sm text-red-500">{errors.proficiency}</p>
                                    )}
                                </div>
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

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="icon">Icon</Label>
                                    <Input
                                        id="icon"
                                        type="file"
                                        accept="image/*,.svg"
                                        onChange={handleIconChange}
                                    />
                                    {errors.icon && (
                                        <p className="text-sm text-red-500">{errors.icon}</p>
                                    )}
                                    {iconPreview && (
                                        <img
                                            src={iconPreview}
                                            alt="Icon Preview"
                                            className="mt-2 h-20 object-contain"
                                        />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="order">Order</Label>
                                    <Input
                                        id="order"
                                        type="number"
                                        value={data.order}
                                        onChange={e => setData('order', parseInt(e.target.value))}
                                    />
                                    {errors.order && (
                                        <p className="text-sm text-red-500">{errors.order}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => 
                                        setData('is_active', checked as boolean)
                                    }
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
                                    Create Skill
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 