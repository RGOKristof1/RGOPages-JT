const div = document.querySelector('div');
const list = document.getElementById('list');
const input = document.getElementById('item');
const additem = document.getElementById('additem');
list.remove();

// Auto-expand input field width
input.addEventListener('input', () => {
    if (input.value === '') {
        input.style.width = '150px';
    } else {
        const maxWidth = div.offsetWidth - 40;
        input.style.width = Math.min(input.scrollWidth + 20, maxWidth) + 'px';
    }
});

let count=0;
const removeAllButton = document.createElement('button');
removeAllButton.textContent = "remove all";
removeAllButton.setAttribute('class', 'btn btn-danger');
const resetDate = document.createElement('button');
resetDate.textContent = "reset date";
resetDate.setAttribute('class', 'btn btn-warning');
const buttonContainer = document.createElement('div');
buttonContainer.append(removeAllButton, resetDate);
additem.addEventListener('click', () =>{
    div.append(list);
    const li = document.createElement('li');
    const removeButton = document.createElement('button')
    removeButton.textContent = "X";
    removeButton.setAttribute('class', 'btn btn-danger')
    li.textContent = input.value;
    list.append(li);
    div.append(buttonContainer);
    count++;
    let addingdate = new Date();
    function getRightMonth(){
        if (addingdate.getMonth() < 10){
            return `0${addingdate.getMonth()+1}`;
        }
        return addingdate.getMonth()+1;
    }
    const listText = document.createElement('p');
    listText.textContent = ` hozzáadva: ${addingdate.getFullYear()}.${getRightMonth()}.${addingdate.getDate()}.${addingdate.getHours()}.${addingdate.getMinutes()}`
    li.append(removeButton,listText);
    const deadline = document.createElement('input');
    deadline.type = "date";
    const deadlinetext = document.createElement('p');
    deadlinetext.textContent = "hatarido: ";
    li.append(deadlinetext);

    deadlinetext.append(deadline);
    removeButton.addEventListener('click', () =>{
        li.remove();
        count = count-1;
        if (count== 0) {
            list.remove();
            buttonContainer.remove();
        }
    });
    input.value="";
})

removeAllButton.addEventListener('click', () => {
    const replaceText = document.createElement('p');
    list.remove();
    list.replaceChildren(replaceText)
    buttonContainer.remove();
})

resetDate.addEventListener('click', () => {
    const deadlineInputs = document.querySelectorAll('input[type="date"]');
    deadlineInputs.forEach(input => {
        input.value = "";
    });
})