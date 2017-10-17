
const uuidv1 = require('uuid/v1');

class connect{

    constructor(start,end){
        this.uuid =uuidv1();
        this.type="connect";
        this.start =start;
        this.end =end;
        this.start.connect = this;
        this.end.connect =this;

    }

    release(){
        this.start.connect = null;
        this.end.connect =null;
        
    }

 

}
 

export default connect;