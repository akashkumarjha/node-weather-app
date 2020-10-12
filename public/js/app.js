const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('.message-1')
const messageTwo = document.querySelector('.message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const address=search.value;
    messageOne.textContent = 'Loading';
    messageTwo.textContent='';
    fetch('http://localhost:3000/weather?address='+address).then((response) => {
    response.json().then((data) => {
       if(data.message){
           //console.log(data.message)
           messageOne.textContent=data.message;
       } else{
           messageOne.textContent=data.forecast+" Degree"
           messageTwo.textContent=data.location
          // console.log(data.forecast)
          // console.log(data.location)
       }
    })
})  
})
  