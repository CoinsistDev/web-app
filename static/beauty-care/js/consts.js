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
new InputField("בקשת הלקוח","בקשת הלקוח","customerRequest",4,isHebrewString),
new InputField("הערת נציג",null,"agentNote",4,isHebrewString)
];