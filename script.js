const loginTab = document.querySelector("#login-tab");
const registerTab = document.querySelector("#register-tab");
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");
const message = document.querySelector("#message");
const authCard = document.querySelector("#auth-card");
const dashboardCard = document.querySelector("#dashboard-card");
const dashboardTitle = document.querySelector("#dashboard-title");
const userName = document.querySelector("#user-name");
const userEmail = document.querySelector("#user-email");
const logoutButton = document.querySelector("#logout-button");

const usersKey = "loginAuthDemoUsers";
const currentUserKey = "loginAuthDemoCurrentUser";

function getUsers() {
  return JSON.parse(localStorage.getItem(usersKey)) || [];
}

function saveUsers(users) {
  localStorage.setItem(usersKey, JSON.stringify(users));
}

function setCurrentUser(user) {
  localStorage.setItem(currentUserKey, JSON.stringify(user));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(currentUserKey));
}

function clearCurrentUser() {
  localStorage.removeItem(currentUserKey);
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
}

function clearMessage() {
  message.textContent = "";
  message.className = "message";
}

function showTab(tabName) {
  const isLogin = tabName === "login";

  loginTab.classList.toggle("active", isLogin);
  registerTab.classList.toggle("active", !isLogin);
  loginForm.classList.toggle("active", isLogin);
  registerForm.classList.toggle("active", !isLogin);
  clearMessage();
}

function showDashboard(user) {
  authCard.classList.add("hidden");
  dashboardCard.classList.remove("hidden");
  dashboardTitle.textContent = `Welcome, ${user.name}`;
  userName.textContent = user.name;
  userEmail.textContent = user.email;
}

function showAuth() {
  dashboardCard.classList.add("hidden");
  authCard.classList.remove("hidden");
  showTab("login");
}

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("#register-name").value.trim();
  const email = document.querySelector("#register-email").value.trim().toLowerCase();
  const password = document.querySelector("#register-password").value;

  if (!name || !email || password.length < 6) {
    showMessage("Please complete all fields. Password must be at least 6 characters.", "error");
    return;
  }

  const users = getUsers();
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    showMessage("An account with this email already exists.", "error");
    return;
  }

  const passwordHash = await hashPassword(password);
  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  registerForm.reset();
  showTab("login");
  showMessage("Account created. You can now log in.", "success");
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#login-email").value.trim().toLowerCase();
  const password = document.querySelector("#login-password").value;
  const users = getUsers();
  const user = users.find((item) => item.email === email);

  if (!user) {
    showMessage("No account found with this email.", "error");
    return;
  }

  const passwordHash = await hashPassword(password);

  if (passwordHash !== user.passwordHash) {
    showMessage("Incorrect password.", "error");
    return;
  }

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  setCurrentUser(safeUser);
  loginForm.reset();
  showDashboard(safeUser);
});

logoutButton.addEventListener("click", () => {
  clearCurrentUser();
  showAuth();
  showMessage("You have logged out.", "success");
});

loginTab.addEventListener("click", () => showTab("login"));
registerTab.addEventListener("click", () => showTab("register"));

const currentUser = getCurrentUser();

if (currentUser) {
  showDashboard(currentUser);
} else {
  showAuth();
}
