import { nanoid } from 'nanoid'

let listArray = []; 

export default function arrCombiner(dateValue, distanceValue) { 

    
    const year = dateValue.slice(6);
    const month = dateValue.slice(3,5);
    const day = dateValue.slice(0,2);
    console.log('DATE:', new Date(`20${year}-${month}-${day}`));
    console.log('DATEparse:', Date.parse(new Date(`20${year}-${month}-${day}`)))
    const date = new Date(`20${year}-${month}-${day}`);
    const distance = parseFloat(distanceValue);

    console.log('props: ', dateValue, distance);
    console.log('-------------------------------------');

    const updatedItemArray = {id: nanoid(), date_str: dateValue, date_obj: date, distance: distance }; 

    console.log('updated Element is:');
    console.dir(updatedItemArray);  
    console.log('=====================================');

    if (listArray.length !== 0) {
        console.log('listArray current length = ', listArray.length)   

        for (let i = 0; i < listArray.length; i++) {    

            if (listArray[i].date_str === dateValue) {
                const previouslyCompletedDistance = listArray[i].distance;
                updatedItemArray.distance = distance + previouslyCompletedDistance; 
                listArray.splice(i, 1, updatedItemArray); 
                
                return listArray;
            };
        };

        if (Date.parse(updatedItemArray.date_obj) > (Date.parse(listArray[0].date_obj))) { // добавляем новый элемент в начало списка
                console.log('pars updItem = ', Date.parse(updatedItemArray.date_obj));
                console.log('listArray[0] = ', Date.parse(listArray[0].date_obj));
                listArray.unshift(updatedItemArray);
                return listArray;
        };

        if (listArray.length > 1) {
            for (let m = 1; m < listArray.length; m++) {    

                if ((Date.parse(updatedItemArray.date_obj) < (Date.parse(listArray[m-1].date_obj))) && 
                    (Date.parse(updatedItemArray.date_obj) > (Date.parse(listArray[m].date_obj)))) {
                        console.log('pars updItem = ', Date.parse(updatedItemArray.date_obj));
                        console.log('listArray[middle] = ', Date.parse(listArray[m].date_obj));
                        listArray.splice(m, 0, updatedItemArray);   
                    return listArray;    
                };
            };
        };

        if (Date.parse(updatedItemArray.date_obj) < (Date.parse(listArray[listArray.length-1].date_obj))) { // добавляем новый элемент в конец списка
            console.log('pars updItem = ', Date.parse(updatedItemArray.date_obj));
            console.log('listArray[end] = ', Date.parse(listArray[listArray.length-1].date_obj));
            listArray.push(updatedItemArray);
            return listArray;
        };
                
    } else listArray.push(updatedItemArray);    
   
    return listArray;
};