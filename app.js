
const form_area = document.querySelector(".form-area");
const canvas = document.querySelectorAll(".canvas");
const alert_box = document.querySelector("#alert_box");
const color_heading = document.querySelector(".color_heading")
let colorWell = document.querySelector("#colorWell");


window.addEventListener("load", startup);



const table = document.querySelector(".canvas_table");
const draggable = table.querySelectorAll(".draggable")




class dragDropTable{
    constructor(){
        let draggingEle;
        let draggingColumnIndex;
        let placeholder;
        let list;
        let isDraggingStarted = false;
        this.draggingColumnIndex = draggingColumnIndex;
        this.placeholder = placeholder;
        this.list = list;
        this.isDraggingStarted = isDraggingStarted;
        this.draggingEle = draggingEle;
        let mouseX = 0;
        let mouseY = 0;
        console.log(this.list)
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseX = mouseX;
        this.mouseY = mouseY;
    }


    mouseDownHandler =(e) =>{
        //række af nummer 0 eller 1
        this.draggingColumnIndex = [].slice.call(table.querySelectorAll('.cell_heading')).indexOf(e.target)

        this.mouseX = e.clientX - e.target.offsetLeft;
        this.mouseY = e.clientY - e.target.offsetTop;

        console.log(this.mouseX, this.mouseY)
       
       
        document.addEventListener('mousemove',this.mouseMoveHandler);
    }
    mouseMoveHandler = (e) =>{
        if (!this.isDraggingStarted) {
            console.log("isDragging")
            this.isDraggingStarted = true;
            this.cloneTable();
        }
    }
    
    cloneTable(){
        const rect = table.getBoundingClientRect();
        this.list = document.createElement("div");
        this.list.classList.add("clone-list");
        this.list.style.position = "absolute";
        this.list.style.left = `${rect.left}px`
        this.list.style.top = `${rect.top}px`
        console.log(this.list)

        table.parentNode.insertBefore(this.list, table);
        
        const originalCells = [].slice.call(table.querySelectorAll('.cell'));

        const originalHeaderCells = [].slice.call(table.querySelectorAll('.cell_heading'));


        const width = parseInt(window.getComputedStyle(headerCell).width);

        console.log(width)
        // console.log(originalCells)
    }
}

const drag_Drop_table = new dragDropTable().mouseDownHandler;
table.querySelectorAll('.cell_heading').forEach((headerCell) => {
    headerCell.classList.add('draggable');
     headerCell.addEventListener('mousedown', drag_Drop_table);
});



// function table_columen(){
//     const node = table;
//     const rows = [...table.querySelectorAll(".rows")];
//     const copy_table = node.cloneNode(true);
//     const copy_rows = [...copy_table.querySelectorAll(".rows")];
//     // const rows = copy_table.cloneNode(true);
    
//     // console.log(rows)
//     const newtable = document.createElement("div")
//     newtable.classList.add(".canvas_table")
//     // console.log(newtable)
//     for (let i = 0; i < draggable.length; i++) {
//         const newRow = document.createElement("div");
//         newRow.classList.add("rows");
//         copy_rows.forEach(row => {
//          const cell =  row.querySelectorAll(".cell")[0]
//          rows.append(cell)
//         })

//     }
    

//     console.log(newtable.children)
//     // const newrows = newtable.querySelectorAll(".rows");
//     rows.forEach(container => {
//         container.addEventListener('dragover', e => {
//             e.preventDefault();
//             // console.log(e)
//             const afterElement = getDragAfterElement(container, e.clientX)
//             console.log(afterElement)
//         //     table.parentNode.removeChild(table)
            
//             // const afterElement = getDragAfterElement(container, e.clientX)
//             // const draggable = document.querySelector('.dragging');
//             if (afterElement == null) {
//                 // console.log(afterElement)
//                 container.appendChild(draggable)
//               } else {
//                 container.insertBefore(draggable, afterElement)
//               }
//         })
//     })
// }

    


//     function getDragAfterElement(container, x) {
//         const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]
      
//          return draggableElements.reduce((closest, child) => {
//            const box = child.getBoundingClientRect()
//            const offset = x - box.left - box.width / 2
//            if (offset < 0 && offset > closest.offset) {
//             return { offset: offset, element: child }
//           } else {
//              return closest
//          }
//         }, { offset: Number.NEGATIVE_INFINITY }).element
// }

function startup() {

     colorWell.addEventListener("input", updateFirst);
     colorWell.addEventListener("change", updateAll);
    colorWell.select();
  }



  function updateAll(event) {
    document.querySelectorAll(".heading").forEach((heading) => {
      heading.style.backgroundColor  = event.target.value;
    });
  }

  function updateFirst(event) {
      
    localStorage.setItem("heading",event.target.value);
     const heading = document.querySelector(".heading");
     if (heading) {
        heading.style.backgroundColor  = event.target.value;
     }
  }



