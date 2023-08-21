import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addNewQuestionApi, deleteQuestionApi, getAllQuestionApi } from '../api/Question';

const initialState = {
    listByChallengeId : {}
}
/*
    challenge_id : {
        challenge_id : 'adlkj',
        count : 10,
        questionById : {
            id : {
                "id": "26c7bc0e-8539-4946-bb58-db7bfc4fd1e2",
                "title": "third question",
                "tags": ["new","question","added"],
                "solved": false
            }
        }
    }

 */

export const getAllQuestion = createAsyncThunk(
    'question/getall',
    getAllQuestionApi
);

export const deleteQuestion = createAsyncThunk(
    'question/delete',
    deleteQuestionApi
)

export const addNewQuestion = createAsyncThunk(
    'question/add',
    addNewQuestionApi
)

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(deleteQuestion.fulfilled,(state,{ payload })=>{
            const { question_id,challenge_id } = payload;
            
            if( state.listByChallengeId[`${challenge_id}`]?.questionById[`${question_id}`] ){
                delete state.listByChallengeId[`${challenge_id}`].questionById[`${question_id}`];
                state.listByChallengeId[`${challenge_id}`].count--;
            }
        })
        .addCase(getAllQuestion.fulfilled,(state,{ payload })=>{
            console.log(payload);
            const { id,questions } = payload;
            const newlist = {};
            questions.forEach(elem => {
                newlist[`${elem.id}`] = elem;
            });
            const oldlist = state.listByChallengeId[`${id}`];
            console.log(newlist,oldlist);
            if( !oldlist ){
                state.listByChallengeId[`${id}`] = {
                    challenge_id : id,
                    count : questions.length,
                    questionById : newlist
                }
            }
            else{
                oldlist.count += questions.length;
                oldlist.questionById = {...oldlist.questionById,...newlist};
            }
        }) 
        .addCase(addNewQuestion.fulfilled,(state,{ payload })=>{
            const { question,id } = payload;
            const oldlist = state.listByChallengeId[`${id}`];
            const newlist = {};
            newlist[`${question.id}`] = question;
            if( oldlist ){
                oldlist.count++;
                oldlist.questionById = {...oldlist.questionById,...newlist};
            }
            else{
                state.listByChallengeId[`${id}`] = {
                    challenge_id : id,
                    count : 1,
                    questionById : newlist
                }
            }
            
        })      
    }
});

export const {

} = questionSlice.actions;

export const getQuestionById = (state,id)=>{
}

export default questionSlice.reducer;