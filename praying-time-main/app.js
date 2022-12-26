window.addEventListener("DOMContentLoaded", () => {

  //Toggle menu

  const accordion = document.querySelector(".accardion"),
    panel = document.querySelector(".panel"),
    toggle = document.getElementById("toggle");

  toggle.addEventListener("click", () => {
    accordion.classList.toggle("active");
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });

  const region = document.querySelector("#region");
  const regions = document.querySelectorAll("li");

  regions.forEach((item) => {
    item.addEventListener("click", (e) => {
      region.innerHTML = e.target.innerHTML;
      panel.style.maxHeight = null;
      accordion.classList.remove("active");
    })
  })

  //Date and Time

  const hour = document.getElementById("hour"),
    newDate = document.querySelector(".date")

  function updateDate() {
    const date = new Date();
    const newDate = date.getHours();
    const newMinutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const newSeconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    hour.innerHTML = `${newDate}:${newMinutes}:${newSeconds}`;

    setTimeout(updateDate, 1000);

  }

  updateDate();

  function dateBuilder() {

    const datas = new Date();
    const day = datas.getDate() < 10 ? "0" + datas.getDate() : datas.getDate();
    const month = datas.getMonth() < 10 ? "0" + datas.getMonth() : datas.getMonth();
    const today = datas.getDay();

    let months = [
      "january",
      "fabruary",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "octember",
      "november",
      "december",
    ]

    weekDays = [
      "Dushanba",
      "Seshanba",
      "Chorshanba",
      "Payshanba",
      "Juma",
      "Shanba",
      "Yakshanba"
    ];

    const date = document.querySelector(".date");
    date.innerHTML = `${weekDays[today]},${day}-${months[month]}`;

    function App(num) {
      if (num <= 10) {
        return "0" + num;
      } else {
        return num;
      }
    }
    setTimeout(dateBuilder, 1000)
  }
  dateBuilder();

  //Set hijri year

  const hijri = document.getElementById("hijri");
  const hijriYear = new Intl.DateTimeFormat("en-EU-u-ca-islamic", {
    day: "numeric",
    year: "numeric",
    month: "long"
  }).format(Date.now());
  hijri.innerHTML = hijriYear;


  //Set praying time

  const prayTimes=document.querySelectorAll(".pary-time");
  const reg = document.querySelector("#reg");
  const api={
    baseurl:"https://islomapi.uz/api/present/"
  } 

  async function getResult(query) {
    const res=await fetch(`${api.baseurl}day?region=${query}`)
    const result=await res.json();
    displayResult(result);
  }
  
  regions.forEach((region)=>{
    region.addEventListener("click",(e)=>{
      getResult(e.target.innerHTML);
    })
  })

  getResult(reg.innerText)

  function displayResult(time) {
     reg.innerHTML=time.region;

     prayTimes.forEach((item,index)=>{
     item.innerHTML=Object.values(time.times)[index];
     })
     removeCardActive();
  }
});