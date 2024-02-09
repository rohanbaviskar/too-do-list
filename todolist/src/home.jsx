import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Create from './CustomCreate';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import './App.css';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3002/get')
            .then(response => setTodos(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleEdit = (_id) => {
        axios.put('http://localhost:3002/update/' + _id)
            .then(result =>{
                location.reload()
            })
            .catch(error => console.error(error));
    }
    const handleDelete = (_id) => {
        axios.delete('http://localhost:3002/delete/' + _id)
            .then(result => {
                location.reload();
            })
            .catch(error => console.error(error));
    }
    
    return (
        <div className="Home">
            <h2>Todo list</h2>
            <Create/>
            {
                todos.length === 0 ?
                <div><h2>No record</h2></div> 
                :
                todos.map(todo => (
                    <div key={todo._id} className="task">
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            { todo.done ?<BsFillCheckCircleFill className="icon" ></BsFillCheckCircleFill>
                            :<BsCircleFill className="icon" />
                            }
                            
                            <p  className={todo.done ? "line_through": ""}id="read-task">{todo.task}</p>
                        </div>
                        <div>
                            <span>
                            <BsFillTrashFill id="jk" className="icon" onClick={() => handleDelete(todo._id)} /></span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;
