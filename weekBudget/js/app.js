// classes
class Budget2{
    constructor(budget1){
        this.budget1 = Number( budget1 );
        this.budgetLeft = this.budget1;

    }
      substractBudgetLeft(amountValue) {
          return this.budgetLeft -= amountValue;
      } 
}

// everything related to html
class HTML{

    // inserts budget when user submits
    budgetInsert(amount){
// insert into html
        totalBudget.innerHTML = `${amount}`;
        leftBudget.innerHTML = `${amount}`;
    }

    // display message
    messagePrints(message, className){
        const wrapperMessage = document.createElement('div');
        wrapperMessage.classList.add('text-center', 'alert', className);
        wrapperMessage.appendChild(document.createTextNode(message));
     
        // insert into html
        document.querySelector('.primary').insertBefore(wrapperMessage,addExpenseForm1);

        // clear settimeout
        setTimeout(function(){
            
            document.querySelector('.primary .alert').remove();
            addExpenseForm1.reset();
        }, 3000)
      

    }
        // displays expences from form to list
        addExpensesToList(expenseValue, amountValue){
        const expensesList = document.querySelector('#expenses ul');

        // create li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
       
        // create the template 
        li.innerHTML = `
        ${expenseValue}
        <span class = 'badge badge-primary badge-pill'>$ ${amountValue}</span>
        `;
        
        // insert into html
        expensesList.appendChild(li);

        
    }
    // substract expense from budget 

    trackRecord(amountValue){
        const budgetleftDollars = budget1.substractBudgetLeft(amountValue);
        leftBudget.innerHTML = `${budgetleftDollars}`;

       // check 25% is left
       if( (budget1.budget1 / 4) > budgetleftDollars ){
           leftBudget.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
           leftBudget.parentElement.parentElement.classList.add('alert-danger');


       } else if( (budget1.budget1 / 2) > budgetleftDollars) {
        leftBudget.parentElement.parentElement.classList.remove( 'alert-success');
        leftBudget.parentElement.parentElement.classList.add('alert-warning');

       }
    }
}

// varaibles
const addExpenseForm1 = document.getElementById('add-expense');
        totalBudget = document.querySelector('span#total')
        leftBudget = document.querySelector('span#left');

let budget1, userBudget1;

// html class
html = new HTML();

// event listeners
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', function(){

        userBudget1 = prompt(" What's your budget for this week?")   

        if(userBudget1 === null || userBudget1 === '' || userBudget1 === '0') {
            window.location.reload();
        } else{
            // if budget valid than instantiate the budget class 
            budget1 = new Budget2(userBudget1);
            
            // instantiate html class
            html.budgetInsert(budget1.budget1);

        }
 });

    //new expense added
    addExpenseForm1.addEventListener('submit', function(e){
      e.preventDefault();
        // read input values
        const expenseValue = document.querySelector('#expense').value;
        const amountValue = document.querySelector('#amount').value;


        if(expenseValue === '' || amountValue === ''){
           html.messagePrints('There was error, all fields are mandatory', 'alert-danger');
            
        }else{
           // add expences into list
           html.addExpensesToList(expenseValue, amountValue);
           html.trackRecord(amountValue);
           html.messagePrints('Added...', 'alert-success');

        }

        // addExpenseForm1.reset();
    });
    
}


