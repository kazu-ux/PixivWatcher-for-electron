import { useState } from 'react';
import './App.css';

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className='container'>
      <h1>{count}</h1>
      <button onClick={() => setCount((count) => count + 1)}>Count</button>
      <div>test</div>
      <img
        src='https://i.pximg.net/c/250x250_80_a2/img-master/img/2023/04/04/14/37/35/106856342_p0_square1200.jpg'
        alt=''
      />
      <img
        src='https://i.pximg.net/c/360x360_70/img-master/img/2020/06/18/21/17/28/82407783_p0_square1200.jpg'
        alt=''
      />
      <img
        src='https://i.pximg.net/img-original/img/2020/01/11/20/04/34/78841438_p0.jpg'
        alt=''
      />
    </div>
  );
};
