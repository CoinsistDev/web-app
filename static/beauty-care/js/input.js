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