import {calendar,isDateBetween,today,addXDays} from "../../../Hooks/Date/Date.js "


export class rightPanel{
    constructor(dataSource){
        this.dataSource = dataSource
        this.year = new Date().getFullYear()
        this.Dates = []
        this.Calendar = []
        for(let i=1; i<=12; i++){
            this.Calendar.push(  calendar({lang:"hu",date:`${this.year}-${i}-01`})   )
        }

    }
    create(){
       
        let output = `<table style="
                            border-collapse:collapse;
                            position:absolute;
                            top:35px;
                            font-size:20px;
                            display:block;
                            width:100%;
                            overflow-x:scroll;
                        ">
                        <tr>`
        this.cellLength = 0
        this.Calendar.forEach(month=>{


            Object.keys(month).forEach(day=>{
                output +=   `<th style="min-width:50px;" id="day_${month[day].date}">
                                <div>${month[1].monthName.short}</div>
                                <div>${day}</div>
                            </th>`
                           
                this.Dates.push(month[day].date)
                this.cellLength++
            })
        })
        output += `</tr></thead>`

   

 
        this.dataSource.forEach(evt=>{
            let row = `<tr>`
            for(let i=0; i<this.cellLength; i++ ){


                
                const isEventDeclared = (isDateBetween({
                            date: this.Dates[i],
                            fromDate: evt.taskStartDate,
                            toDate: evt.taskEndDate
                        }))

                const color = isEventDeclared === true ? "background-color:red;" : ""
                row += `<td style="font-size:14px;height:25px;${color}"></td>`
            }
            row += `</tr>`
            output += row
        })
        
        output += "</table>"
  
        return `
        ${output}
        `
    }
    scrollToNow(){
       //console.log(addXDays({date:today().date,days:-10}))
       const scrollTo = addXDays({date:new Date(today().date),days:20})

       //console.log(addXDays(new Date("2026-10-22"),-10))
        //document.getElementById(`day_${today().date}`).scrollIntoView();
        document.getElementById(`day_${scrollTo.date}`).scrollIntoView();
        

    }
}