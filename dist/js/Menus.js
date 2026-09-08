import {Dropdown, CreateDropdownMenu} from "../components/Dropdown/Dropdown.js";
import {createTask} from "./panels/leftPanel/createTask.js";
import {Modal} from "../components/Modals/Modal.js";








class TaskModalBody {
    constructor(container) {
        this.container = container
    }

    render() {
        const btn = document.createElement("button")
        btn.textContent = "Mentés"

        btn.addEventListener("click", () => {
            console.log("mentés")
        })

        this.container.appendChild(btn)
    }
}













export class Top_Menu{
    constructor(dataSource){
        this.createTask = createTask
        this.dataSource = dataSource
        this.otherSources = this.reloadLocalStorage()

    }
    reloadLocalStorage(){
        //localStorage.removeItem("otherSources")
        let otherSources = localStorage.getItem("otherSources")
        if(otherSources == null){ 
            otherSources = '{"roles":["Assembler","Buyer","Customer Support","Engineer","IT","Logistics","Owner","Planner","Project Manager","Quality","Warehouse"],"collaborators":[{"id":"1","name":"Owner","image":"https://cdn-icons-png.flaticon.com/512/6858/6858504.png","role":"0"},{"id":"2","name":"Guest 1","image":"https://www.w3schools.com/howto/img_avatar.png","role":"1"}]}'
        }
        localStorage.setItem("otherSources",otherSources)
        return  JSON.parse(otherSources)  
    }
    menu(){


        const Filemenu = CreateDropdownMenu({id:"fileDropdown",label:"File", icon:"fa  fa-file", elements:[
            {id:"new",label:"Új"},
            {id:"open",label:"Megnyitás"},
            {id:"save",label:"Mentés"},
            {id:"saveAs",label:"Mentés Másként"},
            ]
        })


        const Sourcemenu = CreateDropdownMenu({id:"dataSources",label:"Adatok", icon:"fa  fa-briefcase", elements:[
            {id:"collab",label:"Résztvevők"},
            {id:"groups",label:"Csoportok"},
            {id:"roles",label:"Felelősségi körök"},
            ]
        })




        return `
                ${Filemenu}
                <button class="menu-button fa fa-plus" id="createTask" title="Új feladat"></button>
                <button class="menu-button fa fa-users" id="share" title="Megosztás"></button>
                ${Sourcemenu}
        
        `
    }

    events(){


        //Dropdowns
        new Dropdown(
            document.querySelector("#fileDropdown")
        )
        new Dropdown(
            document.querySelector("#dataSources")
        )


        this.createTask(this.dataSource)















        //Collab Modal




    const collabEvents = () =>{



        //Build collaborators from storage
        const collab_ctn = document.querySelector("#collab_ctn")
        this.otherSources = this.reloadLocalStorage()

        let collabs = ""
        this.otherSources.collaborators.forEach(itm=>{
            collabs += `<div class="collabRow" style="padding:1em">
                            <img src="${itm.image}" style="height:35px;">
                            <i style="position:relative;top:-10px;">${this.otherSources.roles[itm.role]}</i>
                            <div>${itm.name}</div>
                            ${
                                itm.role != 0 ? `<button  collabId="${itm.id}"  class="removeCollaborator" style="cursor:pointer;border:none;color:white;float:right;position:relative;top:-50px;right:50%;background-color:red;">X</button>` : ""
                                
                            }
                        </div>`
        
        })
        collab_ctn.innerHTML = collabs

alert("Még a beszúrásnál meg kell csinálni a rendert")
        const removeCollaborator = document.querySelectorAll(".removeCollaborator")
      
        removeCollaborator.forEach(itm=>{
            itm.addEventListener("click",()=>{
                const collabId = itm.getAttribute("collabId") 
                const index = this.otherSources.collaborators.findIndex(item => item.id == collabId)

                if (index !== -1) {
                    this.otherSources.collaborators.splice(index, 1)
                    itm.parentNode.remove()
                    localStorage.setItem("otherSources",JSON.stringify(this.otherSources))
                    
                }


            })
        })

    const collabSave = document.querySelector(".collabSave")
    collabSave.addEventListener("click",()=>{
        const collabName = document.querySelector(".collabName").value
        if(collabName.length <3){
            alert("Név túl rövid")
            return false;
        }

        const collabRole = document.querySelector(".collabRole").value
        if(collabRole == "null"){
            alert("Nem választottál Feladatkört")
            return false;
        }

        const collabImage = document.querySelector(".collabImage").value
        

        const getNextId = () => this.otherSources.collaborators.length ? Math.max(...this.otherSources.collaborators.map(x => x.id)) + 1 : 1

        this.otherSources.collaborators.push({"id":getNextId(),"name":collabName,"image":collabImage,"role":collabRole})
        localStorage.setItem("otherSources",JSON.stringify(this.otherSources))
       
    })



    }

    let roleOptions = `<option value="null">Kérlek válassz</option>`
    this.otherSources.roles.forEach((itm,key)=>{
        roleOptions += `<option value="${key}">${itm}</option>`
    })

/*
    const collabTable = `<div>
                            <div>
                                <h3>Új résztvevő</h3>
                                <input class="collabName" placeholder="Név">
                                <select class="collabRole">
                                    ${roleOptions}
                                </select>
                                <input class="collabImage" placeholder="Fotó">
                                <button class="collabSave">+</button>
                            </div>
                            <div id="collab_ctn">${collabs}</div>
                        </div>`
*/
    const collabTable = `<div>
                            <div>
                                <h3>Új résztvevő</h3>
                                <input class="collabName" placeholder="Név">
                                <select class="collabRole">
                                    ${roleOptions}
                                </select>
                                <input class="collabImage" placeholder="Fotó">
                                <button class="collabSave">+</button>
                            </div>
                            <div id="collab_ctn"></div>
                        </div>`
    const collab = document.querySelector("#collab")
    collab.addEventListener("click",()=>{
        console.log(this.otherSources.collaborators)
        Modal("Résztvevők",collabTable,collabEvents,this.reloadLocalStorage)
    })















    


    }
}

// <button class="menu-button  fa  fa-file" title="File" id="fileDropdown"></button>

export class Bottom_Menu{
    constructor(){
    }
    menu(){
        return `Bottom Menu`
    }
}


