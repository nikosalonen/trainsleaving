import React from 'react'
import { Link } from 'gatsby'
import Image from './image'
let pjson = require(`../../package.json`)
const footer = () => (
  <div>
    <div style={{ color: `##bcc3ce` }}>
      <p>Lahtevat.info v{pjson.version} </p>
      <p>Sivuston lähdekoodi on saatavilla
        {` `}
        <a
          aria-label="Linkki Githubiin"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nikosalonen/trainsleaving"
        >
          GitHubissa
        </a>
        . </p>
      <p>Voit myös laittaa kehitysehdoituksia Twitterissä
        {` `}
        <a
          aria-label="Linkki Twitteriin"
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/nikosalonen"
        >
          @nikosalonen</a> tai käytä <Link to="/feedback">palautelomaketta</Link>

        . </p>
      <p>Junien tiedot ladataan Traffic Management Finlandin
        {` `}
        <a
          aria-label="Linkki Traffic Management Finland Digitraffic rajapintaan"
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
        .</p>
      {/* <p>Logona käytetty piktogrammi on osa HSL tarjoamaa
        {` `}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.hsl.fi/tyyliopas/piktogrammit"
        >
        Tyyliopasta
        </a>
      </p> */}
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem`, margin: `auto` }}>
        <a target="_blank" rel="noopener noreferrer" href="https://brave.com/lah235" >
          <Image />
        </a>
      </div>
      <p>
        <Link to="/cookies">Käytämme evästeitä</Link>
      </p>
    </div>
  </div>
)
export default footer
