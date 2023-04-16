
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