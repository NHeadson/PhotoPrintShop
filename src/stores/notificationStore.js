import { reactive } from "vue";

const state = reactive({
  items: [],
});

let nextId = 1;
const dismissResolvers = new Map();

function remove(id) {
  const index = state.items.findIndex((item) => item.id === id);
  if (index !== -1) {
    state.items.splice(index, 1);
  }

  const resolve = dismissResolvers.get(id);
  if (resolve) {
    dismissResolvers.delete(id);
    resolve();
  }
}

function notify(message, options = {}) {
  const {
    title = "",
    type = "info",
    variant = "toast",
    duration = 3500,
  } = options;

  const id = nextId++;
  state.items.push({ id, title, message, type, variant });

  const timeout = Math.max(1200, duration || 0);
  window.setTimeout(() => remove(id), timeout);

  return id;
}

function notifyAndWait(message, options = {}) {
  return new Promise((resolve) => {
    const id = notify(message, options);
    dismissResolvers.set(id, resolve);
  });
}

export function useNotifications() {
  return {
    items: state.items,
    remove,
    notify,
    notifyAndWait,
    success(message, options = {}) {
      return notify(message, { ...options, type: "success" });
    },
    error(message, options = {}) {
      return notify(message, { ...options, type: "error" });
    },
    warning(message, options = {}) {
      return notify(message, { ...options, type: "warning" });
    },
    info(message, options = {}) {
      return notify(message, { ...options, type: "info" });
    },
    modal(message, options = {}) {
      return notify(message, {
        ...options,
        variant: "modal",
        duration: options.duration ?? 3200,
      });
    },
    modalAndWait(message, options = {}) {
      return notifyAndWait(message, {
        ...options,
        variant: "modal",
        duration: options.duration ?? 3200,
      });
    },
  };
}
