import { useState, useEffect, useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Link, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { ArrowLeft, X, Check, Search } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';

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

export default function ProjectEdit({ project, technologies = [], categories = [] }: PageProps) {
  const [formData, setFormData] = useState({
    title: project.title || '',
    description: project.description || '',
    content: project.content || '',
    featured_image_path: project.featured_image_path || '',
    github_url: project.github_url || '',
    live_url: project.live_url || '',
    is_featured: project.is_featured || false,
    technologies: project.technologies?.map(tech => tech.id) || [],
    category_id: project.category_id?.toString() || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(project.featured_image_path ? `/storage/${project.featured_image_path}` : null);
  const [isTechDropdownOpen, setIsTechDropdownOpen] = useState(false);
  const [techSearch, setTechSearch] = useState('');
  const techDropdownRef = useRef<HTMLDivElement>(null);

  // Function to get the full image URL
  const getImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    return `/storage/${path}`;
  };

  // Filter technologies based on search
  const filteredTechnologies = technologies.filter(tech =>
    tech.name.toLowerCase().includes(techSearch.toLowerCase())
  );

  // Handle click outside to close tech dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (techDropdownRef.current && !techDropdownRef.current.contains(event.target as Node)) {
        setIsTechDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const toggleTechnology = (techId: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(techId)
        ? prev.technologies.filter(id => id !== techId)
        : [...prev.technologies, techId]
    }));
  };

  const removeTechnology = (techId: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(id => id !== techId)
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
    
    // Get CSRF token from the meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    if (!csrfToken) {
      toast.error('CSRF token not found. Please refresh the page.');
      setIsSubmitting(false);
      return;
    }

    // Log the request details
    console.log('Starting image upload:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      csrfToken: csrfToken ? 'Present' : 'Missing'
    });

    fetch('/admin/projects/upload-image', {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRF-TOKEN': csrfToken,
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then(async response => {
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || `Upload failed: ${response.status}`);
        }

        return data;
      })
      .then(data => {
        if (data.success) {
          console.log('Upload successful:', data);
          setFormData(prev => ({
            ...prev,
            featured_image_path: data.image_path
          }));
          setImagePreview(getImageUrl(data.image_path));
          toast.success('Image uploaded successfully');
        } else {
          console.error('Upload failed:', data);
          toast.error(data.message || 'Failed to upload image');
        }
        setIsSubmitting(false);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
        toast.error(`Failed to upload image: ${error.message}`);
        setIsSubmitting(false);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    router.post(route('admin.projects.update', project.id), {
      ...formData,
      _method: 'PUT'
    }, {
      onSuccess: () => {
        setIsSubmitting(false);
        toast.success('Project updated successfully');
        router.visit(route('admin.projects.index'));
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
              <Label htmlFor="content">Full Content <span className="text-red-500">*</span></Label>
              <div className="mt-1">
                <Editor
                  id="content"
                  apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                  value={formData.content}
                  onEditorChange={(content) => {
                    setFormData(prev => ({
                      ...prev,
                      content
                    }));
                    // Clear error when field is edited
                    if (errors.content) {
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.content;
                        return newErrors;
                      });
                    }
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

            <div>
              <Label htmlFor="category_id">Project Category</Label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className={`w-full rounded-md border ${errors.category_id ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2`}
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

            <div className="relative" ref={techDropdownRef}>
              <Label>Technologies</Label>
              <div className="relative">
                <div
                  className={`min-h-[42px] w-full rounded-md border ${
                    errors.technologies ? 'border-red-500' : 'border-gray-300'
                  } bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500 cursor-pointer flex flex-wrap gap-1`}
                  onClick={() => setIsTechDropdownOpen(!isTechDropdownOpen)}
                >
                  {formData.technologies.length === 0 ? (
                    <span className="text-gray-500">Select technologies...</span>
                  ) : (
                    formData.technologies.map(techId => {
                      const tech = technologies.find(t => t.id === techId);
                      return tech ? (
                        <span
                          key={tech.id}
                          className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md text-sm"
                        >
                          {tech.name}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTechnology(tech.id);
                            }}
                            className="hover:text-indigo-900"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ) : null;
                    })
                  )}
                </div>

                {isTechDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-300">
                    <div className="p-2 border-b border-gray-200">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Search technologies..."
                          value={techSearch}
                          onChange={(e) => setTechSearch(e.target.value)}
                          className="pl-8"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                    <div className="max-h-60 overflow-auto p-1">
                      {filteredTechnologies.length === 0 ? (
                        <div className="px-2 py-3 text-sm text-gray-500">No technologies found</div>
                      ) : (
                        filteredTechnologies.map((tech) => (
                          <div
                            key={tech.id}
                            className={`flex items-center justify-between px-2 py-1.5 text-sm rounded-md cursor-pointer hover:bg-gray-100 ${
                              formData.technologies.includes(tech.id) ? 'bg-indigo-50' : ''
                            }`}
                            onClick={() => toggleTechnology(tech.id)}
                          >
                            <span>{tech.name}</span>
                            {formData.technologies.includes(tech.id) && (
                              <Check className="h-4 w-4 text-indigo-600" />
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              {errors.technologies && (
                <p className="mt-1 text-sm text-red-500">{errors.technologies}</p>
              )}
            </div>

            <div>
              <Label htmlFor="featured_image">Featured Image</Label>
              <div className="mt-2 flex items-center gap-4">
                <Input
                  id="featured_image"
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/jpeg,image/png,image/jpg,image/gif,image/svg+xml"
                  className="w-full"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Accepted formats: JPEG, PNG, JPG, GIF, SVG. Max size: 2MB
              </p>
              {errors.featured_image_path && (
                <p className="mt-1 text-sm text-red-600">{errors.featured_image_path}</p>
              )}
              {/* Image Preview */}
              {(imagePreview || formData.featured_image_path) && (
                <div className="mt-4 relative">
                  <img
                    src={imagePreview || getImageUrl(formData.featured_image_path)}
                    alt="Preview"
                    className="max-w-full h-48 object-cover rounded-lg"
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