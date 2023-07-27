import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addTrainingDocuments, addTrainingLinks, addTrainingQuizApi, getQuizQuestions } from '../API/TrainingApi';

const initialState = {
    status: "idle",
    questions: [],
    loading: false,
    error: null as string | null,
};

// CREATE
export const addTrainingLinksAsync: any = createAsyncThunk(
    'addTrainingLinks',
    async (data) => {
        try {
            const response: any = await addTrainingLinks(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
// CREATE
export const addTrainingDocumentsAsync: any = createAsyncThunk(
    'addTrainingDocuments',
    async (data) => {
        try {
            const response: any = await addTrainingDocuments(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);


// adminaddtraining quiz

export const addTrainingQuizAsync: any = createAsyncThunk(
    'addTrainingQuiz',
    async (data: any) => {
        try {
            const response: any = await addTrainingQuizApi(data);
            console.log(response)
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

// get quiz
export const fetchQuizQuestionsAsync = createAsyncThunk(
    'quiz/fetchQuizQuestions',
    async (jobProfileId, { rejectWithValue }) => {
      try {
        const questions = await getQuizQuestions(jobProfileId);
        return questions;
      } catch (error:any) {
        return rejectWithValue(error.message);
      }
    }
  );

//   // get quiz
// export const fetchQuizQuestionsAsync = createAsyncThunk(
//     'quiz/fetchQuizQuestions',
//     async (data, { rejectWithValue }) => {
//       try {
//         const questions = await getQuizQuestions(data);
//         return questions;
//       } catch (error:any) {
//         return rejectWithValue(error.message);
//       }
//     }
//   );


export const TrainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTrainingLinksAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTrainingLinksAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                // state.groups =  action.payload.employees;
            })
            .addCase(addTrainingDocumentsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTrainingDocumentsAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                // state.groups =  action.payload.employees;
            })
            .addCase(addTrainingQuizAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTrainingQuizAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                // state.groups =  action.payload.employees;
            })
            .addCase(fetchQuizQuestionsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(fetchQuizQuestionsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
              })
              .addCase(fetchQuizQuestionsAsync.rejected, (state, action) => {
                state.loading = false;
                // state.error = action.payload;
              });
        
    },
});

export default TrainingSlice.reducer;
