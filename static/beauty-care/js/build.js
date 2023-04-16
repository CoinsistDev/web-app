
function SelectField(title,key,firstOption,isFirstInOptions,options,isRequired=true){
    this.title=title;
    this.key=key;
    this.options=options;
    this.firstOption=firstOption;
    this.isFirstInOptions=isFirstInOptions;

    this.isRequired=isRequired;
    }
    
    function OptionField(title,key,isRequired=true){
        this.title=title;
        this.key=key || title;
        this.isRequired=isRequired;
    }
    
    function StaticField(title,key,value,isRequired=true){
        this.title=title;
        this.value=value;
        this.key=key;
        this.isRequired=isRequired;
    }

    function ToggleSwitchField(title,key,isRequired=true){
        this.title=title;
        this.key=key;
        this.isRequired=isRequired;
    }
    
    function InputField(title,placeholder,key,rowSize,validation,isRequired=true){
        this.title=title;
        this.placeholder=placeholder;
       
        this.rowSize=rowSize;
        this.key=key;
        //this.orientation=orientation;
        this.validation=validation;
        this.isRequired=isRequired;
    }
    function PopUpField(level,title,message){
        this.level=level;
        this.title=title;
        this.message=message;
    }

    function FileUploaderField(key,max,min,allowedExtensions,allowedTypes,sizeLimit){
        this.max=max;
        this.min=min;
        this.key=key;
        this.allowedExtensions=allowedExtensions;
        this.allowedTypes=allowedTypes;
        this.sizeLimit=sizeLimit;
    }
const causesOptions=[
new OptionField('שרות לקוחות – סניפים','שרות לקוחות – סניפים'),
new OptionField('ברור מלאי','ברור מלאי'),
new OptionField('ביטול עסקה בסניף','ביטול עסקה בסניף'),
new OptionField('לקוח עשה הזמנה  - אתר אינטרנט','לקוח עשה הזמנה  - אתר אינטרנט'),
new OptionField('מחפש עבודה','מחפש עבודה'),
new OptionField('תלונה','תלונה'),
new OptionField('ביטול הזמנה','ביטול הזמנה'),
new OptionField('נזק גוף או רכוש','נזק גוף או רכוש'),
new OptionField('פניית עובד פעיל','פניית עובד פעיל'),
new OptionField('שרות לקוחות מועדון ביוטיקארד','שרות לקוחות מועדון ביוטיקארד'),
new OptionField('פנייה סיטונאית או זכיינית','פנייה סיטונאית או זכיינית'),
new OptionField('מבקשים לדבר עם ההנהלה','מבקשים לדבר עם ההנהלה'),
new OptionField('פניית עיתונאי/בלוגר/שת"פ יח"צ','פניית עיתונאי/בלוגר/שת"פ יח"צ'),
new OptionField('ספקים שמחפשים את המשרדים','ספקים שמחפשים את המשרדים'),
new OptionField('בקשת תרומה','בקשת תרומה'),
];
const branchesOptions=[

new OptionField('אשדוד - סניף הסיטי','אשדוד - סניף הסיטי+01'),
new OptionField('ירושלים - קניון ירושלים','ירושלים - קניון ירושלים+02'),
new OptionField('נתניה - קניון השרון','נתניה - קניון השרון+03'),
new OptionField('באר שבע - ביג','באר שבע - ביג+04'),
new OptionField('פתח תקווה - קניון אבנת','פתח תקווה - קניון אבנת+05'),
new OptionField('חיפה - קניון חיפה','חיפה - קניון חיפה+06'),
new OptionField('ראשון לציון - ביוטיקייר','ראשון לציון - ביוטיקייר+07'),
new OptionField('אשקלון','אשקלון+08'),
new OptionField('קריית אתא - ביג קריות','קריית אתא - ביג קריות+09'),
new OptionField('רמלוד','רמלוד+10'),
new OptionField('רחובות','רחובות+11'),
new OptionField('נתניה - עיר ימים','נתניה - עיר ימים+12'),
new OptionField('בית שמש','בית שמש+13'),
new OptionField('עפולה','עפולה+14'),
new OptionField('טבריה','טבריה+15'),
new OptionField('חדרה','חדרה+16'),
new OptionField('קרית שמונה','קרית שמונה+17'),
new OptionField('אשדוד - Big Fashion','אשדוד - Big Fashion+18'),
new OptionField('קרית גת','קרית גת+19'),
new OptionField('חיפה - cinemall','חיפה - cinemall+20'),
new OptionField('נתיבות','נתיבות+21'),
new OptionField('נוף הגליל','נוף הגליל+22'),
new OptionField('ירושלים - לב תלפיות','ירושלים - לב תלפיות+23'),
new OptionField('כרמיאל - מיי סנטר','כרמיאל - מיי סנטר+24'),
new OptionField('בת ים - ביג פאשן בת ים','בת ים - ביג פאשן בת ים+25'),
new OptionField('חולון - מבנה','חולון - מבנה+26'),
new OptionField('בהמתנה','בהמתנה+27'),
new OptionField('אתר אינטרנט','אתר אינטרנט+950'),
new OptionField('מרכז הרשת','מרכז הרשת+900'),
new OptionField('ללא סניף','ללא סניף+000'),
]

