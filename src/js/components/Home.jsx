import React from "react";

// Importamos el nuevo componente TodoList
// Asegúrate de que la ruta coincida con tu carpeta (components con "s")
import TodoList from "./TodoList.jsx";

const Home = () => {
	return (
		<div className="text-center">
			{/* Aquí solo llamamos al componente principal del proyecto */}
			<TodoList />
			
			<footer className="mt-5 text-muted">
				<p>Hecho por Frank Padilla estudiante de 4geeks Academy</p>
			</footer>
		</div>
	);
};

export default Home;