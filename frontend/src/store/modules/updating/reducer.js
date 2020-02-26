import produce from 'immer';

export default function updating(state = {}, action) {
  switch (action.type) {
    case '@updating/UPDATING_ITEM':
      return produce(state, draft => {
        const { status, id } = action;
        draft.status = status;
        draft.id = id;
      });
    default:
      return state;
  }
}
