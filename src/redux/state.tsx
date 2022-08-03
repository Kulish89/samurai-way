import { StateType } from "..";

export const state: StateType = {
  dialogsData: [
    { name: "Andrey", id: 1 },
    { name: "Alex", id: 2 },
    { name: "Elena", id: 3 },
    { name: "Olga", id: 4 },
    { name: "Dimych", id: 5 },
  ],
  messagesData: [
    { message: "Hello, how are you?", id: 1 },
    { message: "Why do you keep silent?", id: 2 },
    { message: "Don't ignore me!", id: 3 },
  ],
  postsData: [
    { id: 1, text: "Hello world!" },
    { id: 2, text: "This is my first post!" },
  ],
};
