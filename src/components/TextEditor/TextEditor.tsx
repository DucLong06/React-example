import React, { useState } from 'react'
//import { Editor } from "@tinymce/tinymce-react"
import ReactQuill from 'react-quill'

interface Props {
    value?: string
    callback?: any
}

const TextEditor = ({ value, callback }: Props) => {

    const [content, setContent] = useState( value || '')

    const handleChange = (content: any, editor: any) => {
        setContent(content)
        callback && callback(content)
    }
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link'],
            ['clean']
          ],
      }
    return (
        <ReactQuill
            value={content}
            onChange={handleChange}
            modules={modules}
        />
        // <Editor
        //     apiKey="clnwsyq5x9ps7etd4bvlhpei0xltjsv9b2ad8cs9ei6kh3zo"
        //     value={content}
        //     init={{
        //         height: 200,
        //         menubar: false
        //     }}
        //     onEditorChange={handleChange}
        // />
    )
}


export default TextEditor;