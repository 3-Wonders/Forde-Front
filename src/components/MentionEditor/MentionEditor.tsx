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
import { UserApi } from "@/api/user";

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
  onMentionUsersChange?: (userIds: number[]) => void;
};

const MentionEditor = ({
  changeValue = "",
  isVisibleToolbar = true,
  placeholder,
  className,
  onChange,
  onChangeImage,
  onMentionUsersChange,
}: EditorProps) => {
  const [content, setContent] = useState<string>("");

  // 멘션 사용자 결과를 저장할 상태 추가
  const [mentionUsers, setMentionUsers] = useState<Array<{id: string, name: string}>>([]);
  // API 로딩 상태 추가
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 멘션된 사용자 ID를 추적하는 상태 추가
  const [mentionedUserIds, setMentionedUserIds] = useState<number[]>([]);

// 멘션 제안 컴포넌트
const renderSuggestions =  () => {
  return {
    items: async ({ query }: { query: string }) => {
      console.log('멘션 쿼리:', query, users);
      
      // 빈 쿼리이거나 너무 짧은 경우 API 호출 방지
      if (!query || query.length < 1) {
        setMentionUsers([]);
        return [];
      }
      try {
        setIsLoading(true);
        const response = await UserApi.getMentionUsers(query);
        console.log('API 응답:', response);
        
        // API 응답 형식에 따라 적절히 매핑
        // 응답 구조가 다를 경우 아래 매핑 부분을 수정해야 합니다
        const users = response.map((user: any) => ({
          id: user.userId.toString(), // id는 문자열로 변환
          name: user.nickname,
          profilePath: user.profilePath // 프로필 이미지 경로도 저장
        }));
        console.log(users);
        setMentionUsers(users);
        return users.slice(0, 5); // 최대 5개만 표시
      } catch (error) {
        console.error('멘션 사용자 검색 오류:', error);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    render: () => {
      let component: any;
      let popup: HTMLElement | null = null;

      return {
        onStart: (props: any) => {
          console.log('멘션 시작:', props);
          component = props;
          
          if (popup) {
            popup.remove();
          }
          
          popup = document.createElement('div');
          // CSS 클래스 적용
          popup.classList.add(classes.mentionSuggestions);
          
          // 위치 관련 스타일만 인라인으로 설정
          popup.style.position = 'absolute';
          popup.style.zIndex = '1000';
          popup.style.visibility = 'hidden';
          
          document.body.appendChild(popup);
          
          return popup;
        },
        
        onUpdate: (props: any) => {
          console.log('멘션 업데이트:', props);
          component = props;
          
          if (!popup) return;

          // 내용 업데이트 - CSS 클래스 적용 및 프로필 이미지 추가
  popup.innerHTML = `
    <div class="${classes.mentionList}">
      ${isLoading ? 
        `<div class="${classes.mentionItem}">검색 중...</div>` :
        props.items.length ? 
          props.items.map((item: any, index: number) => 
            `<div 
              class="${classes.mentionItem} ${component.selectedIndex === index ? classes.mentionItemSelected : ''}"
              data-index="${index}"
              style="display: flex; align-items: center; padding: 8px; cursor: pointer;"
            >
              ${item.profilePath ? 
                `<img src="${item.profilePath}" alt="프로필" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px; object-fit: cover; flex-shrink: 0;">` : 
                `<div style="width: 24px; height: 24px; border-radius: 50%; background-color: #ccc; margin-right: 8px; flex-shrink: 0;"></div>`
              }
              <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">@${item.name}</span>
            </div>`
          ).join('') : 
          `<div class="${classes.mentionItem}">검색 결과가 없습니다</div>`
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
          
          // 댓글 에디터 요소 찾기
          const commentEditor = document.querySelector(`.${classes.editor}`);
          
          if (commentEditor) {
            const editorRect = commentEditor.getBoundingClientRect();
            
            // 스크롤 위치 가져오기
            const scrollX = window.scrollX || window.pageXOffset;
            const scrollY = window.scrollY || window.pageYOffset;
            
            // 절대 위치 계산 (스크롤 포함)
            const absoluteLeft = editorRect.left + scrollX;
            const absoluteTop = editorRect.top + scrollY;
            
            // 에디터 내에서 @ 입력 위치 찾기인데.. 음 못찾는중
            if (props.clientRect && props.clientRect.top != null) {
              const mentionLeft = props.clientRect.left + scrollX;
              const mentionTop = props.clientRect.top + scrollY;
              
              popup.style.left = `${mentionLeft}px`;
              popup.style.top = `${mentionTop + 20}px`; // @ 위치 아래 20px
            } else {
              // 폴백: 에디터 위치 기준으로 설정
              popup.style.left = `${absoluteLeft + 20}px`;
              popup.style.top = `${absoluteTop + 30}px`;
            }
            
            // 팝업 표시
            popup.style.visibility = 'visible';
          } else {
            console.warn('댓글 에디터 요소를 찾을 수 없습니다!');
          }
        },
        
        onKeyDown: (props: any) => {
          console.log('멘션 키다운:', props);
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
          console.log('멘션 종료');
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
            // 멘션 추가 시 사용자 ID를 추적
            const userId = parseInt(props.id!, 10);
            
            // 중복 방지를 위해 Set 사용
            setMentionedUserIds(prevIds => {
              if (!isNaN(userId) && !prevIds.includes(userId)) {
                const newIds = [...prevIds, userId];
                // 부모 컴포넌트에 변경 알림
                if (onMentionUsersChange) {
                  onMentionUsersChange(newIds);
                }
                return newIds;
              }
              return prevIds;
            });
            
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
      
      // 에디터 내용이 변경될 때 멘션된 사용자 ID 확인
      // (멘션이 삭제된 경우 처리)
      const doc = editor.getJSON();
      const mentionsInContent = findMentionsInDocument(doc);
      
      // 현재 문서에 있는 멘션 ID만 유지
      const currentMentionIds = mentionsInContent
        .map(mention => parseInt(mention.attrs.id, 10))
        .filter(id => !isNaN(id));
      
      if (JSON.stringify(currentMentionIds) !== JSON.stringify(mentionedUserIds)) {
        setMentionedUserIds(currentMentionIds);
        if (onMentionUsersChange) {
          onMentionUsersChange(currentMentionIds);
        }
      }
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
  // 문서에서 모든 멘션 노드를 찾는 함수
  const findMentionsInDocument = (doc: any): any[] => {
    const mentions: any[] = [];
    
    const traverse = (node: any) => {
      if (node.type === 'mention') {
        mentions.push(node);
      }
      
      if (node.content) {
        node.content.forEach((child: any) => traverse(child));
      }
    };
    
    if (doc.content) {
      doc.content.forEach((node: any) => traverse(node));
    }
    
    return mentions;
  };


  useEffect(() => {
    if (!editor) return;

    onChange(content);
  }, [editor, content, onChange]);

  useEffect(() => {
    if (!editor) return;
    
    const doc = editor.getJSON();
    const mentionsInContent = findMentionsInDocument(doc);
    
    const currentMentionIds = mentionsInContent
      .map(mention => parseInt(mention.attrs.id, 10))
      .filter(id => !isNaN(id));
    
    setMentionedUserIds(currentMentionIds);
    if (onMentionUsersChange) {
      onMentionUsersChange(currentMentionIds);
    }
  }, [editor, onMentionUsersChange]);

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
