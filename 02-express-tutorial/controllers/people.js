let {people} = require('../data')

const getPeople = (req,res) => {
    res.status(200).json({success: true, data: people})
}

const createPerson = (req, res) => {
    console.log(req.body)
    const {name} = req.body

    if(name){
        return res.status(200).json({success: true, data: name})
    }
    res.status(400).json({success: false, msg: 'You need to forcefully provide a name'})
}

const createPersonPostman = (req,res) => {
    const {name} = req.body

    if(!name){
        return res.status(400).json({success: false, msg: 'please provide name value'})
    }
    res.status(201).json({success: true, data: [...people, name]})
}

const updatePerson = (req, res) => {
    const {id} = req.params
    const {name} = req.body

    const person = people.find((person) => person.id === Number(id))
    
    if(!person){
        return res.status(404).json({success: false, msg: `No person with id ${id}`})
    }

    const newPeople = people.map((person) => {
        if(person.id === Number(id)){
            person.name = name
        }
        return person 
    })
    res.status(200).json({success: true, data: newPeople})
}

const deletePerson = (req, res) => {
    const {id} = req.params

    const person = people.find((person) => person.id === Number(id))

    if(!person){
        return res.status(404).json({success: false, msg: `No person with id ${id}`})
    }
    // do not try this with map hahahahaha
    const peopleWithoutPersonToRemove = people.filter((person) => {
        if(person.id !== Number(id)){
            return person
        }
    })

    res.status(200).send({success: true, data: peopleWithoutPersonToRemove})
}

module.exports = {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson
}