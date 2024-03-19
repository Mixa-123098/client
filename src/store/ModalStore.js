// import { makeAutoObservable, action } from 'mobx';

// class ModalStore {
//   isModalReady = false;
//   delayTimeoutId = null;

//   constructor() {
//     makeAutoObservable(this, {
//       setIsModalReadyWithDelay: action.bound,
//       clearDelayTimeout: action.bound,
//     });
//   }

//   setIsModalReadyWithDelay(value, delay) {
//     if (this.delayTimeoutId) {
//       clearTimeout(this.delayTimeoutId);
//       this.delayTimeoutId = null;
//     }

//     this.delayTimeoutId = setTimeout(() => {
//       this.isModalReady = value;
//       this.delayTimeoutId = null;
//     }, delay);
//   }

//   clearDelayTimeout() {
//     if (this.delayTimeoutId) {
//       clearTimeout(this.delayTimeoutId);
//       this.delayTimeoutId = null;
//     }
//   }
// }

// const modalStore = new ModalStore();

// export default modalStore;
// import { makeAutoObservable, action } from 'mobx';

// class ModalStore {
//   isModalReady = false;
//   delayTimeoutId = null;

//   constructor() {
//     makeAutoObservable(this, {
//       isModalReady: observable,
//       // fileName: observable,
//       setIsModalReadyWithDelay: action.bound,
//       clearDelayTimeout: action.bound,
//     });
//   }

//   setIsModalReadyWithDelay(value, delay) {
//     this.clearDelayTimeout();

//     this.delayTimeoutId = setTimeout(() => {
//       this.isModalReady = value;
//       this.delayTimeoutId = null;
//     }, delay);
//   }

//   clearDelayTimeout() {
//     if (this.delayTimeoutId) {
//       clearTimeout(this.delayTimeoutId);
//       this.delayTimeoutId = null;
//     }
//   }
// }

// const modalStore = new ModalStore();

// export default modalStore;
// import { makeAutoObservable, observable, action } from 'mobx';

// class ModalStore {
//   isModalReady = false;
//   delayTimeoutId = null;

//   constructor() {
//     makeAutoObservable(this, {
//       isModalReady: observable,
//       delayTimeoutId: observable,
//       setIsModalReadyWithDelay: action.bound,
//       clearDelayTimeout: action.bound,
//     });
//   }

//   setIsModalReadyWithDelay(value, delay) {
//     this.clearDelayTimeout();

//     this.delayTimeoutId = setTimeout(() => {
//       this.isModalReady = value;
//       this.delayTimeoutId = null;
//     }, delay);
//   }

//   clearDelayTimeout() {
//     if (this.delayTimeoutId) {
//       clearTimeout(this.delayTimeoutId);
//       this.delayTimeoutId = null;
//     }
//   }
// }

// const modalStore = new ModalStore();

// export default modalStore;
import { makeAutoObservable, observable, action } from "mobx";

class ModalStore {
  isModalReady = false;
  delayTimeoutId = null;

  constructor() {
    makeAutoObservable(this, {
      isModalReady: observable,
      delayTimeoutId: observable,
      setIsModalReadyWithDelay: action.bound,
      clearDelayTimeout: action.bound,
    });
  }

  setIsModalReadyWithDelay(value, delay) {
    this.clearDelayTimeout();

    this.delayTimeoutId = setTimeout(
      action(() => {
        this.isModalReady = value;
        this.delayTimeoutId = null;
      }),
      delay
    );  
  }

  clearDelayTimeout() {
    if (this.delayTimeoutId) {
      clearTimeout(this.delayTimeoutId);
      this.delayTimeoutId = null;
    }
  }
}

const modalStore = new ModalStore();

export default modalStore;
