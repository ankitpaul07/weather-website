console.log('Client side js program');



const weatherForm=document.querySelector('form');
const search = document.querySelector('input');
const messagaeOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');

messagaeOne.textContent='From js';

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location= search.value;
    messagaeOne.textContent='Loading...';
    messageTwo.textContent='';
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messagaeOne.textContent=data.error;
        }
        else{
            messagaeOne.textContent=data.location;
            messageTwo.textContent=data.forecast;
        }
    })
})
    console.log(location);
})