const sidebar = document.getElementById('sidebar');
const sidebarContent = document.getElementById('sidebar-content');
const sidebarButton = document.getElementById('sidebarButton');

sidebarButton.addEventListener('click', () => {
    sidebar.classList.toggle('retracted');
    sidebarContent.classList.toggle('expanded');

    // Hide content when sidebar is retracted
    if (sidebar.classList.contains('retracted')) {
        sidebarContent.classList.add('hidden');
    } else {
        sidebarContent.classList.remove('hidden');
    }
});

const addButton = document.querySelector('#add');
const noteContainer = document.querySelector('#noteContainer');
const searchInput = document.querySelector('#searchInput');

const addNewNote = () => {
    const note = document.createElement('div');
    note.classList.add('note');
    const htmlData = `
    <div class="operation">
      <button class="delete hidden"><i class="fa-solid fa-trash"></i></button>
    </div>
    <div class="note-container">
      <div class="title" contenteditable="true" placeholder="Enter note title..."></div>
      <textarea class="sticky"></textarea>
      <div class="timestamp"></div>
    </div>
  `;

    note.insertAdjacentHTML('afterbegin', htmlData);
    const delButton = note.querySelector('.delete');
    const titleElement = note.querySelector('.title');
    const textareaElement = note.querySelector('textarea');
    const timestampElement = note.querySelector('.timestamp');

    const showDeleteButton = () => {
        delButton.classList.remove('hidden');
    };

    const hideDeleteButton = () => {
        delButton.classList.add('hidden');
    };

    const updateTimestamp = () => {
        const timestamp = new Date().toLocaleString();
        timestampElement.textContent = timestamp;
    };

    delButton.addEventListener('click', () => {
        note.remove();
    });

    titleElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            updateTimestamp();
            showDeleteButton();
            titleElement.blur();
            textareaElement.focus();
        }
    });

    titleElement.addEventListener('input', () => {
        if (titleElement.textContent.trim() !== '') {
            showDeleteButton();
        } else {
            hideDeleteButton();
        }
    });

    textareaElement.addEventListener('input', () => {
        if (textareaElement.value.trim() !== '') {
            showDeleteButton();
        } else {
            hideDeleteButton();
        }
    });

    noteContainer.appendChild(note);
    titleElement.focus();
};

addButton.addEventListener('click', () => {
    addNewNote();
});

searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    const notes = noteContainer.querySelectorAll('.note');

    notes.forEach((note) => {
        const titleElement = note.querySelector('.title');
        const textareaElement = note.querySelector('textarea');
        const noteTitle = titleElement.textContent.toLowerCase();
        const noteText = textareaElement.value.toLowerCase();

        if (noteTitle.includes(searchValue) || noteText.includes(searchValue)) {
            note.style.display = 'flex';
        } else {
            note.style.display = 'none';
        }
    });
});

const fetchSavedRedditPosts = () => {
    fetch('fetchReddit.php')
        .then(response => response.json())
        .then(data => {
            let output = '';
            for (let post of data.data.children) {
                output += `<h3>${post.data.title}</h3>`;
                output += `<p>${post.data.selftext}</p>`;
            }
            document.getElementById('posts').innerHTML = output;
        })
        .catch(error => console.error('Error fetching data:', error));
}

document.getElementById('redditIcon').addEventListener('click', function() {
    fetchSavedRedditPosts();
});

const redditIcon = document.getElementById('redditIcon');
const savedRedditPosts = document.getElementById('noteContainer');

// Initially, hide the saved posts
savedRedditPosts.style.display = 'none';

redditIcon.addEventListener('click', () => {
    // Toggle the display of saved Reddit posts
    if(savedRedditPosts.style.display === 'none') {
      savedRedditPosts.style.display = 'block';
    } else {
      savedRedditPosts.style.display = 'none';
    }
});

// Refresh saved Reddit posts every 5 seconds (5000 milliseconds)
setInterval(fetchSavedRedditPosts, 5000);
