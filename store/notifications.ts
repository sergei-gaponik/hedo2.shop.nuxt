const DURATION = 3500;

export const state = () => ({
  caption: "",
  visible: false,
  status: null,
});

export const mutations = {
  setCaption(_state, caption) {
    _state.caption = caption;
  },

  setVisible(_state, visible) {
    _state.visible = visible;
  },

  setStatus(_state, status) {
    _state.status = status;
  },
};

const showNotification = async (context, caption) => {
  if (context.state.visible) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    context.commit("setVisible", false);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  context.commit("setCaption", caption);
  context.commit("setVisible", true);

  setTimeout(() => {
    context.commit("setVisible", false);
  }, DURATION);
};

export const actions = {
  error(context, caption) {
    context.commit("setStatus", "error");

    showNotification(context, caption);
  },

  success(context, caption) {
    context.commit("setStatus", "success");

    showNotification(context, caption);
  },
};
