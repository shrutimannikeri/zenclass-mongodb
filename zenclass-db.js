// Design database for Zen class programme

// inserting documents inside the users collection
db.users.insertMany([
  {
    "user-id": 1,
    name: "user1",
    email: "user1@gmail.com",
    "mentor-id": 1,
  },
  {
    "user-id": 2,
    name: "user2",
    email: "user2@gmail.com",
    "mentor-id": 1,
  },
  {
    "user-id": 3,
    name: "user3",
    email: "user3@gmail.com",
    " mentor-id": 1,
  },
  {
    "user-id": 4,
    name: "user4",
    email: "user4@gmail.com",
    "mentor-id": 2,
  },
  {
    "user-id": 5,
    name: "user5",
    email: "user5@gmail.com",
    "mentor-id": 2,
  },
]);
// inserting documents inside the codekata collection
db.codekata.insertMany([
  {
    "user-id": 1,
    no_of_problems_solved: 10,
  },
  {
    "user-id": 2,
    no_of_problems_solved: 20,
  },
  {
    "user-id": 3,
    no_of_problems_solved: 30,
  },
  {
    "user-id": 4,
    no_of_problems_solved: 40,
  },
  {
    "user-id": 5,
    no_of_problems_solved: 50,
  },
]);

// inserting documents inside the attendance collection

db.attendance.insertMany([
  {
    "user-id": 1,
    topic_id: 1,
    present: true,
  },
  {
    "user-id": 2,
    topic_id: 2,
    present: true,
  },
  {
    "user-id": 3,
    topic_id: 3,
    present: false,
  },
  {
    "user-id": 4,
    topic_id: 4,
    present: false,
  },
  {
    "user-id": 5,
    topic_id: 5,
    present: false,
  },
]);

// inserting documents inside the topics collection

db.topics.insertMany([
  {
    topic_id: 1,
    topic: "HTML",
    topic_date: new Date("2020-10-01"),
  },
  {
    topic_id: 2,
    topic: "CSS",
    topic_date: new Date("2020-10-10"),
  },
  {
    topic_id: 3,
    topic: "Javascript",
    topic_date: new Date("2020-10-15"),
  },
  {
    topic_id: 4,
    topic: "React",
    topic_date: new Date("2020-10-20"),
  },
  {
    topic_id: 5,
    topic: "NodeJs",
    topic_date: new Date("2020-10-25"),
  },
  {
    topic_id: 6,
    topic: "Mysql",
    topic_date: new Date("2020-11-25"),
  },
]);

// inserting documents inside the tasks collection

db.tasks.insertMany([
  {
    task_id: 1,
    topic_id: 1,
    "user-id": 1,
    task: "HTML task",
    due_date: new Date("2020-10-05"),
    submitted: true,
  },
  {
    task_id: 2,
    topic_id: 2,
    "user-id": 2,
    task: "CSS task",
    due_date: new Date("2020-10-15"),
    submitted: true,
  },
  {
    task_id: 3,
    topic_id: 3,
    "user-id": 3,
    task: "Javascript task",
    due_date: new Date("2020-10-20"),
    submitted: false,
  },
  {
    task_id: 4,
    topic_id: 4,
    "user-id": 4,
    task: "React task",
    due_date: new Date("2020-10-25"),
    submitted: false,
  },
  {
    task_id: 5,
    topic_id: 5,
    "user-id": 5,
    task: "Node task",
    due_date: new Date("2020-10-30"),
    submitted: false,
  },
]);

// inserting documents inside the companydrives collection
db.company_drives.insertMany([
  {
    "user-id": 1,
    drive_date: new Date("2020-10-16"),
    company_name: "Google",
  },
  {
    "user-id": 1,
    drive_date: new Date("2020-10-10"),
    company_name: "Amazon",
  },
  {
    "user-id": 2,
    drive_date: new Date("2020-10-20"),
    company_name: "Walmart",
  },
  {
    "user-id": 3,
    drive_date: new Date("2020-10-15"),
    company_name: "Zoho",
  },
  {
    "user-id": 4,
    drive_date: new Date("2020-10-30"),
    company_name: "Dell",
  },
]);

// inserting documents inside the mentors collection
db.mentors.insertMany([
  {
    "mentor-id": 1,
    mentor_name: "mentor1",
    mentor_email: "mentor1@gmail.com",
  },
  {
    "mentor-id": 2,
    mentor_name: "mentor2",
    mentor_email: "mentor2@gmail.com",
  },
  {
    "mentor-id": 3,
    mentor_name: "mentor3",
    mentor_email: "mentor3@gmail.com",
  },
  {
    "mentor-id": 4,
    mentor_name: "mentor4",
    mentor_email: "mentor4@gmail.com",
  },
  {
    "mentor-id": 5,
    mentor_name: "mentor5",
    mentor_email: "mentor5@gmail.com",
  },
]);

//use zenclassdb

//1.Find all the topics and tasks which are thought in the month of October

db.topics.aggregate([
  {
    $lookup: {
      from: "tasks",
      let: { id: "$topic_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: {
                $eq: ["$topic_id", "$$id"],
              },
            },
          },
        },
        { $project: { _id: 0 } },
      ],
      as: "task_topic",
    },
  },
  { $addFields: { month: { $month: "$topic_date" } } },
  { $match: { month: 10 } },
  { $project: { _id: 0, month: 0 } },
]);

//2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

db.company_drives.find({
  drive_date: {
    $gte: ISODate("2020-10-05T00:00:00Z"),
    $lte: ISODate("2020-10-31T00:00:00Z"),
  },
});

//3.Find all the company drives and students who are appeared for the placement.
db.company_drives.aggregate([
    {
      $lookup: {
        from: "users",
        let: { id: "$user-id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: {
                  $eq: ["$user-id", "$$id"],
                },
              },
            },
          },
          { $project: { _id: 0, "user-id": 0 } },
        ],
        as: "student_info",
      },
    },
    { $project: { _id: 0 } },
  ])
  .pretty();

//4.Find the number of problems solved by the user in codekata

db.users.aggregate([
    {
      $lookup: {
        from: "codekata",
        let: { id: "$user-id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: {
                  $eq: ["$user-id", "$$id"],
                },
              },
            },
          },
          { $project: { _id: 0, "user-id": 0 } },
        ],
        as: "user_score",
      },
    },

    { $project: { _id: 0, "mentor-id": 0 } },
  ])
  .pretty();

//5.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

db.attendance.aggregate([
    {
      $lookup: {
        from: "users",
        let: { id: "$user-id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$user-id", "$$id"],
              },
            },
          },
          { $project: { _id: 0, "user-id": 0 } },
        ],
        as: "attendence_info",
      },
    },
    {
      $lookup: {
        from: "tasks",
        let: { id: "$user-id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$user-id", "$$id"],
              },
            },
          },
          { $project: { _id: 0, "user-id": 0 } },
        ],
        as: "task_info",
      },
    },
    { $match: { present: false } },
    { $project: { _id: 0 } },
  ])
  .pretty();
