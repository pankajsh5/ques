import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { addNewChallengeApi, deleteChallengeApi, getAllChallengesApi } from '../api/Challenge';

const initialState = {
    count : 0,
    challengeById : {}
}

export const getAllChallenges = createAsyncThunk(
    'challenge/getall',
    getAllChallengesApi
)

export const addNewChallenge = createAsyncThunk(
    'challenge/add',
    addNewChallengeApi
)

export const deleteChallenge = createAsyncThunk(
    'challege/delete',
    deleteChallengeApi
)

const challengeSlice = createSlice({
    name : 'challenge',
    initialState,
    reducers : {

    },
    extraReducers : (builder)=>{
        builder
        .addCase(getAllChallenges.fulfilled,(state,{payload})=>{
            // console.log(payload);
            state.count += payload.length;
            const newlist = {};
            payload.forEach(elem => {
                newlist[`${elem.id}`] = elem;
            });

            state.challengeById = {...state.challengeById,...newlist};
        })
        .addCase(addNewChallenge.fulfilled,(state,{ payload })=>{
            state.count++;
            state.challengeById[`${payload.challenge.id}`] = {...payload.challenge,solved : 0};
            // state.challenges.push({...payload.challenge,solved : 0});
        })
        .addCase(deleteChallenge.fulfilled,(state,{ payload })=>{
            // state.challenges = state.challenges.filter(elem=>elem.id!==payload.id);
            const { id } = payload;
            delete state.challengeById[`${id}`];
        })
    }
});

export default challengeSlice.reducer;
export const {

} = challengeSlice.actions;