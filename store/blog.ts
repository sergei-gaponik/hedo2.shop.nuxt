export const state = () => ({
  visitedArticles: [],
});

export const mutations = {
  addVisitedArticle(_state: any, id: string) {
    _state.visitedArticles.push(id);
  },
};
