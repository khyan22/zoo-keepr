const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');
const { zookeepers } = require('../data/zookeepers.json')

jest.mock('fs')

test('create an zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        {name: 'Darlene', id: 'as;fough'},
        zookeepers
    )

    expect(zookeeper.name).toBe('Darlene');
    expect(zookeeper.id).toBe('as;fough');
})

test('filter by query', () => {
    const mockZookeeperArr = [
        {
            "id": "3",
            "name": "dog",
            "age": 48,
            "favoriteAnimal": "otter"
        },
        {
            "id": "4",
            "name": "cat",
            "age": 20,
            "favoriteAnimal": "dog"
        },
    ]

    const filteredZookeeper = filterByQuery({age: 48}, mockZookeeperArr)
    expect(filteredZookeeper.length).toEqual(1)
})

test('filter by id', () => {
    const mockZookeeperArr = [
        {
            "id": "3",
            "name": "dog",
            "age": 48,
            "favoriteAnimal": "otter"
        },
        {
            "id": "4",
            "name": "cat",
            "age": 20,
            "favoriteAnimal": "dog"
        },
    ]

    const filteredZookeeper = findById('4', mockZookeeperArr)
    expect(filteredZookeeper.name).toBe('cat')
})

test('validate zookeeper', () => {
    const mockZookeeper = {
        "id": "4",
        "name": "cat",
        "age": 20,
        "favoriteAnimal": "dog"
    }

    const invalidZookeeper = {
        "id": "6",
        "name": "dog",
        "age": 20,
    }

    const result = validateZookeeper(mockZookeeper)
    const result2 = validateZookeeper(invalidZookeeper)

    expect(result).toBe(true)
    expect(result2).toBe(false)
})