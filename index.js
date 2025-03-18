const moodLogs = document.querySelector("#moodLogs")
const emojis = document.querySelectorAll(".emojis")

emojis.forEach((emoji) => {
    emoji.addEventListener('click', () => {
        const mood = emoji.alt
        emojiSeletedFn(mood)
    })
})

if(moodLogs){
moodLogs.addEventListener('click', () => {


    moodLogsFn()
})
}

function moodLogsFn() {
    console.log("kushal");
}
function emojiSeletedFn(mood) {
    console.log(mood);
}


let date = new Date()
function calenderFn() {
    const currentDate = document.querySelector(".currentDate")
    const days = document.querySelector('.days')
    if (currentDate) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let currYear = date.getFullYear()
        let currMonth = date.getMonth()
        let liTag =""
        let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate()
        console.log(lastDateOfMonth);
        let firstDayOfMonth = new Date(currYear,currMonth,1).getDay()
        console.log(firstDayOfMonth);
        let lastDayOfLastMonth = new Date(currYear,currMonth,0).getDate()

        for(let i =firstDayOfMonth; i>0 ;i--){
           days.innerHTML =` <li>${lastDateOfMonth - i +1}</li>`
        }
        
        currentDate.innerText = `${monthNames[currMonth]} ${currYear}`
    }
}
calenderFn()