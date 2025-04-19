import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { 
  ArrowLeft,
  Save,
  Upload,
  X
} from 'lucide-react';

// Define types for our data
interface Technology {
  id: number;
  name: string;
  slug: string;
}

interface PageProps {
  [key: string]: any;
  technologies: Technology[];
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
    title: 'Projects',
    href: '/admin/projects',
  },
  {
    title: 'Create Project',
    href: '/admin/projects/create',
  },
];

function ProjectCreateContent() {
  const { technologies, flash } = usePage<PageProps>().props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    featured_image_path: '',
    github_url: '',
    live_url: '',
    is_featured: false,
    technologies: [] as number[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    
    router.post('/admin/projects', formData, {
      onSuccess: () => {
        setIsSubmitting(false);
        toast.success('Project created successfully');
      },
      onError: (errors) => {
        setIsSubmitting(false);
        setErrors(errors);
        toast.error('Please correct the errors in the form');
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => router.visit('/admin/projects')}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Create New Project</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm ${errors.title ? 'border-red-500' : ''}`}
                required
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm ${errors.description ? 'border-red-500' : ''}`}
                required
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Full Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                rows={10}
                value={formData.content}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm ${errors.content ? 'border-red-500' : ''}`}
                required
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
              )}
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Featured Image
              </label>
              <div className="mt-1 flex items-center">
                <div className="flex-shrink-0 h-32 w-32 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <Upload className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="ml-4">
                  <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    <span>Upload image</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isSubmitting}
                    />
                  </label>
                  {formData.featured_image_path && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, featured_image_path: '' }));
                        setImagePreview(null);
                      }}
                      className="ml-2 text-sm text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              {errors.featured_image_path && (
                <p className="mt-1 text-sm text-red-600">{errors.featured_image_path}</p>
              )}
            </div>

            {/* GitHub URL */}
            <div>
              <label htmlFor="github_url" className="block text-sm font-medium text-gray-700">
                GitHub URL
              </label>
              <input
                type="url"
                id="github_url"
                name="github_url"
                value={formData.github_url}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm ${errors.github_url ? 'border-red-500' : ''}`}
              />
              {errors.github_url && (
                <p className="mt-1 text-sm text-red-600">{errors.github_url}</p>
              )}
            </div>

            {/* Live URL */}
            <div>
              <label htmlFor="live_url" className="block text-sm font-medium text-gray-700">
                Live URL
              </label>
              <input
                type="url"
                id="live_url"
                name="live_url"
                value={formData.live_url}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm ${errors.live_url ? 'border-red-500' : ''}`}
              />
              {errors.live_url && (
                <p className="mt-1 text-sm text-red-600">{errors.live_url}</p>
              )}
            </div>

            {/* Technologies */}
            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
                Technologies
              </label>
              <select
                id="technologies"
                name="technologies"
                multiple
                value={formData.technologies.map(String)}
                onChange={handleTechnologyChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm ${errors.technologies ? 'border-red-500' : ''}`}
                size={5}
              >
                {technologies.map(tech => (
                  <option key={tech.id} value={tech.id}>
                    {tech.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple technologies</p>
              {errors.technologies && (
                <p className="mt-1 text-sm text-red-600">{errors.technologies}</p>
              )}
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_featured"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700">
                Feature this project
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={() => router.visit('/admin/projects')}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center">
                  <Save className="w-4 h-4 mr-2" />
                  Save Project
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProjectCreate() {
  return (
    <AppLayout
      title="Create Project"
      breadcrumbs={breadcrumbs}
    >
      <Head title="Create Project" />
      <ErrorBoundary>
        <ProjectCreateContent />
      </ErrorBoundary>
    </AppLayout>
  );
} 