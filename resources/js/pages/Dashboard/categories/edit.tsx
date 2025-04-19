import React from 'react';
import CategoryForm from './form';
import { Category } from '@/types';

interface Props {
    category: Category;
}

export default function EditCategory({ category }: Props) {
    return <CategoryForm category={category} />;
} 