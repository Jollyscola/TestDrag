
const form_area = document.querySelector(".form-area");
const canvas = document.querySelectorAll(".canvas");
const alert_box = document.querySelector("#alert_box");
const color_heading = document.querySelector(".color_heading")
const canvas_table = document.querySelector(".canvas_table");
const canvas_info = document.querySelector(".canvas_info");
const draggable = canvas_table.querySelectorAll(".draggable")
const dragContainer =  canvas_info.querySelectorAll(".drag_conainter");
console.log(dragContainer)

class dragDrop{

}


class dragDropTable{
    constructor(){
        let draggingEle;
        let draggingColumnIndex;
        let list;
        let isDraggingStarted = false;
        this.draggingColumnIndex = draggingColumnIndex;

        this.list = list;
        this.isDraggingStarted = isDraggingStarted;
        this.draggingEle = draggingEle;
        let x = 0;
        let y = 0;
        this.x = x;
        this.y = y;
    }

    mouseDownHandler =(e) =>{
        console.log(e.target)
        this.draggingColumnIndex = [].slice.call(canvas_table.querySelectorAll('.arrow_left_right')).indexOf(e.target)

        this.x = e.clientX - e.target.offsetLeft;
        this.y = e.clientY - e.target.offsetTop;

        document.addEventListener('mousemove',this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
    }


    mouseUpHandler = () => {
        console.log(this.placeholder)
        if( this.placeholder && this.placeholder !== null){
            if(this.placeholder.parentNode){
            this.placeholder.parentNode.removeChild(this.placeholder)
         }
        }
        if(this.draggingEle)
        {
        this.draggingEle.classList.remove('dragging');
        this.draggingEle.style.removeProperty('top');
        this.draggingEle.style.removeProperty('left');
        this.draggingEle.style.removeProperty('position');

        // Get the end index
        const endColumnIndex = [].slice.call(this.list.children).indexOf(this.draggingEle);

        this.isDraggingStarted = false;
        if(this.list.parentNode)
        {
        this.list.parentNode.removeChild(this.list);
        }
        canvas_table.querySelectorAll('.rows').forEach((row) => {
            const cells = [].slice.call(row.querySelectorAll('.cell_heading, .cell'));

            if(this.draggingColumnIndex > endColumnIndex) cells[endColumnIndex].parentNode.insertBefore(cells[this.draggingColumnIndex],cells[endColumnIndex])
            else cells[endColumnIndex].parentNode.insertBefore(cells[this.draggingColumnIndex],cells[endColumnIndex].nextSibling);
            
           
               
        });

        canvas_table.style.removeProperty('visibility');

       
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        document.removeEventListener('mouseup', this.mouseUpHandler);
       
        }
    
    }


    mouseMoveHandler = (e) =>{
        if (!this.isDraggingStarted) {
            this.isDraggingStarted = true;
            this.cloneTable();
     
            this.draggingEle = [].slice.call(this.list.children)[this.draggingColumnIndex];
            this.draggingEle.classList.add('dragging');
            this.placeholder = document.createElement('div');
            this.placeholder.classList.add('placeholder');
            this.draggingEle.parentNode.insertBefore(this.placeholder, this.draggingEle.nextSibling);
            this.placeholder.style.width = `${this.draggingEle.offsetWidth}px`;
        }
            this.draggingEle.style.position = 'absolute';
            this.top = this.y - e.clientY;
            this.left = this.x - e.clientX;
      
            this.x = e.clientX;
            this.y = e.clientY;
      
            this.draggingEle.style.top = `${this.draggingEle.offsetTop - this.top}px`;
            this.draggingEle.style.left = `${this.draggingEle.offsetLeft - this.left}px`;


        
        const prevEle = this.draggingEle.previousElementSibling;
        const nextEle = this.placeholder.nextElementSibling;
        if (prevEle && this.IsOnLeft(this.draggingEle, prevEle))
        {
            this.swap(this.placeholder, this.draggingEle);
            this.swap(this.placeholder, prevEle);
            return;
        }
        if (nextEle && this.IsOnLeft(nextEle, this.draggingEle))
        {
            this.swap(nextEle, this.placeholder);
            this.swap(nextEle, this.draggingEle);
            return;
        }
    }

    swap(nodeA, nodeB){
        const parentA = nodeA.parentNode;
        const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

        nodeB.parentNode.insertBefore(nodeA, nodeB);

        parentA.insertBefore(nodeB, siblingA);
    };

    IsOnLeft(nodeA,nodeB){
        const rectA = nodeA.getBoundingClientRect();
        const rectB = nodeB.getBoundingClientRect();
        return rectA.left + rectA.width / 2 < rectB.left + rectB.width / 2;
    }
    cloneTable(){
      
        this.list = document.createElement("div");
        this.list.classList.add("clone-list");
        this.list.style.position = "absolute";
        this.list.style.top = `${0}px`
        
        canvas_table.style.visibility = 'hidden';
        canvas_table.style.position = ""

        canvas_table.parentElement.insertBefore(this.list,canvas_table.nextSibling);
        const originalCells = [].slice.call(canvas_table.querySelectorAll('.cell'));
        const originalHeaderCells = [].slice.call(canvas_table.querySelectorAll('.cell_heading'));

        originalHeaderCells.forEach((header,headerIndex) => {
            const width = Number(window.getComputedStyle(header).width);

            const item = document.createElement('div')
            item.classList.add('draggable');

            const newTable = document.createElement('div');
            newTable.setAttribute('class', 'clone-table');
            newTable.style.width = `${width}px`;
            const cell_header = header.cloneNode(true);
            let newRow = document.createElement('div')
            newRow.classList.add("rows");

            newRow.appendChild(cell_header);
            newTable.appendChild(newRow);
            
            const cells = originalCells.filter((c,idx) => {
                return (idx - headerIndex) % originalHeaderCells.length === 0;
            })

            cells.forEach((cell) => {
                const newCell = cell.cloneNode(true);
                newRow = document.createElement('div');
                newRow.classList.add("rows");

                newRow.appendChild(newCell);
                newTable.appendChild(newRow)
            })
            item.appendChild(newTable);
            this.list.appendChild(item);
        })
       
       
    }
}

const drag_Drop_table = new dragDropTable().mouseDownHandler;
canvas_table.querySelectorAll('.arrow_left_right').forEach((headerCell) => {
     headerCell.classList.add('draggable');
     headerCell.addEventListener('mousedown', drag_Drop_table);
});

const colors = {
    body: document.querySelector("body")
}

class ColorInput
{

