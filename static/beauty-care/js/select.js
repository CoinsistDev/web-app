



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