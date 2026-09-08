
//import {CreateTaskEvents} from "./events/CreateTaskEvents.js"


export const cellClasses = ["taskId", "taskName", "taskCost", "taskStartDate", "taskEndDate", "taskDuration", 
                "taskCollaborators", "taskPercentage", "taskStatus"]

const statusList = ["waiting", "ongoing", "finished", "failed" ]



export const renderTasks = (task) => {
    const taskList = document.querySelector("#taskList")
    const tr = document.createElement("tr")
    tr.classList.add("task")

    cellClasses.forEach((className,key) => {
            const td = document.createElement("td")
            td.classList.add(className)
            if(key == 0 ){
                td.textContent = task.taskId
            }
            else if(key == 1){
                td.innerHTML = `<input type="text" class="taskInput ${className}Input" value="${task.taskName}">`
            }
            else if(key == 2){
                td.innerHTML = `<input type="text" class="taskInput ${className}Input" value="${task.taskCost}">`
            }
            else if(key == 3){
                td.innerHTML = `<input type="date" class="taskInput ${className}Input" value="${task.taskStartDate}">`
            }
            else if(key == 4){
                td.innerHTML = `<input type="date" class="taskInput ${className}Input"  value="${task.taskEndDate}">`
            }
            else if(key == 5 ){
                td.textContent = task.taskDuration
            }
            else if(  key == 6){

//console.log(12)

            }
            else if(  key == 7){
                td.innerHTML = `<input type="number" min="0" max="100" class="taskInput ${className}Input"  value="${task.taskPercentage}">`

            }
            else if(key == 8){
                td.innerHTML = `<select  class="waiting taskInput ${className}Input ${statusList[task.taskStatus]}" >
                                    <option class="waiting" ${task.taskStatus == 0 ? "selected" : ""} value="0">Várakozik</option>
                                    <option class="ongoing" ${task.taskStatus == 1 ? "selected" : ""} value="1">Folyamatban</option>
                                    <option class="finished" ${task.taskStatus == 2 ? "selected" : ""} value="2">Elkészült</option>
                                    <option class="failed" ${task.taskStatus == 3 ? "selected" : ""} value="3">Elbukott</option>
                                
                                </select>`
            }
            else{
                td.innerHTML = `<input class="taskInput ${className}Input">`
            }
            
            
            tr.appendChild(td)
        })

        taskList.appendChild(tr);


}















export const createTask = (dataSource)=>{


    const taskList = document.querySelector("#taskList")
        
    const createTask = document.querySelector("#createTask")
    createTask.addEventListener("click",()=>{
        const taskCount = document.querySelectorAll(".task").length + 1 
        const tr = document.createElement("tr")
        tr.classList.add("task")

        // Cellák tartalma
        


        const dataRow = {}
        cellClasses.forEach( itm=>{
            let value = ""
            if(itm == "taskId"){ dataRow[itm] = taskCount }
            else if(itm == "taskDuration"){ dataRow[itm] = "0"}
            else if(itm == "taskPercentage"){ dataRow[itm] = "0"}
            else if(itm == "taskStatus"){ dataRow[itm] = "2"}
            else{
                dataRow[itm] = ""
            }
        })
        //dataRow.sources = {roles:[]}
        dataSource.push(dataRow)
        localStorage.setItem("dataSource",JSON.stringify(dataSource))





        // 4 td létrehozása
        cellClasses.forEach((className,key) => {
            const td = document.createElement("td")
            td.classList.add(className)
            if(key == 0 ){
                td.textContent = taskCount
            }
            else if( key == 5 || key == 6){
            }
            else if(key == 3 || key == 4){
                td.innerHTML = `<input type="date" class="taskInput ${className}Input">`
            }
            else if(key == 8){
                td.innerHTML = `<select  class="waiting taskInput ${className}Input" >
                                    <option class="waiting" value="0">Várakozik</option>
                                    <option class="ongoing" value="1">Folyamatban</option>
                                    <option class="finished" value="2">Elkészült</option>
                                    <option class="failed" value="3">Elbukott</option>
                                
                                </select>`
            }
            else{
                td.innerHTML = `<input class="taskInput ${className}Input">`
            }
            
            
            tr.appendChild(td)
        })

        // Sor hozzáadása a tbody-hoz
        taskList.appendChild(tr);









    })
        







}



