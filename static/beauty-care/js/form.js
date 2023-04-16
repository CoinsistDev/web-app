

class Form extends Component  {
 constructor(gifts){
 
  super(formTemplate,gifts);


 }
 async sendBtnClickEvent(){
  console.log('clicked')
  const {sendBtn}=this.refs;
  const {insertedKeysSize,requiredKeysSize}=this;

  if(insertedKeysSize !==requiredKeysSize){
    setTimeout(()=>sendBtn.classList.remove('err'),2000);
   return sendBtn.classList.add('err');
  }
  const result=await sendForm(this.json);
  let popup;
  if(result===Error)popup=new PopUp(new PopUpField('error','תקלת שרת','תקלה בשרת נסה שוב מאוחר יותר'));
  else if(result.success)popup=new PopUp(new PopUpField('info','הפעולה צלחה',result.message));
 else popup=new PopUp(new PopUpField('error','הפעולה נכשלה',result.message));
 document.body.insertBefore(popup.wrapper,document.body.childNodes[0]);
 }

 sendBtnHoverEvent(){
  const {insertedKeysSize,requiredKeysSize}=this;
  const {sendBtn}=this.refs;
  if(insertedKeysSize === requiredKeysSize)
  return sendBtn.classList.remove('err');
  sendBtn.classList.add('err');
 }

 sendBtnMouseLeaveEvent(){
  const {sendBtn}=this.refs;
 sendBtn.classList.remove('err');
 }

 insertKeyEvent({detail:{key,value}}){
  const {json}=this;
  if(!json.hasOwnProperty(key))this.insertedKeysSize++;
  json[key]=value;
 }

 removeKeyEvent({detail:{key}}){
  const {json}=this;
 
  if(!json.hasOwnProperty(key))return;
  this.insertedKeysSize--;
 delete json[key];
 }

 keyNotRequiredEvent({detail}){
 const {key}=detail;
 const {json}=this;
 const {gifts:{formFields}}=this;

 const formField=formFields.find(formfield=>formfield.key===key);
 if(!formField.isRequired)return;
 formField.isRequired=false;
 this.requiredKeysSize--;
 if(json.hasOwnProperty(key))this.insertedKeysSize--;

 }
 keyRequiredEvent({detail}){
  const {key}=detail;
  const {gifts:{formFields},json}=this;
  const formField=formFields.find(formfield=>formfield.key===key);
  if(formField.isRequired)return;
  formField.isRequired=true;
  this.requiredKeysSize++;
  if(json.hasOwnProperty(key))this.insertedKeysSize++;
 }


 render(){
  const {gifts,wrapper,refs}=this;
  const {formFields}=gifts;

  this.json={ticketId};
  this.childCmps={};
  this.insertedKeysSize=0;
  this.requiredKeysSize=formFields.length;
  
  

  const {body,sendBtnWrap,sendBtn}=refs;

  document.addEventListener('insertKey',this.insertKeyEvent.bind(this));
  document.addEventListener('removeKey',this.removeKeyEvent.bind(this));
  document.addEventListener('keyNotRequired',this.keyNotRequiredEvent.bind(this));
  document.addEventListener('keyRequired',this.keyRequiredEvent.bind(this));

  for(let i=0;i<formFields.length;++i){
   const formField=formFields[i];
   let cmp;
   if(formField instanceof InputField)cmp=new Input(formField);
   else if(formField instanceof SelectField)cmp=new Select(formField);
   else if(formField instanceof ToggleSwitchField)cmp=new ToggleSwitch(formField);
   body.insertBefore(cmp.wrapper,sendBtnWrap);
   this.childCmps[formField.key]=cmp;
  }
  sendBtn.onclick=this.sendBtnClickEvent.bind(this);
  sendBtn.onmouseover=this.sendBtnHoverEvent.bind(this)
  sendBtn.onmouseleave=this.sendBtnMouseLeaveEvent.bind(this)

 }
}