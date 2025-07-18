import { memo, useCallback } from 'react';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { IconPhoto } from '@tabler/icons-react';

// Custom Image Upload Button Component
const ImageUploadButton = () => {
  const { editor } = useRichTextEditorContext();

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target?.result;
        if (base64Image && editor) {
          editor.chain().focus().setImage({ src: base64Image }).run();
        }
      };
      reader.readAsDataURL(file);
    }
  }, [editor]);

  return (
    <RichTextEditor.Control
      title="Upload image"
      aria-label="Upload image"
    >
      <input
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
        id="image-upload"
      />
      <label htmlFor="image-upload" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <IconPhoto size={16} stroke={1.5} />
      </label>
    </RichTextEditor.Control>
  );
};

const RichTextEditorComponent = memo(function RichTextEditorComponent({ editor }) {
  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset="100px">
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold title="Negrita (*texto*)" />
          <RichTextEditor.Italic title="Cursiva (_texto_)" />
          <RichTextEditor.Strikethrough title="Tachado (~texto~)" />
          <RichTextEditor.Code title="Monoespaciado (`texto`)" />
          <RichTextEditor.ClearFormatting />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.BulletList title="Lista con viñetas" />
          <ImageUploadButton />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
});

export { RichTextEditorComponent };