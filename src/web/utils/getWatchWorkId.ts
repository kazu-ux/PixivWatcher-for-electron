export default function () {
  const url = document.location.href;
  if (!url.includes('/feed')) return;

  const watchWorkId = url.split('/').at(-1);
  if (!watchWorkId) return;

  return watchWorkId;
}
