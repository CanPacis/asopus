import * as ReactDOMServer from 'react-dom/server';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { ScrollArea, useMantineTheme } from '@mantine/core';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { editor_state } from 'store/editor';

export interface EditorProps {
  id: string;
}

const provider = new HocuspocusProvider({
  url: 'ws://192.168.1.102:1234',
  name: 'example-document',
});

export default function Editor(props: EditorProps) {
  const [, setEditorState] = useRecoilState(editor_state);
  const theme = useMantineTheme();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Collaboration.configure({
        document: provider.document,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: 'Muhammed Ali CAN',
          color: theme.colors.cyan[6],
        },
        render: (user) => {
          const cursor = (
            <span
              className="cursor"
              // @ts-ignore
              style={{ '--bg-color': user.color, backgroundColor: user.color }}
            >
              {user.name}
            </span>
          );
          // const portal = ReactDOM.createPortal(cursor, document.querySelector('#cursor-pool')!);

          const wrapper = document.createElement('span');
          wrapper.innerHTML = ReactDOMServer.renderToString(cursor);
          wrapper.style.position = 'absolute';
          wrapper.style.transform = 'translateY(-26px)';

          return wrapper;
        },
      }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
  });

  useEffect(() => {
    setEditorState(null);
    console.log(props.id);
  }, [editor]);

  return (
    <RichTextEditor editor={editor} sx={{ border: 'none', width: '100%', height: '100%' }}>
      <RichTextEditor.Toolbar sx={{ backgroundColor: 'transparent' }}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <ScrollArea sx={{ height: '100%' }}>
        <RichTextEditor.Content sx={{ backgroundColor: 'transparent', marginBottom: 100 }} />
      </ScrollArea>
    </RichTextEditor>
  );
}
