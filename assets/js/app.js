var cl = console.log;

const todoform = document.getElementById('todoform')
const toDoitem = document.getElementById('toDoitem')
const todolist = document.getElementById('todolist')
const updatebtn = document.getElementById('updatebtn')
const Addbtn = document.getElementById("Addbtn")
const clearAll = document.getElementById("clearAll")



let todolistArr=JSON.parse(localStorage.getItem("todolistArr"))|| []


function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

const onItemEdit=(ele)=>{
//    
let editID = ele.getAttribute('data-id');
cl(editID)
localStorage.setItem("editId",editID)

let editobj = todolistArr.find((todo)=>{
    return  todo.skillId === editID
})
cl(editobj)

updatebtn.classList.remove('d-none');
Addbtn.classList.add('d-none');

toDoitem.value=editobj.skillName;

}

const onItemupdate=(eve)=>{
    let updatedvalue = toDoitem.value;
    cl(updatedvalue);
    let updatedId = localStorage.getItem("editId")
    cl(updatedId)
    todolistArr.forEach(item=>{
        if(item.skillId === updatedId){
            item.skillName = updatedvalue
        }
    })
    localStorage.setItem("todolistArr",JSON.stringify(todolistArr));
    teamlating(todolistArr);
    todoform.reset();
    updatebtn.classList.add('d-none');
    Addbtn.classList.remove('d-none')
    
}

const deletAll =(ele)=>{
cl(ele,"hello");
cl(ele.dataset)

}




const teamlating=(arr)=>{
    let result ='';
    arr.forEach(item=>{
        result+=`
        <ul class="list-group mt-4 " >
                <li class="list-group-item font-weight-bold">
                    <span class="headding">${item.skillName}</span>
                    <span>
                        
                        <i class="fa-solid fa-xmark fa-3x"
                        onclick ="onItemEdit(this)"
                        data-id="${item.skillId}"></i>
                    </span>
                </li>
            
             </ul>
        
        `
    })
    todolist.innerHTML= result

}

teamlating(todolistArr)



const onTodoAdd = (eve)=>{
    eve.preventDefault();
    // cl("hello",eve)
    let skills = toDoitem.value;
    // cl(skills)
   
    cl(todolistArr)
    let object={
        skillName : skills,
        skillId : generateUUID(),
    } 
    todolistArr.push(object);
     cl(todolistArr)
     teamlating(todolistArr)
    localStorage.setItem("todolistArr",JSON.stringify(todolistArr))
   
    eve.target.reset();
  
   
   
    }






todoform.addEventListener("submit",onTodoAdd)
updatebtn.addEventListener("click",onItemupdate);
clearAll.addEventListener("click",deletAll)