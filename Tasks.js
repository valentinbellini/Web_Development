import React, {Component} from 'react';
import tasks from '../sample/tasks.json';


const mapeo = () =>{
	return(
		tasks.map(e => 
		<div key={e.id} className="tasks-box"> 
			ID : {e.id} <br/>
			Tarea: {e.title} <br/>
			Descripción: {e.description} <br/>
			<input type="checkbox"/>
			<button className="Buttonn">  Guardar  </button>
		</div> )
	)
}



const Tasks = () =>{

	const Activate = () => alert('Hola')

	return (
		<div className="Tasks">
			<h3> This is the Tasks.js component </h3>
			<h3> To copy it you have to import it into de App.js file and paste </h3>
			<h2>import './CSS/Tasks.css';</h2> 
			<h3> at the top of the code </h3>
			{mapeo()}
			<button className="simplebutton" onClick={Activate}> Boton </button>
		</div>		
	)
}


export default Tasks;