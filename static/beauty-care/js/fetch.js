const formSendingUrl = 'https://glassix.consist.co.il/beauty-care-app/api/tickets/form/api/tickets/form'

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