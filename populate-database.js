import { addDoc, collection } from "firebase/firestore"
import {db} from './firebase.js'

// INSERT default DB Code from Firebase here
const teachers = [
    {
      subject: "History",
      firstName: "John",
      lastName: "Smith",
      fullName: "John Smith",
      title: "Mr.",
      id: "123456",
      email: "john_smith@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "Mathematics",
      firstName: "Jane",
      lastName: "Doe",
      fullName: "Jane Doe",
      title: "Ms.",
      id: "234567",
      email: "jane_doe@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "Science",
      firstName: "Emily",
      lastName: "Johnson",
      fullName: "Emily Johnson",
      title: "Mrs.",
      id: "345678",
      email: "emily_johnson@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "English",
      firstName: "Michael",
      lastName: "Brown",
      fullName: "Michael Brown",
      title: "Mr.",
      id: "456789",
      email: "michael_brown@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "Art",
      firstName: "Sarah",
      lastName: "Davis",
      fullName: "Sarah Davis",
      title: "Ms.",
      id: "567890",
      email: "sarah_davis@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "Physical Education",
      firstName: "David",
      lastName: "Martinez",
      fullName: "David Martinez",
      title: "Mr.",
      id: "678901",
      email: "david_martinez@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "Music",
      firstName: "Olivia",
      lastName: "Garcia",
      fullName: "Olivia Garcia",
      title: "Mrs.",
      id: "789012",
      email: "olivia_garcia@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "Social Studies",
      firstName: "Christopher",
      lastName: "Rodriguez",
      fullName: "Christopher Rodriguez",
      title: "Mr.",
      id: "890123",
      email: "christopher_rodriguez@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "Mathematics",
      firstName: "Jessica",
      lastName: "Hernandez",
      fullName: "Jessica Hernandez",
      title: "Ms.",
      id: "901234",
      email: "jessica_hernandez@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "Science",
      firstName: "Matthew",
      lastName: "Lopez",
      fullName: "Matthew Lopez",
      title: "Mr.",
      id: "012345",
      email: "matthew_lopez@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "History",
      firstName: "Amanda",
      lastName: "Wilson",
      fullName: "Amanda Wilson",
      title: "Mrs.",
      id: "123457",
      email: "amanda_wilson@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "English",
      firstName: "Joshua",
      lastName: "Anderson",
      fullName: "Joshua Anderson",
      title: "Mr.",
      id: "234568",
      email: "joshua_anderson@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "Art",
      firstName: "Isabella",
      lastName: "Thomas",
      fullName: "Isabella Thomas",
      title: "Ms.",
      id: "345679",
      email: "isabella_thomas@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "Physical Education",
      firstName: "Andrew",
      lastName: "Taylor",
      fullName: "Andrew Taylor",
      title: "Mr.",
      id: "456780",
      email: "andrew_taylor@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "Music",
      firstName: "Sophia",
      lastName: "Moore",
      fullName: "Sophia Moore",
      title: "Ms.",
      id: "567891",
      email: "sophia_moore@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "Social Studies",
      firstName: "Daniel",
      lastName: "Martin",
      fullName: "Daniel Martin",
      title: "Mr.",
      id: "678902",
      email: "daniel_martin@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "Mathematics",
      firstName: "Grace",
      lastName: "Lee",
      fullName: "Grace Lee",
      title: "Mrs.",
      id: "789013",
      email: "grace_lee@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "Science",
      firstName: "Liam",
      lastName: "Perez",
      fullName: "Liam Perez",
      title: "Mr.",
      id: "890124",
      email: "liam_perez@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "History",
      firstName: "Mia",
      lastName: "Thompson",
      fullName: "Mia Thompson",
      title: "Ms.",
      id: "901235",
      email: "mia_thompson@thomasjefferson.edu",
      class: ""
    },
    {
      subject: "English",
      firstName: "Noah",
      lastName: "White",
      fullName: "Noah White",
      title: "Mr.",
      id: "012346",
      email: "noah_white@thomasjefferson.edu",
      class: ""
    }
  ];
  
  const students = [
    {
      firstName: "Anujin",
      lastName: "Tsogtjargal",
      fullName: "Anujin Tsogtjargal",
      grade: "Kindergarten",
      id: "345678",
      classes: [{ class: "", grade: 92.3 }]
    },
    {
      firstName: "David",
      lastName: "Smith",
      fullName: "David Smith",
      grade: "1st Grade",
      id: "345679",
      classes: [{ class: "", grade: 88.5 }]
    },
    {
      firstName: "Emily",
      lastName: "Johnson",
      fullName: "Emily Johnson",
      grade: "2nd Grade",
      id: "345680",
      classes: [{ class: "", grade: 95.7 }]
    },
    {
      firstName: "Michael",
      lastName: "Brown",
      fullName: "Michael Brown",
      grade: "3rd Grade",
      id: "345681",
      classes: [{ class: "", grade: 90.4 }]
    },
    {
      firstName: "Sophia",
      lastName: "Garcia",
      fullName: "Sophia Garcia",
      grade: "4th Grade",
      id: "345682",
      classes: [{ class: "", grade: 87.6 }]
    },
    {
      firstName: "Daniel",
      lastName: "Martinez",
      fullName: "Daniel Martinez",
      grade: "5th Grade",
      id: "345683",
      classes: [{ class: "", grade: 89.2 }]
    },
    {
      firstName: "Olivia",
      lastName: "Hernandez",
      fullName: "Olivia Hernandez",
      grade: "Kindergarten",
      id: "345684",
      classes: [{ class: "", grade: 91.1 }]
    },
    {
      firstName: "Matthew",
      lastName: "Lopez",
      fullName: "Matthew Lopez",
      grade: "1st Grade",
      id: "345685",
      classes: [{ class: "", grade: 93.4 }]
    },
    {
      firstName: "Ava",
      lastName: "Gonzalez",
      fullName: "Ava Gonzalez",
      grade: "2nd Grade",
      id: "345686",
      classes: [{ class: "", grade: 92.8 }]
    },
    {
      firstName: "James",
      lastName: "Wilson",
      fullName: "James Wilson",
      grade: "3rd Grade",
      id: "345687",
      classes: [{ class: "", grade: 90.9 }]
    },
    {
      firstName: "Mia",
      lastName: "Anderson",
      fullName: "Mia Anderson",
      grade: "4th Grade",
      id: "345688",
      classes: [{ class: "", grade: 88.7 }]
    },
    {
      firstName: "Christopher",
      lastName: "Thomas",
      fullName: "Christopher Thomas",
      grade: "5th Grade",
      id: "345689",
      classes: [{ class: "", grade: 92.0 }]
    },
    {
      firstName: "Abigail",
      lastName: "Taylor",
      fullName: "Abigail Taylor",
      grade: "Kindergarten",
      id: "345690",
      classes: [{ class: "", grade: 91.3 }]
    },
    {
      firstName: "Joshua",
      lastName: "Moore",
      fullName: "Joshua Moore",
      grade: "1st Grade",
      id: "345691",
      classes: [{ class: "", grade: 89.4 }]
    },
    {
      firstName: "Charlotte",
      lastName: "Jackson",
      fullName: "Charlotte Jackson",
      grade: "2nd Grade",
      id: "345692",
      classes: [{ class: "", grade: 94.6 }]
    },
    {
      firstName: "Anthony",
      lastName: "Martin",
      fullName: "Anthony Martin",
      grade: "3rd Grade",
      id: "345693",
      classes: [{ class: "", grade: 90.7 }]
    },
    {
      firstName: "Isabella",
      lastName: "Lee",
      fullName: "Isabella Lee",
      grade: "4th Grade",
      id: "345694",
      classes: [{ class: "", grade: 87.9 }]
    },
    {
      firstName: "Andrew",
      lastName: "Perez",
      fullName: "Andrew Perez",
      grade: "5th Grade",
      id: "345695",
      classes: [{ class: "", grade: 91.5 }]
    },
    {
      firstName: "Amelia",
      lastName: "Thompson",
      fullName: "Amelia Thompson",
      grade: "Kindergarten",
      id: "345696",
      classes: [{ class: "", grade: 90.2 }]
    },
    {
      firstName: "Jacob",
      lastName: "White",
      fullName: "Jacob White",
      grade: "1st Grade",
      id: "345697",
      classes: [{ class: "", grade: 89.8 }]
    },
    {
      firstName: "Elizabeth",
      lastName: "Harris",
      fullName: "Elizabeth Harris",
      grade: "2nd Grade",
      id: "345698",
      classes: [{ class: "", grade: 94.1 }]
    },
    {
      firstName: "Ethan",
      lastName: "Sanchez",
      fullName: "Ethan Sanchez",
      grade: "3rd Grade",
      id: "345699",
      classes: [{ class: "", grade: 91.2 }]
    },
    {
      firstName: "Ella",
      lastName: "Clark",
      fullName: "Ella Clark",
      grade: "4th Grade",
      id: "345700",
      classes: [{ class: "", grade: 88.3 }]
    },
    {
      firstName: "Benjamin",
      lastName: "Ramirez",
      fullName: "Benjamin Ramirez",
      grade: "5th Grade",
      id: "345701",
      classes: [{ class: "", grade: 93.6 }]
    },
    {
      firstName: "Grace",
      lastName: "Lewis",
      fullName: "Grace Lewis",
      grade: "Kindergarten",
      id: "345702",
      classes: [{ class: "", grade: 91.7 }]
    },
    {
      firstName: "Alexander",
      lastName: "Robinson",
      fullName: "Alexander Robinson",
      grade: "1st Grade",
      id: "345703",
      classes: [{ class: "", grade: 90.5 }]
    },
    {
      firstName: "Sofia",
      lastName: "Walker",
      fullName: "Sofia Walker",
      grade: "2nd Grade",
      id: "345704",
      classes: [{ class: "", grade: 94.0 }]
    },
    {
      firstName: "Liam",
      lastName: "Young",
      fullName: "Liam Young",
      grade: "3rd Grade",
      id: "345705",
      classes: [{ class: "", grade: 91.8 }]
    },
    {
      firstName: "Chloe",
      lastName: "King",
      fullName: "Chloe King",
      grade: "4th Grade",
      id: "345706",
      classes: [{ class: "", grade: 88.9 }]
    },
    {
      firstName: "Lucas",
      lastName: "Wright",
      fullName: "Lucas Wright",
      grade: "5th Grade",
      id: "345707",
      classes: [{ class: "", grade: 92.7 }]
    },
    {
      firstName: "Mila",
      lastName: "Scott",
      fullName: "Mila Scott",
      grade: "Kindergarten",
      id: "345708",
      classes: [{ class: "", grade: 91.9 }]
    },
    {
      firstName: "Noah",
      lastName: "Torres",
      fullName: "Noah Torres",
      grade: "1st Grade",
      id: "345709",
      classes: [{ class: "", grade: 89.3 }]
    },
    {
      firstName: "Harper",
      lastName: "Nguyen",
      fullName: "Harper Nguyen",
      grade: "2nd Grade",
      id: "345710",
      classes: [{ class: "", grade: 93.4 }]
    },
    {
      firstName: "Mason",
      lastName: "Hill",
      fullName: "Mason Hill",
      grade: "3rd Grade",
      id: "345711",
      classes: [{ class: "", grade: 92.5 }]
    },
    {
      firstName: "Aria",
      lastName: "Flores",
      fullName: "Aria Flores",
      grade: "4th Grade",
      id: "345712",
      classes: [{ class: "", grade: 89.6 }]
    },
    {
      firstName: "Logan",
      lastName: "Green",
      fullName: "Logan Green",
      grade: "5th Grade",
      id: "345713",
      classes: [{ class: "", grade: 92.9 }]
    },
    {
      firstName: "Zoe",
      lastName: "Baker",
      fullName: "Zoe Baker",
      grade: "Kindergarten",
      id: "345714",
      classes: [{ class: "", grade: 91.2 }]
    },
    {
      firstName: "Aiden",
      lastName: "Adams",
      fullName: "Aiden Adams",
      grade: "1st Grade",
      id: "345715",
      classes: [{ class: "", grade: 89.1 }]
    },
  ];
  

  const classes = [
    {
      subject: "History",
      grade: "5th Grade",
      name: "Mr. Smith's 5th Grade History Class",
      students: [],
      teacher: ""
    },
    {
      subject: "Mathematics",
      grade: "4th Grade",
      name: "Ms. Johnson's 4th Grade Mathematics Class",
      students: [],
      teacher: ""
    },
    {
      subject: "Science",
      grade: "3rd Grade",
      name: "Mr. Brown's 3rd Grade Science Class",
      students: [],
      teacher: ""
    },
    {
      subject: "English",
      grade: "2nd Grade",
      name: "Mrs. Garcia's 2nd Grade English Class",
      students: [],
      teacher: ""
    },
    {
      subject: "Art",
      grade: "1st Grade",
      name: "Ms. Martinez's 1st Grade Art Class",
      students: [],
      teacher: ""
    },
    {
      subject: "Physical Education",
      grade: "Kindergarten",
      name: "Mr. Hernandez's Kindergarten Physical Education Class",
      students: [],
      teacher: ""
    },
    {
      subject: "Music",
      grade: "5th Grade",
      name: "Ms. Lopez's 5th Grade Music Class",
      students: [],
      teacher: ""
    },
    {
      subject: "Social Studies",
      grade: "4th Grade",
      name: "Mr. Gonzalez's 4th Grade Social Studies Class",
      students: [],
      teacher: ""
    },
    {
      subject: "Mathematics",
      grade: "3rd Grade",
      name: "Mrs. Wilson's 3rd Grade Mathematics Class",
      students: [],
      teacher: ""
    },
    {
      subject: "Science",
      grade: "2nd Grade",
      name: "Mr. Anderson's 2nd Grade Science Class",
      students: [],
      teacher: ""
    },
    {
      subject: "History",
      grade: "1st Grade",
      name: "Ms. Thomas's 1st Grade History Class",
      students: [],
      teacher: ""
    },
    {
      subject: "English",
      grade: "Kindergarten",
      name: "Mrs. Taylor's Kindergarten English Class",
      students: [],
      teacher: ""
    },
    {
      subject: "Art",
      grade: "5th Grade",
      name: "Mr. Moore's 5th Grade Art Class",
      students: [],
      teacher: ""
    },
    {
      subject: "Physical Education",
      grade: "4th Grade",
      name: "Ms. Jackson's 4th Grade Physical Education Class",
      students: [],
      teacher: ""
    },
    {
      subject: "Music",
      grade: "3rd Grade",
      name: "Mrs. Martin's 3rd Grade Music Class",
      students: [],
      teacher: ""
    },
    {
      subject: "Social Studies",
      grade: "2nd Grade",
      name: "Mr. Lee's 2nd Grade Social Studies Class",
      students: [],
      teacher: ""
    },
    {
      subject: "Mathematics",
      grade: "1st Grade",
      name: "Ms. Perez's 1st Grade Mathematics Class",
      students: [],
      teacher: ""
    },
    {
      subject: "Science",
      grade: "Kindergarten",
      name: "Mrs. Thompson's Kindergarten Science Class",
      students: [],
      teacher: ""
    },
    {
      subject: "History",
      grade: "5th Grade",
      name: "Mr. White's 5th Grade History Class",
      students: [],
      teacher: ""
    },
    {
      subject: "English",
      grade: "4th Grade",
      name: "Ms. Harris's 4th Grade English Class",
      students: [],
      teacher: ""
    },
  ];

const addToFirestore = async () => {
    for (let i = 0; i < classes.length; i++) {
        await addDoc(collection(db, "classes"), classes[i]);
    }
};

addToFirestore()
    .then(() => {
        console.log("Added to Firestore successfully!");
    })
    .catch((error) => {
        console.error("Error adding to Firestore:", error);
    });