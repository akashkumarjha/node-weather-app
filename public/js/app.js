const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('.message-1')
const messageTwo = document.querySelector('.message-2')
document.getElementById("myP").style.display="none";

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const address=search.value;
    messageOne.textContent = '';
    document.getElementById("myP").style.display="none";
    messageTwo.textContent='Loading';
    fetch('/weather?address='+address).then((response) => {
    response.json().then((data) => {
       if(data.message){
           //console.log(data.message)
           messageOne.textContent=data.message;
       } else{
        document.getElementById("myP").style.display="block";
           messageOne.textContent=data.forecast
           messageTwo.textContent=data.location
          // console.log(data.forecast)
          // console.log(data.location)
       }
    })
})  
})
  