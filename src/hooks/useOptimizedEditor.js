import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';

// Custom extension to handle WhatsApp-style formatting
const WhatsAppFormatting = Extension.create({
  name: 'whatsappFormatting',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('whatsappFormatting'),
        appendTransaction: (transactions, oldState, newState) => {
          // Prevent multiple empty lines
          const doc = newState.doc;
          const tr = newState.tr;
          let modified = false;

          doc.descendants((node, pos) => {
            if (node.type.name === 'paragraph' && !node.content.size) {
              const $pos = doc.resolve(pos);
              const before = $pos.before();
              const after = $pos.after();
              
              if (before >= 0 && after <= doc.content.size) {
                const prevNode = doc.nodeAt(before);
                if (prevNode && prevNode.type.name === 'paragraph' && !prevNode.content.size) {
                  tr.delete(pos, pos + 2);
                  modified = true;
                }
              }
            }
          });

          return modified ? tr : null;
        },
      }),
    ];
  },
});

// Function to convert editor content to WhatsApp format
const getWhatsAppContent = (editor) => {
  if (!editor) return '';

  let whatsappText = '';
  const json = editor.getJSON();

  const hasOnlyEmojis = (text) => {
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2700}-\u{27BF}]|[\u{2600}-\u{26FF}]/gu;
    const strippedText = text.replace(emojiRegex, '').trim();
    return strippedText === '';
  };

  const processNode = (node, isListItem = false) => {
    if (node.type === 'text') {
      let text = node.text;
      // No aplicamos formato de WhatsApp (* o _) ya que no funciona bien
      whatsappText += text;
    } else if (node.type === 'paragraph') {
      if (node.content) {
        node.content.forEach(n => processNode(n, isListItem));
      }
      // Solo agregar salto de línea si no es un item de lista y si no termina ya en salto de línea
      if (!isListItem && !whatsappText.endsWith('\n')) {
        whatsappText += '\n';
      }
    } else if (node.type === 'bulletList') {
      // Asegurar un salto de línea antes de la lista si no existe
      if (!whatsappText.endsWith('\n\n')) {
        whatsappText += whatsappText.endsWith('\n') ? '\n' : '\n\n';
      }
      node.content.forEach(item => {
        if (item.content) {
          whatsappText += '✔️';
          item.content.forEach(n => processNode(n, true));
          whatsappText += '\n';
        }
      });
    }
  };

  json.content.forEach(node => processNode(node));

  // Limpiar el formato
  return whatsappText
    .replace(/\n{3,}/g, '\n\n') // Reemplazar 3+ saltos de línea con 2
    .replace(/\n\s+\n/g, '\n\n') // Limpiar líneas que solo tienen espacios
    .trim(); // Eliminar espacios al inicio y final
};

export function useOptimizedEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable features not supported by WhatsApp
        heading: false,
        horizontalRule: false,
        blockquote: false,
        // Configure WhatsApp-compatible features
        bold: {
          HTMLAttributes: {
            class: 'whatsapp-bold',
          },
        },
        italic: {
          HTMLAttributes: {
            class: 'whatsapp-italic',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'whatsapp-list',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'whatsapp-list-item',
          },
        },
      }),
      Image,
      WhatsAppFormatting,
    ],
    editorProps: {
      attributes: {
        class: 'whatsapp-style-editor',
      },
    },
  });

  // Add getWhatsAppContent method to the editor
  if (editor) {
    editor.getWhatsAppContent = () => getWhatsAppContent(editor);
  }

  return editor;
} 