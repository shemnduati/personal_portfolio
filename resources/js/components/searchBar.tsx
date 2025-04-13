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


function searchBar() {
  return (
    <div>searchBar</div>
  )
}

export default searchBar