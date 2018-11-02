// const axios = require(`axios`)
// const crypto = require(`crypto`)

// exports.onCreatePage = async ({ /* node,*/ actions }) => {
//   const { createNode /* , createNodeField*/ } = actions

//   // fetch raw data from the Train api
//   const fetchTrain = () => axios.get(`https://rata.digitraffic.fi/api/v1/live-trains/station/HKI?arrived_trains=5&arriving_trains=5&departed_trains=5&departing_trains=5&include_nonstopping=false`)
//   // await for results
//   const res = await fetchTrain()
//   // map into these results and create nodes
//   res.data.map((train, i) => {
//     // Create your node object
//     const trainNode = {
//       // Required fields
//       id: `${i}`,
//       parent: `__SOURCE__`,
//       internal: {
//         type: `Train`, // name of the graphQL query --> allTrain {}
//         // contentDigest will be added just after
//         // but it is required
//       },
//       children: [],

//       // Other fields that you want to query with graphQl
//       trainCategory: train.trainCategory,
//       commuterLineID: train.commuterLineID,
//       cancelled: train.cancelled,
//       stations: train.timeTableRows

//     }

//     // Get content digest of node. (Required field)
//     const contentDigest = crypto.
//       createHash(`md5`).
//       update(JSON.stringify(trainNode)).
//       digest(`hex`)
//     // add it to userNode
//     trainNode.internal.contentDigest = contentDigest

//     // Create node with the gatsby createNode() API
//     createNode(trainNode)
//   })


// }
