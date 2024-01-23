const teacher = { id: 1, name: 'Teacher1' };
const courses = ['Math', 'Science'];
const teachers = [
  { id: 101, name: 'Teacher1', teacherId: 1, courses: ['Math'] },
  { id: 102, name: 'Teacher2', teacherId: 1, courses: ['Science'] },
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

const teacherMessages = [
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

function displayTeacherMessages(messages) {
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

  const messages = document.getElementById('messages');

  messages.scrollTop = messages.scrollHeight;
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

  const messages = document.getElementById('messages');

  messages.scrollTop = messages.scrollHeight;
}

function sendTeacherMessage(teacherName) {
  const textInput = document.getElementById('textInput');

  const teacher = teachers.find((s) => s.name === teacherName);
  if (teacher) {
    teacherMessages.push({
      sender: 'me',
      receiver: teacherName,
      content: textInput.value,
    });

    displayTeacherMessages(teacherMessages);
  }

  textInput.value = '';

  const messages = document.getElementById('messages');

  messages.scrollTop = messages.scrollHeight;
}

function openModal(event) {
  const modalTitle = document.getElementById('modalTitle');
  const modalItems = document.getElementById('modalItems');

  let innerP = event.target.querySelector('p');

  var menuElements = document.querySelectorAll('.menu');

  menuElements.forEach(function (menuElement) {
    menuElement.classList.remove('menu');
  });

  if (event.target.nodeName === 'path') {
    console.log(event.target.nodeName === 'svg');
    innerP = event.target.parentElement.parentElement.lastElementChild;
  }

  if (event.target.nodeName === 'svg') {
    console.log(event.target.nodeName === 'svg');
    innerP = event.target.parentNode.lastElementChild;
  }

  if (!innerP) {
    innerP = event.target;
  }

  if (innerP) {
    modalItems.innerHTML = '';

    innerP.parentNode.classList.add('menu');

    if (innerP.innerHTML === 'See Message from All Courses') {
      const messageArea = document.getElementById('messageArea');
      messageArea.style.display = 'block';

      const messageAreaTitle = document.getElementById('messageAreaTitle');

      messageAreaTitle.innerHTML = innerP.innerHTML;

      const textButton = document.getElementById('textButton');

      textButton.onclick = function (event) {
        sendGeneralMessage(event);
      };

      const textInput = document.getElementById('textInput');

      textInput.disabled = true;

      displayAllCoursesMessages(allCourseMessages);
    } else if (innerP.innerHTML === 'See Message from Specific Course') {
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
    } else if (innerP.innerHTML === 'Send Message to Teacher') {
      for (let i = 0; i < teachers.length; i++) {
        var newDiv = document.createElement('div');
        var newInnerDiv = document.createElement('div');

        newDiv.className = 'modalItem';
        newDiv.onclick = function (event) {
          selectReceiver(event);
        };

        newInnerDiv.innerHTML = teachers[i].name;

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

  if (modalTitle.innerHTML === 'See Message from All Courses') {
    textButton.onclick = function () {
      sendGeneralMessage();
    };

    const textInput = document.getElementById('textInput');

    textInput.disabled = true;

    displayAllCoursesMessages(allCourseMessages);
  } else if (modalTitle.innerHTML === 'See Message from Specific Course') {
    textButton.onclick = function () {
      sendCourseMessage(innerDiv.innerHTML);
    };
    const textInput = document.getElementById('textInput');

    textInput.disabled = true;

    displaySpecificCourseMessages(specificCourseMessages);
  } else if (modalTitle.innerHTML === 'Send Message to Teacher') {
    textButton.onclick = function () {
      sendTeacherMessage(innerDiv.innerHTML);
    };

    const textInput = document.getElementById('textInput');

    textInput.disabled = false;

    displayTeacherMessages(teacherMessages);
  }

  closeModal();
}

document.addEventListener('click', function (event) {
  if (event.target === document.getElementById('modal-container')) {
    closeModal();
  }
});
