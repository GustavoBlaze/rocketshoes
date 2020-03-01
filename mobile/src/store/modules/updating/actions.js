export function updatingItem(id, status) {
  return {
    type: '@updating/UPDATING_ITEM',
    id,
    status,
  };
}
