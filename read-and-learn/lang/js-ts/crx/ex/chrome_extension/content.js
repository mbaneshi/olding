let chapters = [
  "please elaborate as much as possible in chapter 1",
  "please elaborate as much as possible in chapter 2",
  "please elaborate as much as possible in chapter 3",
  "please elaborate as much as possible in chapter 4",
  "please elaborate as much as possible in chapter 5",
  "please elaborate as much as possible in chapter 6",
  "please elaborate as much as possible in chapter 7",
  "please elaborate as much as possible in chapter 8",
  "please elaborate as much as possible in chapter 9",
  "please elaborate as much as possible in chapter 10",
  "please elaborate as much as possible in chapter 11",
  "please elaborate as much as possible in chapter 12",
  "please elaborate as much as possible in chapter 13",
  "please elaborate as much as possible in chapter 14",
  "please elaborate as much as possible in appendix"
];

let currentIndex = 0;

function fillTextArea(text) {
  const textArea = document.querySelector("textarea, input[type=\"text\"]");
  if (textArea) {
    textArea.value = text;
    const inputEvent = new Event("input", { bubbles: true });
    textArea.dispatchEvent(inputEvent);
  }
}

function clickSubmit() {
  const submitButton = document.querySelector("button[type=\"submit\"]");
  if (submitButton) {
    submitButton.click();
  }
}

function waitForResponse(callback) {
  const observer = new MutationObserver((mutations) => {
    const responseContainer = document.querySelector(".response"); // Assuming response class exists
    if (responseContainer && responseContainer.textContent.length > 0) {
      observer.disconnect();
      callback();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function processNextChapter() {
  if (currentIndex < chapters.length) {
    fillTextArea(chapters[currentIndex]);
    clickSubmit();
    waitForResponse(() => {
      currentIndex++;
      processNextChapter();
    });
  }
}

// Start the process
processNextChapter();
