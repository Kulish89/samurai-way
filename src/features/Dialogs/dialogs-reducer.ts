// ------------------------------------------------------------------------
export type DialogsActionsType = ReturnType<typeof addMessageAC>;

export type DialogsPageType = typeof initialState;
export type DialogType = {
  name: string;
  id: number;
};
export type MessageType = {
  message: string;
  id: number;
};

const initialState = {
  dialogs: [
    { name: "Andrey", id: 1 },
    { name: "Alex", id: 2 },
    { name: "Elena", id: 3 },
    { name: "Olga", id: 4 },
    { name: "Dimych", id: 5 },
  ] as Array<DialogType>,
  messages: [
    { message: "Hello, how are you?", id: 1 },
    { message: "Why do you keep silent?", id: 2 },
    { message: "Don't ignore me!", id: 3 },
  ] as Array<MessageType>,
};

// ----------------------------------------------------------

export const dialogsReducer = (
  state: DialogsPageType = initialState,
  action: DialogsActionsType
): DialogsPageType => {
  switch (action.type) {
    case "ADD_MESSAGE": {
      return {
        ...state,
        dialogs: state.dialogs,
        messages: [...state.messages, { id: 4, message: action.message }],
      };
    }

    default:
      return { ...state, dialogs: state.dialogs, messages: state.messages };
  }
};

// ---------------------------------------------------------------

export const addMessageAC = (message: string) =>
  ({ type: "ADD_MESSAGE", message } as const);
