export const _photoURItoFormData = (photo, photoType) => {
  // Assume "photo" is the name of the form field the server expects
  var formData = new FormData();
  for (const uri in photo) {
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = photo[uri].uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    switch (photoType) {
      case 1:
        if (uri === "IDCard") {
          formData.append("image", { uri: localUri, name: filename, type });
        }
        break;

      case 2:
        if (uri === "faceImage") {
          formData.append("selfie", { uri: localUri, name: filename, type });
        } else {
          formData.append("id", { uri: localUri, name: filename, type });
        }
        break;
      default:
        break;
    }
  }

  return formData;
};
