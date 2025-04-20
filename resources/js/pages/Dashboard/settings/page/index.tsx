import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface Settings {
    github_url: string | null;
    linkedin_url: string | null;
    twitter_url: string | null;
    facebook_url: string | null;
    cv_path: string | null;
    cv_name: string | null;
    blog_title: string | null;
    blog_description: string | null;
    posts_per_page: string | null;
    show_author: string | null;
    show_date: string | null;
    enable_comments: string | null;
}

interface Props {
    settings: Settings;
}

export default function Settings({ settings }: Props) {
    const [formData, setFormData] = useState({
        github_url: settings.github_url || '',
        linkedin_url: settings.linkedin_url || '',
        twitter_url: settings.twitter_url || '',
        facebook_url: settings.facebook_url || '',
        blog_title: settings.blog_title || '',
        blog_description: settings.blog_description || '',
        posts_per_page: settings.posts_per_page || '10',
        show_author: settings.show_author === 'true',
        show_date: settings.show_date === 'true',
        enable_comments: settings.enable_comments === 'true',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSwitchChange = (name: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: !prev[name as keyof typeof prev]
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Convert boolean values to strings for the API
        const apiFormData = {
            ...formData,
            show_author: formData.show_author.toString(),
            show_date: formData.show_date.toString(),
            enable_comments: formData.enable_comments.toString(),
        };

        router.post('/admin/settings', apiFormData, {
            onSuccess: () => {
                setIsSubmitting(false);
                toast.success('Settings updated successfully');
            },
            onError: (errors) => {
                setIsSubmitting(false);
                setErrors(errors);
                toast.error('Please correct the errors in the form');
            }
        });
    };

    const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('cv', file);

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (!csrfToken) {
            toast.error('CSRF token not found');
            return;
        }

        fetch('/admin/settings/upload-cv', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        })
        .catch(error => {
            toast.error('Error uploading CV');
            console.error('Error:', error);
        });
    };

    return (
        <AppLayout>
            <Head title="Settings" />

            <div className="container mx-auto py-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold mb-6">Settings</h1>

                    <div className="grid grid-cols-1 gap-8">
                        {/* Social Media Links */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Social Media Links</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="github_url">GitHub URL</Label>
                                    <Input
                                        id="github_url"
                                        name="github_url"
                                        type="url"
                                        value={formData.github_url}
                                        onChange={handleInputChange}
                                        placeholder="https://github.com/yourusername"
                                        className={errors.github_url ? 'border-red-500' : ''}
                                    />
                                    {errors.github_url && (
                                        <p className="mt-1 text-sm text-red-500">{errors.github_url}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                                    <Input
                                        id="linkedin_url"
                                        name="linkedin_url"
                                        type="url"
                                        value={formData.linkedin_url}
                                        onChange={handleInputChange}
                                        placeholder="https://linkedin.com/in/yourusername"
                                        className={errors.linkedin_url ? 'border-red-500' : ''}
                                    />
                                    {errors.linkedin_url && (
                                        <p className="mt-1 text-sm text-red-500">{errors.linkedin_url}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="twitter_url">Twitter URL</Label>
                                    <Input
                                        id="twitter_url"
                                        name="twitter_url"
                                        type="url"
                                        value={formData.twitter_url}
                                        onChange={handleInputChange}
                                        placeholder="https://twitter.com/yourusername"
                                        className={errors.twitter_url ? 'border-red-500' : ''}
                                    />
                                    {errors.twitter_url && (
                                        <p className="mt-1 text-sm text-red-500">{errors.twitter_url}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="facebook_url">Facebook URL</Label>
                                    <Input
                                        id="facebook_url"
                                        name="facebook_url"
                                        type="url"
                                        value={formData.facebook_url}
                                        onChange={handleInputChange}
                                        placeholder="https://facebook.com/yourusername"
                                        className={errors.facebook_url ? 'border-red-500' : ''}
                                    />
                                    {errors.facebook_url && (
                                        <p className="mt-1 text-sm text-red-500">{errors.facebook_url}</p>
                                    )}
                                </div>

                                {/* Blog Settings */}
                                <div className="mt-8">
                                    <h2 className="text-xl font-semibold mb-4">Blog Settings</h2>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="blog_title">Blog Title</Label>
                                            <Input
                                                id="blog_title"
                                                name="blog_title"
                                                type="text"
                                                value={formData.blog_title}
                                                onChange={handleInputChange}
                                                placeholder="My Blog"
                                                className={errors.blog_title ? 'border-red-500' : ''}
                                            />
                                            {errors.blog_title && (
                                                <p className="mt-1 text-sm text-red-500">{errors.blog_title}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="blog_description">Blog Description</Label>
                                            <Textarea
                                                id="blog_description"
                                                name="blog_description"
                                                value={formData.blog_description}
                                                onChange={handleInputChange}
                                                placeholder="Welcome to my blog..."
                                                className={errors.blog_description ? 'border-red-500' : ''}
                                            />
                                            {errors.blog_description && (
                                                <p className="mt-1 text-sm text-red-500">{errors.blog_description}</p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="posts_per_page">Posts Per Page</Label>
                                            <Input
                                                id="posts_per_page"
                                                name="posts_per_page"
                                                type="number"
                                                value={formData.posts_per_page}
                                                onChange={handleInputChange}
                                                min="1"
                                                max="50"
                                                className={errors.posts_per_page ? 'border-red-500' : ''}
                                            />
                                            {errors.posts_per_page && (
                                                <p className="mt-1 text-sm text-red-500">{errors.posts_per_page}</p>
                                            )}
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="show_author"
                                                checked={formData.show_author}
                                                onCheckedChange={() => handleSwitchChange('show_author')}
                                            />
                                            <Label htmlFor="show_author">Show Author</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="show_date"
                                                checked={formData.show_date}
                                                onCheckedChange={() => handleSwitchChange('show_date')}
                                            />
                                            <Label htmlFor="show_date">Show Date</Label>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="enable_comments"
                                                checked={formData.enable_comments}
                                                onCheckedChange={() => handleSwitchChange('enable_comments')}
                                            />
                                            <Label htmlFor="enable_comments">Enable Comments</Label>
                                        </div>
                                    </div>
                                </div>

                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </form>
                        </div>

                        {/* CV Upload */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">CV Management</h2>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="cv">Upload CV</Label>
                                    <div className="mt-2">
                                        <Input
                                            id="cv"
                                            type="file"
                                            onChange={handleCVUpload}
                                            accept=".pdf,.doc,.docx"
                                        />
                                        <p className="mt-1 text-sm text-gray-500">
                                            Accepted formats: PDF, DOC, DOCX. Max size: 10MB
                                        </p>
                                    </div>
                                </div>

                                {settings.cv_path && (
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-600">
                                            Current CV: {settings.cv_name}
                                        </span>
                                        <a
                                            href="/admin/settings/download-cv"
                                            className="text-purple-600 hover:text-purple-700 text-sm"
                                            download
                                        >
                                            Download
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 