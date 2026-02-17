import React, { useEffect, useState } from 'react';

function ListaMiembros() {
  const [miembros, setMiembros] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:7000/miembros/api/lista/') // La URL de tu Django
      .then(response => response.json())
      .then(data => setMiembros(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Miembros desde el Back</h2>
      <ul>
        {miembros.map((m, index) => (
          <li key={index}>{m.nombre} {m.apellido} - {m.tarea}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaMiembros;