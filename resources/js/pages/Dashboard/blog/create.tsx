import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Button, Input, Textarea } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-dropdown-menu';
import React from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog',
        href: '/admin/blogs'
    }
]

export default function BlogCreate() {

 const { data, setData, post, errors, processing } = useForm({
    title: '',
    content: '',
    excerpt: '',
    featured_image: null as File | null,
    is_published: false,
 });

 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/blogs')
 };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Create Blog post" />
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <CardTitle>Create New Blog Post</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Title */}
                        <div>
                            <Label className="block text-sm font-medium text-gray-700" htmlFor="title">Title</Label>
                            <Input id='title' 
                                    name='title' 
                                    value={data.title} 
                                    onChange={(e) => setData('title', e.target.value)}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm 
                                        ${errors.title 
                                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                          : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'} 
                                        border`}
                            />
                            {errors.title && (
                                <p className='mt-1 text-sm text-red-600'>{errors.title}</p>
                            )}
                        </div>

                        {/* Excerpt */}
                        <div>
                            <Label htmlFor="excerpt">Excerpt</Label>
                            <Textarea
                                id="excerpt"
                                name="excerpt"
                                value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)}
                                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm 
                                    ${errors.title 
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'} 
                                    border`}
                            />
                            {errors.excerpt && (
                            <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
                            )}
                        </div>

                        {/* Content */}
                        <div>
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                            id="content"
                            name="content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className={errors.content ? 'border-red-500' : ''}
                            rows={8}
                            />
                            {errors.content && (
                            <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                            )}
                        </div>

                        {/* Featured Image */}
                        <div>
                            <Label htmlFor="featured_image">Featured Image</Label>
                            
                        </div>

                        {/* Publish Status */}
                        <div className="flex items-center">
                            <Input
                            type="checkbox"
                            id="is_published"
                            name="is_published"
                            checked={data.is_published}
                            onChange={(e) => setData('is_published', e.target.checked)}
                            />
                            <Label htmlFor="is_published" className="ml-2">
                                Publish
                            </Label>
                        </div>

                         {/* Submit Button */}
                        <Button type="submit" disabled={processing}>
                            Create Blog Post
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
  )
}