import React from 'react';
import './chat.css';

// React komponenta za prikaz aplikacije za chat
function ChatApp() {
  // Hook useState za pohranjivanje poruka koje korisnici šalju
  const [poruke, setPoruke] = React.useState([]);
  // Objekt s imenom autora (u ovom slučaju uvijek "Sandra")
  const autor = { ime: "Sandra"};

  // Funkcija koja obrađuje submit event za novu poruku
  const handlePorukaSubmit = (tekst) => {
    const novaPoruka = {
      id: poruke.length,  // generira jedinstveni ID za svaku novu poruku
      autor: autor,  // postavlja autora za novu poruku
      tekst: tekst,  // tekst nove poruke
      boja: generirajSlucajnuBoju(),  // generira slučajnu boju za novu poruku
      ime: generirajSlucajnoIme()  // generira slučajno ime za novu poruku
    };
    // Dodaje novu poruku u niz postojećih poruka koristeći setPoruke
    setPoruke([...poruke, novaPoruka]);
  }; 

  // Prikazuje glavni sadržaj aplikacije koji se sastoji od komponente Chat i komponente UnosPoruke
  return (
    <main className="chat-container">
      <Chat poruke={poruke} autor={autor} />
      <UnosPoruke onPorukaSubmit={handlePorukaSubmit} />
    </main>
  );
}


// React komponenta za prikaz pojedinačne poruke
function Poruka(props) {
  // Provjerava je li poruka poslana od autora ili ne
  const isMyMessage = props.autor.ime === '';
  // Određuje boju pozadine poruke, ako nije zadana, generira slučajnu boju
  const boja = props.boja ? props.boja : generirajSlucajnuBoju();
  // Određuje ime autora poruke, ako nije zadano, generira slučajno ime
  const ime = props.ime ? props.ime : generirajSlucajnoIme();

  // Prikazuje HTML elemente za prikaz poruke
  return (
    <div>
      <div className="autor">{ime}:</div>
      <div className="pozadina" style={{ backgroundColor: boja }}>
        <div className={`tekst ${isMyMessage ? 'tekst-crveni' : ''}`}>
          {props.tekst}
        </div>
      </div>
    </div>
  );
}


// React komponenta za prikaz svih poruka u chatu
function Chat(props) {
  // Dohvaća poruke i ime autora iz svojstava (props) koje je primila
  const { poruke, autor } = props;

  // Prikazuje HTML elemente za prikaz svih poruka
  return (
    <div className="chat-container">
      <div className="chat">
        {poruke.map((poruka) => (
          <Poruka key={poruka.id} tekst={poruka.tekst} autor={poruka.autor} />
        ))}
        {/* Prikazuje se poruka autora samo ako je autor poslao poruku u trenutnom razgovoru */}
        <div className="autor-main" >
          {poruke.length > 0 && poruke[poruke.length - 1].autor.ime === autor.ime ? (
            <div className="poruka-autora">{poruke[poruke.length - 1].tekst}</div>
          ) : null}
          {/* Prikazuje se ime autora koji trenutno piše poruku */}
          {autor.ime}:
        </div>
      </div>
    </div>
  );
}


function UnosPoruke(props) {
  const [tekst, setTekst] = React.useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tekst.trim() !== '') {
      props.onPorukaSubmit(tekst);
      setTekst('');
    }
  }

  return (
    <form className="unos" onSubmit={handleSubmit}>
      <input
        type="text"
        className="poruke"
        placeholder="Unesite svoju poruku "
        value={tekst}
        onChange={(e) => setTekst(e.target.value)}
      />
      <button className="button" type="submit">Pošalji</button>
    </form>
  );
}

/* Funkcija koja generira slučajnu RGB boju */
function generirajSlucajnuBoju() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

/* Funkcija koja generira slučajno ime */
function generirajSlucajnoIme() {
  const imena = ['Tihana', 'Ivan', 'Dalibor', 'Ivona', 'Domagoj', 'Davor', 'Alan', 'Dunja', 'Neven', 'Robi', 'Bernard'];
  const index = Math.floor(Math.random() * imena.length);
  return imena[index];
}

/* Izvoz komponente ChatApp kao glavne komponente aplikacije */
export default ChatApp;
