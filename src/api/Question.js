import { toast } from "react-toastify"

export const getAllQuestionApi = async({ offset,id,ax },thunkApi)=>{
    const t = toast.loading('Fetching Questions');
    try {
        const res = await ax.get(`question?offset=${offset}&id=${id}`);
        toast.update(t,{ render:'Questions Fetched',type : 'success',isLoading: false,closeOnClick: true,autoClose:true })
        return {questions : res.data.questions,id};
    } catch (error) {
        toast.update(t,{ render:'Questions Not Fetched',type : 'error',isLoading: false,closeOnClick: true,autoClose:true })
        return thunkApi.rejectWithValue({ message: error.response.data.message });
    }
}

export const deleteQuestionApi = async({ question_id,id,ax })=>{
    const t = toast.loading('Deleting Question');
    try {
        await ax.delete(`/question?id=${id}&question_id=${question_id}`);
        toast.update(t,{ render:'Question Deleted',type : 'success',isLoading: false,closeOnClick: true,autoClose:true })
        
        return { question_id,challenge_id : id };
    } catch (error) {
        toast.update(t,{ render:'Questions Not Deleted',type : 'error',isLoading: false,closeOnClick: true,autoClose:true })
        return thunkApi.rejectWithValue({ message: error.response.data.message });
    }
}

export const addNewQuestionApi = async ({ title,tags,link,id,ax })=>{
    const t = toast.loading('Adding new Question');
    
    try {
        const res = await ax.post(`/question?id=${id}`,{
            title,
            tags,
            link
        });
        
        toast.update(t,{ render:'Question Added',type : 'success',isLoading: false,closeOnClick: true,autoClose:true })

        return {question : res.data.question,id};
    } catch (error) {
        toast.update(t,{ render:'Question Not Added',type : 'error',isLoading: false,closeOnClick: true,autoClose:true })
        
        return thunkApi.rejectWithValue({ message: error.response.data.message });
    }
}