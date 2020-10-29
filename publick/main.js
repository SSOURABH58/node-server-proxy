const lok = document.querySelector('.lok')
const wet = document.querySelector('.wet')
const btn = document.querySelector('.btn')
const quote = document.querySelector('.quote')
const qbtn = document.querySelector('.qbtn')

btn.addEventListener('click',getwet)
qbtn.addEventListener('click',getquote)

function getwet(){
    navigator.geolocation.getCurrentPosition(position=>{
        const lat =position.coords.latitude
        const lon = position.coords.longitude
        const coords = {lat,lon}

        const opc = {
            method : 'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body : JSON.stringify(coords)
        }

        lok.innerHTML=`<p>latitude = ${lat}°</p><p>longitude = ${lon}°</p>`

        fetch('/weather',opc)
            .then(res=>{return res.json()})
            .then(data=>{
                wet.innerHTML=`${data.icon} ${data.title} at ${data.temp} in ${data.city}`
                
            })
    })
}

function getquote(){
    fetch('/quote')
        .then(res=>res.json())
        .then(data=>{console.log(data)})
}
