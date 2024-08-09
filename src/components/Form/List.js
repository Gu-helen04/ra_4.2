export default function List(props) {  

    const { itemsObj } = props;
    const { onRemove: handleRemove } = props;
 
     function ListItem(itemOfList) { 
 
         const { id } = itemOfList;
         const { date_str } = itemOfList;
         const { distance } = itemOfList;
         
         return (
             <div key={id} className="task" id={id}>
                 <div className="task__title">{date_str}</div>
                 <div className="task__title">{distance}</div>
                 <a href="#" className="task__remove" onClick={handleRemove}>&times;</a>
             </div>
         )
     }   
     
     return (
         <div className="tasks__list" id="tasks__list">
             {itemsObj.map((itemOfList) => ListItem(itemOfList))}
         </div>
     );
 }