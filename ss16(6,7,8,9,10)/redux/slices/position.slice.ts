import {
    createPosition,
    deletePosition,
    getAllPosition,
    getPositionById,
    togglePositionStatus,
    updatePosition
} from "@/apis/position.api";
import { Position } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  data: Position[];
  currentPosition: Position | null;
  status: "IDLE" | "PENDING" | "FULFILLED" | "FAILED";
  error: string | undefined;
  createStatus: "IDLE" | "PENDING" | "FULFILLED" | "FAILED";
  updateStatus: "IDLE" | "PENDING" | "FULFILLED" | "FAILED";
  deleteStatus: "IDLE" | "PENDING" | "FULFILLED" | "FAILED";
};

const initialState: InitialState = {
  data: [],
  currentPosition: null,
  status: "IDLE",
  error: undefined,
  createStatus: "IDLE",
  updateStatus: "IDLE",
  deleteStatus: "IDLE",
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    clearCurrentPosition: (state) => {
      state.currentPosition = null;
    },
    clearCreateStatus: (state) => {
      state.createStatus = "IDLE";
    },
    clearUpdateStatus: (state) => {
      state.updateStatus = "IDLE";
    },
    clearDeleteStatus: (state) => {
      state.deleteStatus = "IDLE";
    },
    clearError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers(builder) {
    builder
      // Get All Positions
      .addCase(getAllPosition.pending, (state) => {
        state.status = "PENDING";
        state.error = undefined;
      })
      .addCase(getAllPosition.fulfilled, (state, action) => {
        state.status = "FULFILLED";
        state.data = action.payload.data;
      })
      .addCase(getAllPosition.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message;
      })
      
      // Get Position By ID
      .addCase(getPositionById.pending, (state) => {
        state.status = "PENDING";
        state.error = undefined;
      })
      .addCase(getPositionById.fulfilled, (state, action) => {
        state.status = "FULFILLED";
        state.currentPosition = action.payload.data;
      })
      .addCase(getPositionById.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message;
      })
      
      // Create Position
      .addCase(createPosition.pending, (state) => {
        state.createStatus = "PENDING";
        state.error = undefined;
      })
      .addCase(createPosition.fulfilled, (state, action) => {
        state.createStatus = "FULFILLED";
        // Add new position to the list
        state.data.push(action.payload.data);
      })
      .addCase(createPosition.rejected, (state, action) => {
        state.createStatus = "FAILED";
        state.error = action.error.message;
      })
      
      // Update Position
      .addCase(updatePosition.pending, (state) => {
        state.updateStatus = "PENDING";
        state.error = undefined;
      })
      .addCase(updatePosition.fulfilled, (state, action) => {
        state.updateStatus = "FULFILLED";
        const updatedPosition = action.payload.data;
        const index = state.data.findIndex(pos => pos.id === updatedPosition.id);
        if (index !== -1) {
          state.data[index] = updatedPosition;
        }
        if (state.currentPosition?.id === updatedPosition.id) {
          state.currentPosition = updatedPosition;
        }
      })
      .addCase(updatePosition.rejected, (state, action) => {
        state.updateStatus = "FAILED";
        state.error = action.error.message;
      })
      
      // Delete Position
      .addCase(deletePosition.pending, (state) => {
        state.deleteStatus = "PENDING";
        state.error = undefined;
      })
      .addCase(deletePosition.fulfilled, (state, action) => {
        state.deleteStatus = "FULFILLED";
        state.data = state.data.filter(pos => pos.id !== action.payload.id);
        if (state.currentPosition?.id === action.payload.id) {
          state.currentPosition = null;
        }
      })
      .addCase(deletePosition.rejected, (state, action) => {
        state.deleteStatus = "FAILED";
        state.error = action.error.message;
      })
      
      // Toggle Position Status
      .addCase(togglePositionStatus.pending, (state) => {
        state.updateStatus = "PENDING";
        state.error = undefined;
      })
      .addCase(togglePositionStatus.fulfilled, (state, action) => {
        state.updateStatus = "FULFILLED";
        const updatedPosition = action.payload.data;
        const index = state.data.findIndex(pos => pos.id === updatedPosition.id);
        if (index !== -1) {
          state.data[index] = updatedPosition;
        }
        if (state.currentPosition?.id === updatedPosition.id) {
          state.currentPosition = updatedPosition;
        }
      })
      .addCase(togglePositionStatus.rejected, (state, action) => {
        state.updateStatus = "FAILED";
        state.error = action.error.message;
      });
  },
});

export const { 
  clearCurrentPosition, 
  clearCreateStatus, 
  clearUpdateStatus, 
  clearDeleteStatus, 
  clearError 
} = positionSlice.actions;

export default positionSlice.reducer;
