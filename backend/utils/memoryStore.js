// In-memory fallback store when MongoDB is unavailable
let inMemoryStories = [];
let inMemoryUsers = [];
let idCounter = 0;

const generateId = () => {
  idCounter += 1;
  return `${Date.now()}-${idCounter}`;
};

const addStories = {
  find: (query = {}) => {
    return inMemoryStories.filter(s => s.enabled !== false);
  },
  findOne: (query) => {
    if (query._id) {
      return inMemoryStories.find(s => s._id === query._id);
    }
    if (query.url) {
      return inMemoryStories.find(s => s.url === query.url);
    }
    return null;
  },
  findById: (id) => {
    return inMemoryStories.find(s => s._id === id);
  },
  create: (story) => {
    const newStory = { ...story, _id: generateId(), createdAt: new Date(), updatedAt: new Date() };
    inMemoryStories.push(newStory);
    return newStory;
  },
  findByIdAndUpdate: (id, updateData) => {
    const index = inMemoryStories.findIndex(s => s._id === id);
    if (index !== -1) {
      inMemoryStories[index] = { ...inMemoryStories[index], ...updateData, updatedAt: new Date() };
      return inMemoryStories[index];
    }
    return null;
  },
  countDocuments: (query) => {
    return inMemoryStories.filter(s => s.enabled !== false).length;
  }
};

const addUsers = {
  findOne: (query) => {
    if (query.email) {
      return inMemoryUsers.find(u => u.email === query.email);
    }
    return null;
  },
  findById: (id) => {
    return inMemoryUsers.find(u => u._id === id);
  },
  create: (user) => {
    const newUser = { ...user, _id: generateId(), bookmarks: [], createdAt: new Date(), updatedAt: new Date() };
    inMemoryUsers.push(newUser);
    return newUser;
  },
  findByIdAndUpdate: (id, updateData) => {
    const index = inMemoryUsers.findIndex(u => u._id === id);
    if (index !== -1) {
      inMemoryUsers[index] = { ...inMemoryUsers[index], ...updateData, updatedAt: new Date() };
      return inMemoryUsers[index];
    }
    return null;
  }
};

module.exports = { inMemoryStories, inMemoryUsers, addStories, addUsers };
