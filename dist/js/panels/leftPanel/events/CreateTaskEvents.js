import {rightPanel} from "../../RightPanel/RightPanel.js"

const redrawRightPanel = (dataSource) =>{
    console.log(dataSource)
    const RightPanel = new rightPanel(dataSource)
   
   /*
    this.back.innerHTML = RightPanel.create()

    window.addEventListener('load', () => {
            RightPanel.scrollToNow()
    })
            */
    document.querySelector(".image-slider-back").innerHTML = RightPanel.create()
        console.log( document.querySelector(".image-slider-back") )
          RightPanel.scrollToNow()
}


const statusList = ["waiting", "ongoing", "finished", "failed" ]

function isDate(str) {
    const date = new Date(str);
    return !isNaN(date.getTime());
}
function dateDiffInDays(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    return Math.floor(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24));
}


const getRecord = (dataSource,taskId) => {
    return dataSource.findIndex(item => item.taskId == taskId)
}
const updateStorage = (data) =>{
    localStorage.setItem("dataSource",JSON.stringify(data))
}


export const CreateTaskEvents = () => {
    let dataSource = localStorage.getItem("dataSource")
    if(dataSource == null){ dataSource = "[]"}
    localStorage.setItem("dataSource",dataSource)
    dataSource = JSON.parse(dataSource)


    
    document.addEventListener("change", e => {

        if (e.target.classList.contains("taskStartDateInput")) {
            const itm = e.target
            const parentTr = itm.parentElement.parentElement
            const taskId = parentTr.querySelector(".taskId").textContent
            const duration = parentTr.querySelector(".taskDuration")
            const endDate = parentTr.querySelector(".taskEndDateInput").value
            const startDate = itm.value


            const recordIndex = getRecord(dataSource,taskId)
            if (isDate(endDate)) {
                const diff = dateDiffInDays(startDate, endDate)
                duration.textContent = diff
                dataSource[recordIndex].taskDuration = diff
            }
            dataSource[recordIndex].taskStartDate = startDate
            updateStorage(dataSource)

        }

        if (e.target.classList.contains("taskEndDateInput")) {
            const itm = e.target
            const parentTr = itm.parentElement.parentElement
            const taskId = parentTr.querySelector(".taskId").textContent
            const duration = parentTr.querySelector(".taskDuration")
            const startDate = parentTr.querySelector(".taskStartDateInput").value
            const endDate = itm.value


            const recordIndex = getRecord(dataSource,taskId)
            if (isDate(endDate)) {
                const diff = dateDiffInDays(startDate, endDate)
                duration.textContent = diff
                dataSource[recordIndex].taskDuration = diff
            }
            dataSource[recordIndex].taskEndDate = endDate
            updateStorage(dataSource)

        }
        if (e.target.classList.contains("taskStatusInput")) {
            const itm = e.target
            const parentTr = itm.parentElement.parentElement
            const taskId = parentTr.querySelector(".taskId").textContent

            statusList.forEach(st => {
                itm.classList.remove(st)
            })

            itm.classList.add(statusList[itm.value])

            const recordIndex = getRecord(dataSource,taskId)
            dataSource[recordIndex].taskStatus = itm.value
            updateStorage(dataSource)
        }

        
        if (e.target.classList.contains("taskPercentageInput")) {
            const itm = e.target
            const parentTr = itm.parentElement.parentElement
            const taskId = parentTr.querySelector(".taskId").textContent
            const recordIndex = getRecord(dataSource,taskId)
            dataSource[recordIndex].taskPercentage = itm.value
            updateStorage(dataSource)            
        }

        redrawRightPanel(dataSource)
        
    })


    document.addEventListener("keyup", e => {
    
        if (e.target.classList.contains("taskNameInput")) {
            const itm = e.target
            const parentTr = itm.parentElement.parentElement
            const taskId = parentTr.querySelector(".taskId").textContent

            const recordIndex = getRecord(dataSource,taskId)
            dataSource[recordIndex].taskName = itm.value
            updateStorage(dataSource)            
        }
        if (e.target.classList.contains("taskCostInput")) {
            const itm = e.target
            const parentTr = itm.parentElement.parentElement
            const taskId = parentTr.querySelector(".taskId").textContent
            const recordIndex = getRecord(dataSource,taskId)
            dataSource[recordIndex].taskCost = itm.value
            updateStorage(dataSource)            
        }
        if (e.target.classList.contains("taskPercentageInput")) {
            const itm = e.target
            const parentTr = itm.parentElement.parentElement
            const taskId = parentTr.querySelector(".taskId").textContent
            const recordIndex = getRecord(dataSource,taskId)
            dataSource[recordIndex].taskPercentage = itm.value
            updateStorage(dataSource)            
        }

        redrawRightPanel(dataSource)

    })
}