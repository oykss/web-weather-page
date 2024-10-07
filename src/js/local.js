export function getLocal() {
  return new Promise(resolve => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve([longitude, latitude]);
        },
        error => {
          resolve([33.35, 47.9167]);
        }
      );
    } else {
      resolve([33.35, 47.9167]);
    }
  });
}
