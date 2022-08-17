const inputNewTask = document.querySelector('.inputNewTask')
const btnAddTask = document.querySelector('.btnAddTask')
const taskList = document.querySelector('.taskList')

function createTagWithClass (tag, tagClass) {
    const newTag = document.createElement(tag)
    newTag.classList.add(tagClass)
    return newTag
}

function createNewTask(taskText) {
    const tagLi = document.createElement('li')
    //const checkBox = document.createElement('input')
    //checkBox.setAttribute('type', 'checkbox')
    const tagSpanContainer = createTagWithClass ('span', 'spanContainer')
    const tagSpanContent = createTagWithClass ('span', 'spanContent')
    tagSpanContent.textContent = taskText
    tagSpanContainer.appendChild(tagSpanContent)
    //tagLi.appendChild(checkBox)
    tagLi.appendChild(tagSpanContainer)
    createBtnTaskDone(tagLi)
    createBtnDeleteElement(tagLi)
    taskList.appendChild(tagLi)
    saveTasks()
}

function renderSavedTasks(taskElement) {
    const tagLi = document.createElement('li')
    const tagSpanContainer = createTagWithClass('span', 'spanContainer')
    tagSpanContainer.innerHTML = taskElement
    tagLi.appendChild(tagSpanContainer)
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

function markTaskAsDone(element) {
    const task = element.parentElement.querySelector('.spanContent')
    task.classList.add('taskDone')
}

function markTaskAsUndone(element) {
    const task = element.parentElement.querySelector('.spanContent')
    task.classList.remove('taskDone')
}

function saveTasks() {
    const taskElements = taskList.querySelectorAll('.spanContainer')
    const taskTexts = []

    for (let task of taskElements) {
        let taskText = task.innerHTML
        taskTexts.push(taskText)
    }

    const tasksJSON = JSON.stringify(taskTexts)
    localStorage.setItem('tasks', tasksJSON)
}

function addSavedTasks() {
    let tasks = localStorage.getItem('tasks')
    tasks = JSON.parse(tasks)
    for (let task of tasks) {
        renderSavedTasks(task)
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
        markTaskAsDone(clickedElement)
        clickedElement.classList.add('undoButton')
        clickedElement.textContent = 'undo'
        clickedElement.classList.remove('taskDoneButton')
        saveTasks()

    } else if (clickedElement.classList.contains('undoButton')) {
        markTaskAsUndone(clickedElement)
        clickedElement.classList.add('taskDoneButton')
        clickedElement.classList.remove('undoButton')
        clickedElement.textContent = 'done'
        saveTasks()
    }
})

addSavedTasks()