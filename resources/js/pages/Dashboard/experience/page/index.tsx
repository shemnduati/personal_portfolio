import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';

interface Experience {
    id: number;
    title: string;
    company: string;
    location: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string;
    order: number;
    is_active: boolean;
}

interface Props {
    experiences: Experience[];
}

export default function Experiences({ experiences }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            router.delete(`/admin/experiences/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Experiences" />

            <div className="container mx-auto py-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Experiences</h1>
                        <Link href={route('experiences.create')}>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Experience
                            </Button>
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {experiences.map((experience) => (
                                    <TableRow key={experience.id}>
                                        <TableCell className="font-medium">{experience.title}</TableCell>
                                        <TableCell>{experience.company}</TableCell>
                                        <TableCell>{experience.location}</TableCell>
                                        <TableCell>
                                            {format(new Date(experience.start_date), 'MMM yyyy')} - {' '}
                                            {experience.is_current 
                                                ? 'Present'
                                                : experience.end_date 
                                                    ? format(new Date(experience.end_date), 'MMM yyyy')
                                                    : ''
                                            }
                                        </TableCell>
                                        <TableCell>{experience.order}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                experience.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {experience.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Link href={route('experiences.edit', experience.id)}>
                                                    <Button variant="ghost" size="sm">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(experience.id)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {experiences.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8">
                                            No experiences found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 