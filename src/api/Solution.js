import { toast } from "react-toastify";

export const getSolutionApi = async({ question_id,ax })=>{

    const t = toast.loading('Fetching Solution');

    try {
        const res = await ax.get(`/question/solution?id=${question_id}`);
        
        toast.update(t,{ render:'Solution Fetched',type : 'success',isLoading: false,closeOnClick: true,autoClose:true });
        // console.log(res);
        return { solution : res.data.solution,question_id };
    } catch (error) {
        toast.update(t,{ render:'Question Not Added',type : 'error',isLoading: false,closeOnClick: true,autoClose:true })
        
        return thunkApi.rejectWithValue({ message: error.response.data.message });
    }
}

export const setSolutionApi = async({ ax,language,code,id })=>{
    const t = toast.loading('Updating Solution');

    try {
        const res = await ax.put(`/question/solution?id=${id}`,{
            language,
            code
        });
        toast.update(t,{ render:'Solution Updated',type : 'success',isLoading: false,closeOnClick: true,autoClose:true })
        
        return { id,language,code };
    } catch (error) {
        toast.update(t,{ render:'Solution Not Updated',type : 'error',isLoading: false,closeOnClick: true,autoClose:true })
        
        return thunkApi.rejectWithValue({ message: error.response.data.message });
        
    }
}