console.log('Client side javascript is loaded!')



const weatherForm = document.querySelector('form')
const select = document.querySelector('input')
const first = document.querySelector('#first')
const second = document.querySelector('#second')


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = select.value
            
    first.textContent = 'Loading...'
    second.textContent= ''
        
    fetch('/weather?address=' + location ).then((response) =>{
        response.json().then((data) =>{
            if (data.error) {
                first.textContent = data.error
            }else {
                first.textContent = data.location
                second.textContent = data.forecast
            }
        
        })
    })

})