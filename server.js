const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
const { animals } = require('./data/animals')

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = []
    let filteredResults = animalsArray

    if (query.personalityTraits) {
        if (typeof query.personalityTraits === 'string'){
            personalityTraitsArray = [query.personalityTraits]
        } else {
            personalityTraitsArray = query.personalityTraits
        }

        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            )
        })
    }

    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet)
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet)
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name)
    }

    return filteredResults
}

function findById(id, animalsArray) {
    const results = animalsArray.filter(animal => animal.id === id)[0]
    return results
}

app.get('/api/animals', (req, res) => {
    let results = animals
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results)
})

app.get('/api/animals/:id', (req, res) => {
    const results = findById(req.params.id, animals)
    if (results) {
        res.json(results)
    } else {
        res.send(404)
    }
})

app.listen(PORT, () => {
    console.log(`API server is now on port ${PORT}!`)
})