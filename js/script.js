document.addEventListener('DOMContentLoaded', () => {

    const addHeader = document.querySelector('#header');
    const addtext = document.querySelector('#note');

    const clearForm = document.querySelector('.btn__remove');
    const addNote = document.querySelector('.btn__add');

    const body = document.querySelector('body');
    const modalEdit = document.querySelector('.modal');
    const modalInput = document.querySelector('.modal__inp');
    const modalTextarea = document.querySelector('.modal__textarea');
    const modalSave = document.querySelector('.modal__save');

    let arrayNotes = [];

    
    if (localStorage.getItem(0)) {
        arrayNotes = JSON.parse(localStorage.getItem(0));
        for(let i = 0; i < arrayNotes.length; i++) {
            addNotes(arrayNotes[i]['header'], arrayNotes[i]['text']);
        }
    }



    function addNotes(header, text) {  //Функция создания заметки
        const parent = document.querySelector('.notes');
        const element = document.createElement('div');
        element.classList.add('notes__item');
    
        element.innerHTML = `
            <div class="notes__header">${header}</div>
            <div class="notes__text">${text}</div>
    
            <div class="notes__btns">
                <button class="notes__btn edit">Редактировать</button>
                <button class="notes__btn remove">Удалить</button>
            </div>
        `;
        parent.append(element);
    }
    
    
    clearForm.addEventListener('click', (e) => { //Отчистка формы
        e.preventDefault();
        document.querySelector('.form').reset();
    });
    
    addNote.addEventListener('click', (e) =>{ //Добавление новой заметки
        e.preventDefault();
        const header = addHeader.value;
        const text = addtext.value;
        
        if (header != '' || text != '') {
            addNotes(header, text);

            arrayNotes.push({
                'header' : header,
                'text' : text
            });

            localStorage.setItem(0, JSON.stringify(arrayNotes));

            document.querySelector('.form').reset();
        }
        funcEditNote();
        funcRemoveNote();
    });



    
    
    function funcEditNote() {//Редактирование заметки
        const editNote = document.querySelectorAll('.edit');

        editNote.forEach((item, i ) => { 
            item.addEventListener('click', () => {
                modalEdit.style.display = 'block';
                body.classList.add('stop');
                modalInput.value = arrayNotes[i]['header'];
                modalTextarea.value = arrayNotes[i]['text'];

                modalSave.addEventListener('click', () => {
                    localStorage.clear();
                    arrayNotes[i]['header'] = modalInput.value;
                    arrayNotes[i]['text'] = modalTextarea.value;
                    localStorage.setItem(0, JSON.stringify(arrayNotes));
                    modalEdit.style.display = 'none';
                    body.classList.remove('stop');
                    location.reload();
                });
            });
        });
    }
    funcEditNote();
    

    function funcRemoveNote() {//Удаление заметки
        const deleteNote = document.querySelectorAll('.remove');
        
        deleteNote.forEach((item, i ) => { 
            item.addEventListener('click', () => {
                
                arrayNotes.splice(i,1);
                localStorage.clear();

                localStorage.setItem(0, JSON.stringify(arrayNotes));
                location.reload();

            });
        });
    }
    funcRemoveNote();
});