const emit=(eventName,detail)=>{
const e=new CustomEvent(eventName,{detail} );
document.dispatchEvent(e);
}

// s

const isEnglishString=(input)=>{
 if(!input)return false;
for(let i=0;i<input.length;++i){
 const c=input[i].toLowerCase();
 if((c>='a' && c<='z') || c===' ')continue;
 return false;
}
return true;

}

const isHebrewString=(input)=>{
 if(!input)return false;
 for(let i=0;i<input.length;++i){
  const c=input[i].toLowerCase();
  if((c>='א' && c<='ת') || c===' ')continue;
  return false;
 }
 return true;
}

const isHebrewStringMultiLine=(input)=>{
    if(!input)return false;
    for(let i=0;i<input.length;++i){
     const c=input[i].toLowerCase();
     if((c>='א' && c<='ת') || c===' ' || c==='\n' || c==='.' || c===',' || c==='!')continue;
     return false;
    }
    return true;
   }

const israeliPhoneNumberValidation=(input)=>{
 
if(!input ||(!input.startsWith('972') && !input.startsWith('05')))return false;
if(input.startsWith('972') && input.length!==12)return false;
if(input.startsWith('05') && input.length!==10)return false;
for(let i=0;i<input.length;++i){
 let c=input[i];
 if(c>='0' && c<='9')continue;
 return false;
}
return true;
}


const notEmpty=(input)=>{
return input.length !==0;
}

const isFlyerClubNumber=(input)=>{
 if(!input)return true;
if(input.length !==7 && input.length !==8)return false;
for(let i=0;i<input.length;++i){
 let c=input[i];
 if(c>='0' && c<='9')continue;
 return false;
}
return true;


}




const clone=(template,refs)=>{
 refs=refs || {};
 const wrapper=template.cloneNode(true);
 const stack=[wrapper];
 while(stack.length){
  const elem=stack.pop();
  const {dataset,children}=elem;
  const {ref}=dataset;
  if(ref)refs[ref]=elem;
  delete dataset.ref;
  for(let i=0;i<children.length;++i)stack.push(children[i]);
 }
 return [wrapper,refs];
}
const formSendingUrl=location.href.substring(0,location.href.indexOf('/files'))+'/api/tickets/form'

const sendForm=async (json)=>{
 try{
 json=JSON.stringify(json);

const res=await fetch(formSendingUrl,{
 headers:{'Content-Type':'application/json'},
 method:'POST',
 body:json
});
if(res.status>=400)return Error;
const result=await res.json();
const {error}=result;
if(error)return Error;
return result;
 }catch(e){
  console.log(`FETCH ERROR for function sendForm because "${e.message}"`)
  return Error;
 }

}
let templates=document.body.querySelector('template');
let userCountry;
templates.remove();

const urlSearch=new URLSearchParams(location.search);
const ticketId=urlSearch.get('ticketId');

templates=templates.content.children;





const [formTemplate,inputTemplate,popUpTemplate,selectTemplate,selectItemTemplate]=templates;

const testOptions=
[
new OptionField('אחת','1'),
new OptionField('שתיים','2'),
];

const emptyOption=new OptionField('','');

const allFormFields=
[
// new InputField('באיזה סניף מדובר','סניף',"branch",1,isHebrewString),
new InputField("שם הלקוח","שם פרטי","name",1,isHebrewString),
new SelectField('סניף','branch',emptyOption,false,branchesOptions),
new InputField("מספר טלפון","מספר טלפון","phoneNumber",1,israeliPhoneNumberValidation),
new SelectField('במה אפשר לעזור','cause',emptyOption,false,causesOptions),
new InputField("בקשת הלקוח","בקשת הלקוח","customerRequest",4,isHebrewStringMultiLine),
new InputField("הערת נציג",null,"agentNote",4,isHebrewStringMultiLine)
];
class Component {

 constructor(template,gifts){
  const refs={__proto__:null};
  const wrapper=clone(template,refs)[0];
  this.gifts=gifts;
  this.wrapper=wrapper;
  this.refs=refs;
  this.render();
 }
 render(){

 }
}




