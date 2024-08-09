import React from "react";
import { useState } from "react";
import "./form.css";
import List from "./List";
import arrCombiner from "./listens_arr";


let dateValue = '';           
let distanceValue = '';        

export default function Form() {  
  const [form, setForm] = useState({ 
    date_input: '',
    distance_input: '',
  });

  const [itemsObj, setItemsObj] = useState([]); 

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('input').focus();
  });
  
  const handleDateChange = evt => { 
    
    setForm(prevForm => ({...prevForm, date_input: evt.target.value}));
    
    if ((!(/[0-9.]/gm.test(evt.target.value))) || 
        (evt.target.value.length > 8)) 
       { 
        setForm(prevForm => ({...prevForm, date_input: ''})) 
      };
    
    if ((/(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.]\d\d/gmi.test(evt.target.value)) && evt.target.value.length === 8) { 
      
      setForm(prevForm => ({...prevForm, date_input: evt.target.value}));
      dateValue = evt.target.value;
    }
  }

  const handleDistanceChange = evt => { 

    setForm(prevForm => ({...prevForm, distance_input: evt.target.value}));

    if (/-?\d+(\.\d{0,})?/gmi.test(evt.target.value)) { 
      
      setForm(prevForm => ({...prevForm, distance_input: evt.target.value}));
      distanceValue = evt.target.value;
          
    } else {
      setForm(prevForm => ({...prevForm, distance_input: ''})) 
    }
  }
  
  const handleSubmit = evt => { 
    evt.preventDefault();
    if ((dateValue !== '') && (distanceValue !== '')) { 
      
      let tempArr = arrCombiner(dateValue, distanceValue);
      setItemsObj(prevItemsObj => tempArr);
      
      dateValue = '';
      distanceValue = '';
      setForm(prevForm => ({...prevForm, distance_input: '', date_input: ''}));
      document.querySelector('input').focus();
    };
  };

  const handleClick = evt => { 
    
    if ((dateValue !== '') && (distanceValue !== '')) { 
      
      let tempArr = arrCombiner(dateValue, distanceValue);
      setItemsObj(prevItemsObj => tempArr);
      
      dateValue = '';
      distanceValue = '';
      setForm(prevForm => ({...prevForm, distance_input: '', date_input: ''}));
      document.querySelector('input').focus();
    };
  };

  const handleRemove = evt => {  
    const { target } = evt;
    const id = target.parentElement.id;
    console.log('removed ID = ', id);   
    setItemsObj(itemsObj.filter(o => o.id !== id));
  };

  return (
    <main className="content">
        <div className="card">
          <div className="tasks" id="tasks">
            <form className="tasks__control" onSubmit={handleSubmit} id="tasks__form">
              <label htmlFor="date_input">Дата (ДД.ММ.ГГ)
                <input 
                  type="text" 
                  className="tasks__input" 
                  name="date_input" 
                  id="date__input" 
                  placeholder="Введите датау"
                  value={form.date_input}
                  onChange={handleDateChange} />
              </label>
              <label htmlFor="distance_input">Пройдено км
                <input type="text" 
                  className="tasks__input" 
                  name="distance_input" 
                  id="distance__input" 
                  placeholder="Введите кол-во КМ"
                  value={form.distance_input}
                  onChange={handleDistanceChange} />
              </label>
              <button className="tasks__add" onClick={handleClick} id="tasks__add">Добавить</button>
            </form>
            <List itemsObj={itemsObj} onRemove={handleRemove}/>
          </div>
        </div>
    </main>
  );
};

List.defaultProps = {
  dataArr: []
  };
