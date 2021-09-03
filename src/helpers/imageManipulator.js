import * as ImageManipulator from "expo-image-manipulator";

export const _cropImage = async (image) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    // 2160
    image.localUri || image.uri,
    [
      {
        crop: {
          originX: 0,
          originY: 700,
          height: 1300,
          width: image.width,
        },
      },
    ],
    { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
  );
  return manipResult;
};
