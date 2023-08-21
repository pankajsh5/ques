import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import challengeReducer from '../features/challengeSlice';
import questionReducer from '../features/questionSlice';
import solutionReducer from '../features/solutionSlice';

const store = configureStore({
    reducer : {
        user : userReducer,
        challenge : challengeReducer,
        question : questionReducer,
        solution : solutionReducer
    }
});

export default store;