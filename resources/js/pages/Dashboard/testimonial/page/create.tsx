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
    role: string;
    quote: string;
    company_logo: File | null;
    avatar: File | null;
    order: number;
    is_active: boolean;
}

export default function TestimonialCreate() {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        name: '',
        role: '',
        quote: '',
        company_logo: null,
        avatar: null,
        order: 0,
        is_active: true,
    });

    const [companyLogoPreview, setCompanyLogoPreview] = useState<string | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        
        formData.append('name', data.name);
        formData.append('role', data.role);
        formData.append('quote', data.quote);
        formData.append('order', data.order.toString());
        formData.append('is_active', data.is_active.toString());
        
        if (data.company_logo) {
            formData.append('company_logo', data.company_logo);
        }
        if (data.avatar) {
            formData.append('avatar', data.avatar);
        }

        post('/admin/testimonials', {
            data: formData,
            forceFormData: true,
        });
    };

    const handleCompanyLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('company_logo', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCompanyLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setCompanyLogoPreview(null);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('avatar', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setAvatarPreview(null);
        }
    };

    return (
        <AppLayout>
            <Head title="Create Testimonial" />

            <div className="container mx-auto py-6">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h1 className="text-2xl font-bold mb-6">Create Testimonial</h1>

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
                                    <Label htmlFor="role">Role</Label>
                                    <Input
                                        id="role"
                                        value={data.role}
                                        onChange={e => setData('role', e.target.value)}
                                    />
                                    {errors.role && (
                                        <p className="text-sm text-red-500">{errors.role}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="quote">Quote</Label>
                                <Textarea
                                    id="quote"
                                    value={data.quote}
                                    onChange={e => setData('quote', e.target.value)}
                                    rows={4}
                                />
                                {errors.quote && (
                                    <p className="text-sm text-red-500">{errors.quote}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="company_logo">Company Logo</Label>
                                    <Input
                                        id="company_logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCompanyLogoChange}
                                    />
                                    {errors.company_logo && (
                                        <p className="text-sm text-red-500">{errors.company_logo}</p>
                                    )}
                                    {companyLogoPreview && (
                                        <img
                                            src={companyLogoPreview}
                                            alt="Company Logo Preview"
                                            className="mt-2 h-20 object-contain"
                                        />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="avatar">Avatar</Label>
                                    <Input
                                        id="avatar"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                    />
                                    {errors.avatar && (
                                        <p className="text-sm text-red-500">{errors.avatar}</p>
                                    )}
                                    {avatarPreview && (
                                        <img
                                            src={avatarPreview}
                                            alt="Avatar Preview"
                                            className="mt-2 w-20 h-20 rounded-full object-cover"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
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

                                <div className="flex items-center space-x-2 pt-8">
                                    <Checkbox
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => 
                                            setData('is_active', checked as boolean)
                                        }
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>
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
                                    Create Testimonial
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 