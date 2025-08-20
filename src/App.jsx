import { useState } from 'react'
import './App.css'

function App() {

  // Stati per gestire i campi del form
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sector, setSector] = useState('');
  const [exp, setExp] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');

  // Funzione per gestire l'invio del form
  const submitForm = (e) => {
    e.preventDefault();

    // Validazione campi compilati
    if (
      !name.trim() ||
      !username.trim() ||
      !password.trim() ||
      !sector ||
      !exp.trim() ||
      !bio.trim()
    ) {
      setError('Compila tutti i campi.');
      return;
    }

    // Validazione anni di esperienza
    const expNum = Number(exp);
    if (isNaN(expNum) || expNum < 0) {
      setError('Anni di esperienza deve essere un numero positivo.');
      return;
    }

    // Validazione settore
    if (!sector) {
      setError('Seleziona un settore.');
      return;
    }

    // Se tutto è valido, resetta l'errore e logga i dati
    setError('');
    console.log('Form submitted:', { name, username, password, sector, expNum, bio });
  }

  return (
    <>
      <div>
        <form onSubmit={submitForm}>

          <h1>Compila il form per iscriverti</h1>
          {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
          <div>
            <input type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)} />

            <input type="text"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)} />
          </div>

          <div>
            <input type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)} />
          </div>

          <div>

            <select name="settore" id="" value={sector} onChange={e => setSector(e.target.value)}>
              <option value="">Seleziona un settore</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
              <option value="devops">DevOps</option>
            </select>

            <input
              type="number"
              placeholder="inserisci anni di esperienza"
              name="esperienza" value={exp}
              onChange={e => setExp(e.target.value)} />

          </div>

          <div>

            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}>
            </textarea>

          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  )
}

export default App
