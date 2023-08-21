import { toast } from "react-toastify";

export const getAllChallengesApi = async({ ax,offset },thunkApi)=>{
    const t = toast.loading('Fetching challenges');
    try {
        // console.log(ax);
        const res = await ax.get(`/challenge?offset=${offset}`);
        toast.update(t,{ render : 'Challenges Fetched',type : 'success',autoClose : true,isLoading : false,closeOnClick : true });
        return res.data.result;
    } catch (error) {
        toast.update(t,{ render : 'Fetching challenges failed : try again',type : 'error',autoClose : true,isLoading : false,closeOnClick : true });
        return thunkApi.rejectWithValue({ message: error.response.data.message });
    }
}

export const addNewChallengeApi = async({ title,ax }, thunkApi)=>{
    const t = toast.loading('Adding new Challenge');
    try {
        const res = await ax.post('/challenge/add',{title});
        toast.update(t,{render : 'Challenge Added', type : 'success',isLoading : false,autoClose : true,closeOnClick : true })
        return res.data;
    } catch (error) {
        toast.update(t,{render : 'Challenge not added', type : 'error',isLoading : false,autoClose : true,closeOnClick : true })
        return thunkApi.rejectWithValue({ message: error.response.data.message });
    }
}

export const deleteChallengeApi = async({ id,ax }) =>{
    const t = toast.loading('Deleting Challenge');
    try {
        await ax.delete(`/challenge?id=${id}`);
        toast.update(t,{ render:'Challenge Deleted',type: 'success',isLoading : false,autoClose : true,closeOnClick: true });

        return {id};
    } catch (error) {
        toast.update(t,{render : 'Challenge Not Deleted', type : 'error',isLoading : false,autoClose : true,closeOnClick : true })
        return thunkApi.rejectWithValue({ message: error.response.data.message });
        
    }
}