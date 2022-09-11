











export class dragDropTable implements EventListenerObject
{
    
    draggingEle:HTMLElement = null;
    draggingColumnIndex:number = null;
    list: HTMLElement = null;
    isDraggingStarted:boolean = false;
    x:number = 0;
    y:number = 0;
    top:number = 0;
    left:number = 0;
    placeholder:HTMLElement = null;
    options:any = null;
    tableElem:HTMLTableElement = null;
    rows: HTMLTableRowElement = null;
    
    constructor(tableElem: HTMLTableElement)
    {
        this.tableElem = tableElem;
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        
    }
    handleEvent(object: Event): void 
    {   

       
        if(object.type === "mousemove")
        {
            
            this.mouseMoveHandler();
            this.top = this.y - object["clientY"] as number;
            this.left = this.x - object["clientX"] as number;
            this.draggingEle.style.position = 'absolute' as string;
            this.x = object["clientX"] as number;
            this.y = object["clientY"] as number;        
            this.draggingEle.style.top = `${this.draggingEle.offsetTop - this.top}px` as string;
            this.draggingEle.style.left = `${this.draggingEle.offsetLeft - this.left}px` as string;
          
        } else if(object.type == "mouseup")
        {   
             this.mouseUpHandler()
    
        }
    }

   public mouseDownHandler(object: Event):void
   {
        this.draggingColumnIndex = [].slice.call(this.tableElem.querySelectorAll(".arrow_left_right")).indexOf(object.target) as number;
        this.x =<number> object["clientX"] - object.target["offsetLeft"];
        this.y = <number> object["clientY"] - object.target["offsetTop"];
       
        document.addEventListener('mousemove',this);
        document.addEventListener('mouseup', this);
    }


   private mouseUpHandler() : void
   {
        if( this.placeholder && this.placeholder !== null){
            if(this.placeholder.parentNode){
            this.placeholder.parentNode.removeChild(this.placeholder) as HTMLElement
         }
        }
        if(this.draggingEle)
        {
        this.draggingEle.classList.remove('dragging');
        this.draggingEle.style.removeProperty('top');
        this.draggingEle.style.removeProperty('left');
        this.draggingEle.style.removeProperty('position');

        const endColumnIndex:number = [].slice.call(this.list.children).indexOf(this.draggingEle);

        this.isDraggingStarted = false;
        if(this.list.parentNode)
        {
        this.list.parentNode.removeChild(this.list);
        }

        this.tableElem.querySelectorAll(".rows").forEach((row) => {
            const cells:Array<HTMLElement> = [].slice.call(row.querySelectorAll('.cell_heading, .cell'));

            if(this.draggingColumnIndex > endColumnIndex) cells[endColumnIndex].parentNode.insertBefore(cells[this.draggingColumnIndex],cells[endColumnIndex])
            else cells[endColumnIndex].parentNode.insertBefore(cells[this.draggingColumnIndex],cells[endColumnIndex].nextSibling);
            
           
               
        });

        this.tableElem.style.removeProperty('visibility');
        document.removeEventListener('mousemove', this);
        document.removeEventListener('mouseup', this);
       
        }
    
    }

   private mouseMoveHandler() : void
   {

        if (!this.isDraggingStarted) 
        {
            this.isDraggingStarted = true;

            this.cloneTable();
            this.draggingEle = [].slice.call(this.list.children)[this.draggingColumnIndex];
           
            this.draggingEle.classList.add('dragging');
            this.placeholder = document.createElement('div');
            this.placeholder.classList.add('placeholder');
            this.draggingEle.parentNode.insertBefore(this.placeholder, this.draggingEle.nextSibling);
            this.placeholder.style.width = `${this.draggingEle.offsetWidth}px`;
        }
         
        const prevEle:Element = this.draggingEle.previousElementSibling;
        const nextEle:Element = this.placeholder.nextElementSibling;
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

    private swap(nodeA: Node, nodeB: Node) : void
    {
        const parentA:Node = nodeA.parentNode;
        const siblingA:Node = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

        nodeB.parentNode.insertBefore(nodeA, nodeB);

        parentA.insertBefore(nodeB, siblingA);
    };

    private IsOnLeft(nodeA: Element  ,nodeB : Element) : boolean
    {
        const rectA = nodeA.getBoundingClientRect();
        const rectB = nodeB.getBoundingClientRect();
        return rectA.left + rectA.width / 2 < rectB.left + rectB.width / 2;
    }

    private cloneTable() : void
    {
        this.list = document.createElement("div");
        this.list.classList.add("clone-list");
        this.list.style.position = "absolute";
        this.list.style.top = `${0}px`
        
        this.tableElem.style.visibility = 'hidden';
        this.tableElem.style.position = "";

        this.tableElem.parentElement.insertBefore(this.list,this.tableElem.nextSibling);
        const originalCells:Array<HTMLElement> = [].slice.call(this.tableElem.querySelectorAll('.cell'));
        const originalHeaderCells:Array<HTMLElement> = [].slice.call(this.tableElem.querySelectorAll('.cell_heading'));

        originalHeaderCells.forEach((header,headerIndex) => {
            const width:number = Number(window.getComputedStyle(header).width) ;

            const item:HTMLElement = document.createElement('div')
            item.classList.add('draggable');

            const newTable:HTMLElement = document.createElement('div');
            newTable.setAttribute('class', 'clone-table');
            newTable.style.width = `${width}px`;

            const cell_header:Node = header.cloneNode(true);

            let newRow:HTMLElement = document.createElement('div')
            newRow.classList.add("rows");

            newRow.appendChild(cell_header);
            newTable.appendChild(newRow);
            
            const cells = originalCells.filter((c,idx) => {
                return (idx - headerIndex) % originalHeaderCells.length === 0;
            })
            console.log(cells)
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