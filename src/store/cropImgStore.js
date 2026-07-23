import { makeObservable, observable, action } from "mobx";
import { API_URL } from "../config/api";

class PhotoStore {
  fileDataUrl = null;
  fileName = null;
  croppedImg = null;
  croppedProjectId = null;
  // Bumped after a crop is successfully uploaded. Crop-and-replace uploads
  // reuse the original filename, so the URL never changes and React/the
  // browser has no reason to refetch it — components that display these
  // images append this as a cache-busting query param and re-render when it
  // changes (see CropImgesComponent.js).
  savedVersion = 0;

  constructor() {
    makeObservable(this, {
      fileDataUrl: observable,
      fileName: observable,
      croppedImg: observable,
      croppedProjectId: observable,
      savedVersion: observable,
      setFileDataUrl: action,
      fetchFile: action,
      setFileName: action,
      setCroppedImg: action,
      setCroppedProjectId: action,
      bumpSavedVersion: action,
      resetCrop: action,
    });
  }

  setFileDataUrl(dataUrl) {
    this.fileDataUrl = dataUrl;
  }
  setFileName(value) {
    this.fileName = value;
  }
  setCroppedImg(value) {
    this.croppedImg = value;
  }
  setCroppedProjectId(value) {
    this.croppedProjectId = value;
  }
  bumpSavedVersion() {
    this.savedVersion += 1;
  }
  // Clears the in-progress crop (result image + source data URL) without
  // touching fileName/croppedProjectId, which the next crop click overwrites
  // anyway. Called when the modal is dismissed or a save completes, so an
  // abandoned or just-saved crop can never resurface in a later save.
  resetCrop() {
    this.croppedImg = null;
    this.fileDataUrl = null;
  }

  async fetchFile() {
    const url = `${API_URL}/get-file/${this.fileName}`;
    if (this.fileName === null) {
      return;
    }
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const reader = new FileReader();
      const dataUrl = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
      });

      this.setFileDataUrl(dataUrl);
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  }
}

const fileStore = new PhotoStore();
export default fileStore;
