import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Link, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { TechnologySelect } from '@/components/ui/technology-select';

// Define types for our data
interface Technology {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  featured_image_path: string;
  github_url: string;
  live_url: string;
  is_featured: boolean;
  technologies: Technology[];
  category_id: number | null;
}

interface PageProps {
  project: Project;
  technologies: Technology[];
  categories: Category[];
}

export default function ProjectEdit({ project, technologies, categories }: PageProps) {
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    content: project.content,
    featured_image_path: project.featured_image_path,
    github_url: project.github_url,
    live_url: project.live_url,
    is_featured: project.is_featured,
    technologies: project.technologies.map(tech => tech.id),
    category_id: project.category_id?.toString() || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleTechnologyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setFormData(prev => ({
      ...prev,
      technologies: selectedOptions
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload the image using fetch instead of Inertia
    const formData = new FormData();
    formData.append('image', file);

    setIsSubmitting(true);
    
    fetch('/admin/upload-image', {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setFormData(prev => ({
            ...prev,
            featured_image_path: data.image_path
          }));
          toast.success('Image uploaded successfully');
        } else {
          toast.error(data.message || 'Failed to upload image');
        }
        setIsSubmitting(false);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image');
        setIsSubmitting(false);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    router.post(route('projects.update', project.id), formData, {
      onSuccess: () => {
        setIsSubmitting(false);
        toast.success('Project updated successfully');
      },
      onError: (errors) => {
        setIsSubmitting(false);
        setErrors(errors);
        toast.error('Please correct the errors in the form');
      }
    });
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <Link href={route('projects.index')} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Edit Project</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                className={errors.content ? 'border-red-500' : ''}
                rows={10}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-500">{errors.content}</p>
              )}
            </div>

            <div>
              <Label htmlFor="category_id">Category</Label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className={`w-full rounded-md border ${errors.category_id ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="mt-1 text-sm text-red-500">{errors.category_id}</p>
              )}
            </div>

            <TechnologySelect
              technologies={technologies}
              selectedTechnologies={formData.technologies}
              onChange={(selectedIds) => {
                setFormData(prev => ({
                  ...prev,
                  technologies: selectedIds
                }));
                if (errors.technologies) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.technologies;
                    return newErrors;
                  });
                }
              }}
              error={errors.technologies}
            />

            <div>
              <Label htmlFor="featured_image">Featured Image</Label>
              <Input
                id="featured_image"
                name="featured_image"
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                className={errors.featured_image_path ? 'border-red-500' : ''}
              />
              {errors.featured_image_path && (
                <p className="mt-1 text-sm text-red-500">{errors.featured_image_path}</p>
              )}
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Project featured image preview"
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}
              {!imagePreview && formData.featured_image_path && (
                <div className="mt-2">
                  <img
                    src={formData.featured_image_path}
                    alt="Current project featured image"
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                name="github_url"
                value={formData.github_url}
                onChange={handleInputChange}
                className={errors.github_url ? 'border-red-500' : ''}
              />
              {errors.github_url && (
                <p className="mt-1 text-sm text-red-500">{errors.github_url}</p>
              )}
            </div>

            <div>
              <Label htmlFor="live_url">Live URL</Label>
              <Input
                id="live_url"
                name="live_url"
                value={formData.live_url}
                onChange={handleInputChange}
                className={errors.live_url ? 'border-red-500' : ''}
              />
              {errors.live_url && (
                <p className="mt-1 text-sm text-red-500">{errors.live_url}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_featured"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <Label htmlFor="is_featured" className="ml-2">
                Featured Project
              </Label>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Project'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
} 