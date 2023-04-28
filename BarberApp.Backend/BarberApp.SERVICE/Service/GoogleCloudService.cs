using Google.Cloud.Storage.V1;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace BarberApp.Service.Service
{
    public class GoogleCloudService
    {
        public static string SaveImage(byte[] byteArrayImage)
        {
            string bucketName = "marcaimages";
            string path = @"Credentials\marcaiCredentialGoogle.json";
            string baseUrl = @"https://storage.googleapis.com/marcaimages/";
            string fileName = Guid.NewGuid() + "." + "jpg";

            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", path);
            StorageClient storage = StorageClient.Create();
            storage.UploadObject(bucketName, fileName, null, new MemoryStream(byteArrayImage)).ToString();          
            string result = baseUrl + fileName;
            return result;
        }
    }
}