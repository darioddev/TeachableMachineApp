import { getDataCollection, saveData , deleteData } from "./firebase.js";

export const stateUser = {
  //Atributos
  users: [],

  //Metodos
  async init() {
    const users = await getDataCollection("users");
    this.users = users.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async getUser(id) {
    const user = await getDataCollection("users", id);
    return user.data();
  },

  async getUsers() {
    const users = await getDataCollection("users");
    return users.docs.map((doc) => ({
      id: doc.id,
      user: doc.data().user,
      password: doc.data().password,
      ...doc.data(),
    }));
  },

  async userExists(user, password) {
    const users = await this.getUsers();
    return users.some(
      (users) => users.user === user && users.password === password
    );
  },

  async saveUser(user) {
    await saveData("users", user);
    this.users.push(user);
  },

  async deleteUser(id) {
    await deleteData(id, "users");
    this.users = this.users.filter((user) => user.id !== id);
  },
}