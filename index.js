let date = new Date()
console.log(date);

const moodLogs = document.querySelector("#moodLogs")
const emojis = document.querySelectorAll(".emojis")

emojis.forEach((emoji)=>{
    console.log(emoji);
    
    emoji.addEventListener('click',()=>{
        const mood = emoji.alt
        emojiSeletedFn(mood)
    })
})

moodLogs.addEventListener('click',()=>{
    moodLogsFn()
})

function moodLogsFn(){
   console.log("kushal");
   
}
function emojiSeletedFn(mood) {
    console.log(mood);
    
}

function calenderFn(){

    const currentDate = document.querySelector(".currentDate")
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    let currYear = date.getFullYear()
    let currMonth = date.getMonth()
    
    let lastDateOfMonth = new Date(currYear,currMonth+1,0).getDate()
    
    currentDate.innerText = `${monthNames[currMonth]} ${currYear}`
}
calenderFn()