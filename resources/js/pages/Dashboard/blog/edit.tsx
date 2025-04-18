import { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { toast } from 'sonner';
import { TipTapEditor } from '@/components/TipTapEditor';
import { ImageUpload } from '@/components/ImageUpload';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_path: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface PageProps {
  blog: Blog;
  flash: {
    success?: string;
    error?: string;
  };
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
    title: 'Edit Blog',
    href: '#',
  },
];

export default function EditBlog() {
  const { blog, flash } = usePage<PageProps>().props;
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(blog.featured_image_path);
  const [formData, setFormData] = useState({
    title: blog.title,
    excerpt: blog.excerpt,
    content: blog.content,
    is_published: blog.is_published,
    published_at: blog.published_at ? new Date(blog.published_at).toISOString().split('T')[0] : '',
    featured_image: null as File | null,
  });

  // Show toast notification if there's a flash message
  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('excerpt', formData.excerpt);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('is_published', formData.is_published.toString());
    if (formData.published_at) {
      formDataToSend.append('published_at', formData.published_at);
    }
    if (formData.featured_image) {
      formDataToSend.append('featured_image', formData.featured_image);
    }

    router.post(`/admin/blogs/${blog.id}`, formDataToSend, {
      onSuccess: () => {
        toast.success('Blog post updated successfully');
      },
      onError: (errors) => {
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key]);
        });
      },
      onFinish: () => {
        setIsLoading(false);
      },
    });
  };

  const handleImageChange = (file: File) => {
    setFormData(prev => ({ ...prev, featured_image: file }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Blog" />

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Blog Post</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <div className="mt-1">
                <TipTapEditor
                  content={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Featured Image
              </label>
              <div className="mt-1">
                <ImageUpload
                  currentImage={imagePreview}
                  onImageChange={handleImageChange}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="is_published" className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={formData.is_published}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Published</span>
                </label>
              </div>

              {formData.is_published && (
                <div>
                  <label htmlFor="published_at" className="block text-sm font-medium text-gray-700">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    id="published_at"
                    value={formData.published_at}
                    onChange={(e) => setFormData(prev => ({ ...prev, published_at: e.target.value }))}
                    className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.visit('/admin/blogs')}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
} 