import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/projects',
    },
];

export default function Project() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className='container mx-auto p-4'>
                <div className='flex justify-between items-center mb-4'>
                    <h1 className="text-3xl font-bold mb-4">Projects</h1>
                    <button className='bg-gray-50'>
                        <Link href="/projects">Create Project</Link>
                    </button>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='overflow-x-auto'>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Project Name</th>
                                <th className="px-4 py-2 text-left">Short Description</th>
                                <th className="px-4 py-2 text-left">Project Date</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Project 1</td>
                                <td>Short description for project 1</td>
                                <td>2nd january 2024</td>
                                <td className='flex space-x-3 items-center'>
                                    <button className='bg-gray-50'>Edit</button>
                                    <button className='bg-gray-50'>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </AppLayout>
    );
}
