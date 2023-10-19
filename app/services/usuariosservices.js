import {database} from "./services/usuariosServices.js";
import { ref, onvalue } from "https://www.gstatic.com/firebasejs/7.15.0/firebase.js"

class UsuariosServices{

    constructor() {
this.database = database;
this.usuarioRef=  ref(this.database,"usuarios");//ref me dice la tabla que quiero de la BD
//console.log(database.val);
}
getUsuarios(){
        const promise=new Promise((resolve, reject)=>{
          onvalue(this.usuarioRef,(snapshot) =>{
            const data=snapshot.val();
            resolve(data);
           },{
onlyOnce:true
        });
    });
    return promise;
  }  
}

export default UsuariosServices;