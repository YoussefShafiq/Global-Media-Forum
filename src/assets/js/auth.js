// Simple client-side auth and event registration using localStorage
// NOTE: This is a front-end only demo implementation. Replace with a real backend for production.

(function () {
  const STORAGE_KEYS = {
    users: 'emf_users',
    session: 'emf_session',
    registrations: 'emf_registrations',
  };

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
  }
  function write(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  function uid() { return 'id_' + Math.random().toString(36).slice(2) + Date.now().toString(36); }
  function hash(str) { return btoa(unescape(encodeURIComponent(str))); }

  function getUsers() { return read(STORAGE_KEYS.users) || []; }
  function saveUsers(users) { write(STORAGE_KEYS.users, users); }

  function getSession() { return read(STORAGE_KEYS.session); }
  function setSession(session) { write(STORAGE_KEYS.session, session); }
  function clearSession() { localStorage.removeItem(STORAGE_KEYS.session); }

  function getRegistrations() { return read(STORAGE_KEYS.registrations) || []; }
  function saveRegistrations(items) { write(STORAGE_KEYS.registrations, items); }

  // Public API
  const Auth = {
    currentUser() {
      const s = getSession();
      if (!s) return null;
      return getUsers().find(u => u.id === s.userId) || null;
    },
    registerUser({ name, email, password }) {
      email = (email || '').trim().toLowerCase();
      if (!email || !password || !name) throw new Error('Please provide name, email, and password');
      const users = getUsers();
      if (users.some(u => u.email === email)) throw new Error('Email is already registered');
      // WARNING: passwordPlain is stored ONLY for demo purposes. Do not do this in production.
      const user = { id: uid(), name: name.trim(), email, passwordHash: hash(password), passwordPlain: password };
      users.push(user);
      saveUsers(users);
      setSession({ userId: user.id });
      return user;
    },
    login({ email, password }) {
      email = (email || '').trim().toLowerCase();
      const users = getUsers();
      const user = users.find(u => u.email === email && u.passwordHash === hash(password));
      if (!user) throw new Error('Invalid email or password');
      // Backfill passwordPlain if missing
      if (!user.passwordPlain) {
        user.passwordPlain = password;
        saveUsers(users);
      }
      setSession({ userId: user.id });
      return user;
    },
    logout() { clearSession(); },
    requireAuth(redirectTo) {
      if (!Auth.currentUser()) {
        if (redirectTo) window.location.href = redirectTo;
        return false;
      }
      return true;
    },
    registerEvent(payload) {
      const user = Auth.currentUser();
      if (!user) throw new Error('Not authenticated');
      const all = getRegistrations();
      const item = { id: uid(), userId: user.id, createdAt: new Date().toISOString(), ...payload };
      all.push(item);
      saveRegistrations(all);
      return item;
    },
    myRegistrations() {
      const user = Auth.currentUser();
      if (!user) return [];
      return getRegistrations().filter(r => r.userId === user.id);
    }
  };

  // Expose globally
  window.EMFAuth = Auth;
})();
