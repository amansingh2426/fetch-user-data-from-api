const userList = document.getElementById('user-list');
const errorDiv = document.getElementById('error');
const reloadBtn = document.getElementById('reload-btn');

function displayUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
    userList.innerHTML += `
      <div class="user">
        <strong>${user.name}</strong><br>
        <span>Email: ${user.email}</span><br>
        <span>Address: ${address}</span>
      </div>
    `;
  });
}

function showError(message) {
  errorDiv.textContent = message;
}

function clearError() {
  errorDiv.textContent = '';
}

function fetchUsers() {
  clearError();
  userList.innerHTML = 'Loading...';
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(users => {
      displayUsers(users);
    })
    .catch(error => {
      userList.innerHTML = '';
      showError('Failed to load user data. Please check your network connection and try again.');
      console.error(error);
    });
}

reloadBtn.addEventListener('click', fetchUsers);

// Fetch users on initial page load
fetchUsers();
