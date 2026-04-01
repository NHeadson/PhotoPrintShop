import { useNotifications } from "@/stores/notificationStore";

export async function redirectAfterModal(
  router,
  target,
  message,
  options = {},
) {
  const notifications = useNotifications();
  await notifications.modalAndWait(message, options);
  return router.push(target);
}
