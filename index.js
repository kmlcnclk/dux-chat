const teacher = { id: 1, name: 'Teacher1' };
const courses = ['Math', 'Science'];
const students = [
  { id: 101, name: 'Student1', teacherId: 1, courses: ['Math'] },
  { id: 102, name: 'Student2', teacherId: 1, courses: ['Science'] },
];

const allCourseMessages = [
  {
    sender: 'you',
    receiver: 'allCourses',
    content: 'textInput',
  },
];

const specificCourseMessages = [
  {
    sender: 'you',
    receiver: 'Math',
    content: 'textInput',
  },
];

const studentMessages = [
  {
    sender: 'you',
    receiver: 'Math',
    content: 'textInput',
  },
];

function sendMessage(sender, receiver, content) {
  messages.push({ sender, receiver, content });
  displayMessages();
}

function displayMessages() {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';

  messages.forEach((message) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message outgoing`;
    messageDiv.innerHTML = `<strong>${message.sender}</strong>: ${message.content}`;
    messagesDiv.appendChild(messageDiv);
  });
}

function displayAllCoursesMessages(messages) {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = '';

  messages.forEach((message) => {
    const messageDiv = document.createElement('div');
    if (message.sender === 'me') {
      messageDiv.className = `message outgoing`;
    } else {
      messageDiv.className = `message coming`;
    }
    messageDiv.innerHTML = `${message.content}`;
    messagesDiv.appendChild(messageDiv);
  });
}

function displaySpecificCourseMessages(messages) {
  const messagesDiv = document.getElementById('messages');
  const messageAreaTitle = document.getElementById('messageAreaTitle');

  messagesDiv.innerHTML = '';

  messages.forEach((message) => {
    if (messageAreaTitle.innerHTML === message.receiver) {
      const messageDiv = document.createElement('div');
      if (message.sender === 'me') {
        messageDiv.className = `message outgoing`;
      } else {
        messageDiv.className = `message coming`;
      }
      messageDiv.innerHTML = `${message.content}`;
      messagesDiv.appendChild(messageDiv);
    }
  });
}

function displayStudentMessages(messages) {
  const messagesDiv = document.getElementById('messages');
  const messageAreaTitle = document.getElementById('messageAreaTitle');

  messagesDiv.innerHTML = '';

  messages.forEach((message) => {
    if (messageAreaTitle.innerHTML === message.receiver) {
      const messageDiv = document.createElement('div');
      if (message.sender === 'me') {
        messageDiv.className = `message outgoing`;
      } else {
        messageDiv.className = `message coming`;
      }
      messageDiv.innerHTML = `${message.content}`;
      messagesDiv.appendChild(messageDiv);
    }
  });
}

function sendGeneralMessage() {
  const textInput = document.getElementById('textInput');

  allCourseMessages.push({
    sender: 'me',
    receiver: 'allCourses',
    content: textInput.value,
  });
  displayAllCoursesMessages(allCourseMessages);

  textInput.value = '';
}

function sendCourseMessage(course) {
  const textInput = document.getElementById('textInput');

  specificCourseMessages.push({
    sender: 'me',
    receiver: course,
    content: textInput.value,
  });

  displaySpecificCourseMessages(specificCourseMessages);

  textInput.value = '';
}

function sendStudentMessage(studentName) {
  const textInput = document.getElementById('textInput');

  const student = students.find((s) => s.name === studentName);
  if (student) {
    studentMessages.push({
      sender: 'me',
      receiver: studentName,
      content: textInput.value,
    });

    displayStudentMessages(studentMessages);
  }

  textInput.value = '';
}

function openModal(event) {
  const modalTitle = document.getElementById('modalTitle');
  const modalItems = document.getElementById('modalItems');

  let innerP = event.target.querySelector('p');

  if (!innerP) {
    innerP = event.target;
  }

  if (innerP) {
    modalItems.innerHTML = '';
    var menuElements = document.querySelectorAll('.menu');

    menuElements.forEach(function (menuElement) {
      menuElement.classList.remove('menu');
    });

    innerP.parentNode.classList.add('menu');
    innerP.classList.add('menu');

    if (innerP.innerHTML === 'Send Message to All Courses') {
      const messageArea = document.getElementById('messageArea');
      messageArea.style.display = 'block';

      const messageAreaTitle = document.getElementById('messageAreaTitle');

      messageAreaTitle.innerHTML = innerP.innerHTML;

      const textButton = document.getElementById('textButton');

      textButton.onclick = function (event) {
        sendGeneralMessage(event);
      };

      displayAllCoursesMessages(allCourseMessages);
    } else if (innerP.innerHTML === 'Send Message to Specific Course') {
      for (let i = 0; i < courses.length; i++) {
        var newDiv = document.createElement('div');
        var newInnerDiv = document.createElement('div');

        newDiv.className = 'modalItem';
        newDiv.onclick = function (event) {
          selectReceiver(event);
        };

        newInnerDiv.innerHTML = courses[i];

        newDiv.appendChild(newInnerDiv);
        modalItems.appendChild(newDiv);
      }
      modalTitle.innerHTML = innerP.innerHTML;
      document.getElementById('modal-container').style.display = 'flex';
    } else if (innerP.innerHTML === 'Send Message to Student') {
      for (let i = 0; i < students.length; i++) {
        var newDiv = document.createElement('div');
        var newInnerDiv = document.createElement('div');

        newDiv.className = 'modalItem';
        newDiv.onclick = function (event) {
          selectReceiver(event);
        };

        newInnerDiv.innerHTML = students[i].name;

        newDiv.appendChild(newInnerDiv);
        modalItems.appendChild(newDiv);
      }
      modalTitle.innerHTML = innerP.innerHTML;
      document.getElementById('modal-container').style.display = 'flex';
    }
  }
}

function closeModal() {
  document.getElementById('modal-container').style.display = 'none';
}

function stopPropagation(event) {
  event.stopPropagation();
}

function selectReceiver(event) {
  const messageArea = document.getElementById('messageArea');
  messageArea.style.display = 'block';

  let innerDiv = event.target.querySelector('div');

  if (!innerDiv) {
    innerDiv = event.target;
  }

  const messageAreaTitle = document.getElementById('messageAreaTitle');

  messageAreaTitle.innerHTML = innerDiv.innerHTML;

  const modalTitle = document.getElementById('modalTitle');

  const textButton = document.getElementById('textButton');

  if (modalTitle.innerHTML === 'Send Message to All Courses') {
    textButton.onclick = function () {
      sendGeneralMessage();
    };
    displayAllCoursesMessages(allCourseMessages);
  } else if (modalTitle.innerHTML === 'Send Message to Specific Course') {
    textButton.onclick = function () {
      sendCourseMessage(innerDiv.innerHTML);
    };
    displaySpecificCourseMessages(specificCourseMessages);
  } else if (modalTitle.innerHTML === 'Send Message to Student') {
    textButton.onclick = function () {
      sendStudentMessage(innerDiv.innerHTML);
    };
    displayStudentMessages(studentMessages);
  }

  closeModal();
}

document.addEventListener('click', function (event) {
  if (event.target === document.getElementById('modal-container')) {
    closeModal();
  }
});
