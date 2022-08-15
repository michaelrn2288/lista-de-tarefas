const inputNewTask = document.querySelector('.inputNewTask')
const btnAddTask = document.querySelector('.btnAddTask')
const taskList = document.querySelector('.taskList')

function createNewTask(taskText) {
    const tagLi = document.createElement('li')
    const tagSpan = document.createElement('span')
    const text = document.createTextNode(taskText + ' ')
    tagSpan.appendChild(text)
    tagLi.appendChild(tagSpan)
    createBtnTaskDone(tagLi)
    createBtnDeleteElement(tagLi)
    taskList.appendChild(tagLi)
    saveTasks()
}

function clearInput() {
    inputNewTask.value = ''
    inputNewTask.focus()
}

function createBtnDeleteElement(htmlElement) {
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'delete'
    deleteButton.setAttribute('class', 'deleteButton')
    htmlElement.appendChild(deleteButton)
}

function createBtnTaskDone(htmlElement) {
    const taskDoneButton = document.createElement('button')
    taskDoneButton.innerText = 'done'
    taskDoneButton.setAttribute('class', 'taskDoneButton')
    htmlElement.appendChild(taskDoneButton)
}

function saveTasks() {
    const taskElements = taskList.querySelectorAll('span')
    const taskTexts = []

    for (let task of taskElements) {
        let taskText = task.innerHTML
        taskTexts.push(taskText)
    }
    console.log(taskTexts)

    const tasksJSON = JSON.stringify(taskTexts)
    localStorage.setItem('tasks', tasksJSON)
}

function addSavedTasks() {
    let tasks = localStorage.getItem('tasks')
    tasks = JSON.parse(tasks)
    for (let task of tasks) {
        createNewTask(task)
    }
}

inputNewTask.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && inputNewTask.value) {
        createNewTask(inputNewTask.value)
        clearInput()
    }
})

btnAddTask.addEventListener('click', (event) => {
    if (!inputNewTask.value) return;
    createNewTask(inputNewTask.value)
    clearInput()
})

taskList.addEventListener('click', (event) => {
    const clickedElement = event.target
    if (clickedElement.classList.contains('deleteButton')) {
        clickedElement.parentElement.remove()
        saveTasks()

    } else if (clickedElement.classList.contains('taskDoneButton')) {
        const task = clickedElement.parentElement.querySelector('span')
        task.setAttribute('class', 'taskDone')
        clickedElement.classList.add('undoButton')
        clickedElement.textContent = 'undo'
        clickedElement.classList.remove('taskDoneButton')

    } else if (clickedElement.classList.contains('undoButton')) {
        const task = clickedElement.parentElement.querySelector('span')
        task.classList.remove('taskDone')
        clickedElement.classList.add('taskDoneButton')
        clickedElement.classList.remove('undoButton')
        clickedElement.textContent = 'done'

    }
})






addSavedTasks()