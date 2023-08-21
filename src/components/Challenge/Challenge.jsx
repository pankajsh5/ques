import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Challenge.css';
import add from '../../assets/add.svg';
import trash from '../../assets/trash.svg';
import { useDispatch,useSelector } from 'react-redux';
import { getAllChallenges,addNewChallenge,deleteChallenge } from '../../features/challengeSlice';
import usePrivateAxios from '../../hooks/usePrivateAxios';
import reload from '../../assets/reload.svg';
import { toast } from 'react-toastify';

function Challenge() {

  const dispatch = useDispatch();
  const ax = usePrivateAxios();
  const { count,challenges } = useSelector((state)=>{
      const challenges = state.challenge.challengeById;
      const count = state.challenge.count;

      return { count,challenges }
  });
  
  useEffect(()=>{
    dispatch(getAllChallenges({ offset:count,ax }));
  },[]);
  
  const refreshChallengeList = ()=>{
    const reload = document.getElementById('reload');
    reload.classList.add('spin');
    // console.log(ax);
    const r = dispatch(getAllChallenges({ offset:count,ax }));
    r.finally(()=>{
      // console.log('finally spin');
      reload.classList.remove('spin');
    })
  }
  
  const addChallenge = ()=>{
    let title = prompt('enter text') || "";
    title = title.trim();
    if( title==='' ){
      toast("Challenge title can't be a empty string",{ type : 'info' });
      return;
    }

    dispatch(addNewChallenge({title,ax}));
  }
  
  const trashController = (id)=>{
    const res = confirm('Do you Really Want To Delete Challenge?');
    if( !res )
      return;

    dispatch(deleteChallenge({ax,id}));
  }

  return (
    <div id='Challenge'>
      <h1 className='page_title'>
        Challenges <img src={reload} id='reload'onClick={refreshChallengeList} alt="" />
      </h1>
      {
        count>0 ?
        Object.values(challenges).map((elem) => {
          const title = elem.title;
          const solvedByTotal = elem.solved + "/" + elem.total;
          

          return <div key={elem.id} className='challenge_item'>
            <img src={trash}
              onClick={()=>trashController(elem.id)}
            alt="cross" className='svg-img cross' />
            <NavLink to={`/question/${elem.id}`} className='challenge_title title'>
              {title}
              <span className='challenge_solved'> ({solvedByTotal})</span>
            </NavLink>
            <div className='challenge_owner subscript'>{elem.owner}</div>
          </div>
        }):
        <div>No Challenges Added</div>
      }

      <div id='Add_challenge' onClick={addChallenge}>
        <img src={add} className='svg-img' alt="add" />
      </div>
    </div>
  )
}

export default Challenge