import React from 'react'
import { Link } from 'gatsby'
let pjson = require(`../../package.json`)
const footer = () => (
  <div>
    <p style={{ color: `##bcc3ce` }}>
      Lahtevat.info v{pjson.version} <br />
      Sivuston lähdekoodi on saatavilla
      {` `}
      <a
        aria-label="Linkki Githubiin"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/nikosalonen/trainsleaving"
      >
        GitHubissa
      </a>
      . <br />
      Voit myös laittaa kehitysehdoituksia Twitterissä
      {` `}
      <a
        aria-label="Linkki Twitteriin"
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/nikosalonen"
      >
        @nikosalonen</a> tai käytä <Link to="/feedback">palautelomaketta</Link>

      . <br />
      Junien tiedot ladataan Liikenneviraston
      {` `}
      <a
        aria-label="Linkki Liikenneviraston Digitraffic rajapintaan"
        target="_blank"
        rel="noopener noreferrer"
        href="https://rata.digitraffic.fi/"
      >
        Digitraffic-rajapinnasta
      </a>
      . Rajapinnan lisenssi on
      {` `}
      <a
        aria-label="Linkki rajapinnan lisenssitietoihin"
        target="_blank"
        rel="noopener noreferrer"
        href="https://creativecommons.org/licenses/by/4.0/"
      >
        CC BY 4.0
      </a>
      .{` `}
      <br />
      Logona käytetty piktogrammi on osa HSL tarjoamaa
      {` `}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.hsl.fi/tyyliopas/piktogrammit"
      >
        Tyyliopasta
      </a>
    </p>
  </div>
)
export default footer
