import { makeAutoObservable, runInAction } from "mobx";
import { API_URL } from "../config/api";

class LanguagesStore {
  languages = [
    { code: "en", name: "English", is_builtin: true },
    { code: "ua", name: "Ukrainian", is_builtin: true },
    { code: "sk", name: "Slovak", is_builtin: true },
  ];
  isLoading = false;
  hasFetched = false;

  constructor() {
    makeAutoObservable(this);
  }

  async refresh() {
    this.hasFetched = false;
    await this.fetchLanguages();
  }

  async fetchLanguages() {
    if (this.hasFetched || this.isLoading) return;
    this.isLoading = true;
    try {
      const response = await fetch(`${API_URL}/languages`);
      const data = await response.json();
      runInAction(() => {
        this.languages = data;
        this.hasFetched = true;
      });
    } catch (error) {
      console.error("Error fetching languages:", error);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

const languagesStore = new LanguagesStore();
export default languagesStore;
