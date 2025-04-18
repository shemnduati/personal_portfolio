import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import TipTapEditor from '@/components/TipTapEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Eye, Save, Send } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog',
        href: '/admin/blogs'
    }
]

interface BlogFormData {
    title: string;
    content: string;
    image: File | null;
    isPublished: boolean;
    excerpt: string;
}

export default function CreateBlog() {
    const [activeTab, setActiveTab] = useState('edit');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        excerpt: '',
        featured_image: null as File | null,
        is_published: false as boolean,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('excerpt', data.excerpt);
        formData.append('is_published', data.is_published.toString());
        
        if (data.featured_image) {
            formData.append('featured_image', data.featured_image);
        }
        
        post('/blogs', {
            onSuccess: () => {
                toast.success('Blog post created successfully!');
                // Redirect to blog index page
                router.visit('/admin/blogs');
            },
            onError: () => {
                toast.error('Failed to create blog post. Please check your inputs.');
            },
            preserveScroll: true,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('featured_image', file);
            
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const togglePublish = () => {
        setData('is_published', !data.is_published);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Blog Post" />
            
            <div className="container mx-auto py-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Create New Blog Post</CardTitle>
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="publish-status">Publish</Label>
                            <Switch 
                                id="publish-status" 
                                checked={data.is_published} 
                                onCheckedChange={togglePublish} 
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Enter blog title"
                                            required
                                            className={errors.title ? 'border-red-500' : ''}
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-red-500">{errors.title}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="excerpt">Excerpt</Label>
                                        <Input
                                            id="excerpt"
                                            type="text"
                                            value={data.excerpt}
                                            onChange={(e) => setData('excerpt', e.target.value)}
                                            placeholder="Brief summary of your blog post"
                                            required
                                            className={errors.excerpt ? 'border-red-500' : ''}
                                        />
                                        {errors.excerpt && (
                                            <p className="text-sm text-red-500">{errors.excerpt}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="content">Content</Label>
                                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                                            <TabsList className="mb-2">
                                                <TabsTrigger value="edit">Edit</TabsTrigger>
                                                <TabsTrigger value="preview">Preview</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="edit">
                                                <TipTapEditor
                                                    content={data.content}
                                                    onChange={(content) => setData('content', content)}
                                                    placeholder="Write your blog content here..."
                                                />
                                                {errors.content && (
                                                    <p className="text-sm text-red-500 mt-1">{errors.content}</p>
                                                )}
                                            </TabsContent>
                                            <TabsContent value="preview">
                                                <div className="border rounded-md p-4 min-h-[300px] prose max-w-none">
                                                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="featured_image">Featured Image</Label>
                                        <div className="border-2 border-dashed rounded-md p-4 text-center">
                                            {imagePreview ? (
                                                <div className="space-y-2">
                                                    <img 
                                                        src={imagePreview} 
                                                        alt="Preview" 
                                                        className="mx-auto max-h-40 rounded-md"
                                                    />
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        onClick={() => {
                                                            setData('featured_image', null);
                                                            setImagePreview(null);
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <Input
                                                        id="featured_image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        className="hidden"
                                                    />
                                                    <Label 
                                                        htmlFor="featured_image" 
                                                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                                                    >
                                                        Click to upload an image
                                                    </Label>
                                                    <p className="text-xs text-gray-500">
                                                        PNG, JPG, GIF up to 2MB
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        {errors.featured_image && (
                                            <p className="text-sm text-red-500">{errors.featured_image}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>SEO Settings</Label>
                                        <div className="space-y-2 p-4 border rounded-md">
                                            <div className="space-y-1">
                                                <Label htmlFor="meta-title" className="text-sm">Meta Title</Label>
                                                <Input
                                                    id="meta-title"
                                                    type="text"
                                                    placeholder="SEO title (optional)"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="meta-description" className="text-sm">Meta Description</Label>
                                                <Input
                                                    id="meta-description"
                                                    type="text"
                                                    placeholder="SEO description (optional)"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <CardFooter className="flex justify-end space-x-2 pt-6">
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={() => {
                                        setData('is_published', false);
                                        post('/blogs', {
                                            onSuccess: () => {
                                                toast.success('Blog post saved as draft!');
                                                // Redirect to blog index page
                                                router.visit('/admin/blogs');
                                            },
                                            onError: () => {
                                                toast.error('Failed to save blog post as draft. Please try again.');
                                            },
                                        });
                                    }}
                                    disabled={processing}
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    Save as Draft
                                </Button>
                                <Button 
                                    type="submit"
                                    disabled={processing}
                                >
                                    <Send className="mr-2 h-4 w-4" />
                                    {data.is_published ? 'Publish' : 'Save'}
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}