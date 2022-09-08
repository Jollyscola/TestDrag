import { dragDropTable } from "./typescript/dragDropTable.js";
import { alert } from "./typescript/alert.js";
import { dragElement } from "./typescript/dragElement.js";

const columen_table = document.querySelector(".canvas_table") as HTMLTableElement

const ative_element = document.activeElement
const element = ative_element.querySelector("#alert_box");

export class Test
{
    constructor()
    {
    }
    
    dragDropTabletest(event: any)
    {
     return new dragDropTable(columen_table).mouseDownHandler(event);
    }


    alert_call() : void
    {
        console.log("alertBox")
        if(!element)
        {
                const alert_box = new alert(ative_element,{
                Header:"Header",
                Title:"Title",
                Message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacus nisi, accumsan id lacus"
            }).create();
          return  new dragElement(alert_box, alert_box.querySelector('.form-header')).create();
      }
    }
}



// columen_table.querySelectorAll('.arrow_left_right').forEach((headerCell) => {
    //  headerCell.classList.add('draggable');

columen_table.querySelectorAll('.arrow_left_right').forEach((headerCell) => {
        headerCell.classList.add('draggable');
        headerCell.addEventListener('mousedown', (event) => new dragDropTable(columen_table).mouseDownHandler(event));
});
