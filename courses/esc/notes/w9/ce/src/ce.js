const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017/";

async function main() {
    const connection = await MongoClient.connect(url);
    const db = connection.db("sutd");
    // await db.collection("students").drop();

    await createStudents(db);
    await displayStudents(db);

    await connection.close();
}

main().then();

async function createStudents(db) {
    const studentsCol = await db.createCollection("students");

    const students = [];

    for(let i = 0; i < 20; ++i) {
        students.push({
            student_id: i,
            average_grade: 0,
            full_name: `Student #${i}`,
            grades: [],
            term: 0,
        });
    }

    for(let term = 1; term <= 8; ++term) {
        for(const student of students) {
            for (let i = 0; i < 4; ++i)
                student.grades.push(Math.floor(Math.random() * 100));
            ++student.term;
        }
    }

    for(const student of students)
        student.average_grade = student.grades.reduce((prev, current) => prev + current, 0)/student.grades.length;

    await studentsCol.insertMany(students);
}

async function displayStudents(db) {
    const studentsCol = db.collection("students");
    const sortedStudents = await studentsCol.find().sort({average_grade: -1}).toArray();
    console.log(`Student ID \t\t Full Name \t\t Average Grade`)
    for(const {student_id, average_grade, full_name} of sortedStudents)
        console.log(`${student_id} \t\t ${full_name} \t\t ${average_grade}`);
}