const showMoodHistory = document.querySelector("#showMoodHistory");
let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || {};
const calenderWrapper = document.querySelector(".calenderWrapper");
calenderWrapper.style.display = "none";

showMoodHistory.addEventListener("click", () => {
    if (calenderWrapper.style.display === "none") {
        calenderWrapper.style.display = "block";
        showMoodHistory.innerText = "Hide Mood History";
        calenderRender();
    } else {
        showMoodHistory.innerText = "Show Mood History";
        calenderWrapper.style.display = "none";
    }
});

const moodEmojis = document.querySelectorAll(".emojis");
const ques = document.querySelector("#ques");
const todaysMood = document.querySelector(".todaysMood");

moodEmojis.forEach((emoji) => {
    emoji.addEventListener("click", () => {
        emojiDataFn(emoji);
        recentUpdates()
    });
});

function emojiDataFn(emoji) {
    if (ques) {
        ques.remove();
    }

    todaysMood.innerHTML = "";
    const emojisText = emoji.title;
    const mood = document.createElement("h3");
    const moodEmoji = document.createElement("img");
    mood.innerText = `Today's Mood: ${emojisText}`;
    mood.style.color = "indigo";
    moodEmoji.src = emoji.src;
    moodEmoji.classList.add("emojiInHeading");

    todaysMood.append(mood, moodEmoji);

    // ✅ Store mood in localStorage with date as the key
    const todayKey = `${currYear}-${currMonth + 1}-${date.getDate()}`;
    moodHistory[todayKey] = { mood: emojisText, emoji: emoji.src };
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));

    calenderRender();
}




let date = new Date();
let currYear = date.getFullYear();
const currentDate = document.querySelector(".currentDate");
let currMonth = date.getMonth();

function recentUpdates() {
    const lastFiveDaysData = document.querySelector(".lastFiveDaysData")
    lastFiveDaysData.innerHTML = "";
    let currDate = date.getDate()
    
    for (let i = currDate; i > currDate - 5; i--) {
        const moodOfTheDay = document.createElement('span')
        let dateKey = `${currYear}-${currMonth + 1}-${i}`
        console.log(dateKey);
        let moodForDay = moodHistory[dateKey] ? moodHistory[dateKey] : { mood: "", emoji: "" }
        let imageTag = document.createElement("img")
        if (moodForDay.emoji) {
            imageTag.src = moodForDay.emoji
            imageTag.classList.add("emojiInRecent");
        }
        let recentMoodContainer = document.createElement("div")
        recentMoodContainer.classList.add("recentMood")
        let moodText = document.createElement("h3")
    
        moodText.classList.add("textInRecent")
        moodText.innerText = moodForDay.mood ? `Mood : ${moodForDay.mood}` : ""
        moodOfTheDay.classList.add("recentMoodHistory")
        moodOfTheDay.innerText = `${i}/${currMonth < 10 ? "0" + (currMonth + 1) : (currMonth + 1)}/${currYear}`
        
        recentMoodContainer.append(moodText, imageTag)
        moodOfTheDay.append(recentMoodContainer)
        lastFiveDaysData.append(moodOfTheDay)
    }

}

function calenderRender() {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    currentDate.innerText = `${monthNames[currMonth]} ${currYear}`;

    const days = document.querySelector(".days");
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    const lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();

    let dateListTag = "";

    // Inactive dates from previous month
    for (let i = firstDayOfMonth; i > 0; i--) {
        dateListTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    // Days of current month with moods
    for (let i = 1; i <= lastDateOfMonth; i++) {
        let dateKey = `${currYear}-${currMonth + 1}-${i}`;
        let moodForDay = moodHistory[dateKey] ? moodHistory[dateKey] : { mood: "", emoji: "" };

        let imageTag = moodForDay.emoji ? `<img src="${moodForDay.emoji}" alt="${moodForDay.mood}" class="emojiInHeading">` : "";
        let moodText = moodForDay.mood ? moodForDay.mood : "";

        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";

        dateListTag += `<li class="${isToday}">${i} ${moodText} ${imageTag}</li>`;
    }

    // Inactive dates for next month
    for (let i = lastDayOfMonth; i < 6; i++) {
        dateListTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    days.innerHTML = dateListTag;
}


const prevNext = document.querySelectorAll(".icons span");
prevNext.forEach((icon) => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date(currYear, currMonth, 1);
        }

        calenderRender();
    });
});

recentUpdates()
calenderRender(); // Initialize on page load