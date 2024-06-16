import {ImageExtension, ImageQuality} from "../constants/enums/Image";

export const createCardImageUrl = (
  url: string | undefined, 
  quality: ImageQuality = ImageQuality.LOW, 
  extension: ImageExtension = ImageExtension.WEBP
) => {
    return `${url}/${quality}.${extension}`;
}

export const createSymbolLogoUrl = (
  url: string | undefined, 
  extension: ImageExtension = ImageExtension.WEBP
) => {
    return `${url}.${extension}`;
}