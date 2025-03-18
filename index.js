// const moodLogs = document.querySelector("#moodLogs")

const emojis = document.querySelectorAll(".emojis");
const showMoodDiv = document.querySelector(".showMood");
const todayMoodDiv = document.querySelector(".todaysMood");

let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || {};
emojis.forEach((emoji) => {
  emoji.addEventListener("click", () => {
    const mood = emoji.alt;
    emojiSeletedFn(mood);
    calenderFn();
  });
  emoji.addEventListener("mouseover", () => {
    const mood = emoji.alt;
    console.log(mood);
  });
});

function emojiSeletedFn(mood) {
  console.log(mood);
  todayMoodDiv.innerHTML = "";
  const todaysMood = document.createElement("h3");
  todaysMood.innerText = `Your mood is ${mood} today`;
  todayMoodDiv.append(todaysMood);

  const todayKey = `${currYear}-${currMonth + 1}-${date.getDate()}`;
  moodHistory[todayKey] = mood;
  localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
}

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

function calenderFn() {
  const days = document.querySelector(".days");
  const currentDate = document.querySelector(".currentDate");

  if (currentDate) {
    if (!days || !currentDate) return;
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
    let liTag = "";
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();

    for (let i = firstDayOfMonth; i > 0; i--) {
      liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const today = new Date();
      let isToday =
        i === today.getDate() &&
        currMonth === today.getMonth() &&
        currYear === today.getFullYear()
          ? "active"
          : "";
      const dateKey = `${currYear}-${currMonth + 1}-${i}`;
      const storedMood = moodHistory[dateKey]; // Moved inside the loop and declared here.

      if (isToday) {
        if (storedMood) {
          liTag += `<li class=${isToday} >${i} ${storedMood}</li>`;
        } else {
          liTag += `<li class=${isToday} >${i}</li>`;
        }
      } else {
        if (storedMood) {
          liTag += `<li>${i} ${storedMood}</li>`;
        } else {
          liTag += `<li>${i}</li>`;
        }
      }
    }
    for (let i = lastDayOfMonth; i < 6; i++) {
      liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }
    if (days) {
      days.innerHTML = liTag;
    }
    currentDate.innerText = `${monthNames[currMonth]} ${currYear}`;
  }
}
calenderFn();
const prevNextIcons = document.querySelectorAll(".icons span");
prevNextIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    }
    calenderFn();
  });
});