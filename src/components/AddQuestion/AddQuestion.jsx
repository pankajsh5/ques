import React,{ useState } from 'react';
import { useParams } from 'react-router-dom';
import './AddQuestion.css';
import add from '../../assets/add.svg';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addNewQuestion } from '../../features/questionSlice';
import usePrivateAxios from '../../hooks/usePrivateAxios';

function AddQuestion() {

  const dispatch = useDispatch();
  const ax = usePrivateAxios();
  const { id } = useParams();

  const [tags, setTags] = useState([]);

  const addNewTag = ()=>{
    if( tags.length==5 ){
      toast("only 5 tags can be added",{ type : 'warning' });
      return;
    }
    let newTag = prompt('enter the tag name');
    if( !newTag )
      return;

    newTag = newTag.trim().replace(/\s+/g,'_');

    if( newTag==='' ){
      toast("tag can't be empty string", { type : 'warning' });
      return;
    }

    setTags([...tags,newTag]);
  }

  const removeTag = (tag)=>{
    let newTag = tags.filter((elem)=>elem!==tag);
    setTags(newTag);
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const link = document.getElementById('link').value.trim();
    if( !title || !link ){
        toast('title and link are required',{ type : 'info' });
        return;
    }
    document.querySelector('.btn[color="green"')
    .setAttribute('disabled',true);
    document.querySelector('.btn[color="red"')
    .setAttribute('disabled',true);

    const r = dispatch( addNewQuestion({ ax,title,link,tags,id }) );
    console.log(r);
    r.finally(()=>{
      console.log('finally');
      document.querySelector('.btn[color="green"')
      .removeAttribute('disabled')
      document.querySelector('.btn[color="red"')
      .removeAttribute('disabled')
      clearHandler(e);
      setTags([]);
    })
  }
  
  const clearHandler = (e)=>{
    e.preventDefault();
    document.getElementById('title').value = '';
    document.getElementById('link').value = '';
  }

  return (
    <>
      <h1 className='page_title'>Add Question</h1>
      <form>
          <input type="text" className='input' placeholder='Title'  id="title" />
          <input type="text" className='input' id="link" placeholder='Link' />
          <div id='add_tags'>
            <img src={add} className='svg-img' onClick={addNewTag} alt="" />

            {
              tags.map(elem=>{
                return <span key={elem} onClick={()=>removeTag(elem)} className='addquestion_tag'>#{elem}</span>
              })
            }
            {
              tags.length === 0 ?
              <p>Click + to add tags </p> :
              <p>Click on tags to remove them</p>
            }
          </div>
          <div>
            <button className="btn" color='green' onClick={submitHandler}>Submit</button>
            <button className="btn" color='red' onClick={clearHandler}>Clear</button>
          </div>
      </form>
    </>
  )
}

export default AddQuestion