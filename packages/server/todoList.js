import MiniSearch from 'minisearch';
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

const TodoList = {
  todos: [],
  nextId: 0,
  miniSearch: new MiniSearch({
    fields: ['description', 'priority'],
    storeFields: ['description', 'priority','date'] 
  }),
  
  createTodo: function (date = Date.now(), description, priority="Medium") {
    console.log("adding todo - " + description);
    if (!description || description === ""){
      throw Error("Must supply description ");
    }
    let todo = {
      "id":TodoList.nextId++,
      "date": date,
      "description": description,
      "priority": priority
    }
    TodoList.todos = [...TodoList.todos, todo];
    if (TodoList.miniSearch.documentCount === 1) {
      TodoList.miniSearch.addAll(TodoList.todos);
    } else {
      console.log(TodoList.miniSearch.toJSON());
      console.log(todo);
      TodoList.miniSearch.add(todo);
    }
    
  },
  
  loadTodos: function (db) {
    TodoList.todos = db;
    let highestId = -1;

    for (const jsonObject of db) {
      if (jsonObject.hasOwnProperty('id')) {
        const id = parseInt(jsonObject.id, 10);
        if (!isNaN(id) && id > highestId) {
          highestId = id;
          console.log(id);
        }
      }
    }
    TodoList.nextId = highestId+1;
    TodoList.miniSearch.addAll(TodoList.todos);

  },

  searchTodo: function(searchText) {
    return TodoList.miniSearch.search(searchText);
  },

  getTodo: function (id) {
    return TodoList.todos.find((todo) => todo.id == id);  
  },
  delTodo: function (id) {
    
    let updatedTodos = TodoList.todos.filter(function(item) {
      return item.id != id;
    });
    console.log(updatedTodos);
    TodoList.todos = updatedTodos;
  }
}


let todoDB = [
  {
    id: 1,
    description: 'Do something else',
    priority: 'low',
    date: '20230101'
  },
  {
    id: 0,
    description: 'Do something',
    priority: 'high',
    date: '20230101'
  }

];

TodoList.loadTodos(todoDB);
TodoList.createTodo(Date.now(), "A new entry", "medium")
TodoList.createTodo(null, "a second new item",null);
//TodoList.createTodo(Date.now(), null, "medium")
console.log(TodoList.searchTodo("second itmw"));
console.log(TodoList.getTodo(1))

const app = express()
const port = 3000
const responseDelay = 2000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.options('*', cors());

app.get('/todos/:todoID', (req, res) => {
  console.log("get todo " + req.params.todoID);
  res.set('Access-Control-Allow-Origin', '*');
  res.send(TodoList.getTodo(req.params.todoID));
})
app.get('/todos', (req, res) => {

  setTimeout(function() {
    // Delayed response to test the UX
    res.set('Access-Control-Allow-Origin', '*');
    res.send(TodoList.todos);
  }, responseDelay);
})
app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send('Hello World!')
})
app.post('/todos',(req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, accept, access-control-allow-origin');

  if (req.method === "OPTIONS") {
      return res.status(200).end();
  } else {
    console.log(req.body);
    const requestBody = req.body;
    console.log(Object.entries(requestBody));
    const paramValues = [requestBody.date,requestBody.description,requestBody.priority];
    TodoList.createTodo(...paramValues);
  }
})
app.delete('/todos/:todoID', (req, res) => {
  console.log(req.body)
  console.log("delete todo " + req.params.todoID);
  res.set('Access-Control-Allow-Origin', '*');
  res.send(TodoList.delTodo(req.params.todoID));
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port http://0.0.0.0:${port}`)
})