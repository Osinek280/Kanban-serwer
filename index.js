const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3333;

let lastFileIndex = 0;

const users = [
  { id: 0, username: "Smith", name: "Szymon", password: "monkey2135" },
  { id: 1, username: "Doe", name: "John", password: "monkasLOL" },
  { id: 2, username: "Smith", name: "Jane", password: "p@ssw0rd" },
  { id: 3, username: "Williams", name: "David", password: "qwerty123" },
  { id: 4, username: "Johnson", name: "Emily", password: "letmein" },
  { id: 5, username: "Brown", name: "Michael", password: "password123" },
];

const Files = [
  {
    id: 0,
    name: 'School',
    type: 'file',
    files: null,
    owner: 0,
    section: ['To do', 'In progress', 'Done'],
    task: [
      {
        id: 0,
        name: 'Study for math test',
        description: 'Review chapters 1-5 and solve practice problems.',
        category: 'To do',
        priority: 'medium',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: 1,
        name: 'Write essay for English class',
        description: 'Choose a topic and draft an outline for the essay.',
        category: 'To do',
        priority: 'high',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: 2,
        name: 'Complete science experiment',
        description: 'Gather materials and conduct the experiment following the procedure.',
        category: 'In progress',
        priority: 'medium',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: 3,
        name: 'Prepare presentation for history project',
        description: 'Research the topic and create slides for the presentation.',
        category: 'In progress',
        priority: 'low',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: 4,
        name: 'Submit homework assignments',
        description: 'Complete and submit the assigned homework tasks.',
        category: 'Done',
        priority: 'low',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: 5,
        name: 'Review study notes for upcoming quiz',
        description: 'Go through the notes and summarize key concepts.',
        category: 'Done',
        priority: 'medium',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
    ],
  },
  {
    id: 1,
    name: 'Work',
    type: 'file',
    files: null,
    owner: 0,
    section: ['To do', 'In progress', 'Done', 'home'],
    task: [
      {
        id: 0,
        name: 'Prepare monthly report',
        description: 'Gather data and analyze performance to create the report.',
        category: 'To do',
        priority: 'high',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: 1,
        name: 'Attend team meeting',
        description: 'Participate in the weekly team meeting and provide updates.',
        category: 'To do',
        priority: 'medium',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: 2,
        name: 'Follow up with clients',
        description: 'Contact clients to address their concerns and provide assistance.',
        category: 'In progress',
        priority: 'medium',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: 3,
        name: 'Develop new feature for the app',
        description: 'Write code and perform testing for the new feature implementation.',
        category: 'In progress',
        priority: 'high',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: 4,
        name: 'Finalize project proposal',
        description: 'Review and refine the project proposal document.',
        category: 'Done',
        priority: 'medium',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        id: 5,
        name: 'Attend training workshop',
        description: 'Participate in a professional development workshop.',
        category: 'Done',
        priority: 'low',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
    ],
  },
];

app.post("/register", (req, res) => {
  console.log('POST /register');
  const { username, email, password } = req.body;
  const isUsernameTaken = users.some((user) => user.username === username);
  if (isUsernameTaken) {
    res.status(400).json({ error: "Username already taken" });
    return;
  }
  const newUser = {
    id: users.length,
    username,
    email,
    password,
  };
  users.push(newUser);

  res.status(200).json({ message: "Registration successful", user: newUser });
});


app.post("/files", (req, res) => {
  console.log('POST');
  const fileName = req.body[0];
  Files.push({
    id: Files.length,
    name: fileName,
    files: null,
    section: [],
    task: []
  })
  return res.status(200).end();
});

app.get("/files", (req, res) => {
  console.log('GET');
  const { userId } = req.query;
  const userFiles = Files.filter(file => file.owner === parseInt(userId));
  const kanban = [userFiles, lastFileIndex];
  res.json({ kanban });
});


app.patch("/files/:fileId", (req, res) => {
  console.log('PATCH')
  const fileId = parseInt(req.params.fileId);
  const updatedFile = req.body;
  
  const foundIndex = Files.findIndex(file => file.id === fileId);
  if (foundIndex !== -1) {
    Files[foundIndex] = updatedFile;
    res.status(200).end();
  } else {
    res.status(404).json({ error: "File not found" });
  }

  console.log(Files[foundIndex])
});

app.patch("/lastFileIndex", (req, res) => {
  const { lastFileIndex: newLastFileIndex } = req.body;
  lastFileIndex = newLastFileIndex;
  console.log(lastFileIndex)
  res.status(200).end();
});

app.post("/login", (req, res) => {
  console.log('POST /login');
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.status(200).json({ message: "Login successful", user });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
