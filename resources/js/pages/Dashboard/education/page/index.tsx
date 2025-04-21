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

interface Education {
    id: number;
    degree: string;
    institution: string;
    location: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string;
    order: number;
    is_active: boolean;
}

interface Props {
    education: Education[];
}

export default function EducationIndex({ education }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this education entry?')) {
            router.delete(`/admin/education/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Education" />

            <div className="container mx-auto py-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Education</h1>
                        <Link href={route('education.create')}>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Education
                            </Button>
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Degree</TableHead>
                                    <TableHead>Institution</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {education.map((edu) => (
                                    <TableRow key={edu.id}>
                                        <TableCell className="font-medium">{edu.degree}</TableCell>
                                        <TableCell>{edu.institution}</TableCell>
                                        <TableCell>{edu.location}</TableCell>
                                        <TableCell>
                                            {format(new Date(edu.start_date), 'MMM yyyy')} - {' '}
                                            {edu.is_current 
                                                ? 'Present'
                                                : edu.end_date 
                                                    ? format(new Date(edu.end_date), 'MMM yyyy')
                                                    : ''
                                            }
                                        </TableCell>
                                        <TableCell>{edu.order}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                edu.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {edu.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Link href={route('education.edit', edu.id)}>
                                                    <Button variant="ghost" size="sm">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(edu.id)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {education.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8">
                                            No education entries found
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