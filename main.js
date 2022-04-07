const itSchool = {
  name: "IT School",
  description: "IT Education",
  maxQtyOfStartedGroups: 10,
  maxQtyOfStudentsPerGroup: 15,

  availableCourses: ["Front-end Pro", "Front-end Basic", "Python Basic"],
  startedGroups: [],

  __callbacks: {},

  startLearningGroup(courseName, amountOfStudents) {

    if (this.availableCourses.includes(courseName)) {

      if (amountOfStudents <= this.maxQtyOfStudentsPerGroup) {

        if (!this.startedGroups.includes(courseName)) {
          this.startedGroups.push(courseName);
          this.dispatch("GROUP_STARTED", courseName);

        } else console.log(`Sorry, course ${courseName} is started.`);

      } else console.log(`Sorry, maximum number of students per group is ${this.maxQtyOfStudentsPerGroup}.`);

    } else console.log(`Sorry, course ${courseName} is unavailable.`);
  },

  endLearningGroup(courseName) {

    if (this.startedGroups.includes(courseName)) {
      this.startedGroups = this.startedGroups.filter((startedGroup) => startedGroup.courseName !== courseName);
      this.dispatch("GROUP_ENDED", courseName);

    } else console.log(`There is no such group in the list!`);
  },

  on(eventName, callback) {
    this.__callbacks[eventName] = callback;
  },

  dispatch(eventName, courseName) {
    if (this.__callbacks[eventName]) {
      this.__callbacks[eventName](courseName);
    }
  }
};

itSchool.on(
  "GROUP_STARTED",
  (courseName) => console.log(`О, стартовала новая группа по курсу ${courseName}!`),
);

itSchool.on(
  "GROUP_ENDED",
  (courseName) => console.log(`О, похоже группа по курсу ${courseName} закончила свое обучение!`),
);

// старт групп
itSchool.startLearningGroup("Front-end Pro", 10);
itSchool.startLearningGroup("Front-end Basic", 13);
itSchool.startLearningGroup("Python Basic", 6);

// конец групп
itSchool.endLearningGroup("Front-end Basic");
itSchool.endLearningGroup("Python Basic");