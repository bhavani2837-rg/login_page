import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

/* ================= TYPES ================= */

type ViewType = 'categories' | 'posts';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  postCount: number;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  categoryId: string;
  createdAt: number;
  pinned: boolean;
}

/* ================= HELPERS ================= */

const timeAgo = (ts: number) => {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

/* ================= DATA ================= */

const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'General Discussion', description: 'Talk about anything and everything', icon: '💬', color: '#DBEAFE', postCount: 1 },
  { id: '2', name: 'Help & Support', description: 'Get help with technical issues', icon: '🆘', color: '#DCFCE7', postCount: 0 },
  { id: '3', name: 'Feature Requests', description: 'Share ideas for improvements', icon: '💡', color: '#FEF9C3', postCount: 0 },
  { id: '4', name: 'Show & Tell', description: 'Showcase your projects', icon: '🎨', color: '#F3E8FF', postCount: 0 },
  { id: '5', name: 'News & Updates', description: 'Latest announcements', icon: '📰', color: '#FEE2E2', postCount: 0 },
  { id: '6', name: 'Community Events', description: 'Meetups and gatherings', icon: '🎉', color: '#FCE7F3', postCount: 0 },
];

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'Welcome to the forum!',
    content: 'Introduce yourself here.',
    author: 'Admin',
    categoryId: '1',
    createdAt: Date.now() - 7200000,
    pinned: true,
  },
];

/* ================= MAIN ================= */

export default function ForumApp() {
  const [view, setView] = useState<ViewType>('categories');
  const [categories] = useState(INITIAL_CATEGORIES);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  /* ================= BACK HANDLER ================= */

  useEffect(() => {
    const onBackPress = () => {
      if (showModal) {
        setShowModal(false);
        return true;
      }
      if (view === 'posts') {
        setView('categories');
        setSelectedCategory(null);
        setSearch('');
        return true;
      }
      return false;
    };

    const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => sub.remove();
  }, [view, showModal]);

  /* ================= SEARCH ================= */

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPosts = posts
    .filter(p => p.categoryId === selectedCategory?.id)
    .filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

  /* ================= CREATE POST ================= */

  const createPost = () => {
    if (!title || !content || !selectedCategory) return;

    setPosts(prev => [
      {
        id: Date.now().toString(),
        title,
        content,
        author: 'You',
        categoryId: selectedCategory.id,
        createdAt: Date.now(),
        pinned: false,
      },
      ...prev,
    ]);

    setShowModal(false);
    setTitle('');
    setContent('');
  };

  /* ================= UI ================= */

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discussion Forum</Text>
        <Text style={styles.headerSubtitle}>
          Share ideas, ask questions, connect
        </Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* CATEGORIES */}
      {view === 'categories' && (
        <FlatList
          data={filteredCategories}
          numColumns={2}
          keyExtractor={i => i.id}
          columnWrapperStyle={{ gap: 14 }}
          contentContainerStyle={{ gap: 14 }}
          renderItem={({ item }) => (
            <View style={styles.categoryCard}>
              <View style={[styles.iconBox, { backgroundColor: item.color }]}>
                <Text style={styles.icon}>{item.icon}</Text>
              </View>

              <View>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
              </View>

              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => {
                  setSelectedCategory(item);
                  setView('posts');
                  setSearch('');
                }}
              >
                <Text style={styles.viewBtnText}>View Posts</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* POSTS */}
      {view === 'posts' && selectedCategory && (
        <>
          <TouchableOpacity onPress={() => setView('categories')}>
            <Text style={styles.back}>← Back to Categories</Text>
          </TouchableOpacity>

          <FlatList
            data={filteredPosts}
            keyExtractor={i => i.id}
            renderItem={({ item }) => (
              <View style={styles.post}>
                {item.pinned && <Text style={styles.pinned}>📌 PINNED</Text>}
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text numberOfLines={2}>{item.content}</Text>
                <Text style={styles.muted}>
                  {item.author} · {timeAgo(item.createdAt)}
                </Text>
              </View>
            )}
          />

          <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
            <Text style={styles.fabText}>＋</Text>
          </TouchableOpacity>
        </>
      )}

      {/* MODAL */}
      <Modal visible={showModal} animationType="slide">
        <SafeAreaView style={styles.modal}>
          <Text style={styles.headerTitle}>New Post</Text>

          <TextInput
            placeholder="Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Content"
            multiline
            style={[styles.input, { height: 120 }]}
            value={content}
            onChangeText={setContent}
          />

          <TouchableOpacity style={styles.submit} onPress={createPost}>
            <Text style={styles.submitText}>Create</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Text style={styles.back}>Cancel</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 14 },

  header: { marginBottom: 10 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  headerSubtitle: { color: '#6B7280', marginTop: 4 },

  searchBox: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 12, marginBottom: 14 },
  searchInput: { padding: 12, fontSize: 15 },

  categoryCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'space-between',
  },

  iconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  icon: { fontSize: 22 },

  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardDesc: { color: '#6B7280', marginTop: 4 },

  viewBtn: {
    marginTop: 12,
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },

  post: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginVertical: 8 },
  postTitle: { fontWeight: 'bold', fontSize: 16 },
  muted: { color: '#6B7280', marginTop: 4 },
  pinned: { color: '#B45309', fontWeight: 'bold' },

  back: { color: '#2563EB', marginVertical: 12 },

  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#2563EB',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: { color: '#fff', fontSize: 26 },

  modal: { padding: 16 },
  input: { backgroundColor: '#E5E7EB', padding: 12, borderRadius: 8, marginVertical: 6 },
  submit: { backgroundColor: '#2563EB', padding: 14, borderRadius: 8, marginTop: 10 },
  submitText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
