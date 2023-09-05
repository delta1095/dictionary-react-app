import { useRef, useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";

export interface Result {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license: License;
  sourceUrls: string[];
}

export interface License {
  name: string;
  url: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
}

export interface Definition {
  definition: string;
  synonyms: any[];
  antonyms: any[];
  example?: string;
}

export interface Phonetic {
  audio: string;
  sourceUrl?: string;
  license?: License;
  text?: string;
}

export interface NoResult {
  title: string;
  message: string;
  resolution: string;
}

function App() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [font, setFont] = useState("sans");

  const [result, setResult] = useState<Result[] | NoResult>([]);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const getData = async (word: string | undefined) => {
    if (!word) return;

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();

    console.log(data);

    setResult(data);
  };

  return (
    <div className={`App ${font} ${darkTheme ? "dark" : "light"}`}>
      <main className={"main"}>
        <Navbar
          font={font}
          setFont={setFont}
          darkTheme={darkTheme}
          setDarkTheme={setDarkTheme}
        />
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();

            const word = searchInputRef?.current?.value;
            getData(word);
          }}
        >
          <input ref={searchInputRef} type="text" name="word" />
          <button className="search-button" type="submit">
            <img src={"/icon-search.svg"} alt="search" />
          </button>
        </form>
        {/* Main */}

        <div>
          {Array.isArray(result) ? (
            result.map(({ word, phonetics, meanings, sourceUrls }) => (
              <div className="content">
                <div className="header">
                  <div>
                    <div className="title">{word}</div>

                    {phonetics.map(
                      ({ audio, text }) =>
                        audio &&
                        text && (
                          <div className="pronunciation">
                            <span>{text}</span>
                            <img
                              src={"/icon-play.svg"}
                              alt=""
                              onClick={() => {
                                if (!audio) return;
                                new Audio(audio).play();
                              }}
                            />
                          </div>
                        )
                    )}
                  </div>

                  {/* {audioNotFound || (
                      <img src={play} alt="" onClick={() => audio?.play()} />
                    )} */}
                </div>
                <div className="body">
                  {meanings.map(
                    ({ definitions, partOfSpeech, synonyms }, index) => (
                      <div className="figure" key={index}>
                        <div className="title">
                          <div>{partOfSpeech}</div>
                          <div className="line"></div>
                        </div>
                        <div>
                          <div className="subtitle">Meaning</div>
                          {definitions.map(({ definition }, index: number) => (
                            <ul className="meanings" key={index}>
                              <li>
                                <span>{definition}</span>
                              </li>
                            </ul>
                          ))}
                          {synonyms.length ? (
                            <div className="synonyms">
                              <div className="subtitle">Synonyms</div>
                              <div className="alt-text">
                                {synonyms.map((word) => (
                                  <span>"{word}" </span>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="sources">
                  {sourceUrls.map((sourceUrl) => (
                    <>
                      <div className="text">
                        Source:{" "}
                        <a href={sourceUrl} target="_blank">
                          Wikipedia
                        </a>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="not-found">
              <div className="title">{result?.message}</div>
              <div className="description">{result?.resolution}</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
