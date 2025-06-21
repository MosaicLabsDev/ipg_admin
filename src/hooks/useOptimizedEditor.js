import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Link } from '@mantine/tiptap';

// Memoizar las extensiones para evitar recreaciones
const extensions = [
  StarterKit,
  Underline,
  Link,
  Superscript,
  SubScript,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
];

export function useOptimizedEditor() {
  return useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    // Optimizaciones adicionales
    enableCoreExtensions: true,
    editable: true,
    injectCSS: false, // Evitar inyección de CSS innecesaria
  });
} 