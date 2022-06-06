const addBtn = document.querySelector('.add');
const removeBtns = document.querySelectorAll('.remove');
const clearBtn = document.querySelector('.clear');
const newInput = document.querySelector('.newItem');
const mainContainer = document.querySelector('main');
const checkSign = document.querySelectorAll('.check-sign');
const handSign = document.querySelectorAll('.hand-sign');

addBtn.addEventListener('click', addItem)

newInput.addEventListener('keydown', (e)=>{
    if (e.code === 'Enter'){
        addItem();
    }
})

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

    newInput.value= '';
}

mainContainer.addEventListener('click',(e)=>{
    const btn = e.target;
    
    if(btn.innerHTML == 'remove'){
        console.log(btn.parentElement)
        if(btn.parentElement.firstElementChild.classList.contains('show')){
            mainContainer.removeChild(btn.parentElement)
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

clearBtn.addEventListener('click',()=>{
    if(confirm('Do you really want to clear your list?') ){
    mainContainer.innerHTML = '';
    newInput.value = '';
    }
})
