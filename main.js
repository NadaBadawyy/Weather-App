var scrollmenu = document.getElementById("scroll");
var navbtn = document.getElementById("navbtn");
var btn = document.getElementById("btn");
var findInput = document.getElementById("findInput");
var f = 0;
navbtn.addEventListener("click", function () {
  if (f === 0) {
    scrollmenu.classList.remove("d-none");
    scrollmenu.classList.add("d-block");
    
    f = 1;
  } else if (f === 1) {
    scrollmenu.classList.remove("d-block");
    scrollmenu.classList.add("d-none");
    
    f = 0;
  }
});
async function getAPI(city) {
  var x = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=cd369b2c1b464fe6bd4162123240409&q=${city}&days=3`
  );
  var result = await x.json();
  console.log(result);
  displayWeather(result.forecast.forecastday, result);
}
function getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
    }
    }
    
    function showPosition(position) {
    
    let city = String(position.coords.latitude) + ',' + String(position.coords.longitude);
    getAPI(city);
    }
    getLocation()
findInput.addEventListener('input',function(e){
    

    if(e.target.value==''){
        
        getLocation();
            
    }
    else{
      getAPI(e.target.value);  
    }
    
    
    
})

function displayWeather(arr, lname) {
  var cartoona = ``;
  for (let i = 0; i < arr.length; i++) {
    const dateString = arr[i].date;
    const date = new Date(dateString);
    const options = { weekday: "long" };
    const dayName = date.toLocaleDateString("en-US", options);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });

    const formattedDate = `${day} ${month}`;
    if (i === 0) {
      cartoona += `
     <div class="col-md-4 p-0 ww  x1 m-md-0 mb-3">
            <div class="head d-flex justify-content-between align-items-center px-3 pt-2  ">
              <div class="p-0 m-0"><p>${dayName}</p></div>
              <div class="p-0 m-0"><p>${formattedDate}</p></div>
            </div>
            <div class="content   p-3" >
              <div class=""><p>${lname.location.name}</p></div>
              <h1 class="fw-bolder">${lname.current.temp_c}<sup>o</sup>C</h1>
              <img src=${lname.current.condition.icon} alt="" class="img1">
              <p class="p">${lname.current.condition.text}</p>
              <div class="w d-flex justify-content-around">
                <div class="">
                  <img src="https://routeweather.netlify.app/images/icon-umberella@2x.png" alt="">
                  <span>20%</span>
                </div>
                <div class="">
                  <img src="https://routeweather.netlify.app/images/icon-wind@2x.png" alt="">
                  <span>18km/h</span>
                </div>
                <div class="">
                  <img src="https://routeweather.netlify.app/images/icon-compass@2x.png" alt="">
                  <span>East</span>
                </div>
              </div>
            </div>
          </div>
    `;
    } else if (i === 1) {
      cartoona += `
    <div class="col-md-4 p-0 ww m-md-0 mb-3  content1">
            <div class="head1 text-center  py-1">
              <div class="p-0 m-0"><p>${dayName}</p></div>
              
            </div>
            <div class=" text-center  p-3 " >
              
             
              <img src=${arr[i].day.condition.icon} alt="" class=" my-3">
              <h6 >${arr[i].day.avgtemp_c}<sup>o</sup>C</h6>
              <p>${arr[i].day.mintemp_c}<sup>o</sup></p>
              <p class="p my-2">${arr[i].day.condition.text}</p>
              
            </div>
          </div>
          
    `;
    } else if (i === 2) {
      cartoona += `
    <div class="col-md-4 p-0 ww x2 m-md-0 mb-3 content2 ">
            <div class="head2 text-center  py-1">
              <div class="p-0 m-0"><p>${dayName}</p></div>
              
            </div>
            <div class="text-center  p-3" >
              
             
              <img src=${arr[i].day.condition.icon} alt="" class=" my-3">
              <h6 >${arr[i].day.avgtemp_c}<sup>o</sup>C</h6>
              <p>${arr[i].day.mintemp_c}<sup>o</sup></p>
              <p class="p my-2">${arr[i].day.condition.text}</p>
              
            </div>
          </div>
    `;
    }
    document.getElementById("row").innerHTML = cartoona;
  }
}
