const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

const listContacts = async () => {
  // Zwraca tablicę kontaktów.
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  // Zwraca obiekt kontaktu o tym identyfikatorze. Zwraca wartość null, jeśli nie zostanie znaleziony żaden kontakt o tym identyfikatorze.
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result || null;
};

const removeContact = async (id) => {
  // Zwraca obiekt usuniętego kontaktu. Zwraca wartość null, jeśli nie zostanie znaleziony żaden kontakt o tym identyfikatorze.
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (data) => {
  // Zwraca dodany obiekt kontaktu.
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
