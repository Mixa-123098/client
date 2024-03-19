import { makeObservable, observable, action } from "mobx";

class PhotoStore {
  fileDataUrl = null;
  fileName = null;
  croppedImg = null;
  croppedProjectId = null;
  constructor() {
    makeObservable(this, {
      fileDataUrl: observable,
      fileName: observable,
      croppedImg: observable,
      croppedProjectId: observable,
      setFileDataUrl: action,
      fetchFile: action,
      setFileName: action,
      setCroppedImg: action,
      setCroppedProjectId: action,
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
    this.croppedImg = value;
  }

  async fetchFile() {
    const url = `https://server-2gn8.onrender.com/get-file/${this.fileName}`;
    if (this.fileName !== null) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result;
          this.setFileDataUrl(dataUrl);
        };

        reader.onerror = (error) => {
          console.error("Error reading file:", error);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    }
  }
}

const fileStore = new PhotoStore();
export default fileStore;

// import { makeObservable, observable, action } from "mobx";

// class PhotoStore {
//   fileDataUrl = null;

//   constructor() {
//     makeObservable(this, {
//       fileDataUrl: observable,
//       setFileDataUrl: action,
//       fetchFile: action,
//     });
//   }

//   setFileDataUrl(dataUrl) {
//     this.fileDataUrl = dataUrl;
//   }

//   async fetchFile(fileName) {
//     const url = `https://server-2gn8.onrender.com/get-file/${fileName}`;

//     try {
//       const response = await fetch(url);
//       const blob = await response.blob();

//       const reader = new FileReader();
//       reader.onload = () => {
//         const dataUrl = reader.result;
//         this.setFileDataUrl(dataUrl);
//       };

//       reader.onerror = (error) => {
//         console.error("Error reading file:", error);
//       };
//       reader.readAsDataURL(blob);
//     } catch (error) {
//       console.error("Error fetching file:", error);
//     }
//   }
// }

// const fileStore = new PhotoStore();
// export default fileStore;
