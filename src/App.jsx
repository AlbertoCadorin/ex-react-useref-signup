import { useState } from 'react'
import './App.css'

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

function App() {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sector, setSector] = useState('');
  const [exp, setExp] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');

  // Errori in tempo reale
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [bioError, setBioError] = useState('');

  // Validazione username
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    const alfanum = /^[a-zA-Z0-9]{6,}$/;
    if (!alfanum.test(value)) {
      setUsernameError('Username: solo caratteri alfanumerici, almeno 6 caratteri.');
    } else {
      setUsernameError('');
    }
  };

  // Validazione password
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    let hasLetter = false, hasNumber = false, hasSymbol = false;
    for (let c of value) {
      if (letters.includes(c)) hasLetter = true;
      else if (numbers.includes(c)) hasNumber = true;
      else if (symbols.includes(c)) hasSymbol = true;
    }
    if (
      value.length < 8 ||
      !hasLetter ||
      !hasNumber ||
      !hasSymbol
    ) {
      setPasswordError('Password: almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.');
    } else {
      setPasswordError('');
    }
  };

  // Validazione bio/descrizione
  const handleBioChange = (e) => {
    const value = e.target.value;
    setBio(value);

    const trimmed = value.trim();
    if (trimmed.length < 100 || trimmed.length > 1000) {
      setBioError('Descrizione: tra 100 e 1000 caratteri.');
    } else {
      setBioError('');
    }
  };

  // Submit con validazione finale
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

    // Username
    const alfanum = /^[a-zA-Z0-9]{6,}$/;
    if (!alfanum.test(username)) {
      setError('Username non valido.');
      return;
    }

    // Password
    let hasLetter = false, hasNumber = false, hasSymbol = false;
    for (let c of password) {
      if (letters.includes(c)) hasLetter = true;
      else if (numbers.includes(c)) hasNumber = true;
      else if (symbols.includes(c)) hasSymbol = true;
    }
    if (
      password.length < 8 ||
      !hasLetter ||
      !hasNumber ||
      !hasSymbol
    ) {
      setError('Password non valida.');
      return;
    }

    // Bio
    const trimmedBio = bio.trim();
    if (trimmedBio.length < 100 || trimmedBio.length > 1000) {
      setError('Descrizione non valida.');
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
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
            />
            {usernameError && <div style={{ color: 'red', fontSize: '0.9em' }}>{usernameError}</div>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <div style={{ color: 'red', fontSize: '0.9em' }}>{passwordError}</div>}
          </div>

          <div>
            <select name="settore" value={sector} onChange={e => setSector(e.target.value)}>
              <option value="">Seleziona un settore</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
              <option value="devops">DevOps</option>
            </select>

            <input
              type="number"
              placeholder="inserisci anni di esperienza"
              name="esperienza"
              value={exp}
              onChange={e => setExp(e.target.value)}
            />
          </div>

          <div>
            <textarea
              placeholder="Descrizione (tra 100 e 1000 caratteri)"
              value={bio}
              onChange={handleBioChange}
            ></textarea>
            {bioError && <div style={{ color: 'red', fontSize: '0.9em' }}>{bioError}</div>}
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  )
}

export default App