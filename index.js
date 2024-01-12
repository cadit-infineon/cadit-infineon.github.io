let input = document.getElementById("upload-file");

input.addEventListener("change", updateImageDisplay);

function updateImageDisplay() {
  const curFiles = input.files;
  if (curFiles.length === 0) {
    let msg = "No files currently selected for upload";

  } else {

    for (const file of curFiles) {

      if (/* validFileType(file) */ true) {
        let msg = `File name ${file.name}, file size ${returnFileSize(
          file.size,
        )}.`;
        // console.log(file)
        // console.log(msg)
        file.text().then((msg) => {
          console.log(decode(msg))
        })
      } else {
        let msg = `File name ${file.name}: Not a valid file type. Update your selection.`;
      }
    }
  }
}

function returnFileSize(number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}