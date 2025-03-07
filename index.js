
const ulEl = document.getElementById("ul-el")
const inputEl = document.getElementById("input-el")
let inputArray = []
let storage = JSON.parse(localStorage.getItem("TRACKER"))

if (storage) {
    inputArray = storage
}


document.getElementById("input-btn").addEventListener("click", function() {
    if (inputEl.value !== "") {
        inputArray.push(inputEl.value)
        localStorage.setItem("TRACKER", JSON.stringify(inputArray))
        renders(inputArray)
    }
    inputEl.value = ""
})

function renders(render) {
    let content = ""
    for (let i = 0; i < render.length; i++) {
    content += 
    `
        <li>
            <a href="${render[i]}" target="_blank">
                ${render[i]}
            </a>
        </li>
    `
    }
    ulEl.innerHTML = content
}
renders(inputArray)


document.getElementById("delete-btn").addEventListener("dblclick",function() {
    localStorage.clear()
    ulEl.innerHTML = ""
    inputArray = []
})



document.getElementById("tab-btn").addEventListener("click", function() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        inputArray.push(tabs[0].url)
        renders(inputArray)
        localStorage.setItem("TRACKER", JSON.stringify(inputArray))
    })
})