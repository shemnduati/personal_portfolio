import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/projects',
    },
];

export default function Project() {
    const { projects } = usePage().props
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Projects" />
        <div className='container mx-auto p-4'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className="text-3xl font-bold mb-4">Projects</h1>
                <button className='bg-gray-50 p-2 rounded'>
                    <Link href="/projects">Create Project</Link>
                </button>
            </div>
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='overflow-x-auto'>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Project Name</th>
                                <th className="px-4 py-2 text-left">Short Description</th>
                                <th className="px-4 py-2 text-left">Project Date</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id} className="border-t">
                                    <td className="px-4 py-2">{project.id}</td>
                                    <td className="px-4 py-2">{project.title}</td>
                                    <td className="px-4 py-2">{project.short_description}</td>
                                    <td className="px-4 py-2">{new Date(project.project_date).toDateString()}</td>
                                    <td className='flex space-x-3 items-center px-4 py-2'>
                                        <Link href={`/projects/edit/${project.id}`} className='bg-blue-500 text-white px-3 py-1 rounded'>Edit</Link>
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
