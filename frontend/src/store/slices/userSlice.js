import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
});

const authenticate = async (type, user, rejectWithValue, options = {}) => {
  try {
    const response = await fetch("http://localhost:3001/api/auth/" + type, {
      method: "POST",
      body: JSON.stringify(user),
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
    const data = await response.json();
    console.log(response)
    if(response.ok) localStorage.setItem("user", JSON.stringify(data));
    return response.ok ? data : rejectWithValue(data);
  } catch (err) {
    return rejectWithValue(err || "Something Went Wrong! Please try again");
  }
};

const userData = JSON.parse(localStorage.getItem("user")) || {};

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: STATUS.IDLE,
    userId: userData?.userId || null,
    email: userData?.email || null,
    token: userData?.token || null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.status = STATUS.IDLE;
      state.userId = null;
      state.email = null;
      state.token = null;
      localStorage.removeItem("user");
      
    },
  },
  extraReducers: (builder) => {
    const pendingReducer = (state) => {
      state.status = STATUS.LOADING;
    };

    const fulfilledReducer = (state, action) => {
      state.status = STATUS.SUCCESS;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.token = action.payload.token;
      console.log(action.payload)
    };

    const rejectedReducer = (state, action) => {
      state.status = STATUS.ERROR;
      state.error =
        action.payload?.message || "Something Went Wrong! Please try again";
    };

    builder
      //login
      .addCase(login.pending, pendingReducer)
      .addCase(login.fulfilled, fulfilledReducer)
      .addCase(login.rejected, rejectedReducer)

      //register
      .addCase(register.pending, pendingReducer)
      .addCase(register.fulfilled, fulfilledReducer)
      .addCase(register.rejected, rejectedReducer);
  },
});

export const login = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    return await authenticate("login", user, rejectWithValue);
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    return await authenticate("register", user, rejectWithValue);
  }
);

export const { logout } = userSlice.actions;

export default userSlice.reducer;
