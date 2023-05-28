

import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

const ShowPersons = () => {
  //const url ='https://localhost:44337/api/Persons';
  
  const [title,setTitle]= useState([]);
  const [persons,setPersons]= useState([]);
  const [personId,setPersonId]= useState('');
  const [lastName,setLastName]= useState('');
  const [firstName,setFirstName]= useState('');
  const [address,setAddress]= useState('');
  const [email,setEmail]= useState('');
  const [status,setStatusl]= useState('');
  const [createdBy,setCreatedBy]= useState('');

  useEffect(()=>{
     getPersons();
   },[]);

 
   const getPersons =async()=>{
       const respuesta= await axios.get('/Persons');
       setPersons(respuesta.data);
       console.log(respuesta);
   }

   const openModal=(op,personId,lastName,firstName,email,address)=>{
        setPersonId('');
        setLastName('');
        setFirstName('');
        setEmail('');
        setAddress('');
        if(op== 1){
          setTitle('Registrar Producto');
        }
        else if(op==2){
          setPersonId(personId);
          setLastName(lastName);
          setFirstName(firstName);
          setEmail(email);
          setAddress(address);
          setTitle('Actualizar Producto');
        }
        window.setTimeout(function(){
          document.getElementById('lastName').focus();
        
        },500);
   }
   const validar=()=>{
    var parametros;
    var metodo;
        if(lastName.trim()===''){
            show_alerta('Escribe el apellido','warning');
        }
        else if(firstName.trim()===''){
           show_alerta('Escribe el Nombre','warning');
        }
        parametros={lastName:lastName.trim(),firstName:firstName.trim(),email:email,address:address,status:1,createdBy:2}
         metodo='POST';
         enviarSolicitud(metodo,parametros);
  }

     

   const enviarSolicitud= async(metodo,parametros)=>{
    await axios({method:metodo,url:'/Persons', data:parametros}).then(function(respuesta){
         
        show_alerta('Persona Agregada con exito');
        document.getElementById('btncerrar').click();
        getPersons();
      
    })
    .catch(function(error){
      show_alerta('Error');
    });
   }

   const enviarSolicitudDelete= async(metodo,id)=>{
    await axios({method:'DELETE',url:'/Persons/'+id}).then(function(respuesta){
    
        show_alerta('Persona Eliminada con exito');
        document.getElementById('btncerrar').click();
        getPersons();
      
    })
    .catch(function(error){
      show_alerta('Error');
    });
   }

   const deletePerson=(id)=>{
    var parametros;
      const MySwal= withReactContent(Swal);
      MySwal.fire({
        title:'Seguro de Eliminar esta persona?',
        icon:'question',text:'No se podra dar marcha atras',
        showCancelButton:true,confirmButtonText:'si, eliminar', cancelButtonText:'cancelar'
      }).then((result)=>{
        if(result.isConfirmed){
          setPersonId(id);
        
          enviarSolicitudDelete('DELETE',id);
          getPersons();
        }
      else{
        show_alerta('La persona no fue eliminada');
      }   

   });
  }

  return (
        <div className='App'>
               <div className='container-fluid'>
                   <div className='row mt-3'>
                      <div className='col-md-4 offset-md-4'>
                         <div className='d-grid mx-auto'>
                            <button onClick={()=>openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalPersons'>
                                 <i className='fa-solid fa-circle-plus'></i> Añadir            
                           </button>
                         </div>
                      </div>
                    </div>
                      <div className='row mt-3'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Last Name</th>
                                        <th>First Name</th>
                                        <th>Addres</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>
                                   {persons.map((persons,PersonId) =>(  
                                    <tr key={persons.personId}>     
                                       <td>{persons.personId}</td>
                                       <td>{persons.lastName}</td>
                                        <td>{persons.firstName}</td>
                                        <td>{persons.address}</td>
                                        <td>{persons.email}</td>
                                     
                                       <td>
                                            <button data-bs-toggle='modal' data-bs-target='#modalPersons' onClick={()=>openModal(2,persons.personId,persons.lastName,persons.firstName,persons.email,persons.address)} className='btn btn-warning'>
                                                <i className='fa-solid fa-edit'></i>
                                            </button>
                                            <button onClick={()=>deletePerson(persons.personId)} className='btn btn danger'>
                                                <i className='fa-solid fa-trash'></i>
                                            </button>
                                       </td>
                                       </tr>         
                                    ))
                                   }
                                </tbody>
                            </table>

                        </div>

                      </div>
         <div className='modal fade' aria-hidden='true' role="dialog"  id='modalPersons'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                  <div className='modal-header'>
                      <label className='h5'>{title}</label>
                      <button id='btncerrar' type='button' className='btn-close' data-bs-dismiss='modal' arial-label='close'></button>
                   </div>
              
               <div className='modal-body'>
                     <input type='hidden' id='personId'></input>
               <div className='input-group mb-3'>
                    <span className='input-group-text'><i className='fa-solid fa-person'></i></span>  
                    <input type='text' id='lastName' className='form-control' placeholder='Last Name' value={lastName} onChange={(e)=> setLastName(e.target.value)}></input>
               </div>    
               <div className='input-group mb-3'>
                   <span className='input-group-text'><i className='fa-solid fa-person'></i></span>  
                   <input type='text' id='firstName' className='form-control' placeholder='First Name' value={firstName} onChange={(e)=> setFirstName(e.target.value)}></input>
               </div>      
               <div className='input-group mb-3'>
                   <span className='input-group-text'><i className='fa-solid fa-address'></i></span>  
                   <input type='text' id='address' className='form-control' placeholder='Address' value={address} onChange={(e)=> setAddress(e.target.value)}></input>
              </div>    
              <div className='input-group mb-3'>
                  <span className='input-group-text'><i className='fa-solid fa'></i></span>  
                  <input type='text' id='email' className='form-control' placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}></input>
              </div>
              <div className='d-grid col-6 mx-auto'>
                  <button onClick={()=>validar()} className='btn btn-success'>
                      <i className='fa-solid fa-floppy-disk'></i>
                  </button>
              </div>                                                                                                                                                
              </div>
              </div>
            </div>

         </div>
         </div>
         </div>
    )
  }
  export default ShowPersons
