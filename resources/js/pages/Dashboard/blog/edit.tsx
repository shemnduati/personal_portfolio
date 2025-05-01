import { useState, useEffect, FormEvent } from 'react';
import { Head, router, usePage, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { toast } from 'sonner';
import TipTapEditor from '@/components/tipTapEditor';
import { ImageUpload } from '@/components/ImageUpload';
import { ArrowLeft, Save, Eye, Calendar, Clock, MessageSquare, Minus, Quote, User } from 'lucide-react';
import { motion } from 'framer-react';
import { Editor } from '@tinymce/tinymce-react';
import { Input } from '@/components/ui/input';

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_path: string | null;
  featured_image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category_id: number;
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface PageProps {
  blog: Blog;
  categories: Category[];
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
  const { blog, categories, flash } = usePage<PageProps>().props;
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(blog.featured_image_url);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(blog.tags?.map(tag => tag.name) || []);

  // Debug log for tags
  useEffect(() => {
    console.log('Blog tags:', blog.tags);
    console.log('Initialized tags state:', tags);
  }, [blog.tags, tags]);

  const { data, setData, post, processing, errors } = useForm({
    title: blog.title,
    content: blog.content,
    excerpt: blog.excerpt,
    featured_image: null as File | null,
    is_published: blog.is_published,
    meta_title: blog.meta_title,
    meta_description: blog.meta_description,
    published_at:blog.published_at,
    category_id: blog.category_id.toString(),
    tags: tags
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Create a data object that includes all form fields
    const submitData = {
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      is_published: data.is_published,
      meta_title: data.meta_title || '',
      meta_description: data.meta_description || '',
      category_id: data.category_id,
      tags: JSON.stringify(tags), // Ensure tags are sent as a JSON string
    };
    
    // If there's a featured image, use FormData
    if (data.featured_image) {
      const formData = new FormData();
      formData.append('featured_image', data.featured_image);
      
      // Add all other fields to FormData
      Object.entries(submitData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      
      // Debug log
      console.log('Submitting with FormData:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      // Use Inertia's post method with FormData
      post(`/admin/blogs/${blog.id}`, formData, {
        onSuccess: () => {
          toast.success('Blog updated successfully');
          router.visit('/admin/blogs');
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
    } else {
      // Debug log
      console.log('Submitting with regular data:', submitData);
      
      // Use Inertia's post method with regular data
      post(`/admin/blogs/${blog.id}`, submitData, {
        onSuccess: () => {
          toast.success('Blog updated successfully');
          router.visit('/admin/blogs');
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
    }
  };

  const handleImageChange = (file: File) => {
    setData('featured_image', file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        setData('tags', updatedTags);
        console.log('Added tag:', newTag, 'Current tags:', updatedTags);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    setData('tags', updatedTags);
    console.log('Removed tag:', tagToRemove, 'Current tags:', updatedTags);
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Blog" />

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
          {/* Header with back button and actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <button
                onClick={() => router.visit('/admin/blogs')}
                className="mr-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Back to blogs"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Edit Blog Post</h1>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => router.visit(`/admin/blogs/${blog.id}/preview`)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Blog metadata */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Created: {formatDate(blog.created_at)}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Updated: {formatDate(blog.updated_at)}
                </span>
              </div>
              <div className="flex items-center">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  blog.is_published 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {blog.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          </div>

          {/* Main form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={data.category_id}
                    onChange={(e) => setData('category_id', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    value={data.excerpt}
                    onChange={(e) => setData('excerpt', e.target.value)}
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="content">Content <span className="text-red-500">*</span></label>
              <div className="mt-1">
                <Editor
                  id="content"
                  apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                  value={data.content}
                  onEditorChange={(content) => {
                    setData('content', content);
                    // No need for error clearing here as setData handles it
                  }}
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
              </div>
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Featured Image</h2>
              <div className="mt-1">
                <ImageUpload
                  value={imagePreview}
                  onChange={handleImageChange}
                  label="Featured Image"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Publication Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="is_published"
                      checked={data.is_published}
                      onChange={(e) => setData('is_published', e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="is_published" className="text-sm font-medium text-gray-700">
                      Publish this blog post
                    </label>
                    <p className="text-sm text-gray-500">
                      When published, this post will be visible to all visitors
                    </p>
                  </div>
                </div>

                {data.is_published && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <label htmlFor="published_at" className="block text-sm font-medium text-gray-700 mb-2">
                      Publication Date
                    </label>
                    <div className="flex items-center space-x-4">
                      <Input
                        type="datetime-local"
                        id="published_at"
                        value={data.published_at}
                        onChange={(e) => setData('published_at', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setData('published_at', new Date().toISOString().slice(0, 16))}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Set to now
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Schedule when this post should be published. Leave empty to publish immediately.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tags Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Tags</h2>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[42px]">
                  {tags.length > 0 ? (
                    tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-purple-600 hover:text-purple-800 focus:outline-none"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No tags added yet</span>
                  )}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                    placeholder="Type a tag and press Enter"
                    className="flex-1 min-w-[120px] bg-transparent border-0 focus:ring-0 p-0 text-sm placeholder-gray-400"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Press Enter to add a tag
                </p>
                <div className="text-xs text-gray-400">
                  Debug: {tags.length} tags loaded
                </div>
              </div>
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
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
} 