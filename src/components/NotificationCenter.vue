<script>
import { useNotifications } from "@/stores/notificationStore";

export default {
  name: "NotificationCenter",
  computed: {
    notifications() {
      return useNotifications().items;
    },
    toasts() {
      return this.notifications.filter((item) => item.variant !== "modal");
    },
    activeModal() {
      return this.notifications.find((item) => item.variant === "modal") || null;
    },
  },
  methods: {
    toastClass(type) {
      return `toast-${type || "info"}`;
    },
    modalClass(type) {
      return `modal-${type || "info"}`;
    },
  },
};
</script>

<template>
  <div class="notification-layer" aria-live="polite" aria-atomic="true">
    <transition-group name="toast" tag="div" class="toast-stack">
      <div
        v-for="item in toasts"
        :key="item.id"
        class="toast-card"
        :class="toastClass(item.type)"
      >
        <p v-if="item.title" class="toast-title">{{ item.title }}</p>
        <p class="toast-message">{{ item.message }}</p>
      </div>
    </transition-group>

    <transition name="modal-fade">
      <div v-if="activeModal" class="auto-modal-backdrop">
        <div class="auto-modal" :class="modalClass(activeModal.type)" role="status" aria-live="assertive">
          <p v-if="activeModal.title" class="modal-title">{{ activeModal.title }}</p>
          <p class="modal-message">{{ activeModal.message }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.notification-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 3000;
}

.toast-stack {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: min(90vw, 360px);
}

.toast-card {
  border-radius: 10px;
  padding: 0.75rem 1rem;
  color: #fff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.toast-title {
  margin: 0 0 0.25rem;
  font-weight: 700;
}

.toast-message {
  margin: 0;
}

.toast-info {
  background: #3f51b5;
}

.toast-success {
  background: #1f8f46;
}

.toast-warning {
  background: #c47b00;
}

.toast-error {
  background: #b52a2a;
}

.auto-modal-backdrop {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.32);
}

.auto-modal {
  width: min(88vw, 460px);
  border-radius: 14px;
  background: #fff;
  padding: 1.2rem 1.3rem;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
  border-left: 8px solid #3f51b5;
}

.modal-title {
  margin: 0 0 0.35rem;
  font-weight: 700;
  color: #232323;
}

.modal-message {
  margin: 0;
  color: #333;
}

.modal-info {
  border-left-color: #3f51b5;
}

.modal-success {
  border-left-color: #1f8f46;
}

.modal-warning {
  border-left-color: #c47b00;
}

.modal-error {
  border-left-color: #b52a2a;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.24s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.24s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>