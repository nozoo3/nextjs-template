import { useEffect, useState } from 'react';

type ReactionType = 'tired' | 'nice' | 'common';

interface Post {
  id: number;
  name: string;
  childAge: string;
  content: string;
  emotion: string;
  reactions: Record<ReactionType, number>;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [name, setName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState('嬉しい');
  const [sort, setSort] = useState<'latest' | 'popular'>('latest');

  useEffect(() => {
    const stored = localStorage.getItem('father_posts');
    if (stored) {
      setPosts(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('father_posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = () => {
    if (!content.trim() || !name.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      name,
      childAge,
      content,
      emotion,
      reactions: { tired: 0, nice: 0, common: 0 },
    };
    setPosts([newPost, ...posts]);
    setContent('');
  };

  const addReaction = (id: number, type: ReactionType) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, reactions: { ...p.reactions, [type]: p.reactions[type] + 1 } }
          : p,
      ),
    );
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sort === 'latest') return b.id - a.id;
    const aTotal = Object.values(a.reactions).reduce((s, v) => s + v, 0);
    const bTotal = Object.values(b.reactions).reduce((s, v) => s + v, 0);
    return bTotal - aTotal;
  });

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <h1 className="text-xl font-bold">育児パパのつぶやき</h1>
      <div className="space-y-2 rounded border p-4">
        <input
          className="w-full rounded border p-2"
          placeholder="ニックネーム"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full rounded border p-2"
          placeholder="子どもの年齢"
          value={childAge}
          onChange={(e) => setChildAge(e.target.value)}
        />
        <textarea
          className="w-full rounded border p-2"
          rows={3}
          placeholder="今日の出来事"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <select
          className="w-full rounded border p-2"
          value={emotion}
          onChange={(e) => setEmotion(e.target.value)}
        >
          <option>嬉しい</option>
          <option>疲れた</option>
          <option>達成感</option>
        </select>
        <button
          className="w-full rounded bg-blue-500 py-2 font-semibold text-white"
          onClick={addPost}
        >
          投稿
        </button>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            checked={sort === 'latest'}
            onChange={() => setSort('latest')}
          />
          最新順
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            checked={sort === 'popular'}
            onChange={() => setSort('popular')}
          />
          リアクション数順
        </label>
      </div>

      <ul className="space-y-4">
        {sortedPosts.map((post) => (
          <li key={post.id} className="rounded border p-4 shadow">
            <p className="text-sm text-gray-500">
              👨‍🦰 {post.name}
              {post.childAge && `（子${post.childAge}）`} {post.emotion && `#${post.emotion}`}
            </p>
            <p className="my-2 whitespace-pre-wrap">{post.content}</p>
            <div className="flex gap-4 text-sm">
              <button
                className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 hover:bg-gray-200"
                onClick={() => addReaction(post.id, 'tired')}
              >
                お疲れさま ×{post.reactions.tired}
              </button>
              <button
                className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 hover:bg-gray-200"
                onClick={() => addReaction(post.id, 'nice')}
              >
                ナイス！ ×{post.reactions.nice}
              </button>
              <button
                className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 hover:bg-gray-200"
                onClick={() => addReaction(post.id, 'common')}
              >
                あるある ×{post.reactions.common}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