    constructor(color){
        this.color = color;
    }

    updateAll =(event) => 
    {
        document.querySelectorAll(".heading").forEach((e) => 
        {
            switch(this.color.id)
            {
                case "heading_text": 
                    e.style.color = event.target.value;
                    localStorage.setItem("heading_text",event.target.value);
                break;
                case "heading_background":
                    e.style.backgroundColor  = event.target.value;
                    localStorage.setItem("heading_color",event.target.value);
                break;    
            }
        })
        if(this.color.id == "body_color"){
            colors.body.style.backgroundColor  = event.target.value;
            localStorage.setItem("body",event.target.value);
        }
                   
    }
    
    startup = () => {
        localStorage.clear();
        this.color.addEventListener("input", this.updateAll);
        this.color.select();
    }
}


window.addEventListener("load", new ColorInput(document.querySelector("#heading_text")).startup);
window.addEventListener("load", new ColorInput(document.querySelector("#heading_background")).startup);
window.addEventListener("load", new ColorInput(document.querySelector("#body_color")).startup);


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
              this.element.style.width = null;
              this.element.style.height = null;
          }
      })
    };
    create(){
        this.dragzone.onmousedown = this.dragMouseDown;
    }
    
};

canvas.forEach((c) => {

    const header = c.querySelector(".form-header");
     new dragElement(c, header).create();
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
        console.log(this.alert_container)
        alert_box.style.zIndex = "40";
        alert_box.style.display = "block";
        alert_box.setAttribute("id","alert_box");
        this.alert_box = alert_box;
       const rect = this.alert_box.getBoundingClientRect();
        console.log(rect.left)
        if(rect.left < 50)
        {
            console.log("rect")
            this.alert_box.style.left = `${200}px`;
     
        }
        this.alert_container.parentNode.insertBefore(this.alert_box,this.alert_container.nextSibling)
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
        
        const heading_color = localStorage.getItem('heading_color')
        const text_color = localStorage.getItem('heading_text')
        console.log(text_color,heading_color)
        this.alert_header.style.backgroundColor = heading_color;
        this.alert_header.style.color = text_color;

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


function moveable(e){
    const draggable = canvas_table.querySelectorAll(".draggable")
    draggable.forEach(drag => {
        if (e.target.checked == true){
            drag.style.visibility = "visible";
        } else {
            drag.style.visibility = "hidden";
        }
    })
  
}