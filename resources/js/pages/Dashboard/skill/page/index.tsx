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

interface Skill {
    id: number;
    name: string;
    icon: string | null;
    description: string;
    proficiency: number;
    order: number;
    is_active: boolean;
}

interface Props {
    skills: Skill[];
}

export default function SkillIndex({ skills }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this skill?')) {
            router.delete(`/admin/skills/${id}`);
        }
    };

    const getImageUrl = (path: string | null) => {
        if (!path) return null;
        return path.startsWith('http') ? path : `/storage/${path}`;
    };

    return (
        <AppLayout>
            <Head title="Skills" />

            <div className="container mx-auto py-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Skills</h1>
                        <Link href={route('skills.create')}>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Skill
                            </Button>
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Icon</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Proficiency</TableHead>
                                    <TableHead>Order</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {skills.map((skill) => (
                                    <TableRow key={skill.id}>
                                        <TableCell>
                                            {skill.icon && (
                                                <img
                                                    src={getImageUrl(skill.icon)}
                                                    alt={skill.name}
                                                    className="w-8 h-8 object-contain"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{skill.name}</TableCell>
                                        <TableCell className="max-w-xs truncate">{skill.description}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                                                    <div
                                                        className="bg-purple-600 h-2.5 rounded-full"
                                                        style={{ width: `${skill.proficiency}%` }}
                                                    />
                                                </div>
                                                <span>{skill.proficiency}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{skill.order}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                skill.is_active 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {skill.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Link href={route('skills.edit', skill.id)}>
                                                    <Button variant="ghost" size="sm">
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(skill.id)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {skills.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8">
                                            No skills found
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