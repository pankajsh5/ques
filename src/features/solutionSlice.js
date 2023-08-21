import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import { getSolutionApi,setSolutionApi } from '../api/Solution'

const initialState = {
    solutionByQuestionId : {}
};

export const getSolution = createAsyncThunk(
    'solution/get',
    getSolutionApi
)

export const setSolution = createAsyncThunk(
    'solution/set',
    setSolutionApi
)

const solutionSlice = createSlice({
    name : 'solution',
    initialState,
    reducers : {

    },
    extraReducers : (builder)=>{
        builder
        .addCase(getSolution.fulfilled,(state,{ payload })=>{
            const { question_id,solution } = payload;
            // console.log(payload);
            state.solutionByQuestionId[`${question_id}`] = { ...solution,question_id };
        })
        .addCase(setSolution.fulfilled,(state,{ payload })=>{
            const { id,language,code } = payload;
            
            state.solutionByQuestionId[`${id}`] = { question_id: id,language,code };
        })
    }
});

export const {

} = solutionSlice.actions;

export default solutionSlice.reducer;