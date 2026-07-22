const fs = require ("fs/promises");

function displayData(key, value){
    console.log(key, value)
}

async function fetchData(){
    const [studentFile, courseFile, gradeFile] = await Promise.all([
        fs.readFile("student.json"),
        fs.readFile("courses.json"),
        fs.readFile("grades.json"),
   ]);

   const student = JSON.parse(studentFile);
   const course = JSON.parse(courseFile);
   const grade = JSON.parse(gradeFile);

   displayData("student Name", student.name);
   displayData("Number of course",course.length);
   displayData("Number of grade", grade.length);
}

fetchData()