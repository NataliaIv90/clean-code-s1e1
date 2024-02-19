//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incompleteTasks");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks

//New task list item
var createNewTaskElement = function(taskString) {
  const itemsToCreate = {
    'listItem': 'li',
    'checkBox': {
      type: 'input',
      attrs: {
        type: 'checkbox',
        className: 'form__checkbox form__task-checkbox'
      }
    },
    'label': {
      type: 'label',
      attrs: {
        className: 'form__label form__task-name',
        textContent: taskString 
      }
    },
    'editInput': {
      type: 'input',
      attrs: {
        type: 'text',
        className: 'form__input form__input_text form__task-name'
      }
    },
    'editButton': {
      type: 'button',
      attrs: {
        className: 'form__btn form__edit-btn',
        textContent: 'Edit'
      }
    },
    'deleteButton': {
      type: 'button',
      attrs: {
        className: 'form__btn form__delete-btn',
      },
      child: {
        type: 'img',
        attrs: {
          className: 'form__delete-btn-icon',
          alt: 'Delete',
          src: './remove.svg'
        }
      }
    },
  };

  function createElement(type, attrs) {
    var element = document.createElement(type);

    if (attrs && attrs.className) {
      element.className = attrs.className;
    }

    if (attrs && attrs.type) {
      element.type = attrs.type;
    }

    if (attrs && attrs.alt) {
      element.setAttribute('alt', attrs.alt);
    }

    if (attrs && attrs.src) {
      element.setAttribute('src', attrs.src);
    }

    if (attrs && attrs.textContent) {
      element.innerText = attrs.textContent;
    }

    return element;
  }

  var listItem = document.createElement(itemsToCreate['listItem']);
  listItem.className = "form__item form__task-item";

  for (const key in itemsToCreate) {
    const { type, attrs, child } = itemsToCreate[key];
    var element = createElement(type, attrs);

    if (child) {
      var childElement = createElement(child.type, child.attrs);
      element.appendChild(childElement);
    }

    listItem.appendChild(element);
  }

  return listItem;
};

var addTask=function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

//Edit an existing task.

var editTask = function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type = text]");
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".form__edit-btn");
  var containsClass = listItem.classList.contains("form__task-item_edit-mode");
  //If class of the parent is .editmode
  if(containsClass){
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  }else{
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("form__task-item_edit-mode");
};


//Delete task.
var deleteTask=function(){
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
var taskCompleted = function(){
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function(){
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
// addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  //select ListItems children
  var checkBox = taskListItem.querySelector("input[type = checkbox]");
  var editButton = taskListItem.querySelector("button.form__edit-btn");
  var deleteButton = taskListItem.querySelector("button.form__delete-btn");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.