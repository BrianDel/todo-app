// TodoForm.js
import { useState } from "react";
import {addTodoAPI} from "./todoAPIs"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const AddTodo = () => {
  let now = new Date();
  now = now.toISOString().split('T')[0];
  console.log(now);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(now);
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !date || !priority) {
      alert("Please fill in all fields.");
      return;
    }
    addTodoAPI({description,date,priority});
    setDescription("");
    setDate(now);
    setPriority("Low");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            //label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add Todo
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddTodo;