class dragElement {
    constructor (element, dragzone){
        
        const left = 0;
        const top = 0;
        const x = 0;
        const y = 0;
        
        this.left = left;
        this.top = top;
        this.x = x;
        this.y = y;
        this.element = element;
        this.dragzone = dragzone; 
    }
 
    dragMouseUp = () =>{
      document.onmouseup = null;
      document.onmousemove = null;
      this.dragzone.classList.remove("active");
    };

    dragMouseMove = (event) =>{
      event.preventDefault();
      this.top = this.y - event.clientY;
      this.left = this.x - event.clientX;

      this.x = event.clientX;
      this.y = event.clientY;

      this.element.style.top = `${this.element.offsetTop - this.top}px`;
      this.element.style.left = `${this.element.offsetLeft - this.left}px`;
    };

   dragMouseDown = (event) =>{
      event.preventDefault();
      this.x = event.clientX;
      this.y = event.clientY;

      this.dragzone.classList.add("active");

      document.onmouseup = this.dragMouseUp;
      document.onmousemove = this.dragMouseMove;

      const mediaQuery = window.matchMedia('(max-width: 700px)')
      mediaQuery.addListener(e =>{
          if(e.matches){
              this.element.style.top = null;
              this.element.style.left = null;
          }
      })
    };
    create(){
        this.dragzone.onmousedown = this.dragMouseDown;
    }
    
  };

canvas.forEach((canva) => {

    const header = canva.querySelector(".form-header");
     new dragElement(canva, header).create();
})


function alert_call(){
    const ative_element = document.activeElement
    const element = ative_element.querySelector("#alert_box");
    if(!element)
    {
            const alert_box = new alert(ative_element,{
            Header:"Header",
            Title:"Title",
            Message:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacus nisi, accumsan id lacus"
        }).create();
        new dragElement(alert_box, alert_box.querySelector('.form-header')).create();
  }
}



class alert{

    constructor(alert_container,options){
        this.options = options;

        const alert_box = document.createElement("div");
        const alert_title = document.createElement("div");
        const alert_header = document.createElement("div");
        const alert_row = document.createElement("div");
        const alert_button = document.createElement("div");
        alert_header.classList.add("form-header", "heading");
        alert_row.classList.add("alert_row");
        alert_title.classList.add("alert_title")
        alert_button.classList.add("alert_button");
        this.alert_button = alert_button
        this.alert_header = alert_header;
        this.alert_title = alert_title;
        this.alert_row = alert_row
        this.alert_container = alert_container;
        alert_box.style.zIndex = "40";
        alert_box.style.display = "block";
        alert_box.setAttribute("id","alert_box");
        this.alert_box = alert_box;
        this.alert_container.append(this.alert_box)
     

        this.update({...options});
    }


    set Header(value){
        this.header = value;
    }

    set Title(value){
        this.title = value;
    }
    set Message(value){
        this.message = value;
    }

    
    create(){
      
       const title = this.alerttitle();
       const close = this.alertclose();
       const header = this.alertheader(close);
       this.alert_box.appendChild(header);
       this.alert_box.appendChild(title);
       
       this.alertMessage();
       this.alertButton();
       return this.alert_box;
    }


    alertheader(close){
        const header = document.createElement("div");
        header.classList.add("form-header-middle");
        header.textContent = this.header;
        this.alert_header.appendChild(header);
        this.alert_header.appendChild(close);
        return this.alert_header;
    }



    alertclose(){
        const button = document.createElement("div");
        button.setAttribute("class", "alert_close");
        button.addEventListener("click", () => {
          this.alert_box.remove();
        })

        return button
    }

    alerttitle(){
        const context_title = document.createElement("span");
        context_title.classList.add("alert_title")
        context_title.textContent = this.title;  
        this.alert_title.appendChild(context_title)  
        return this.alert_title
    }

    alertButton(){
       
        const button = document.createElement("BUTTON");
        const text = document.createTextNode("Ok");
        button.classList.add("btn-5")
        button.addEventListener("click", () => {
            this.alert_box.remove();
        })
        button.appendChild(text)
        this.alert_button.appendChild(button)
        this.alert_row.appendChild(this.alert_button)
        this.alert_box.appendChild(this.alert_row);
    }

    alertMessage(){

        const alert_message = document.createElement("div");
        alert_message.textContent = this.message;
        alert_message.classList.add("alert_message")
        this.alert_row.appendChild(alert_message);
        this.alert_box.appendChild(this.alert_row);
    }

    update(options)
    {
        Object.entries({...options}).forEach(([key,value]) => 
        {
          this[key] = value;
        })
    }
}

