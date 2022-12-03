import { Editor } from '@tiptap/react';
import { atom } from 'recoil';

export const editor_state = atom<Editor | null>({
  key: 'editor_state',
  default: null,
});
