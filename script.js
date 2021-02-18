const videoEl = document.getElementById('video');
const startButton = document.getElementById('start');
const selectButton = document.getElementById('select');

// Prompt use to select media stream and pass video to video element
async function selectMediaStream() {
  try {
    videoEl.srcObject = await navigator.mediaDevices.getDisplayMedia();
    console.log(videoEl.srcObject);
    videoEl.onloadedmetadata = () => {
      videoEl.play();
    };
  } catch (error) {
    throw new Error(error);
  }
}

function disableButtons() {
  startButton.disabled = true;
  selectButton.disabled = true;
}

function enableButtons() {
  startButton.disabled = false;
  selectButton.disabled = false;
}

// On application load

startButton.addEventListener('click', async () => {
  disableButtons();

  try {
    await videoEl.requestPictureInPicture();
  } catch (error) {
    console.error(error);
  } finally {
    enableButtons();
  }
});

selectButton.addEventListener('click', async () => {
  disableButtons();

  try {
    await selectMediaStream();
  } catch (error) {
    console.error(error);
  } finally {
    enableButtons();
  }
});
