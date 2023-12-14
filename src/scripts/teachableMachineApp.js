import * as tmImage from '@teachablemachine/image';
import Swal from 'sweetalert2';

export const TeachableMachineApp = {
  URL: "./src/my_model/",
  model: null,
  webcam: null,
  labelContainer: null,
  maxPredictions: null,
  programStopped : false,

  async init() {
    const modelURL = this.URL + "model.json";
    const metadataURL = this.URL + "metadata.json";

    // Load the model and metadata
    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();

    /* Append elements to the DOM
      this.labelContainer = document.getElementById("label-container");
      for (let i = 0; i < this.maxPredictions; i++) {
        this.labelContainer.appendChild(document.createElement("div"));
      }*/

    // Access the webcam
    this.setupWebcam();
  },

  setupWebcam() {
    const flip = true;
    this.webcam = new tmImage.Webcam(200, 200, flip);

    // Request access to the webcam and start playing
    this.webcam
      .setup()
      .then(() => {
        this.webcam.play();
        document
          .getElementById("webcam-container")
          .appendChild(this.webcam.canvas);
        window.requestAnimationFrame(this.loop.bind(this));
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
      });
  },

  async loop() {
    this.webcam.update(); // Update the webcam frame
    await this.predict();
    window.requestAnimationFrame(this.loop.bind(this));
  },

  async predict() {
    const prediction = await this.model.predict(this.webcam.canvas);
    for (let i = 0; i < this.maxPredictions; i++) {
      const className = prediction[i].className;
      const probability = prediction[i].probability.toFixed(2);
      //const classPrediction = `${className}: ${probability}`;
      //this.labelContainer.childNodes[i].innerHTML = classPrediction;

      // Perform actions based on the predicted class
      this.handleClassPrediction(className, probability);
    }
  },

  async handleClassPrediction(className, probability) {
    className = className.toLowerCase();
    if(this.programStopped) return true;

    if (
      parseFloat(probability) > 0.95 &&
      className !== "class 5" &&
      className === document.getElementById("ark").value
    ) {
      this.stopProgram();
      this.cleanupTeachableMachine();
      Swal.close();
      this.programStopped = true;
    }
    return false;
  },

  async showTeachableMachineModal(classget) {
    const { value: formValues } = await Swal.fire({
      title: "Verificacion de indentidad",
      html: `
                <div id="webcam-container"></div>
                <div id="label-container"></div>
                <input type="hidden" id="ark" value="${classget}" >
            `,
      showCloseButton: true,
      showConfirmButton: false,
      didOpen: () => this.init(),
      didClose: () => this.cleanupTeachableMachine(),
    });
    

    if (formValues) {
      Swal.fire(JSON.stringify(formValues));
    }
  },

  cleanupTeachableMachine() {
    if (this.webcam) {
      this.webcam.stop();
    }
  },

  stopProgram() {
  },
};
