
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
