
class PopUp extends Component{

 constructor(gifts){
  super(popUpTemplate,gifts);
 }

btnClickEvent(){
const {wrapper}=this;
wrapper.remove();
}

 render(){
  const {message,level,title}=this.gifts;
  const {titleElem,btn,messageElem}=this.refs;
  btn.classList.add(level);
  titleElem.textContent=title;
  messageElem.textContent=message;
  btn.onclick=this.btnClickEvent.bind(this);
 }

}