import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';
import { Mail, Trash2 } from 'lucide-react';

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface Props {
    messages: {
        data: Message[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Messages({ messages }: Props) {
    const handleMarkAsRead = async (id: number) => {
        try {
            await fetch(`/admin/messages/${id}/mark-as-read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                }
            });
            
            router.reload();
        } catch (error) {
            toast.error('Failed to mark message as read');
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this message?')) {
            router.delete(`/admin/messages/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Messages" />

            <div className="container mx-auto py-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Messages</h1>
                        <div className="text-sm text-gray-500">
                            Total: {messages.total} messages
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Message</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {messages.data.map((message) => (
                                    <TableRow key={message.id} className={!message.is_read ? 'bg-gray-50' : ''}>
                                        <TableCell>
                                            {!message.is_read && (
                                                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                            )}
                                        </TableCell>
                                        <TableCell>{message.name}</TableCell>
                                        <TableCell>
                                            <a href={`mailto:${message.email}`} className="text-blue-600 hover:underline">
                                                {message.email}
                                            </a>
                                        </TableCell>
                                        <TableCell>{message.subject}</TableCell>
                                        <TableCell>
                                            <div className="max-w-xs truncate">{message.message}</div>
                                        </TableCell>
                                        <TableCell>
                                            {format(new Date(message.created_at), 'MMM d, yyyy')}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {!message.is_read && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleMarkAsRead(message.id)}
                                                    >
                                                        <Mail className="w-4 h-4" />
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(message.id)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {messages.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8">
                                            No messages found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {messages.last_page > 1 && (
                        <div className="mt-4 flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                                Showing {(messages.current_page - 1) * messages.per_page + 1} to{' '}
                                {Math.min(messages.current_page * messages.per_page, messages.total)} of{' '}
                                {messages.total} results
                            </div>
                            <div className="flex gap-2">
                                {messages.current_page > 1 && (
                                    <Button
                                        variant="outline"
                                        onClick={() => router.get(`/admin/messages?page=${messages.current_page - 1}`)}
                                    >
                                        Previous
                                    </Button>
                                )}
                                {messages.current_page < messages.last_page && (
                                    <Button
                                        variant="outline"
                                        onClick={() => router.get(`/admin/messages?page=${messages.current_page + 1}`)}
                                    >
                                        Next
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
} 