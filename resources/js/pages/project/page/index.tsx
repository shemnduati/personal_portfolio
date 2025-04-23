import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface Technology {
    id: number;
    name: string;
    icon: string;
}

interface Category {
    id: number;
    name: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    content: string;
    featured_image_path: string;
    github_url: string | null;
    live_url: string | null;
    is_featured: boolean;
    technologies: Technology[];
    category: Category;
}

interface Props {
    projects: Project[];
}

export default function ProjectIndex({ projects }: Props) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const getImageUrl = (path: string) => {
        if (path.startsWith('http')) {
            return path;
        }
        return `/storage/${path}`;
    };

    return (
        <>
            <Head title="Projects" />

            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">My Projects</h1>
                    <p className="text-xl text-muted-foreground">
                        Here are some of the projects I've worked on
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project) => (
                        <motion.div key={project.id} variants={item}>
                            <Card className="h-full flex flex-col">
                                <CardHeader className="p-0">
                                    <img
                                        src={getImageUrl(project.featured_image_path)}
                                        alt={project.title}
                                        className="w-full h-48 object-cover rounded-t-lg"
                                    />
                                </CardHeader>
                                <CardContent className="flex-grow p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-semibold">
                                            {project.title}
                                        </h3>
                                        <Badge variant="secondary">
                                            {project.category.name}
                                        </Badge>
                                    </div>
                                    <p className="text-muted-foreground mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <Badge
                                                key={tech.id}
                                                variant="outline"
                                            >
                                                {tech.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="p-6 pt-0">
                                    <div className="flex gap-4">
                                        {project.github_url && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={project.github_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Github className="mr-2 h-4 w-4" />
                                                    GitHub
                                                </a>
                                            </Button>
                                        )}
                                        {project.live_url && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <a
                                                    href={project.live_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                    Live Demo
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    );
} 