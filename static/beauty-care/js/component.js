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