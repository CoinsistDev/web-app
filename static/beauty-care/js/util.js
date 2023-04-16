
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