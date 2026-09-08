import {renderTasks} from "./createTask.js "
import {CreateTaskEvents} from "./events/CreateTaskEvents.js"



export class leftPanel{
    constructor(dataSource){
        this.dataSource = dataSource
        this.renderTasks = renderTasks
    }
    loadCSS(){
        if(document.querySelector("#left-panel-css"))
            return
        const link = document.createElement("link")
        link.id = "left-panel-css"
        link.rel = "stylesheet"
        link.href = "./css/left-panel-css"
        document.head.appendChild(link)
    }


    create(){
        this.loadCSS()  
        return `
        <table class="taskTable" border="1" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Név</th>
                    <th>Költség</th>
                    <th>Kezdet</th>
                    <th>Cél</th>
                    <th>Időtartam</th>
                    <th>Résztvevők</th>
                    <th>Készültség</th>
                    <th>Állapot</th>

                </tr>
            </thead>
            <tbody id="taskList">
            </tbody>
        </table>
        
        `
    }
    
    events(){
        this.dataSource.forEach(itm=>{
            this.renderTasks(itm)
        })

       
    CreateTaskEvents(this.dataSource)
        





    }

}