import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import './Tiptap.css';
import { ChromePicker } from 'react-color';

const TiptapEditor = () => {
  const [savedContent, setSavedContent] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#958DF1');


  // Initializing the Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: false, keepAttributes: false },
        orderedList: { keepMarks: false, keepAttributes: false },
      }),
      Color.configure({
        types: [TextStyle.name, ListItem.name],
      }),
      TextStyle,
      Underline,
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
      }),
    ],
    content: '<p>Hello World!</p>',
    autofocus: true,
    editable: true,
    onUpdate: ({ editor }) => {
      console.log('Editor content updated:', editor.getHTML());
    },
  });

  if (!editor) return null;

  // Handler to save the editor content
  const handleSave = () => {
    if (editor) {
      const content = editor.getHTML();
      alert('Data is saved!...')
      setSavedContent(content);
    }
  };
  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    editor.chain().focus().setColor(color.hex).run();
  };


  return (
    <div>
      <h1 className='header'>Your Tiptap Editor</h1>
      <div className="tiptap-editor">
        {/* Control Buttons */}
        <div className="control-group">
          <div className="button-group">
            {/* Bold Button */}
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'is-active' : ''}
              title="Bold"
            >
              <strong>B</strong>
            </button>

            {/* Italic Button */}
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'is-active' : ''}
            >
              <em>I</em>
            </button>

            {/* Underline Button */}
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              disabled={!editor.can().chain().focus().toggleUnderline().run()}
              className={editor.isActive('underline') ? 'is-active' : ''}
            >
              <u>U</u>
            </button>

            {/* Link Button */}
            <button
              onClick={() => {
                const url = prompt('Enter the URL');
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              className={editor.isActive('link') ? 'is-active' : ''}
            >
              Link
            </button>

            {/* Strikethrough Button */}
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={editor.isActive('strike') ? 'is-active' : ''}
            >
              Strike
            </button>

            {/* Code Button */}
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              disabled={!editor.can().chain().focus().toggleCode().run()}
              className={editor.isActive('code') ? 'is-active' : ''}
            >
              Code
            </button>

            {/* Clear Marks Button */}
            <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
              Clear Marks
            </button>

            {/* Clear Nodes Button */}
            <button onClick={() => editor.chain().focus().clearNodes().run()}>
              Clear Nodes
            </button>

            {/* Heading Buttons */}
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <button
                key={level}
                onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                className={editor.isActive('heading', { level }) ? 'is-active' : ''}
              >
                H{level}
              </button>
            ))}

            {/* List Buttons */}
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
              Bullet List
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
              Ordered List
            </button>

            {/* Undo and Redo Buttons */}
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              Undo
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              Redo
            </button>

            {/* Color Picker Button */}
          </div>
          <button className='color-picker' onClick={toggleColorPicker}>
            Color Picker
          </button>
          {/* Show Color Picker if visible */}
          {showColorPicker && (
            <div className="color-picker">
              <ChromePicker
                color={selectedColor}
                onChangeComplete={handleColorChange}
              />
            </div>
          )}
        </div>

        {/* Editor Content */}
        <EditorContent editor={editor} />

        {/* Save Button */}
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>

      {/* Display Saved Content */}
      <h1 className='header'>Your Saved Content</h1>
      <div
        className="savedContent"
        dangerouslySetInnerHTML={{ __html: savedContent }}
      />
    </div>
  );
};

export default TiptapEditor;
