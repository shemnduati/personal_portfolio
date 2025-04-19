import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Blog } from '@/types/blog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { router } from '@inertiajs/react';

interface Props extends PageProps {
    blog: Blog;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Blog',
    href: '/admin/blogs',
  },
  {
    title: 'Preview Blog',
    href: '#',
  },
];

export default function BlogPreview({ blog }: Props) {
    useEffect(() => {
        console.log('Blog data:', blog);
        console.log('Featured image URL:', blog.featured_image_url);
        console.log('Featured image path:', blog.featured_image_path);
    }, [blog]);

    const getImageUrl = (path: string | null) => {
        if (!path) return null;
        // If the path already starts with http or https, return it as is
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        // If the path starts with /storage, return it as is
        if (path.startsWith('/storage/')) {
            return path;
        }
        // Otherwise, prepend /storage/
        return `/storage/${path}`;
    };

    const imageUrl = getImageUrl(blog.featured_image_path);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Preview: ${blog.title}`} />
            
            <div className="container mx-auto py-8">
                <div className="mb-6">
                    <Button
                        variant="outline"
                        onClick={() => router.visit('/admin/blogs')}
                        className="mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blogs
                    </Button>
                </div>

                <article className="prose prose-lg mx-auto">
                    {imageUrl && (
                        <div className="mb-8">
                            <img
                                src={imageUrl}
                                alt={blog.title}
                                className="w-full h-auto rounded-lg shadow-lg"
                                onError={(e) => {
                                    console.error('Image failed to load:', imageUrl);
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                    )}
                    
                    <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                    
                    {blog.category && (
                        <div className="mb-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                {blog.category.name}
                            </span>
                        </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span className="mr-4">Published: {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Not published'}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                            blog.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                            {blog.is_published ? 'Published' : 'Draft'}
                        </span>
                    </div>
                    
                    <div className="text-xl text-gray-600 mb-8">{blog.excerpt}</div>
                    
                    <div 
                        className="blog-content"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </article>
            </div>
        </AppLayout>
    );
} 