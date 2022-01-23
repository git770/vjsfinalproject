const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos(){

    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteTodo(event){
    const li = (event.target.parentElement);
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "X";
    button.addEventListener("click", deleteTodo );
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text : newTodo,
        id : Date.now()
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);



if (savedToDos !== null){
    //JSON.parse 은 array 형식으로 해줌 
    //ex) [a,b,c,d] -> ["a", "b", "c", "d"]
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    //함수를 따로 만들 필요 없고 아래와 같이 화살표 함수로 만들어도 된다.
    //어떻게 도 상관없음
    //**javascript는 function을 호출하면서 array에 있는 각각의 item을 줌 */
    //ex) sayHello("a") 한번씩
    //   sayHello("b") 
    //    sayHello("c")
    parsedToDos.forEach(paintToDo);  
}

//지우고 싶은 item을 제외하고 array를 새로 만든다

