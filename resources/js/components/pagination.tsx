import React from 'react';
import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
}


function paginaton({ links }: PaginationProps) {
  return (
    <nav className="flex items-center justify-between">
    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
            <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{links[0].label}</span> to{' '}
                <span className="font-medium">{links[links.length - 2].label}</span> of{' '}
                <span className="font-medium">{links[links.length - 1].label}</span> results
            </p>
        </div>
        <div>
            <ul className="flex space-x-1">
                {links.map((link, index) => (
                    <li key={index}>
                        {link.url ? (
                            <Link
                                href={link.url}
                                className={`px-3 py-1 rounded-md text-sm ${
                                    link.active
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <span
                                className={`px-3 py-1 rounded-md text-sm ${
                                    link.active
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {link.label}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    </div>
</nav>
  )
}

export default paginaton 