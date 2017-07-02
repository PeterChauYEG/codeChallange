import csv from 'fast-csv'
import fs from 'fs'
import moment from 'moment'

console.log("Code Challenge Solution Starting")

// variables
var csvData = []

// load csv
csv.fromPath("./data/dev-challenge-data.csv")
    .on("data", function(data){
     
        // store data in a global array
        csvData.push(data)
    })
    .on("end", function(){
        console.log("done")
     
        const headers = csvData[0]
        const data = csvData.slice(1)

        // determine categories     
        const categories = getCategories(data)
        console.log("categories: ", categories)
        
        // number of violations in each category
        // find the earliest violation in each category
        // find the latest violation in each category
        categories.forEach((category) => {
            const violations = getNumberOfViolations(category, data)
            console.log(category + " violations" + ": ", violations)   
            
            const earliestIndex = getEarliestViolation(category, data)
            console.log("Earlist " + category + " violations" + ": ", data[earliestIndex])   
            
            const latestIndex = getLatestViolation(category, data)
            console.log("Latest " + category + " violations" + ": ", data[latestIndex])  
        })

    })

function getCategories(data) {
    const categoryIndex = 2
    let categories = []
    
    // iterate over every element
    data.forEach((element) => {
        
        const category = element[categoryIndex]
        
        // check if we've seen this category before
        if (!categories.includes(category)) {
            
            // if not, add it to the categories
            categories.push(category)
        }
    })
    
    return categories
}

// number of violations in a category
function getNumberOfViolations(category, data) {
    const categoryIndex = 2
    let numberOfViolations = 0
    
    // iterate over every element
    data.forEach((element) => {
        
        const elementCategory = element[categoryIndex]
        
        if (category === elementCategory) {
            numberOfViolations++
        }
    })
    
    return numberOfViolations
}

// find the earliest violation in each category
function getEarliestViolation(category, data) {
    const categoryIndex = 2
    const dateIndex = 3
    let earliest = moment()
    let index

    // iterate over every element
    data.forEach((element, i) => {
        const elementCategory = element[categoryIndex]
        const elementDate = moment(element[dateIndex], "YYYY-MM-DD h:mm")
        
        if (elementDate.isBefore(earliest) && elementCategory === category) {
            earliest = elementDate
            index = i
        }
        
    })
    
    return index
}

// find the latest violation in each category
function getLatestViolation(category, data) {
    const categoryIndex = 2
    const dateIndex = 3
    let latest = moment("1999-01-01 0:00")
    let index

    // iterate over every element
    data.forEach((element, i) => {
        const elementCategory = element[categoryIndex]
        const elementDate = moment(element[dateIndex], "YYYY-MM-DD h:mm")
        
        if (elementDate.isAfter(latest) && elementCategory === category) {
            latest = elementDate
            index = i
        }
        
    })
    
    return index
}