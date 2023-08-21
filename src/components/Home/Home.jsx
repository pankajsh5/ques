import React from 'react';
import usePrivateAxios from '../../hooks/usePrivateAxios';

function Home() {

  const ax = usePrivateAxios();

  const checkfun = async()=>{
    console.log('check');
    try {
      const res = await ax.get('challenge/check');
      console.log(res.data);
    } catch (error) {
      console.log('some error found');
    }
  }

  return (
    <div>Home
      <button className='btn' color='green' onClick={checkfun}>check</button>
    </div>
  )
}

export default Home;