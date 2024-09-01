import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

const  MenuItems= () =>{
    const {register, handleSubmit ,  formState:{errors}} = useForm();
    const [items, setItems] =  useState([]);
    const  [editItems, setEditItems] = useState(null);


    const fetchTodos = async () => {
      try {
        const response = await axios.get('/items');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
  
    // Use useEffect to fetch todos when the component mounts
    useEffect(() => {
      fetchTodos();
    }, []);

  // Handle form submission for adding/updating todos
  const onSubmit = async (data) => {
    try {
      if (editItems) {
        const response = await axios.put('', { id: editItems.id, title: data.title });
        setItems(items.map(item => item.id === editItems.id ? response.data : item));
        setEditItems(null);
      } else {
        const response = await axios.post('', data);
        setItems([...items, response.data]);
      }
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const deleteItem = async (id) =>{
    try{
      await  axios.delete('', {data: {id}});
      fetchTodos();
      

    }
    catch(error){
        console.log(error.message)
    }
  }

  const  editItem = (item) =>{
    setEditItems(item);
    reset('title', item.title);
  }

  return (
    <div>
      <h2>Menu List</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('title', { required: true })}
          placeholder="Enter item"
        />
        <button type="submit">{editItems ? 'Update' : 'Add'}</button>
      </form>
      
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => editItem(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );

}


export default MenuItems;