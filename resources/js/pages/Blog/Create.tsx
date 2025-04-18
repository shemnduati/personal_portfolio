import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface BlogFormData {
    title: string;
    content: string;
    image: File | null;
}

export default function CreateBlog() {
    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        content: '',
        image: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement form submission
        console.log('Form submitted:', formData);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    return (
        <>
            <Head title="Create Blog Post" />
            
            <div className="container mx-auto py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Blog Post</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter blog title"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Write your blog content here..."
                                    className="min-h-[200px]"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Featured Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>

                            <Button type="submit" className="w-full">
                                Create Blog Post
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
} 