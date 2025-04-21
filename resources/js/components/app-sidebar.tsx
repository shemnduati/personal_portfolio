import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, LibraryBig, NotebookText, ServerCog, Tags, Code2, Settings, MessageSquare, Users, Briefcase, GraduationCap, Quote, Lightbulb, Wrench } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Projects',
        href: '/projects',
        icon: ServerCog,
    },
    {
        title: 'Technologies',
        href: '/admin/technologies',
        icon: Code2,
    },
    {
        title: 'Partners',
        href: '/admin/partners',
        icon: Users,
    },
    {
        title: 'Experience',
        href: '/admin/experiences',
        icon: Briefcase,
    },
    {
        title: 'Education',
        href: '/admin/education',
        icon: GraduationCap,
    },
    {
        title: 'Skills',
        href: '/admin/skills',
        icon: Lightbulb,
    },
    {
        title: 'Services',
        href: '/admin/services',
        icon: Wrench,
    },
    {
        title: 'Testimonials',
        href: '/admin/testimonials',
        icon: Quote,
    },
    {
        title: 'Blogs',
        href: '/admin/blogs',
        icon: LibraryBig,
    },
    {
        title: 'Categories',
        href: '/admin/categories',
        icon: Tags,
    },
    {
        title: 'Messages',
        href: '/admin/messages',
        icon: MessageSquare,
    },
    {
        title: 'Settings',
        href: '/admin/settings',
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
