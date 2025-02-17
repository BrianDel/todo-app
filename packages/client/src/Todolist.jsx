import { useState, useEffect } from 'react';
import { fetchData } from './todoAPIs';
function Todolist() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData()
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      {console.log(data)}
      {data ?     
      <div>
        <h2>List of Items:</h2>
        <ul>
          {data.map((item, index) => (
          <li key={index}>{item.description}</li>
          ))}
        </ul>
    </div>: <p>Loading...</p>}
    </div>
  );
}

export default Todolist;
