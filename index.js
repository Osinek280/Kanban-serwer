const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3333;

const Files = [
  {
    id: 0,
    name: 'School',
    type: 'file',
    files: null,
    section: ['To do', 'In progress', 'Done'],
    task: [
      {
        name: 'Study for math test',
        description: 'Review chapters 1-5 and solve practice problems.',
        category: 'To do',
        priority: 'medium',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        name: 'Write essay for English class',
        description: 'Choose a topic and draft an outline for the essay.',
        category: 'To do',
        priority: 'high',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        name: 'Complete science experiment',
        description: 'Gather materials and conduct the experiment following the procedure.',
        category: 'In progress',
        priority: 'medium',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        name: 'Prepare presentation for history project',
        description: 'Research the topic and create slides for the presentation.',
        category: 'In progress',
        priority: 'low',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        name: 'Submit homework assignments',
        description: 'Complete and submit the assigned homework tasks.',
        category: 'Done',
        priority: 'low',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        name: 'Review study notes for upcoming quiz',
        description: 'Go through the notes and summarize key concepts.',
        category: 'Done',
        priority: 'medium',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
    ]
  },
  {
    id: 1,
    name: 'Work',
    type: 'file',
    files: null,
    section: ['To do', 'In progress', 'Done', 'home'],
    task: [
      {
        name: 'Prepare monthly report',
        description: 'Gather data and analyze performance to create the report.',
        category: 'To do',
        priority: 'high',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        name: 'Attend team meeting',
        description: 'Participate in the weekly team meeting and provide updates.',
        category: 'To do',
        priority: 'medium',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        name: 'Follow up with clients',
        description: 'Contact clients to address their concerns and provide assistance.',
        category: 'In progress',
        priority: 'medium',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        name: 'Develop new feature for the app',
        description: 'Write code and perform testing for the new feature implementation.',
        category: 'In progress',
        priority: 'high',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        name: 'Finalize project proposal',
        description: 'Review and refine the project proposal document.',
        category: 'Done',
        priority: 'medium',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
      {
        name: 'Attend training workshop',
        description: 'Participate in a professional development workshop.',
        category: 'Done',
        priority: 'low',
        Subtasks: ['Take dog for a walk', 'Wash car exterior'],
      },
    ]
  },
];

app.post("/files", (req, res) => {
  console.log('POST');
  const file = req.body;
  Files.push(file);
  console.log(file);
  console.log(Files);
  return res.status(200).end();
});

app.get("/files", (req, res) => {
  console.log('GET');
  res.json({ Files });
});

app.patch("/files/:fileId", (req, res) => {
  const fileId = parseInt(req.params.fileId);
  const updatedFile = req.body;
  
  const foundIndex = Files.findIndex(file => file.id === fileId);
  if (foundIndex !== -1) {
    Files[foundIndex] = { ...Files[foundIndex], ...updatedFile };
    res.status(200).end();
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
