const date = new Date()
const currYear = date.getFullYear()
const currentDate = document.querySelector(".currentDate")
let currMonth = date.getMonth()
function calenderRender() {
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    currentDate.innerText = `${monthNames[currMonth]} ${currYear} `
    const days = document.querySelector(".days")
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay()
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate()
    const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate()
    const lastDayOfMonth = new Date(currYear,currMonth,lastDateOfMonth).getDay()
    console.log(lastDayOfMonth);
    
    let dateListTag = ""
    for(let i = firstDayOfMonth;i>0;i--){
        dateListTag += `<li>${lastDateOfLastMonth - i+1}</li>`
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
        dateListTag += `<li>${i}</li>`
    }

    for(let i = lastDayOfMonth;i<6;i++){
        dateListTag += `<li>${i - lastDayOfMonth+1}</li>`

    }
    days.innerHTML = dateListTag
}

calenderRender()

const prevNext = document.querySelectorAll(".icons span")
prevNext.forEach((icon)=>{
    icon.addEventListener('click',()=>{
     currMonth= icon.id ==="prev" ? currMonth - 1 : currMonth + 1
        calenderRender()
    })
})