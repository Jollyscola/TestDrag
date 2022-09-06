






export class alert implements EventListenerObject{

    private header:string = "";
    private title:string = "";
    private message:string = "";


    private options:alert
    private alert_button:HTMLElement;
    private alert_header:HTMLElement;
    private alert_title:HTMLElement;
    private alert_row:HTMLElement;
    private alert_box: HTMLDivElement;
    private alert_container:HTMLDivElement;



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
        this.alert_button = alert_button;
        this.alert_header = alert_header;
        this.alert_title = alert_title;
        this.alert_row = alert_row
        alert_box.style.zIndex = "40";
        alert_box.style.display = "block";
        alert_box.setAttribute("id","alert_box");
        this.alert_box = alert_box;
        if(alert_container)
        {
                alert_container.parentNode.insertBefore(this.alert_box,this.alert_container.nextSibling)
                this.alert_container = alert_container;
        }
     

        this.update({...options});
    }
    handleEvent(object: Event): void {
        throw new Error("Method not implemented.");
    }


    set Header(value : any){
        this.header = value;
    }

    set Title(value: any){
        this.title = value;
    }
    set Message(value: any){
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


    alertheader(close: Node): HTMLElement{
        const header = document.createElement("div");
        header.classList.add("form-header-middle");
        header.textContent = this.header;
        this.alert_header.appendChild(header);
        this.alert_header.appendChild(close);
        return this.alert_header;
    }



    alertclose() : HTMLElement{
        const button = document.createElement("div");
        button.setAttribute("class", "alert_close");
        button.addEventListener("click", () => {
          this.alert_box.remove();
        })

        return button
    }

    alerttitle() : HTMLElement{
        const context_title = document.createElement("span");
        context_title.classList.add("alert_title")
        context_title.textContent = this.title;  
        this.alert_title.appendChild(context_title)  
        return this.alert_title
    }

    alertButton() : void{
       
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

    alertMessage() : void{

        const alert_message = document.createElement("div");
        alert_message.textContent = this.message;
        alert_message.classList.add("alert_message")
        this.alert_row.appendChild(alert_message);
        this.alert_box.appendChild(this.alert_row);
    }

    update(options: any)
    {
        Object.entries({...options}).forEach(([key,value]) => 
        {
          this[key as keyof alert] = value;
        })
    }
}
