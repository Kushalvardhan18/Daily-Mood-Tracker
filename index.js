const showMoodHistory = document.querySelector("#showMoodHistory")
const calenderWrapper = document.querySelector(".calenderWrapper")
calenderWrapper.style.display = "none"

showMoodHistory.addEventListener('click', () => {

    if (calenderWrapper.style.display === "none") {

        calenderWrapper.style.display = "block"
        showMoodHistory.innerText = "Hide Mood History"
        calenderRender()
    }
    else {
        showMoodHistory.innerText = "Show Mood History"

        calenderWrapper.style.display = "none"
    }
})


const moodEmojis = document.querySelectorAll(".emojis")
const ques = document.querySelector("#ques")
const todaysMood = document.querySelector(".todaysMood")
moodEmojis.forEach((emoji) => {
    emoji.addEventListener("click", () => {
       emojiDataFn(emoji)
    })
})
function emojiDataFn(){
    if(ques){
        ques.remove()

    }
    todaysMood.innerHTML = ""
    const emojisText = emoji.title
    const mood = document.createElement("h3")
    const moodEmoji = document.createElement("img")
    mood.innerText = `Today's Mood : ${emojisText}`
    mood.style.color = "white"
    moodEmoji.src = emoji.src
    moodEmoji.classList.add("emojiInHeading")
    todaysMood.append(mood, moodEmoji)
    // todaysMood.append(moodEmoji)
    calenderRender(emojisText, emoji.src)
}


let date = new Date()
let currYear = date.getFullYear()
const currentDate = document.querySelector(".currentDate")
let currMonth = date.getMonth()
function calenderRender(mood, emoji) {
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
    const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay()
    console.log(lastDayOfMonth);

    let dateListTag = ""
    for (let i = firstDayOfMonth; i > 0; i--) {
        dateListTag += `<li>${lastDateOfLastMonth - i + 1}</li>`
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {

        let imageTag = "";
        
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : ""
        if (isToday) {
            imageTag = `<img src="${emoji.src}" alt="Mood Emoji" class="emojiInHeading">`; // Create an image tag string
            dateListTag += `<li class="${isToday}">${i} ${mood} ${imageTag}</li>`;
        } else {
            dateListTag += `<li class="${isToday}">${i}</li>`;
        }

    }

    for (let i = lastDayOfMonth; i < 6; i++) {
        dateListTag += `<li>${i - lastDayOfMonth + 1}</li>`

    }
    days.innerHTML = dateListTag
}


const prevNext = document.querySelectorAll(".icons span")
prevNext.forEach((icon) => {
    icon.addEventListener('click', () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate())
            currYear = date.getFullYear()
            currMonth = date.getMonth()
        } else {
            date = new Date(currYear, currMonth, 1)
        }

        calenderRender()
    })
})
