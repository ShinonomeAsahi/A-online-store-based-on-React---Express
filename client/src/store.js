import create from 'zustand';

const useStore = create((set) => ({
  articles: [],
  user: null,
  setArticles: (articles) => set({ articles }),
  setUser: (user) => set({ user }),
}));

export default useStore;
