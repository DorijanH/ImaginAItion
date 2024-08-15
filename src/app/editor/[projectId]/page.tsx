import Editor from '@/features/editor/components/editor';
import { protectServer } from '@/features/auth/helpers';

export default async function EditorProjectIdPage() {
  await protectServer();

  return <Editor />;
}