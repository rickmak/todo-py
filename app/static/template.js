export function cloneByID(_id) {
  const _t = document.querySelector(`#${_id}`);
  const clone = document.importNode(_t.content, true);
  return clone;
}
