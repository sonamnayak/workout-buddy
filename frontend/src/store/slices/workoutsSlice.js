import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
});

const fetchWithAuth = async (url, token, rejectWithValue, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return rejectWithValue(data);
    }
  } catch (err) {
    return rejectWithValue(err || "Something Went Wrong! Please try again");
  }
};

const workoutsSlice = createSlice({
  name: "workouts",
  initialState: {
    status: STATUS.IDLE,
    workouts: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const pendingReducer = (state) => {
      state.status = STATUS.LOADING;
    };

    const rejectedReducer = (state, action) => {
      state.status = STATUS.ERROR;
      state.error =
        action.payload?.message || "Something Went Wrong! Please try again";
    };

    builder
      //getAllWorkouts
      .addCase(getAllWorkouts.pending, pendingReducer)
      .addCase(getAllWorkouts.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.workouts = action.payload;
      })
      .addCase(getAllWorkouts.rejected, rejectedReducer)

      //createWorkout
      .addCase(createWorkout.pending, pendingReducer)
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.workouts.unshift(action.payload);
      })
      .addCase(createWorkout.rejected, rejectedReducer)

      //deleteWorkout
      .addCase(deleteWorkout.pending, pendingReducer)
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.workouts = state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        );
      })
      .addCase(deleteWorkout.rejected, rejectedReducer);
  },
});

export const getAllWorkouts = createAsyncThunk(
  "api/workouts",
  async (_, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    return await fetchWithAuth(
      "http://localhost:3001/api/workouts",
      token,
      rejectWithValue
    );
  }
);

export const createWorkout = createAsyncThunk(
  "api/workouts/create",
  async (workout, { rejectWithValue, getState }) => {
    const { userId, token } = getState().user;
    return await fetchWithAuth(
      "http://localhost:3001/api/workouts",
      token,
      rejectWithValue,
      {
        method: "POST",
        body: JSON.stringify({ ...workout, userId: userId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
);

export const deleteWorkout = createAsyncThunk(
  "api/workouts/delete",
  async (workoutId, { rejectWithValue, getState }) => {
    const token = getState().user.token;
    return await fetchWithAuth(
      "http://localhost:3001/api/workouts/" + workoutId,
      token,
      rejectWithValue,
      {
        method: "DELETE",
      }
    );
  }
);

export default workoutsSlice.reducer;