class Select extends Component{
 constructor(selectOptions){
 
  super(selectTemplate,selectOptions);
 
  this.selectedValue=0;
 }
//localeCompare('frR',undefined,{sensitivity:'accent'})

selectItemClickEvent(optionField){
const {input,list,inputWrap}=this.refs;
const {options,key}=this.gifts;
inputWrap.classList.remove('active','err');
input.value=optionField.title;
list.setAttribute('hidden','');

emit('insertKey',{key,value:optionField.key});

}

remderOption(option){
 const {list}=this.refs;  
const [selectItem]=clone(selectItemTemplate);
selectItem.textContent=option.title;
list.appendChild(selectItem);
selectItem.onclick=this.selectItemClickEvent.bind(this,option);
     
     
}

arrowsClickEvent(){

const {inputWrap,list,input}=this.refs;
const {value}=input;
const {options}=this.gifts;
const isActive=inputWrap.classList.contains('active');
if(isActive)list.setAttribute('hidden','');
else list.removeAttribute('hidden');

if(isActive)return inputWrap.classList.remove('active');

list.innerHTML='';
if(!value){
   inputWrap.classList.add('active');
   return options.forEach(this.remderOption.bind(this));
}

const filteredOptions=options.filter(({title})=>title.toLowerCase().startsWith(value.toLowerCase()))

if(filteredOptions.length===0){
   list.setAttribute('hidden','');
   return inputWrap.classList.remove('active');
}
list.removeAttribute('hidden');
inputWrap.classList.add('active');
filteredOptions.forEach(this.remderOption.bind(this));


}

 inputEvent(){
  const {options,key}=this.gifts;
  const {input,list,inputWrap}=this.refs;
  list.innerHTML='';
  let {value}=input;

  inputWrap.classList.remove('active');
  const nextOption=options.find(op=>op.title===value);
   if(!nextOption){
      emit('removeKey',{key});
    inputWrap.classList.add('err');
   }
   else {
      inputWrap.classList.remove('err');
      emit('insertKey',{key,value});
   }

  if(!value || nextOption) inputWrap.classList.remove('err');
  if(nextOption)return list.setAttribute('hidden','');

  value=value.toLowerCase();

 const filteredOptions= options.filter(({title})=>!value || title.toLowerCase().startsWith(value));
 if(filteredOptions.length===0)return list.setAttribute('hidden','');

 inputWrap.classList.add('active');
 list.removeAttribute('hidden');
 filteredOptions.forEach(this.remderOption.bind(this))

 

 }

 render(){
  
  const {titleElem,input,arrowsIcon}=this.refs;
  console.log(this)
  const {options,title,key,firstOption,isFirstInOptions}=this.gifts;
 
  if(isFirstInOptions)emit('insertKey',{key,value:firstOption.key});

  input.value=firstOption.title;
  titleElem.textContent=title;
  arrowsIcon.onclick=this.arrowsClickEvent.bind(this);

   input.oninput=this.inputEvent.bind(this);

  

}
}

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
class Input extends Component{
 constructor(gifts){
  super(inputTemplate,gifts);
  
 }

 inputEvent(){
  const {input}=this.refs;
  const {validation,key}=this.gifts;
  const {value}=input;

  const isValid=validation(value);

  if(!value){
   console.log(isValid);
   input.classList.remove('err');
   if(isValid)emit('insertKey',{key,value});
   else  emit('removeKey',{key});
   return input.classList.remove('rtl');
  }
  
  for(let i=0;i<value.length;++i){
   const c=value[i].toLowerCase();
   
   const isHebrew=c>='א' && c<='ת';
   const isEnglish=c>='a' && c<='z';
   if(isHebrew)input.classList.add('rtl');
   else if(isEnglish)input.classList.remove('rtl');
   else continue;
   break;
  }

  if(isValid){
   input.classList.remove('err');
   return emit('insertKey',{key,value});
  }
  input.classList.add('err');
   emit('removeKey',{key});
 }

 
 render(){
  const {titleElem,input}=this.refs;
  const {title,rowSize,placeholder}=this.gifts;
  //if(rowSize===1)input.style.height='26px'
 if(placeholder) input.setAttribute('placeholder',placeholder);
  titleElem.textContent=title;
  
  input.setAttribute('rows',rowSize);

  input.oninput=this.inputEvent.bind(this);
  
 }
}


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

let formCmp;
 
const remveKeyIfFalse=(key,value,keyToRemove)=>{
/// delay in one miliseconds so the form can render the ui first before we hiding the component 

setTimeout(()=>{
 console.log(formCmp)
 const componnent= formCmp.childCmps[keyToRemove];
if(!value){
 componnent.wrapper.setAttribute('hidden','');
 return emit('keyNotRequired',{key:keyToRemove});
}
componnent.wrapper.removeAttribute('hidden');
emit('keyRequired',{key:keyToRemove})
},1);

}


// document.addEventListener('insertKey', ({detail})=>{
//  const {key,value}=detail;
//  if(key==='country')return  (userCountry=value);
//  if(key==='phoneNumber')return };
//  // get the key to hide and remove from the form  requirment by removing "has" and converting the character at index 3 to lower cas 
//  //for example hasTicketNumber convert to ticketNumber
// if(key.startsWith('has'))return remveKeyIfFalse(key,value,key[3].toLowerCase()+key.substring(4));

// })

 formCmp=new Form({formFields:allFormFields});

// const updateHeight=()=>{
// document.body.style.height=screen.height+'px';
// }
// updateHeight()

// window.addEventListener('resize',updateHeight);


document.body.appendChild(formCmp.wrapper);

