import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import  'spectre.css'

const Cookies = () => (
  <Layout>
    <div className="container">
      <div className="columns">
        <div className="column col-12">
          <h1>Tietoja evästeistä 🍪</h1>

          <p>
            Tämä sivusto käyttää evästeitä. Sivusto lähettää selaimelle evästeen – pienen tekstitiedoston, joka tallentuu tietokoneen kovalevylle. Käytössä on sekä väliaikaisia istuntotunnus-evästeitä, jotka sulkeutuvat, kun suljet Internet-selaimen, että pysyviä evästeitä, jotka tallentuvat tietokoneen kovalevylle. Evästeiden avulla voimme tunnistaa selaimesi ja käyttää näin saamaamme tietoa esimerkiksi sivustollamme vierailevien selaimien laskemiseen sekä sivustomme käytön analysointiin, kuten tilastolliseen seurantaan. Ne antavat meille myös mahdollisuuden tarkastella ja seurata käyttäjiemme mielenkiinnon kohteita ja kehittää siten verkkosivujamme. Kaikki kerätty tieto on nimetöntä, eikä verkossa suoritettuja toimintoja voida sen avulla liittää tiettyyn henkilöön.
          </p>

          <p>
            Useimmat Internet-selaimet hyväksyvät evästeet automaattisesti, mutta halutessasi voit muokata selaimesi asetuksia ja milloin tahansa poistaa evästeet käytöstä. Voit välttää evästeet muokkaamalla selainohjelmasi asetuksia ja kieltämällä niiden käytön.
          </p>

          <p>
            Mainontaevästeet auttavat meitä valitsemaan sinulle parhaiten sopivat ja mielenkiintoisimmat mainokset. Ne myös estävät samojen mainoksien näytön. Jotkut kolmannen osapuolen toimittajat saattavat myös käyttää evästeitä tai verkkojäljitteitä (1 pikselin kuvatiedosto), jotta näet mieleisiäsi mainoksia, kun vierailet eri sivustoilla. Evästeiden ja verkkojäljitteiden avulla kerätyt tiedot eivät kerro meille tai kolmansille osapuolille mitään henkilökohtaisia tietoja, kuten nimeäsi tai yhteystietojasi. Kolmantena osapuolena toimivat mainostajat saattavat myös käyttää tekniikkaa, jolla mitataan mainosten tehoa.
          </p>

        </div>
        <div className="column col-12">
          <Link to="/">Takaisin etusivulle</Link>
        </div>
      </div>
    </div>

  </Layout>
)

export default Cookies
