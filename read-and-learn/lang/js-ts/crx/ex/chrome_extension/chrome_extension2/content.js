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
  console.log("Filling text area with:", text);
  if (textArea) {
    textArea.value = text;
    const inputEvent = new Event("input", { bubbles: true });
    textArea.dispatchEvent(inputEvent);
  } else {
    console.error("Textarea not found!");
  }
}

function clickSubmit() {
  const submitButton = document.querySelector("button[type=\"submit\"]");
  console.log("Clicking submit button...");
  if (submitButton) {
    submitButton.click();
  } else {
    console.error("Submit button not found!");
  }
}

function waitForResponse(callback) {
  console.log("Waiting for response...");
  const observer = new MutationObserver((mutations) => {
    const responseContainer = document.querySelector(".response");
    if (responseContainer && responseContainer.textContent.length > 0) {
      console.log("Response received:", responseContainer.textContent);
      observer.disconnect();
      callback();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function processNextChapter() {
  if (currentIndex < chapters.length) {
    console.log("Processing chapter", currentIndex + 1);
    fillTextArea(chapters[currentIndex]);
    clickSubmit();
    waitForResponse(() => {
      currentIndex++;
      processNextChapter();
    });
  } else {
    console.log("All chapters processed.");
  }
}

// Start the process
console.log("Starting chapter processing...");
processNextChapter();
