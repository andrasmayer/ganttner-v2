import {Top_Menu, Bottom_Menu} from "./Menus.js"
import {leftPanel} from "./panels/leftPanel/leftPanel.js"
import {rightPanel} from "./panels/RightPanel/RightPanel.js"

//localStorage.removeItem("dataSource")
let dataSource = localStorage.getItem("dataSource")
if(dataSource == null){ dataSource = "[]"}
localStorage.setItem("dataSource",dataSource)
dataSource = JSON.parse(dataSource)


//localStorage.removeItem("otherSources")
let otherSources = localStorage.getItem("otherSources")
if(otherSources == null){ 
    otherSources = '{"roles":["Assembler","Buyer","Customer Support","Engineer","IT","Logistics","Owner","Planner","Project Manager","Quality","Warehouse"],"collaborators":[{"id":"1","name":"Owner","image":"https://cdn-icons-png.flaticon.com/512/6858/6858504.png","role":"0"},{"id":"2","name":"Guest 1","image":"https://www.w3schools.com/howto/img_avatar.png","role":"1"}]}'
}
localStorage.setItem("otherSources",otherSources)
otherSources = JSON.parse(otherSources)




const TopMenu = new Top_Menu(dataSource)
const BottomMenu = new Bottom_Menu()
const LeftPanel = new leftPanel(dataSource)
const RightPanel = new rightPanel(dataSource)


export default class ImageSlider{
    constructor(container, options={}){
        this.container = container
        this.position = options.position ?? 50
        this.position = 80
        this.create()
        this.loadCSS()
        this.setPosition(this.position)
        this.events()
    }
    loadCSS(){
        if(document.querySelector("#image-slider-css"))
            return
        const link = document.createElement("link")
        link.id = "image-slider-css"
        link.rel = "stylesheet"
        link.href = "./css/ImageSlider.css"
        document.head.appendChild(link)
    }
    create(){
        this.container.classList.add("image-slider")
        this.header = document.createElement("div")
        this.header.className = "image-slider-header"
        this.header.innerHTML = TopMenu.menu()

        this.footer = document.createElement("div")
        this.footer.className = "image-slider-footer"
        this.footer.innerHTML =  BottomMenu.menu()

        this.back = document.createElement("div")
        this.back.className = "image-slider-back"

        this.front = document.createElement("div")
        this.front.className = "image-slider-front"

        this.line = document.createElement("div")
        this.line.className = "image-slider-line"

        this.handle = document.createElement("div")
        this.handle.className = "image-slider-handle"
        this.handle.innerHTML = "↔"

        this.back.innerHTML = RightPanel.create()
      
        window.addEventListener('load', () => {
             RightPanel.scrollToNow()
        });

        this.front.innerHTML = LeftPanel.create()



        this.container.append(

            this.header,
            this.footer,
            this.back,
            this.front,
            this.line,
            this.handle

        )

    }



    events(){
        LeftPanel.events()

        let dragging = false



        this.handle.addEventListener(
            "mousedown",
            ()=>dragging = true
        )


        window.addEventListener(
            "mouseup",
            ()=>dragging = false
        )


        window.addEventListener(
            "mousemove",
            e=>{


                if(!dragging)
                    return


                const rect = this.container.getBoundingClientRect()


                let x = e.clientX-rect.left


                let percent = (x/rect.width)*100


                percent = Math.max(
                    0,
                    Math.min(100,percent)
                )
                this.setPosition(percent)
            }
        )

        TopMenu.events()

    }



    setPosition(percent){


        this.position = percent


        this.front.style.clipPath =
            `inset(0 ${100-percent}% 0 0)`


        this.line.style.left =
            percent+"%"


        this.handle.style.left =
            percent+"%"


    }


    


}

