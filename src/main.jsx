import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const books = [
  ["Genesis",50],["Exodus",40],["Leviticus",27],["Numbers",36],["Deuteronomy",34],
  ["Joshua",24],["Judges",21],["Ruth",4],["1 Samuel",31],["2 Samuel",24],
  ["1 Kings",22],["2 Kings",25],["1 Chronicles",29],["2 Chronicles",36],["Ezra",10],
  ["Nehemiah",13],["Esther",10],["Job",42],["Psalms",150],["Proverbs",31],
  ["Ecclesiastes",12],["Song of Solomon",8],["Isaiah",66],["Jeremiah",52],
  ["Lamentations",5],["Ezekiel",48],["Daniel",12],["Hosea",14],["Joel",3],
  ["Amos",9],["Obadiah",1],["Jonah",4],["Micah",7],["Nahum",3],["Habakkuk",3],
  ["Zephaniah",3],["Haggai",2],["Zechariah",14],["Malachi",4],["Matthew",28],
  ["Mark",16],["Luke",24],["John",21],["Acts",28],["Romans",16],
  ["1 Corinthians",16],["2 Corinthians",13],["Galatians",6],["Ephesians",6],
  ["Philippians",4],["Colossians",4],["1 Thessalonians",5],["2 Thessalonians",3],
  ["1 Timothy",6],["2 Timothy",4],["Titus",3],["Philemon",1],["Hebrews",13],
  ["James",5],["1 Peter",5],["2 Peter",3],["1 John",5],["2 John",1],["3 John",1],
  ["Jude",1],["Revelation",22]
];

const topics = [
  "Faith","Prayer","Forgiveness","Purity","Love","Marriage","Family","Wisdom",
  "Fear","Hope","Healing","God's Character","Holy Spirit","Jesus","Salvation",
  "Sin","Repentance","Obedience","Purpose","Calling","Work","Money","Leadership",
  "Friendship","Discipline","Temptation","Trials","Suffering","Peace","Joy",
  "Gratitude","Worship","Fasting","Waiting on God","Courage","Identity",
  "Spiritual Growth"
];

const demoVerses = {
  "Genesis 1:1": "In the beginning, God created the heavens and the earth.",
  "John 3:16": "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.",
  "Philippians 4:13": "I can do all things through Christ, who strengthens me."
};

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}

