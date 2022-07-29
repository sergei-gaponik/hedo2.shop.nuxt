export const state = () => ({
  visible: false,
  message: "",
});

export const mutations = {
  setStatus(_state, status) {
    document.dispatchEvent(
      new CustomEvent("confirmDialogClosed", { detail: { status } })
    );
  },
  setVisible(_state, visible) {
    _state.visible = visible;
  },
  setMessage(_state, message) {
    _state.message = message;
  },
};

export const actions = {
  async ask(context, message) {
    context.commit("setMessage", message);
    context.commit("setVisible", true);

    const r = await new Promise((resolve) => {
      document.addEventListener("confirmDialogClosed", (e: CustomEvent) => {
        resolve(e.detail.status);
      });
    });

    context.commit("setVisible", false);

    return r;
  },
};
