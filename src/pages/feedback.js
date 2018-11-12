import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const Feedback = () => (
  <Layout>
    <div className="container">
      <div className="columns">
        <div className=" column col-12">
          <form name="contact" method="POST" netlify>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Nimi:</label>
              <input className="form-input" type="text" id="name" placeholder="Nimi" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Sähköposti:</label>
              <input className="form-input" type="email" id="email" placeholder="Sähköposti" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">Viesti:</label>
              <textarea className="form-input" id="message" name="message"></textarea>
            </div>
            <div className="form-group">
              <button className="btn" type="submit">Lähetä</button>
            </div>

          </form>
          <div className="text-right">

            <Link  to="/">Takaisin etusivulle</Link>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default Feedback
