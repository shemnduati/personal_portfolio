export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  meta_title: string | null;
  meta_description: string | null;
  featured_image_path: string | null;
  featured_image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  status?: 'published' | 'draft';
} 