import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { Selection } from "prosemirror-state";

import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Markdown } from "tiptap-markdown";
import Underline from "@tiptap/extension-underline";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import ImageResize from "tiptap-extension-resize-image";
import Placeholder from "@tiptap/extension-placeholder";
import ListItem from "@tiptap/extension-list-item";
import Mention from "@tiptap/extension-mention";

import classes from "./CommentInput.module.scss";

import Toolbar from "../Editor/Toolbar/Toolbar";

import { Indent } from "@/utils/indent";
import CustomCodeBlockLowlight from "@/utils/codeBlockIndent";
import { YoutubeResize } from "@/utils/youtubeResize";

// 예제 사용자 데이터
const users = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Alice Johnson" },
];

type EditorProps = {
  changeValue?: string;
  isVisibleToolbar?: boolean;
  placeholder?: string;
  className?: string;
  onChange: (value: string) => void;
  onChangeImage?: (imageId: number) => void;
};

const MentionEditor = ({
  changeValue = "",
  isVisibleToolbar = true,
  placeholder,
  className,
  onChange,
  onChangeImage,
}: EditorProps) => {
  const [content, setContent] = useState<string>("");

// 멘션 제안 컴포넌트
const renderSuggestions = () => {
  return {
    items: ({ query }: { query: string }) => {
      console.log('멘션 쿼리:', query, users); // 디버깅용 로그
      return users
        .filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
    },
    render: () => {
      let component: any;
      let popup: HTMLElement | null = null;

      return {
        onStart: (props: any) => {
          console.log('멘션 시작:', props); // 디버깅용 로그
          component = props;
          
          if (popup) {
            popup.remove();
          }
          
          popup = document.createElement('div');
          popup.classList.add(classes.mentionSuggestions);
          document.body.appendChild(popup);
          
          popup.style.position = 'absolute';
          popup.style.zIndex = '1000';
          
          return popup;
        },
        
        onUpdate: (props: any) => {
          console.log('멘션 업데이트:', props); // 디버깅용 로그
          component = props;
          
          if (!props.clientRect || !popup) {
            return;
          }
          
          popup.style.left = `${props.clientRect.left}px`;
          popup.style.top = `${props.clientRect.top + 24}px`;
          
          popup.innerHTML = `
            <div class="${classes.mentionList}">
              ${props.items.length ? 
                props.items.map((item: any, index: number) => 
                  `<div 
                    class="${classes.mentionItem} ${component.selectedIndex === index ? classes.mentionItemSelected : ''}"
                    data-index="${index}"
                  >
                    @${item.name}
                  </div>`
                ).join('') : 
                '<div class="${classes.mentionItem}">검색 결과가 없습니다</div>'
              }
            </div>
          `;
          
          // 클릭 이벤트 추가
          popup.querySelectorAll(`.${classes.mentionItem}`).forEach((item: Element) => {
            item.addEventListener('click', (e) => {
              const index = Number((e.currentTarget as HTMLElement).dataset.index);
              if (props.items[index]) {
                component.command({ id: props.items[index].id, label: props.items[index].name });
              }
            });
          });
        },
        
        onKeyDown: (props: any) => {
          console.log('멘션 키다운:', props); // 디버깅용 로그
          if (props.event.key === 'ArrowUp') {
            component.upHandler();
            return true;
          }
          
          if (props.event.key === 'ArrowDown') {
            component.downHandler();
            return true;
          }
          
          if (props.event.key === 'Enter') {
            if (component.items[component.selectedIndex]) {
              component.selectItem(component.items[component.selectedIndex]);
            }
            return true;
          }
          
          return false;
        },
        
        onExit: () => {
          console.log('멘션 종료'); // 디버깅용 로그
          if (popup) {
            popup.remove();
            popup = null;
          }
        },
      };
    },
  };
};


  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        listItem: false,
      }),
      Link.extend({ inclusive: false }).configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: true,
      }),
      Underline,
      TableRow,
      TableHeader,
      TableCell,
      YoutubeResize.configure({ autoplay: false, interfaceLanguage: "ko" }),
      ImageResize.configure({ allowBase64: true }),
      Placeholder.configure({ placeholder: placeholder }),
      Markdown,
      CustomCodeBlockLowlight,
      Indent,
      ListItem,
      Mention.configure({
        HTMLAttributes: {
          class: classes.mention,
        },
        renderLabel({ options, node }) {
          return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`;
        },
        suggestion: {
          char: '@',
          command: ({ editor, range, props }) => {
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .insertContent([
                {
                  type: 'mention',
                  attrs: {
                    id: props.id,
                    label: props.label,
                  },
                },
                {
                  type: 'text',
                  text: ' ',
                },
              ])
              .run();
          },
          ...renderSuggestions(),
        },
      }),
    ],
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
    editorProps: {
      handleDOMEvents: {
        keydown: (view, event) => {
          if (event.key === "Enter" && !document.querySelector(`.${classes.mentionSuggestions}`)) {
            const { state, dispatch } = view;
            const { $head } = state.selection;

            if (!$head.node(-1)) {
              dispatch(state.tr.insertText("\n"));
              return true;
            }

            const isBlockquote = $head.node(-1).type.name === "blockquote";
            if (isBlockquote) {
              return true;
            }

            const endPos = state.doc.content.size;
            const tr = state.tr.setSelection(Selection.near(state.doc.resolve(endPos)));
            dispatch(tr.scrollIntoView().insertText("\n"));
            return true;
          }

          return false;
        },
      },
    },
  });



  useEffect(() => {
    if (!editor) return;

    onChange(content);
  }, [editor, content, onChange]);

  useEffect(() => {
    if (!editor) return;
    if (changeValue === editor.getHTML()) return;

    editor.commands.setContent(changeValue);
    setContent(changeValue);
  }, [editor, changeValue]);

  if (!editor) {
    return null;
  }

  return (
    <div className={classes.editorBox}>
      {isVisibleToolbar && <Toolbar editor={editor} onChangeImage={(imageId: number) => onChangeImage?.(imageId)} />}
      <EditorContent
        editor={editor}
        className={`${className} ${classes.editor}`}
        name="contents"
        minLength={5}
        required
      />
    </div>
  );
};

export default MentionEditor;
