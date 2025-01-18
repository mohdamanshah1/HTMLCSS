const inputField = document.querySelector('input[type=text]')
const listContainer = document.getElementById("taskList");
const radios = document.querySelectorAll('input[name="filter"]');
const inputForm = document.getElementById("InputForm");

let listOfTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let index = listOfTasks.length;
let filterSelected = "all";

printList(listOfTasks);

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(listOfTasks));
}

function printPending() {
    const pendingList = listOfTasks.filter(task => !task.completed);
    printList(pendingList);
}

function printCompleted() {
    const completedList = listOfTasks.filter(task => task.completed);
    printList(completedList);
}


function printList(list) {
    listContainer.innerHTML = '';
    list.forEach((task) => {
        const li = document.createElement('li');
        const text = document.createElement('p');
        const button = document.createElement('button');
        text.innerText = task.title;
        button.setAttribute('data-id', task.id);
        if (task.completed) {
            button.innerText = 'Completed';
            button.classList.remove('pending');
            button.classList.add('completed');
            button.disabled = true;
        }
        else {
            button.innerText = 'Mark as Completed';
            button.classList.add('pending');
            button.classList.remove('completed');
            button.addEventListener('click', e => {
                const id = button.dataset.id;
                listOfTasks[id].completed = true;
                button.classList.remove('pending');
                button.classList.add('completed');
                button.innerText = 'Completed';
                if (filterSelected == "pending") {
                    printPending();
                }
            });
        }
        li.classList.add('task');
        li.appendChild(text);
        li.appendChild(button);
        listContainer.appendChild(li);
    });
}


inputForm.addEventListener('submit', e => {
    e.preventDefault();
    listOfTasks.push(
        {
            "id": index,
            "title": inputField.value,
            "completed": false
        }
    );
    index++;
    saveToLocalStorage();
    inputField.value = '';
    printList(listOfTasks);
});



radios.forEach(radio => {
    radio.addEventListener('change', e => {
        filterSelected = e.target.value;
        if (filterSelected === 'all') {
            printList(listOfTasks);
        } else if (filterSelected === 'pending') {
            printPending();
        } else if (filterSelected === 'completed') {
            printCompleted();
        }
    });
});
