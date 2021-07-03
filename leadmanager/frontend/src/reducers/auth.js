const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isloading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
