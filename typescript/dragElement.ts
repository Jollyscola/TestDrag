



export class dragElement {

    left: number = 0;
    top: number = 0;
    x: number = 0;
    y: number = 0;
    element: HTMLElement = null;
    dragzone: HTMLElement = null;



    constructor (element, dragzone){
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