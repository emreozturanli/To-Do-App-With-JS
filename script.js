const addBtn = document.querySelector('.add');
const removeBtns = document.querySelectorAll('.remove');
const clearBtn = document.querySelector('.clear');
const newInput = document.querySelector('.newItem');
const mainContainer = document.querySelector('main');
const checkSign = document.querySelectorAll('.check-sign');
const handSign = document.querySelectorAll('.hand-sign');

/* LOCALSTORAGE */

function initial(){
    let todoItems = localStorage.getItem('todos');
    // if localstorage is empty (means that user uses our app the first time)
    !todoItems && localStorage.setItem("todos", JSON.stringify([]));
    // we created an empty array and send it to the storage
    todoItems && JSON.parse(todoItems).forEach((element)=> initialList(element))
}
initial()

function initialList(element){
    const container = document.createElement('div');
    container.innerHTML= `
    <span class="check-sign">&#10004;</span>
    <span class="hand-sign show">&#9755;</span>
    <p class="note">${element.toDoText}</p> 
    <button class="remove">remove</button>`;
    container.classList.add('note-container');
    mainContainer.appendChild(container);

    setTimeout(()=>{
    container.style.maxHeight='500px';
},200)
}

addBtn.addEventListener('click', addItem)

newInput.addEventListener('keydown', (e)=>{
    if (e.code === 'Enter'){
        addItem();
    }
})

window.addEventListener('keydown', (e)=>{
    if(e.code === 'Delete'){
        deleteItems();
    }
})

/* ADD NEW TO-DO */

function addItem(){
    const toDo = newInput.value;
    
    if(toDo != ''){
        const container = document.createElement('div');
        container.innerHTML= `
        <span class="check-sign">&#10004;</span>
        <span class="hand-sign show">&#9755;</span>
        <p class="note">${toDo}</p> 
        <button class="remove">remove</button>`;
        container.classList.add('note-container');
        mainContainer.appendChild(container);

        setTimeout(()=>{
        container.style.maxHeight='500px';
    },200)

    }
    else{
        alert('You must type something!!!');
    }

    // creating new todo object before sendin it to storage
    let toDoItem = {
        // id : Math.floor(Math.random()*1000 + 1),
        toDoText : toDo,
        // isDone: false,
    };

    let allToDos = JSON.parse(localStorage.getItem('todos'));
    allToDos.push(toDoItem);
    localStorage.setItem('todos',JSON.stringify(allToDos));

    newInput.value= '';
}

/* REMOVE, CHECK */ 

mainContainer.addEventListener('click',(e)=>{
    const btn = e.target;
    
    if(btn.innerHTML == 'remove'){
        if(btn.parentElement.firstElementChild.classList.contains('show')){
            mainContainer.removeChild(btn.parentElement)
            
            let allToDos = JSON.parse(localStorage.getItem('todos'));
            let removedItem = allToDos.filter(item => item['toDoText'] == e.target.previousElementSibling.innerText)
            
            allToDos.splice(allToDos.indexOf(removedItem[0]),1)
            localStorage.setItem('todos',JSON.stringify(allToDos));
        }
        else{
            alert('You have to ✔ first!!!')
        }
    }
    else if(btn.innerHTML == '☛'){
        btn.classList.remove('show');
        btn.previousElementSibling.classList.add('show');
        btn.nextElementSibling.classList.add('line');
    }
    else if(btn.innerHTML == '✔'){
        
        btn.classList.remove('show');
        btn.nextElementSibling.classList.add('show');
        btn.nextElementSibling.nextElementSibling.classList.remove('line');
    }
})

/* CLEAR LIST */

clearBtn.addEventListener('click',()=>{
    if(confirm('Do you really want to clear your list?') ){
    mainContainer.innerHTML = '';
    newInput.value = '';

    localStorage.setItem('todos', JSON.stringify([]));
    }
})

/* DELETE SELECTED ITEMS */

function deleteItems(){
    let checkedItems = document.querySelectorAll('.check-sign.show');
    if(checkedItems.length == 0){
        alert('There arent any checked item');
    }
    else{
        let deleteAll = confirm('Do you really want to DELETE all of the checked items?');
        deleteAll &&  checkedItems.forEach((checked)=>{
            mainContainer.removeChild(checked.parentElement)
        })  
    }
}
