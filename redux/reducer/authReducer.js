import { LOGIN, LOGOUT } from "../../constant/Action";

const initialState = {
  token: "",
  userId: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
