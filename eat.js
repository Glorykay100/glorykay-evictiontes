// let studentDb = [];

// function addStudent(name, level, regNo, department, paidFees, isStudent){
//     let student = {
//         name: name,
//         level: level,
//         regNo: regNo,
//         department: department,
//         paidFees: true,
//         isStudent: true
//     }
//     studentDb.push(student)
// }

//     addStudent("Aisha Tukur", 400, "2022/1/87397CF", "Information technology", true, true)
//     // console.log(studentDb)

    
//     function removeStudent(){
//         return studentDb.splice(student)
//     }
//     // console.log(studentDb)


//     if paidFees = (true){
//         console.log ('School fees have been paid')
//     }else{
//         console.log ('School fees have not been paid')
//     }
// // 
    

    
    


// const car = {
//     brand: "Ford",
//     model: "Ford 24",
//     year: 2024,
//     owner: {name: "Standford Olugbenga", city: "Jos"},
//     features: ["24/7 running battery", "silent engine", "streamlined body", "mountain climber" ]
// }

// console.log(JSON.stringify(car, null, 2))

//  let carString = (JSON.stringify(car, null, 2))

//  console.log(JSON.parse(carString))

// let parsedCar = (JSON.parse(carString))
//  console.log(parsedCar.owner)

//  console.log(parsedCar.features)

//  if(car.brand === parsedCar){
//     console.log('true')
//  }else{
//     console.log('false')
//  }



// const car = {
//    brand: 'Ford',
//    model: 'Stanford24',
//    year: 2024,
//    owner: {name: 'Emeka Dubem', city: 'Jos'},
//    features: ['High-capacity battery', 'Internet connectivity', 
//       'Submarine feeature', 'in-built wings']
// }

// let carString = JSON.stringify(car, null, 2)

// let parsedCar = ((JSON.parse(carString)))
// console.log(parsedCar)
 
 

// console.log(parsedCar.owner.name)
// console.log(parsedCar.features[1])

// if(car.brand === parsedCar.brand){
//    console.log('They match')
// }else{
//    console.log('They do not match')
// }


//Tues, Jul 21, 2026

// const list = {
//    fruit : "Mango",
//    price :500
// }
// console.log(list.fruit)

//Wed, Jul 22, 2026
//07.03
ses fetch() to request users from:

https://jsonplaceholder.typicode.com/users
Uses .then() to receive the response.
Uses response.json().
Uses another .then() to print the data with console.log().

Don't worry if you make mistakes.

In our JavaScript class, mistakes are expected. 
My job is to help you find and fix them, 
not to write the code for you.


fetch(https:jsonplaceholder.typicode.com/users)





fetch(https://jsonplaceholder.typicode.com/users)
.then(response => response.json)
respo