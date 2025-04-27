import React, { useState, FormEvent } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import TipTapEditor from '@/components/TipTapEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Eye, Save, Send } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Minus, Quote, User } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard'
    },
    {
        title: 'Blog',
        href: '/admin/blogs'
    },
    {
        title: 'Create Blog',
        href: '/admin/blogs/create'
    }
];

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface PageProps {
    categories: Category[];
    [key: string]: any;
}

interface BlogFormData {
    title: string;
    content: string;
    image: File | null;
    isPublished: boolean;
    excerpt: string;
    meta_title: string | null;
    meta_description: string | null;
    category_id: string;
    tags: string[];
}

export default function CreateBlog({ categories }: PageProps) {
    const [activeTab, setActiveTab] = useState('edit');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    
    const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    content: '',
    excerpt: '',
    featured_image: null as File | null,
        is_published: false as boolean,
        meta_title: null as string | null,
        meta_description: null as string | null,
        category_id: '' as string,
        tags: [] as string[]
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        // Create a data object that includes all form fields
        const submitData = {
            title: data.title,
            content: data.content,
            excerpt: data.excerpt,
            is_published: Boolean(data.is_published), // Ensure boolean value
            meta_title: data.meta_title || '',
            meta_description: data.meta_description || '',
            category_id: data.category_id,
            tags: JSON.stringify(tags), // Always stringify tags
        };
        
        // If there's a featured image, use FormData
        if (data.featured_image) {
            const formData = new FormData();
            formData.append('featured_image', data.featured_image);
            
            // Add all other fields to FormData
            Object.entries(submitData).forEach(([key, value]) => {
                if (key === 'is_published') {
                    formData.append(key, value ? '1' : '0'); // Convert boolean to string
                } else {
                    formData.append(key, value.toString());
                }
            });
            
            // Debug the FormData
            console.log('Submitting with FormData:');
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            
            // Use Inertia's post method with FormData
            router.post('/admin/blogs', formData, {
                onSuccess: () => {
                    toast.success('Blog post created successfully!');
                },
                onError: (errors) => {
                    toast.error('Failed to create blog post. Please check the form for errors.');
                    console.error('Form submission errors:', errors);
                }
            });
        } else {
            // Debug the regular form data
            console.log('Submitting with regular data:', submitData);
            
            // Use Inertia's post method with regular data
            router.post('/admin/blogs', submitData, {
                onSuccess: () => {
                    toast.success('Blog post created successfully!');
                },
                onError: (errors) => {
                    toast.error('Failed to create blog post. Please check the form for errors.');
                    console.error('Form submission errors:', errors);
                }
            });
        }
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

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim()) {
    e.preventDefault();
            console.log('Adding tag:', tagInput.trim());
            if (!tags.includes(tagInput.trim())) {
                const newTags = [...tags, tagInput.trim()];
                console.log('Updated tags:', newTags);
                setTags(newTags);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        console.log('Removing tag:', tagToRemove);
        const newTags = tags.filter(tag => tag !== tagToRemove);
        console.log('Updated tags after removal:', newTags);
        setTags(newTags);
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
                                        <Label htmlFor="category">Category</Label>
                                        <Select
                                            value={data.category_id}
                                            onValueChange={(value) => setData('category_id', value)}
                                        >
                                            <SelectTrigger className={errors.category_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.category_id && (
                                            <p className="text-sm text-red-500">{errors.category_id}</p>
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
                                                    value={data.meta_title || ''}
                                                    onChange={(e) => setData('meta_title', e.target.value)}
                                                    placeholder="SEO title (optional)"
                                                    maxLength={60}
                                                />
                                                <p className="text-xs text-gray-500">
                                                    {data.meta_title ? `${data.meta_title.length}/60 characters` : '0/60 characters'}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="meta-description" className="text-sm">Meta Description</Label>
                                                <Input
                                                    id="meta-description"
                                                    type="text"
                                                    value={data.meta_description || ''}
                                                    onChange={(e) => setData('meta_description', e.target.value)}
                                                    placeholder="SEO description (optional)"
                                                    maxLength={160}
                                                />
                                                <p className="text-xs text-gray-500">
                                                    {data.meta_description ? `${data.meta_description.length}/160 characters` : '0/160 characters'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>

                            {/* Tags Section */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags
                                </label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-2 text-purple-600 hover:text-purple-800"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleTagInputKeyDown}
                                    placeholder="Type a tag and press Enter"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Press Enter to add a tag
                                </p>
                        </div>

                            <CardFooter className="flex justify-end space-x-2 pt-6">
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={() => {
                                        setData('is_published', false);
                                        router.post('/admin/blogs', {
                                            ...data,
                                            tags: JSON.stringify(tags)
                                        }, {
                                            onSuccess: () => {
                                                toast.success('Blog post saved as draft!');
                                                router.visit('/admin/blogs');
                                            },
                                            onError: (errors) => {
                                                toast.error('Failed to save blog post as draft.');
                                                console.error('Form submission errors:', errors);
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