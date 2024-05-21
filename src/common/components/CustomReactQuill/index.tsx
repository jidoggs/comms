'use client';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import ImageResize from 'quill-image-resize-module-react';
// import 'react-quill/dist/quill.snow.css';

interface ReactQuillProps {
  onChange?: (value: string) => void;
}

const CustomReactQuill: React.FC<ReactQuillProps> = ({ onChange }) => {
  const [value, setValue] = useState('');
  // Editor ref
  // const quill = useRef();
  // Editor ref
  const quillRef = useRef<ReactQuill>(null); // Explicitly type the ref

  const onValueChange = (value: string) => {
    setValue(value);
    onChange && onChange(value);
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute(
      'accept',
      'image/*,application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    input.click();

    input.onchange = () => {
      const file = input?.files && input?.files[0];

      if (file && quillRef.current) {
        // Check if file and ref exist
        const reader = new FileReader();

        reader.onload = (e) => {
          const imageUrl = e.target?.result; // Get the data URL
          const quillEditor = quillRef.current && quillRef.current.getEditor();
          const range = quillEditor?.getSelection(true); // Optional chaining

          if (range && imageUrl) {
            quillEditor &&
              quillEditor.insertEmbed(range.index, 'image', imageUrl, 'user');
          }
        };

        reader.readAsDataURL(file as Blob); // Type assertion to Blob
      }
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'blockquote'],
          [{ color: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  return (
    <ReactQuill
      ref={quillRef}
      formats={formats}
      modules={modules}
      theme="snow"
      value={value}
      onChange={onValueChange}
      // onChange={(value) => setValue(value)}
    />
  );
};
export default CustomReactQuill;
