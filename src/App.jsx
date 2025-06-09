import './App.css'
import {useState} from "react";

export function App() {
    const [abfahrten, setAbfahrten] = useState({});

    async function getAbfahrten() {
        await fetch("https://transport.opendata.ch/v1/stationboard?station=Z%C3%BCrich%20HB&limit=15")
            .then(response => response.json())
            .then(data => {
                setAbfahrten(data.stationboard.map(
                    (entry) => ({
                        departure: `${String(new Date(entry.stop.departure).getHours()).padStart(2, '0')}:${String(new Date(entry.stop.departure).getMinutes()).padStart(2, '0')}`,
                        number: `${entry.category} ${entry.number}`,
                        destination: entry.to,
                        platform: entry.stop.platform,
                        delay: entry.stop.delay !== null ? `${entry.stop.delay} Min.` : "Unbekannt"
                    })
                ));
            })
            .catch(err => console.error(err));
    }

    function toggleMode(e){
        let currentTheme = document.getElementById("root").getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        e.target.innerText = `${currentTheme} Mode`;
        document.getElementById("root").setAttribute("data-theme", newTheme)
    }

    return (
        <div>
            <div className={"anzeige"}>
                <h1>Aktuelle Abfahrten</h1>
                {abfahrten[0] !== undefined ? (
                    <table className={"anzeige-table"}>
                        <thead>
                            <tr>
                                <th className={"time head"}>Uhrzeit</th>
                                <th className={"train-number head"}>Zugnummer</th>
                                <th className={"destination head"}>Zielbahnhof</th>
                                <th className={"platform head"}>Gleis</th>
                                <th className={"delay head"}>Verspätung</th>
                            </tr>
                        </thead>
                        {abfahrten.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td className={"time body"}>{item.departure}</td>
                                    <td className={"train-number body"}>{item.number}</td>
                                    <td className={"destination body"}>{item.destination}</td>
                                    <td className={"platform body"}>{item.platform}</td>
                                    <td className={"delay body"}>{item.delay}</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                ) : <></>}
                <button className={"button"} type={"submit"} onClick={getAbfahrten}>Aktualisieren</button>

                <p className="disclaimer">Daten von <a className="disclaimer" href="https://transport.opendata.ch/">transport.opendata.ch</a></p>
            </div>
            <div className={"info-section"}>
                <button className={"button"} onClick={e => toggleMode(e)}>Dark Mode</button>
                <select className={"fact-selector"}>
                    <option selected={true}>Kategorie 1</option>
                    <option>Kategorie 2</option>
                    <option>Kategorie 3</option>
                </select>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            </div>
        </div>
    );
}