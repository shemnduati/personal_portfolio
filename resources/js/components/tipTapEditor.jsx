import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';


const MenuBar = ({editor}) => {
    if(!editor) return null;

    const addImage = () => {
        const url = prompt('Enter image URL:')
        if(url) editor.chain().focus.setImage({ src: url }).run();
    };

return (
    <div className="flex flex-wrap gap-2 border-b pod-2 mb-4">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className="btn">Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className="btn">Italic</button>
      <button onClick={() => editor.chain().focus().setParagraph().run()} className="btn">Paragraph</button>
      <button onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()} className="btn">H2</button>
      <button onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()} className="btn">H3</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="btn">Bullet List</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="btn">Numbered List</button>
      <button onClick={addImage} className="btn">Image</button>
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className="btn">Left</button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className="btn">Center</button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className="btn">Right</button>
    </div>
);

};

const tipTapEditor = ({ content, onChange}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="border p-4 rounded bg-white min-h-[200px]" />
        </div>
    );
};

export default tipTapEditor