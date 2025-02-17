async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/todos'); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function addTodoAPI(todo) {
  const todoStr = JSON.stringify(todo);
  const customHeaders = {
    "Content-Type": "application/json",
  }
  console.log(todoStr);
  try {
    const response = await fetch('http://localhost:3000/todos', {method: 'POST', body: todoStr, headers: customHeaders});
    const data = await response.json();
      if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export {fetchData, addTodoAPI}