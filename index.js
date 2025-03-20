// Accessing moodHistory from the Local Storage
// let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || {};

//Declaring Variables
const calenderWrapper = document.querySelector(".calenderWrapper");
const showMoodHistory = document.querySelector("#showMoodHistory");

calenderWrapper.style.display = "none"; // Creating display none at First.

function showMoodHistoryFn() {
    if (calenderWrapper.style.display === "none") {
        calenderWrapper.style.display = "block";
        showMoodHistory.innerText = "Hide Mood History";
        calenderRender();
    } else {
        showMoodHistory.innerText = "Show Mood History";
        calenderWrapper.style.display = "none";
    }
}

let date = new Date();
let currYear = date.getFullYear();
const currentDate = document.querySelector(".currentDate");
let currMonth = date.getMonth();
console.log(currMonth);

function calenderRender() {
    // Array for month names
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    currentDate.innerText = `${monthNames[currMonth]} ${currYear}`;

    const days = document.querySelector(".days");
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // getDay is also zero Indexed.

    // .getMonth() is the zero indexed so for last date of current Month we have to use current Month + 1 for moving next month and then day = 0 to step back one day back from first day of next month .
    const lastDateOfCurrentMonth = new Date(currYear, currMonth + 1, 0).getDate();

    // taking current month and then stepping back to one day before first day of current month.
    const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfCurrentMonth).getDay();

    let dateListTag = "";

    // Inactive dates from previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
        dateListTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    // Days of current month with moods
    for (let i = 1; i <= lastDateOfCurrentMonth; i++) {
        let dateKey = `${currYear}-${currMonth + 1}-${i}`;

        let moodForDay = moodHistory[dateKey] ? moodHistory[dateKey] : { mood: "", emoji: "" };

        let imageTag = moodForDay.emoji ? `<img src="${moodForDay.emoji}" alt="${moodForDay.mood}" class="emojiInHeading">` : "";

        let moodText = moodForDay.mood ? moodForDay.mood : "";

        // If isToday is present date then add active class to it
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";

        dateListTag += `<li class="${isToday}">${i} <span class="moodText"> ${moodText} </span>${imageTag}</li>`;
    }

    // Inactive dates for next month
    for (let i = lastDayOfMonth; i < 6; i++) {
        dateListTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    days.innerHTML = dateListTag;
}
function emojiDataFn(emoji) {
    if (ques) {
        ques.remove();
    }
    // clearing todaysmood on change in seleted mood for the day.
    todaysMood.innerHTML = "";

    const emojisText = emoji.title;

    const mood = document.createElement("h3");
    const moodEmoji = document.createElement("img");

    mood.innerText = `Today's Mood: ${emojisText}`;
    mood.style.color = "indigo";

    moodEmoji.src = emoji.src;
    moodEmoji.classList.add("emojiInHeading");

    todaysMood.append(mood, moodEmoji);

    // Store mood in localStorage with date as the key
    // const todayKey = `${currYear}-${currMonth + 1}-${date.getDate()}`;
    const todayKey = `${currYear}-${String(currMonth + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    moodHistory[todayKey] = { mood: emojisText, emoji: emoji.src };
    // localStorage.setItem("moodHistory", JSON.stringify(moodHistory));

    calenderRender();
}

const lastFiveDaysData = document.querySelector(".lastFiveDaysData")
function recentUpdates() {
    // If render again then clearing old rendered data.
    lastFiveDaysData.innerHTML = "";

    let currDate = date.getDate()
    for (let i = currDate; i > currDate - 5; i--) {
        //creating required elements
        const moodOfTheDay = document.createElement('span')
        let recentMoodContainer = document.createElement("div")
        let imageTag = document.createElement("img")
        let moodText = document.createElement("h3")


        let dateKey = `${currYear}-${currMonth + 1}-${i}`
        let moodForDay = moodHistory[dateKey] ? moodHistory[dateKey] : { mood: "", emoji: "" }

        if (moodForDay.emoji) {
            imageTag.src = moodForDay.emoji
            imageTag.classList.add("emojiInRecent");
        }
        recentMoodContainer.classList.add("recentMood")

        moodText.classList.add("textInRecent")
        moodText.innerText = moodForDay.mood ? `Mood : ${moodForDay.mood}` : ""

        moodOfTheDay.classList.add("recentMoodHistory")
        moodOfTheDay.innerText = `${i}/${currMonth < 10 ? "0" + (currMonth + 1) : (currMonth + 1)}/${currYear}`

        recentMoodContainer.append(moodText, imageTag)
        moodOfTheDay.append(recentMoodContainer)
        lastFiveDaysData.append(moodOfTheDay)
    }

}

function changeInCalender(icon) {
    // if icon.id is equals to "prev" then  currMonth = currMonth-1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    // if currMonth is first month of year or last month of year changing months and year accordingly.
    if (currMonth < 0 || currMonth > 11) {
        date = new Date(currYear, currMonth, new Date().getDate());
        currYear = date.getFullYear();
        currMonth = date.getMonth();
    } else {
        date = new Date(currYear, currMonth, 1);
    }
    calenderRender(); // Initialize on changing months and years.
}



const prevNext = document.querySelectorAll(".icons span");
prevNext.forEach((icon) => {
    icon.addEventListener("click", ()=>{
        changeInCalender(icon)
    })
});


// declaring variables for this part.
const moodEmojis = document.querySelectorAll(".emojis");
const ques = document.querySelector("#ques");
const todaysMood = document.querySelector(".todaysMood");

moodEmojis.forEach((emoji) => {
    emoji.addEventListener("click", () => {
        emojiDataFn(emoji);
        recentUpdates()
    });
});

showMoodHistory.addEventListener("click", showMoodHistoryFn);
recentUpdates()// Initialize on page load 
calenderRender(); // Initialize on page load