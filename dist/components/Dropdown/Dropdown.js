export class Dropdown {
    constructor(element, options={}){
        this.element = element
        this.loadCSS()
        this.init()
    }
    loadCSS(){
        if(document.querySelector("#dropdown-css"))
            return

        const link = document.createElement("link")
        link.id = "dropdown-css"
        link.rel = "stylesheet"
        link.href = "./components/Dropdown/Dropdown.css"
        document.head.appendChild(link)
    }
    init(){
        this.button = this.element.querySelector(".dropdown-button")
        this.menu = this.element.querySelector(".dropdown-menu")

        this.button.addEventListener(
            "click",
            e=>{
                e.stopPropagation()
                this.toggle()
            }
        )

        document.addEventListener(
            "click",
            ()=>this.close()
        )

    }
    toggle(){
        this.menu.classList.toggle("show")
    }
    close(){
        this.menu.classList.remove("show")
    }

}




export const CreateDropdownMenu = (data)=>{

/*
        CreateDropdownMenu({id:"fileDropdown",label:"File", icon:"fa  fa-file", elements:[
            {id:"itm1",label:"Első"},
            {id:"itm2",label:"Második"}
            ]
        })
*/

    let elements = ""

    data.elements.forEach(itm=>{
        elements += `<div class="dropdown-item" id="${itm.id}">
                        ${itm.label}
                    </div> `
    })


    return `<div class="dropdown"  id="${data.id}" >
                <button class="dropdown-button ${data.icon}" title="${data.label}"></button>
                <div class="dropdown-menu">
                    <div class="dropdown-category">${data.label}</div>
                    ${elements}
                </div>
            </div>`
}