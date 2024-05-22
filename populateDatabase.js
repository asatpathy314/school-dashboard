import { addDoc, collection } from "firebase/firestore"
import {db} from './firebase.js'
const additions = [
    {
      "grade": "4th Grade",
      "id": "123456",
      "name": "Jane Doe",
      "classes": [{"class": "", "grade": 96.5}]
    },
    {
      "grade": "5th Grade",
      "id": "234567",
      "name": "John Smith",
      "classes": [{"class": "", "grade": 89.4}]
    },
    {
      "grade": "3rd Grade",
      "id": "345678",
      "name": "Emily Johnson",
      "classes": [{"class": "", "grade": 92.1}]
    },
    {
      "grade": "2nd Grade",
      "id": "456789",
      "name": "Michael Brown",
      "classes": [{"class": "", "grade": 87.3}]
    },
    {
      "grade": "1st Grade",
      "id": "567890",
      "name": "Sarah Davis",
      "classes": [{"class": "", "grade": 94.8}]
    },
    {
      "grade": "4th Grade",
      "id": "678901",
      "name": "David Wilson",
      "classes": [{"class": "", "grade": 91.0}]
    },
    {
      "grade": "3rd Grade",
      "id": "789012",
      "name": "Jessica Martinez",
      "classes": [{"class": "", "grade": 88.6}]
    },
    {
      "grade": "5th Grade",
      "id": "890123",
      "name": "James Anderson",
      "classes": [{"class": "", "grade": 95.2}]
    },
    {
      "grade": "2nd Grade",
      "id": "901234",
      "name": "Ava Taylor",
      "classes": [{"class": "", "grade": 90.5}]
    },
    {
      "grade": "1st Grade",
      "id": "012345",
      "name": "Joshua Thomas",
      "classes": [{"class": "", "grade": 86.7}]
    },
    {
      "grade": "4th Grade",
      "id": "112233",
      "name": "Sophia Hernandez",
      "classes": [{"class": "", "grade": 93.1}]
    },
    {
      "grade": "5th Grade",
      "id": "223344",
      "name": "Benjamin Moore",
      "classes": [{"class": "", "grade": 89.9}]
    },
    {
      "grade": "3rd Grade",
      "id": "334455",
      "name": "Olivia Clark",
      "classes": [{"class": "", "grade": 91.8}]
    },
    {
      "grade": "2nd Grade",
      "id": "445566",
      "name": "Ethan Rodriguez",
      "classes": [{"class": "", "grade": 88.2}]
    },
    {
      "grade": "1st Grade",
      "id": "556677",
      "name": "Mia Lewis",
      "classes": [{"class": "", "grade": 94.0}]
    },
    {
      "grade": "4th Grade",
      "id": "667788",
      "name": "Alexander Walker",
      "classes": [{"class": "", "grade": 90.3}]
    },
    {
      "grade": "3rd Grade",
      "id": "778899",
      "name": "Isabella Hall",
      "classes": [{"class": "", "grade": 87.9}]
    },
    {
      "grade": "5th Grade",
      "id": "889900",
      "name": "Daniel Allen",
      "classes": [{"class": "", "grade": 92.7}]
    },
    {
      "grade": "2nd Grade",
      "id": "990011",
      "name": "Charlotte Young",
      "classes": [{"class": "", "grade": 89.4}]
    },
    {
      "grade": "1st Grade",
      "id": "101112",
      "name": "Lucas King",
      "classes": [{"class": "", "grade": 85.6}]
    },
    {
      "grade": "4th Grade",
      "id": "121314",
      "name": "Harper Scott",
      "classes": [{"class": "", "grade": 94.5}]
    },
    {
      "grade": "5th Grade",
      "id": "131415",
      "name": "Jack Green",
      "classes": [{"class": "", "grade": 88.0}]
    },
    {
      "grade": "3rd Grade",
      "id": "141516",
      "name": "Amelia Adams",
      "classes": [{"class": "", "grade": 91.3}]
    },
    {
      "grade": "2nd Grade",
      "id": "151617",
      "name": "Mason Nelson",
      "classes": [{"class": "", "grade": 87.5}]
    },
    {
      "grade": "1st Grade",
      "id": "161718",
      "name": "Evelyn Carter",
      "classes": [{"class": "", "grade": 93.7}]
    },
    {
      "grade": "4th Grade",
      "id": "171819",
      "name": "Logan Mitchell",
      "classes": [{"class": "", "grade": 89.2}]
    },
    {
      "grade": "3rd Grade",
      "id": "181920",
      "name": "Abigail Perez",
      "classes": [{"class": "", "grade": 86.9}]
    },
    {
      "grade": "5th Grade",
      "id": "192021",
      "name": "Jackson Roberts",
      "classes": [{"class": "", "grade": 93.0}]
    },
    {
      "grade": "2nd Grade",
      "id": "202122",
      "name": "Emily White",
      "classes": [{"class": "", "grade": 90.1}]
    },
    {
      "grade": "1st Grade",
      "id": "212223",
      "name": "Sebastian Thompson",
      "classes": [{"class": "", "grade": 85.4}]
    },
    {
      "grade": "4th Grade",
      "id": "232425",
      "name": "Avery Harris",
      "classes": [{"class": "", "grade": 94.2}]
    },
    {
      "grade": "5th Grade",
      "id": "242526",
      "name": "Grayson Martinez",
      "classes": [{"class": "", "grade": 88.5}]
    },
    {
      "grade": "3rd Grade",
      "id": "252627",
      "name": "Ella Lee",
      "classes": [{"class": "", "grade": 91.5}]
    },
    {
      "grade": "2nd Grade",
      "id": "262728",
      "name": "Matthew Hernandez",
      "classes": [{"class": "", "grade": 87.1}]
    },
    {
      "grade": "1st Grade",
      "id": "272829",
      "name": "Lily King",
      "classes": [{"class": "", "grade": 93.3}]
    },
    {
      "grade": "4th Grade",
      "id": "282930",
      "name": "Henry Martinez",
      "classes": [{"class": "", "grade": 89.6}]
    },
    {
      "grade": "3rd Grade",
      "id": "293031",
      "name": "Sofia Hall",
      "classes": [{"class": "", "grade": 86.4}]
    },
    {
      "grade": "5th Grade",
      "id": "303132",
      "name": "Oliver Allen",
      "classes": [{"class": "", "grade": 92.9}]
    },
    {
      "grade": "2nd Grade",
      "id": "313233",
      "name": "Ella Young",
      "classes": [{"class": "", "grade": 90.7}]
    },
    {
      "grade": "1st Grade",
      "id": "323334",
      "name": "Lucas Scott",
      "classes": [{"class": "", "grade": 85.8}]
    }
  ]

const addToFirestore = async () => {
    for (let i = 0; i < additions.length; i++) {
        await addDoc(collection(db, "students"), additions[i]);
    }
}
addToFirestore()
    .then(() => {
        console.log("Added to Firestore successfully!");
    })
    .catch((error) => {
        console.error("Error adding to Firestore:", error);
    });