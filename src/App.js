import { useState } from 'react'
import './style.css'
function App() {

    const API = {
        key: 'cdddadca7a67daac6bb7aed6e5bda246',
        base: 'https://api.openweathermap.org/data/2.5/'
    }

    const [query, setquery] = useState('')
    const [weather, setweather] = useState({})

    const search = evt => {
        if(evt.key === "Enter"){
            fetch(`${API.base}weather?q=${query}&units=metric&appid=${API.key}`)
            .then(res => res.json() )
            .then(data =>{
                setweather(data)
                 setquery('')
                 console.log(data)
            }).catch(e => console.log(e.message))
        }
    }

  

    const dataBuilder= (d) => {
        let months = ["January","Febuary","March","April","May","June",
                    "July","August","September","October","November","December"]
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

        let day = days[d.getDay()]
        let date = d.getDate()
        let month = months[d.getMonth()]
        let year = d.getFullYear()

        return `${day} ${date} ${month} ${year}`
    }

  return (
      <div className={(typeof weather.main !== 'undefined') ? ((weather.main.temp >= 20) ? 'app' : 'app cold'):'app' }>
     <div className="api"> powered by open weather map API</div>
       <main>
           <div className='flex'>
            <h1>Search for a specific country</h1>
                <p>And get to know what the weather is like</p>
           </div>
           <div className="search-box">
               <input 
                    type="text"
                    className='search-bar'
                    placeholder='search for a country' 
                    onChange={e => setquery(e.target.value)}
                    value={query}
                    onKeyPress={search}
               />
              <i className="fa fa-search"></i>
           </div>
           {(typeof weather.main !== 'undefined') ? (
               <div>
                   <div className="location-box">
               <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dataBuilder(new Date())}</div>
           </div>
           <div className="weather-box">
               <div className="temp">
                   <span>Temperature</span>
                   <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <ion-icon name="cloud-outline"></ion-icon>
                        <h2>{Math.round(weather.main.temp)} c</h2>
                   </div>
               </div>
               <div className="descrip">
                  <span>Description</span> 
                  <h3>{weather.weather[0].description}</h3> 
               </div>
               <div className="weather">
                   {weather.weather[0].main}
               </div>
           </div>
               </div>
           ) : ('')}
           {weather.cod === '404' && <h1 style={{color:'white',textTransform:'capitalize',textAlign:'center'}}>{weather.message}</h1>}
       </main>
      </div>
  )
}

export default App