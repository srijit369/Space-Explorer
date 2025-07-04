const isLeapYear = y => (y%4===0 && y%100!==0) || (y%400===0);
const getFebDays = y => isLeapYear(y)?29:28;
const month_names = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let now = new Date();
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();
let userEvents = JSON.parse(localStorage.getItem("userEvents")||"{}");

function updateEventList(){
  let el = document.getElementById("event-list");
  el.innerHTML = "";
  for(let d in userEvents){
    let li=document.createElement("li");
    li.textContent=`${d}: ${userEvents[d]}`;
    el.appendChild(li);
  }
}

function generateCalendar(m,y){
  const days = document.querySelector(".calendar-days");
  days.innerHTML="";
  document.getElementById("month-name").textContent=month_names[m];
  document.getElementById("year").textContent=y;
  let first = new Date(y,m,1).getDay();
  let total = [31,getFebDays(y),31,30,31,30,31,31,30,31,30,31][m];
  for(let i=0;i<first+total;i++){
    let d=document.createElement("div");
    if(i>=first){
      let day=i-first+1;
      d.textContent=day;
      let dateKey = `${y}-${String(m+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      if(dateKey === new Date().toISOString().split("T")[0]) d.classList.add("current-date");
      if(userEvents[dateKey]) d.classList.add("user-event");
      d.addEventListener("click",()=>showDateDetails(dateKey));
    }
    days.appendChild(d);
  }
}
function showDateDetails(dateKey){
  const el = document.getElementById("date-details");
  el.innerHTML=`<strong>${dateKey}</strong><br>Loading events...`;
  Promise.all([
    fetch(`https://eonet.gsfc.nasa.gov/api/v3/events?start=${dateKey}&end=${dateKey}`).then(r=>r.json()),
    fetch(`https://tle.ivanstanojevic.me/api/tle/${dateKey}`).then(r=>r.json()).catch(()=>({memberSatellites:[]}))
  ]).then(([eonetData,tleData])=>{
    if(eonetData.events && eonetData.events.length>0){
      el.innerHTML+=`<br><strong>Natural Events:</strong><ul>`;
      eonetData.events.slice(0,5).forEach(ev=>{
        el.innerHTML+=`<li>${ev.title} (${ev.categories[0].title})</li>`;
      });
      el.innerHTML+=`</ul>`;
    } else {
      el.innerHTML+="<br>No EONET events.";
    }
    if(tleData.memberSatellites && tleData.memberSatellites.length>0){
      el.innerHTML+=`<br><strong>Satellites TLE:</strong><ul>`;
      tleData.memberSatellites.slice(0,5).forEach(s=>{
        el.innerHTML+=`<li>${s.name}</li>`;
      });
      el.innerHTML+=`</ul>`;
    } else {
      el.innerHTML+="<br>No TLE data.";
    }
  }).catch(()=>{el.innerHTML="Error fetching events."});
}
document.getElementById("add-event").addEventListener("click",()=>{
  let d=document.getElementById("event-date").value;
  let t=document.getElementById("event-title").value;
  if(d && t){
    userEvents[d]=t;
    localStorage.setItem("userEvents",JSON.stringify(userEvents));
    updateEventList();
    generateCalendar(currentMonth,currentYear);
  }
});
document.getElementById("remove-event").addEventListener("click",()=>{
  let d=document.getElementById("event-date").value;
  if(userEvents[d]){
    delete userEvents[d];
    localStorage.setItem("userEvents",JSON.stringify(userEvents));
    updateEventList();
    generateCalendar(currentMonth,currentYear);
  } else {
    alert("No such event to remove.");
  }
});
document.getElementById("prev-month").addEventListener("click",()=>{
  currentMonth=(currentMonth+11)%12;
  if(currentMonth===11) currentYear--;
  generateCalendar(currentMonth,currentYear);
});
document.getElementById("next-month").addEventListener("click",()=>{
  currentMonth=(currentMonth+1)%12;
  if(currentMonth===0) currentYear++;
  generateCalendar(currentMonth,currentYear);
});
document.getElementById("prev-year").addEventListener("click",()=>{
  currentYear--;
  generateCalendar(currentMonth,currentYear);
});
document.getElementById("next-year").addEventListener("click",()=>{
  currentYear++;
  generateCalendar(currentMonth,currentYear);
});
setInterval(()=>{
  document.querySelector(".time-format").textContent=new Date().toLocaleTimeString();
},1000);
document.querySelector(".date-format").textContent=now.toDateString();

async function loadAPOD(){
  let el=document.getElementById("apod");
  try{
    let res=await fetch(`https://api.nasa.gov/planetary/apod?api_key=0X7cStW7XwVcLLd5SKf2QkSNqNeWadFXZ4B0OvhB`);
    let d=await res.json();
    el.innerHTML=`<strong>APOD</strong><br>${d.title}<br><img src="${d.url}" style="width:100%;">`;
  }catch{el.textContent="APOD error."}
}
async function loadEPIC(){
  let el=document.getElementById("epic");
  try{
    let res=await fetch(`https://api.nasa.gov/EPIC/api/natural?api_key=0X7cStW7XwVcLLd5SKf2QkSNqNeWadFXZ4B0OvhB`);
    let d=await res.json();
    if(d.length>0){
      let img=`https://epic.gsfc.nasa.gov/archive/natural/${d[0].date.split(" ")[0].replace(/-/g,"/")}/jpg/${d[0].image}.jpg`;
      el.innerHTML=`<strong>EPIC</strong><br><img src="${img}" style="width:100%;">`;
    }
  }catch{el.textContent="EPIC error."}
}
async function loadDONKI(){
  let el=document.getElementById("donki");
  try{
    let res=await fetch(`https://api.nasa.gov/DONKI/CME?api_key=0X7cStW7XwVcLLd5SKf2QkSNqNeWadFXZ4B0OvhB`);
    let d=await res.json();
    el.innerHTML="<strong>DONKI</strong><br>";
    d.slice(0,5).forEach(e=>{el.innerHTML+=`• ${e.startTime.split("T")[0]}<br>`});
  }catch{el.textContent="DONKI error."}
}
async function loadEONET(){
  let el=document.getElementById("eonet");
  try{
    let res=await fetch(`https://eonet.gsfc.nasa.gov/api/v3/events?status=open`);
    let d=await res.json();
    el.innerHTML="<strong>EONET</strong><br>";
    d.events.slice(0,5).forEach(e=>{el.innerHTML+=`• ${e.title}<br>`});
  }catch{el.textContent="EONET error."}
}
loadAPOD(); loadEPIC(); loadDONKI(); loadEONET();
generateCalendar(currentMonth,currentYear);
updateEventList();
