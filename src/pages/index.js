import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
// import { Link } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = (props) => {

  const trains = props.data.allTrain.edges
  return (
    <Layout>
      <h1>Junia jee</h1>
      {trains.map((train, i) => {
        const trainData = train.node
        if (trainData.commuterLineID.length) {

          return (
            <div key={i}>
              <p>Category: {trainData.trainCategory}</p>
              <p>LineID: {trainData.commuterLineID}</p>
            </div>
          )
        }
      })}


      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  )
}


export const query = graphql`
  query RandomUserQuery {
    allTrain {
      edges {
        node {
          trainCategory
          commuterLineID
        }
      }
    }
  }
`

IndexPage.propTypes = {
  data: PropTypes.object,
}

export default IndexPage
