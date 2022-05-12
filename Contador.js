import React, {useState, Fragment} from 'react';

const Contador = () =>{

	const [numero,setNumero] = useState(0);

	const aumentar = () =>{
		setNumero(numero + 1);
	}
	const restar = () =>{
		setNumero(numero -1);
	}
	const resetear = () =>{
		setNumero(numero == 0);
	}

	return(
		<React.Fragment>
		
			<h3> Contador: {numero}</h3>
			<button onClick={aumentar}> Aumentar </button>
			<button onClick={restar}> Restar </button>
			<button onClick={resetear}> Resetear </button>

		</React.Fragment>
	);
}


export default Contador;