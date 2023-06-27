import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { additem, deleteitem, edititem } from './slice/todoslice'
import { useState } from 'react'

function App() {
  const todoitem = useSelector(store => store.todo.items)
  
  const dispatch = useDispatch()

  const [inputvalue, setinputvalue] = useState('')
  const [editingItemId, setEditingItemId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const handleInputChange = (event) => {
    setinputvalue(event.target.value);
  };

  const handlesubmit = (event) => {
    event.preventDefault();

    if (inputvalue.trim() !== '') {
      const newItem = {
        id: Date.now(),
        text: inputvalue,
      };

      dispatch(additem(newItem));
      setinputvalue('');
    }
  };

  const handleDelete = (itemid) => {
    dispatch(deleteitem(itemid))
  };

  const handleEdit = (itemid, newText) => {
    dispatch(edititem({ id: itemid, text: newText }));
    setEditingItemId(null);
    
  };

  const handleEditButtonClick = (itemid, text) => {
    setEditingItemId(itemid);
    setEditingText(text);
  };

  return (
    <>
    <div className="container">
      <div className='main'>
        <h1>ToDo List</h1>
        <div className='inputfield'>
          <input
            type='text'
            placeholder='Enter the list'
            value={inputvalue}
            onChange={handleInputChange}
          />
          <button type='submit' onClick={handlesubmit}>
            +
          </button>
        </div>
        <ul className='todo-list'>
          {todoitem.map((item) => (
            <li key={item.id} className='todo-item'>
              {editingItemId === item.id ? (
                <div className='edit-input-container'>
                  <input
                    type='text'
                    value={editingText}
                    onChange={(event) => setEditingText(event.target.value)}
                    className='edit-input'
                  />
                  <button className='save-btn' onClick={() => handleEdit(item.id, editingText)}>
                    Save
                  </button>
                </div>
              ) : (
                <div className='todo-item-content'>
                  <span>{item.text}</span>
                  <div className='button-container'>
                    <button className='delete-btn' onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                    <button
                      className='edit-btn'
                      onClick={() => handleEditButtonClick(item.id, item.text)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </>
  )
}

export default App