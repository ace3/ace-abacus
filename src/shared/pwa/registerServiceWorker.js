export const registerServiceWorker = async ({
  isProd = import.meta.env.PROD,
  onError = (error) => {
    console.error("Failed to register service worker.", error);
  }
} = {}) => {
  if (!isProd || typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
    return registration;
  } catch (error) {
    onError(error);
    return null;
  }
};

export default registerServiceWorker;
