let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))


function displayEmployees(employeeData) {
    employees = employeeData;
    console.log(employees);
    // store the employee HTML as we create it
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    
    employees.forEach((employee, index) => {
        
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        // template literals make this so much cleaner!
        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" alt="${name.first} ${name.last}"/>
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `
        
    });
    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index) {
    // use object destructuring make our template literal cleaner
    
    console.log(index);
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    
    let date = new Date(dob.date);

    const modalHTML = `
       <a class="prev" onclick="plusSlides(-1, '${name.first}')">&#10094;</a>
       <a class="next" onclick="plusSlides(1, '${name.first}')">&#10095;</a>
        <img class="avatar" src="${picture.large}" alt="${name.first} ${name.last}"/>
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr class="line"/>
            <p class="phone">${phone}</p>
            <p class="long-address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>Birthday:
            ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
    
}

function displayModal2(index){
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees2[index];
    
    let date = new Date(dob.date);

    const modalHTML = `
       <a class="prev" onclick="plusSlides(-1, '${name.first}')">&#10094;</a>
       <a class="next" onclick="plusSlides(1, '${name.first}')">&#10095;</a>
        <img class="avatar" src="${picture.large}" alt="${name.first} ${name.last}"/>
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr class="line"/>
            <p class="phone">${phone}</p>
            <p class="long-address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>Birthday:
            ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
    // select the card element based on its proximity to actual element clicked
  
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});

let employees2 = [];


// SEARCH MEMBER
function searchEmployees() {
    let searchVal = document.getElementById('search');
    searchVal = searchVal.value.toUpperCase();
    let card = document.getElementsByClassName('card');
    let employee = document.getElementsByClassName('avatar');
    let counter= 0;
 

    for (let i = 0 ; i < 12; i++) {
        let grabAlt = employee[i].getAttribute('alt');
        grabAlt = grabAlt.toUpperCase();

        if (grabAlt.includes(searchVal)){
            card[i].style.display = 'flex';
            employees2.push(employees[i]);
            counter++;
        } else {
            card[i].style.display = 'none';
        }
}


   employees2.splice(0,(employees2.length-counter));
   console.log(employees2);


}

function plusSlides(n, firstName) {
    let index = 0;

    if(employees2.length > 0){
        index = employees2.map(object => object.name.first).indexOf(firstName);
        console.log(index);
        index += n;
        if(index === -1 ){
        index = employees2.length - 1;
        } else if (index === employees2.length){
        index = 0;
        }
        displayModal2(index);
    } else {
        index = employees.map(object => object.name.first).indexOf(firstName);
        console.log(index);
        index += n;
        if(index === -1 ){
        index = 11;
        } else if (index === 12){
        index = 0;
        }
        displayModal(index);
    }
    
    
    console.log(index);
    
    console.log(employees.name);

    
}

