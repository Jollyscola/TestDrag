import { dragDropTable } from "./typescript/dragDropTable.js";
import { alert } from "./typescript/alert.js";
import { dragElement } from "./typescript/dragElement.js";

let columen_table = document.querySelector(".canvas_table") as HTMLTableElement

// let ative_element = document.activeElement


export class Test
{
    constructor()
    {
    }
    
    dragDropTabletest(event: any)
    {
     return new dragDropTable(columen_table).mouseDownHandler(event);
    }


    alert_call(element) : void
    {
        console.log(element)
        if(element)
        {
            
                let alert_box = new alert(element,{
                Header:"Header",
                Title:"Title",
                Message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacus nisi, accumsan id lacus"
            }).create();

            console.log(alert_box)
          return  new dragElement(alert_box, alert_box.querySelector('.form-header')).create();
      }
    }
}



let alertMessage = document.querySelectorAll("#alertMessage");
alertMessage.forEach(element => {
    console.log(element)
    element.addEventListener('click', () => new Test().alert_call(element));
})



    


columen_table.addEventListener('mousedown', (event) => new dragDropTable(columen_table).mouseDownHandler(event));



