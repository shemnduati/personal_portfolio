import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Clock,
  Filter
} from 'lucide-react';
import { EyeIcon } from 'lucide-react';

// Define types for our data
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
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

interface PaginatedResponse {
  data: Blog[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface PageProps {
  [key: string]: any; // Add index signature to satisfy Inertia's PageProps constraint
  blogs: PaginatedResponse;
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
    href: '/admin/blog',
  },
];

function BlogIndexContent() {
  const { blogs, flash } = usePage<PageProps>().props;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState({
    title: '',
    status: '',
    published_at: ''
  });
  
  // Initialize filteredBlogs with all blogs data, safely handling undefined data
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>(() => {
    // Ensure we have an array of blogs
    const allBlogs = Array.isArray(blogs?.data) ? blogs.data : [];
    return allBlogs;
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

  // Apply filters whenever search term, column filters, or blogs data changes
  useEffect(() => {
    // Ensure we're working with a fresh copy of all blogs
    let filtered = Array.isArray(blogs?.data) ? [...blogs.data] : [];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(term) || 
        blog.excerpt.toLowerCase().includes(term)
      );
    }
    
    // Apply column filters
    if (columnFilters.title) {
      const term = columnFilters.title.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(term)
      );
    }
    
    if (columnFilters.status) {
      const isPublished = columnFilters.status === 'published';
      filtered = filtered.filter(blog => 
        blog.is_published === isPublished
      );
    }
    
    if (columnFilters.published_at) {
      const filterDate = new Date(columnFilters.published_at).toISOString().split('T')[0];
      filtered = filtered.filter(blog => {
        if (!blog.published_at) return false;
        const blogDate = new Date(blog.published_at).toISOString().split('T')[0];
        return blogDate === filterDate;
      });
    }
    
    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, columnFilters, blogs?.data]);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle column filter
  const handleColumnFilter = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  console.log('Total pages:', totalPages);
  
  // Get current page items
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log('Current page items:', paginatedBlogs.length);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end of visible pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the start or end
      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Handle delete
  const handleDelete = (blogId: number) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setIsLoading(true);
      router.delete(`/admin/blogs/${blogId}`, {
        onSuccess: () => {
          toast.success('Blog post deleted successfully');
        },
        onError: () => {
          toast.error('Failed to delete blog post');
        },
        onFinish: () => {
          setIsLoading(false);
        }
      });
    }
  };

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderTags = (tags: Blog['tags']) => {
    if (!tags || tags.length === 0) return 'No tags';
    return (
      <div className="flex flex-wrap gap-1">
        {tags.map(tag => (
          <span
            key={tag.id}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
          >
            {tag.name}
          </span>
        ))}
      </div>
    );
  };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Blog Management" />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Blog Management</h1>
          <Link 
            href="/admin/blogs/create" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Blog
                </Link>
        </div>

        {/* Blog list */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {filteredBlogs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No blog posts found.</p>
              {searchTerm && (
                <p className="text-gray-500 mt-2">Try adjusting your search terms.</p>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <span>Title</span>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Filter title..."
                              className="text-xs p-1 border rounded"
                              value={columnFilters.title}
                              onChange={(e) => handleColumnFilter('title', e.target.value)}
                            />
                          </div>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Excerpt
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <span>Status</span>
                          <select
                            className="text-xs p-1 border rounded"
                            value={columnFilters.status}
                            onChange={(e) => handleColumnFilter('status', e.target.value)}
                          >
                            <option value="">All</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                          </select>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <span>Published Date</span>
                          <input
                            type="date"
                            className="text-xs p-1 border rounded"
                            value={columnFilters.published_at}
                            onChange={(e) => handleColumnFilter('published_at', e.target.value)}
                          />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tags
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedBlogs.map((blog) => (
                      <tr key={blog.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                          <div className="text-sm text-gray-500">ID: {blog.id}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 line-clamp-2">{blog.excerpt}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            blog.is_published 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {blog.is_published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                            {formatDate(blog.published_at)}
                          </div>
                          <div className="flex items-center text-xs text-gray-400 mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {blog.updated_at && `Updated: ${formatDate(blog.updated_at)}`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {renderTags(blog.tags)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link 
                              href={`/admin/blogs/${blog.id}/preview`} 
                              className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-indigo-50"
                              title="View"
                            >
                              <EyeIcon className="h-5 w-5" />
                            </Link>
                            <Link 
                              href={`/admin/blogs/${blog.id}/edit`} 
                              className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                              title="Edit"
                            >
                              <Edit className="w-5 h-5" />
                            </Link>
                            <button 
                              onClick={() => handleDelete(blog.id)}
                              disabled={isLoading}
                              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 disabled:opacity-50"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table footer with search and pagination controls */}
              <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <select
                    className="text-sm border-gray-300 rounded-md"
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  >
                    <option value={10}>10 per page</option>
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                  </select>
                  <span className="text-sm text-gray-700">
                    Showing {filteredBlogs.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} to{' '}
                    {Math.min(currentPage * itemsPerPage, filteredBlogs.length)} of{' '}
                    {filteredBlogs.length} results
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search blogs..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>

                  {filteredBlogs.length > 0 && (
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                      </button>
                      
                      {getPageNumbers().map((page, index) => (
                        page === '...' ? (
                          <span 
                            key={`ellipsis-${index}`}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                          >
                            ...
                          </span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => goToPage(page as number)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === page
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      ))}
                      
                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </nav>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default function BlogIndex() {
  return (
    <ErrorBoundary>
      <BlogIndexContent />
    </ErrorBoundary>
  );
}
