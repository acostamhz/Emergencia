import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(
    filePath: string,
  ): Promise<string> {
    const result =
      await cloudinary.uploader.upload(
        filePath,
        {
          folder: 'cali-emergencia',
          resource_type: 'image',
        },
      );

    return result.secure_url;
  }

  async deleteImage(
    imageUrl: string,
  ): Promise<void> {
    try {
      const uploadMarker = '/upload/';

      const uploadIndex =
        imageUrl.indexOf(uploadMarker);

      if (uploadIndex === -1) {
        return;
      }

      let publicId = imageUrl.substring(
        uploadIndex + uploadMarker.length,
      );

      // Elimina la versión de Cloudinary:
      // /upload/v123456789/...
      if (publicId.startsWith('v')) {
        const versionEnd =
          publicId.indexOf('/');

        if (versionEnd !== -1) {
          publicId = publicId.substring(
            versionEnd + 1,
          );
        }
      }

      // Elimina la extensión (.jpg, .png, etc.)
      publicId = publicId.replace(
        /\.[^/.]+$/,
        '',
      );

      if (!publicId) {
        return;
      }

      await cloudinary.uploader.destroy(
        publicId,
        {
          resource_type: 'image',
        },
      );

      console.log(
        `Fotografía eliminada de Cloudinary: ${publicId}`,
      );
    } catch (error) {
      console.error(
        'No se pudo eliminar la fotografía de Cloudinary:',
        error,
      );
    }
  }
}