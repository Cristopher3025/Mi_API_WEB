import { useState } from 'react';
import UsuariosList from './components/UsuariosList';
import UsuarioForm from './components/UsuarioForm';

function App() {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [recargarLista, setRecargarLista] = useState(0);

  function handleEdit(usuario) {
    setUsuarioSeleccionado(usuario);
  }

  function handleSuccess() {
    setUsuarioSeleccionado(null);
    setRecargarLista((prev) => prev + 1);
  }

  function handleCancel() {
    setUsuarioSeleccionado(null);
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Gestión de usuarios (React + Express)</h1>
      <UsuarioForm
        usuarioSeleccionado={usuarioSeleccionado}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
      {/* Usamos recargarLista como key para forzar recarga cuando cambie */}
      <UsuariosList
        key={recargarLista}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;