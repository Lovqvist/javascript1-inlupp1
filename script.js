const regForm = document.querySelector('#regForm');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const output = document.querySelector('#output');
const btnChange = document.querySelector('#btn-change');
const btnDelete = document.querySelector('#btn-delete');

let users =[];

// Testar typ av data. 

const validate = () => {
    document.querySelectorAll('input').forEach(input => {
        if(input.type === 'text') {
            validateText(input.id)
        } 

        if(input.type === 'email') {
            validateEmail(input.id)
        }
    })
}

// Kollar så att allt är korrekt ifyllt, Förnamn & Efternamn

const validateText = id => {
    const input = document.querySelector('#' + id);
    const error = input.nextElementSibling;
  
    if(input.value.trim() === '') {
      error.innerText = 'Ange ett namn';
      input.classList.add('is-invalid');
      return false;
    } else if(input.value.length < 2) {
      error.innerText = 'Ange fullständigt namn, minst 2 tecken';
      input.classList.add('is-invalid');
      return false;
    } else {
      input.classList.add('is-valid');
      input.classList.remove('is-invalid');
      input.value.toUpperCase();
      return true;
    }
  }

  // Kollar så att allt är korrekt ifyllt, Email

const validateEmail = id => {
    const input = document.querySelector('#' + id);
    const error = input.nextElementSibling;

    const regEx = 
    /^([\w-]+(?:\.[\a-z]+)*)@((?:[\w-]+\.)*\w[a-z]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

   if(!regEx.test(input.value)){
        error.innerText = 'Ange giltig e-mailadress';
        input.classList.add('is-invalid');
        return false;  
    } else {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
    
        return true;

    }

}

//  Skapar användaren

const createUser = (firstName, lastName, email) => {
    let user = {
        id: Date.now(). toString(),
        firstName,
        lastName,
        email
    }

    users.push(user);
    console.log(users)
}

// Får användaren att synas i listan över registrerade användare

const renderUsers = () => {

 output.innerHTML = '';

 users.forEach(user => {
     let template =`
     <div class=" border border-1 rounded-2 user d-flex justify-content-between align-items-center mb-1 mt-1 p-2">
        <div class="text">
            <h4 class="mb-1">${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} ${user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}</h4>
            <small type="email">${user.email}</small>
        </div>
        <div class="buttons">
            <button id="btn-change" class="btn btn-primary">Ändra</button>
            <button id="btn-delete" class="btn btn-danger">Radera</button>
        </div>
    </div>
    `
    output.innerHTML += template;
 })
}

// För att nollställa registreringsformuläret efter registering
const resetForm = () => {
    document.querySelectorAll('input').forEach(input => {
       input.value = '';
       input.classList.remove('is-valid')
    })
}


//Nollställer registrerade så snart du laddar om sidan
renderUsers();




regForm.addEventListener('submit', (e) => {
    e.preventDefault();

    validate();

    if(validateText('firstName') && validateText('lastName') && validateEmail('email')){
        createUser(firstName.value, lastName.value, email.value);
        renderUsers();
        resetForm();
    }
   
})


  


    



   



