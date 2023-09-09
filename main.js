
var api = 'http://localhost:3000/person';

//first function, reset page, set up event 
start = () => {
    getData(renderPerson);
    handleCreatePerson();
}

//log all data
getData = (callback) => {
    fetch(api) 
    .then(
        db => db.json()
    )
    .then(callback)
    
}

//send data
createPerson = (data, callback) => {
     fetch(api, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data),
     })
     .then(db => db.json())
     .then(callback)
}


//render event
renderPerson = (persons) => {
    var listPer = document.querySelector('ul');
    var htmls = persons.map((person) => {
        return `<li class='person-item-${person.id}'>
        <h4>Name: ${person.name}</h4>
        <h4>Age: ${person.age}</h4>
        <button onclick="handledelete(${person.id})">Detele</button>
        </li>
        `;
    });

    listPer.innerHTML = htmls.join('');
}

//create new index
handleCreatePerson = () => {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = () => {
        var name = document.querySelector('input[name="name"]').value;
        var age = document.querySelector('input[name="age"]').value;
        
        var formData = {
            name: name,
            age: age
        }
        createPerson(formData, () => {
            getData(renderPerson);
        })
    }
}
function editPerson(id, data, callback) {
    var options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };
    fetch(api + '/' + id, options)
        .then(function(db){
            db.json();
        })
        .then(callback)
}
function handleEditFormCourse(id){
    // lấy class cho từng phần tử name và description
    var name = document.querySelector(".name-" + id);
    var age = document.querySelector(".age-" + id);
    var btnEdit = document.querySelector('#create');

    // lấy ra ô input
    var name = document.querySelector('input[name="name"]');
    var age = document.querySelector('input[name="age"]');

    if (name && age) { // nếu có 
        name.value = name.innerText;   // gán ô input = giá trị của name
        age.value = age.innerText;
        btnEdit.innerText = "Save";
    }

    btnEdit.onclick = function() {
        var formData = {
            name: name.value,
            age: age.value
        }
        editFormCourse(id, formData, function () {
            getCourses(renderCourses);
        })

        // edit xong thì trả về lại tạo form
        btnEdit.innerText = "Create";
        nameInput.value = '';
        descriptionInput.value = '';
        handleCreateForm()  
    }
}

//delete index
handledelete = (id) => {
    fetch(api + '/' + id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          } 
     })
     .then(db => db.json())
     .then(() => {
        var personItem = document.querySelector('.person-item-' + id);
        if(personItem) {    
            personItem.remove();
        }
     })
}


start();
