import { TextStyleKit } from '@tiptap/extension-text-style'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import '../styles/MarkdownEditor.css';

const extensions = [TextStyleKit, StarterKit]
export function MenuBar({ editor }) {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
      }
    },
  })

  return (
    <div  style={{ borderBottom: "1px solid black" , backgroundColor: "white", color: "black",width: "100%",
    borderRadius: "5px 5px 0px 0px",
    height: "auto",
    boxSizing: "border-box" }}>
      <div className="button-group">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? 'is-active' : ''}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? 'is-active' : ''}
        >
          I
        </button>
        <button
               type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? 'is-active' : ''}
        >
          St
        </button>
        <button
               type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? 'is-active' : ''}
        >
          {'</>'}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? 'is-active' : ''}
        >
          p
        </button>
        <button
               type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editorState.isHeading1 ? 'is-active' : ''}
        >
          H1
        </button>
        <button
               type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editorState.isHeading2 ? 'is-active' : ''}
        >
          H2
        </button>
        <button
               type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editorState.isHeading3 ? 'is-active' : ''}
        >
          H3
        </button>
        <button
               type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editorState.isHeading4 ? 'is-active' : ''}
        >
          H4
        </button>
        <button
               type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editorState.isHeading5 ? 'is-active' : ''}
        >
          H5
        </button>
        <button
               type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editorState.isHeading6 ? 'is-active' : ''}
        >
          H6
        </button>
        <button
               type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? 'is-active' : ''}
        >
          bl
        </button>
        <button
               type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? 'is-active' : ''}
        >
          ol
        </button>
        <button
               type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editorState.isCodeBlock ? 'is-active' : ''}
        >
          {'</>'}
        </button>
      </div>
    </div>
  )
}

function MarkdownEditor({html,setHtml}) {
   const editor = useEditor({
    extensions,
    content: html,
    onUpdate({ editor }) {
      const htmlValue = editor.getHTML();
      console.log("Updated HTML:", htmlValue);
      setHtml(htmlValue);
    }
  });

   return (
    <div style={{ border: "1px solid black", display: "flex", flexDirection: "column", borderRadius: "5px", margin: "10px", backgroundColor: "white",width:"50%"}}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="tiptap-editor"/>
    </div>
  );
}

export default MarkdownEditor;
