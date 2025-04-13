import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog',
        href: '/blogs',
    },
];

export default function Dashboard() {
    const { blogs } = usePage().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blogs" />

            <div className='container mx-auto p-4'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className="text-3xl font-bold mb-4">Blogs</h1>
                <button className='bg-gray-50 p-2 rounded'>
                <Link href="/blogs/create" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Create Blog
                </Link>
                </button>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='overflow-x-auto'>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Project Name</th>
                                <th className="px-4 py-2 text-left">Excerpt</th>
                                <th className="px-4 py-2 text-left">Project Date</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog.id} className="border-t">
                                    <td className="px-4 py-2">{blog.id}</td>
                                    <td className="px-4 py-2">{blog.title}</td>
                                    <td className="px-4 py-2">{blog.excerpt}</td>
                                    <td className="px-4 py-2">{new Date(blog.published_at).toDateString()}</td>
                                    <td className='flex space-x-3 items-center px-4 py-2'>
                                        <Link href={`/projects/edit/${blog.id}`} className='bg-blue-500 text-white px-3 py-1 rounded'>Edit</Link>
                                        <button className='bg-red-500 text-white px-3 py-1 rounded'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </AppLayout>
    );
}