function App() {
  const [screen, setScreen] = useState("home");
  const [day, setDay] = useState(load("bj-current-day", 1));
  const [completed, setCompleted] = useState(load("bj-completed", []));
  const [notes, setNotes] = useState(load("bj-notes", {}));
  const [book, setBook] = useState("Genesis");
  const [chapter, setChapter] = useState(1);
  const [search, setSearch] = useState("");
  const [jump, setJump] = useState("");
  const [topic, setTopic] = useState(null);

  useEffect(() => localStorage.setItem("bj-current-day", JSON.stringify(day)), [day]);
  useEffect(() => localStorage.setItem("bj-completed", JSON.stringify(completed)), [completed]);
  useEffect(() => localStorage.setItem("bj-notes", JSON.stringify(notes)), [notes]);

  const progress = Math.round((completed.length / 365) * 100);
  const selectedBook = books.find(b => b[0] === book);

  function goDay(n) {
    const value = Math.min(365, Math.max(1, Number(n) || 1));
    setDay(value);
    setScreen("journey");
  }

  function toggleComplete() {
    setCompleted(prev => prev.includes(day) ? prev.filter(x => x !== day) : [...prev, day]);
  }

  function saveNote(value) {
    setNotes(prev => ({...prev, [`day-${day}`]: value}));
  }

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={() => setScreen("home")}>
          <span className="brand-mark">✦</span>
          <span><b>BIBLE</b><em>JOURNAL</em></span>
        </button>
        <div className="top-actions">
          <button className="ghost" onClick={() => setScreen("bible")}>Bible</button>
          <button className="ghost" onClick={() => setScreen("topics")}>Topics</button>
          <button className="search-button" onClick={() => setScreen("search")}>⌕ Search</button>
        </div>
      </header>

      <main>
        {screen === "home" && (
          <section className="hero-page">
            <div className="hero-copy">
              <p className="eyebrow">READ · REFLECT · PRAY · GROW</p>
              <h1>Your Bible.<br/><i>Your journal.</i></h1>
              <p className="lead">A peaceful place to read Scripture, follow your year-long journey, and keep what God is teaching you.</p>
              <div className="home-actions">
                <button className="primary" onClick={() => setScreen("journey")}>Continue Day {day} →</button>
                <button className="secondary" onClick={() => setScreen("bible")}>Open Bible</button>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="card-label">365-DAY JOURNEY</div>
              <div className="day-big">Day {day}</div>
              <div className="progress-track"><span style={{width: progress + "%"}} /></div>
              <div className="progress-meta"><span>{completed.length} days complete</span><span>{progress}%</span></div>
              <div className="quick-jump">
                <label>QUICK JUMP</label>
                <div className="jump-row">
                  <select defaultValue="1-50" onChange={() => {}}>
                    <option>1–50</option><option>51–100</option><option>101–150</option><option>151–200</option>
                    <option>201–250</option><option>251–300</option><option>301–350</option><option>351–365</option>
                  </select>
                  <input value={jump} onChange={e => setJump(e.target.value)} placeholder="Day number" inputMode="numeric"/>
                  <button onClick={() => goDay(jump)}>GO</button>
                </div>
                <div className="jump-grid">
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <button key={n} onClick={() => goDay(n)}>Day {n}</button>)}
                </div>
              </div>
            </div>
          </section>
        )}

        {screen === "journey" && (
          <section className="content-page">
            <div className="section-head">
              <div><p className="eyebrow">365-DAY JOURNEY</p><h2>Day {day}</h2></div>
              <button className={completed.includes(day) ? "complete done" : "complete"} onClick={toggleComplete}>
                {completed.includes(day) ? "✓ Completed" : "Mark as complete"}
              </button>
            </div>
            <article className="journal-card">
              <p className="eyebrow">TODAY'S READING</p>
              <h3>{day === 1 ? "In the Beginning: God Made It All" : `Bible Journey — Day ${day}`}</h3>
              <div className="reading-meta">
                <span>CORE READING</span><b>{day === 1 ? "Genesis 1:1–31" : "Reading plan data will populate here"}</b>
              </div>
              <div className="reading-meta"><span>STUDY METHOD</span><b>{day === 1 ? "A.P.P.L.E." : "Daily Study"}</b></div>
              <div className="scripture-box">
                <div className="box-title">TODAY'S SCRIPTURE — WEB</div>
                <p>{day === 1 ? "In the beginning, God created the heavens and the earth." : "The complete World English Bible reading for this day will be loaded from the project's structured Bible data."}</p>
              </div>
              <div className="reflection">
                <label>WHAT GOD IS HELPING ME UNDERSTAND</label>
                <textarea value={notes[`day-${day}`] || ""} onChange={e => saveNote(e.target.value)} placeholder="Write what you are learning, noticing, or receiving from today's reading..." />
              </div>
              <div className="reflection-grid">
                <div><label>KEY POINT TO REMEMBER</label><textarea /></div>
                <div><label>MY PRAYER</label><textarea /></div>
              </div>
            </article>
          </section>
        )}

        {screen === "bible" && (
          <section className="content-page">
            <div className="section-head">
              <div><p className="eyebrow">FULL BIBLE LIBRARY · WEB</p><h2>{book} {chapter}</h2></div>
              <button className="secondary" onClick={() => setScreen("home")}>⌂ Home</button>
            </div>
            <div className="bible-layout">
              <aside className="book-list">
                <h4>BOOKS</h4>
                {books.map(([name]) => <button className={name === book ? "book active" : "book"} key={name} onClick={() => {setBook(name);setChapter(1)}}>{name}</button>)}
              </aside>
              <article className="bible-reader">
                <div className="chapter-nav">
                  <select value={chapter} onChange={e => setChapter(Number(e.target.value))}>
                    {Array.from({length:selectedBook[1]},(_,i)=><option key={i+1} value={i+1}>Chapter {i+1}</option>)}
                  </select>
                </div>
                <h3>{book} {chapter}</h3>
                <p className="placeholder-text">
                  {demoVerses[`${book} ${chapter}`] || "The structured WEB verse data will appear here. Each chapter is designed to be loaded independently so the Bible remains fast, searchable, and fully usable offline."}
                </p>
                <div className="reader-actions">
                  <button onClick={() => setScreen("journal")}>✎ Journal about this chapter</button>
                  <button onClick={() => setScreen("home")}>⌂ Home</button>
                </div>
              </article>
            </div>
          </section>
        )}

        {screen === "topics" && (
          <section className="content-page">
            <div className="section-head"><div><p className="eyebrow">STUDY BY SUBJECT</p><h2>Topics</h2></div></div>
            {!topic ? <div className="topic-grid">{topics.map(t => <button key={t} onClick={() => setTopic(t)}>{t}<span>→</span></button>)}</div> :
              <article className="journal-card topic-page"><button className="back" onClick={() => setTopic(null)}>← All topics</button><p className="eyebrow">TOPIC</p><h3>{topic}</h3><p>Relevant WEB Scripture references will be connected to this topic in the full data import.</p><button className="primary" onClick={() => setScreen("bible")}>Open Bible →</button></article>}
          </section>
        )}

        {screen === "journal" && (
          <section className="content-page">
            <div className="section-head"><div><p className="eyebrow">YOUR WRITING SPACE</p><h2>Journal</h2></div></div>
            <article className="journal-card"><label>FREE JOURNAL</label><textarea className="big-note" placeholder="Write freely here..." /></article>
          </section>
        )}

        {screen === "search" && (
          <section className="content-page">
            <div className="section-head"><div><p className="eyebrow">SEARCH SCRIPTURE</p><h2>Find a verse</h2></div></div>
            <div className="search-box"><input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Search a word, phrase, or reference..." /></div>
            <div className="results">
              {Object.entries(demoVerses).filter(([ref,text]) => !search || ref.toLowerCase().includes(search.toLowerCase()) || text.toLowerCase().includes(search.toLowerCase())).map(([ref,text]) =>
                <button key={ref} onClick={() => { const [b,c] = ref.split(" "); setBook(b); setChapter(Number(c.split(":")[0])); setScreen("bible"); }}>
                  <b>{ref}</b><span>{text}</span>
                </button>
              )}
            </div>
          </section>
        )}
      </main>

      <nav className="bottom-nav">
        <button onClick={() => setScreen("home")}>⌂<span>Home</span></button>
        <button onClick={() => setScreen("bible")}>▤<span>Bible</span></button>
        <button onClick={() => setScreen("journey")}>◷<span>Journey</span></button>
        <button onClick={() => setScreen("topics")}>✦<span>Topics</span></button>
        <button onClick={() => setScreen("journal")}>✎<span>Journal</span></button>
      </nav>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
