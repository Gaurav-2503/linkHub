import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';


export async function POST(req) {
  
    const formData = await req.formData();

    if(formData.has('file')) {
      const file = formData.get("file");

      const s3Client = new S3Client({
        region: "ap-south-1",
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY,
          secretAccessKey: process.env.S3_PRIVATE_KEY,
        },
      });

      // for storing the file name in a unique way to avoid collision of file names in s3
      const randId = uniqid(); // this package just generates the unique id's

      const extension = file.name.split(".").pop();
      const newFilename = randId + "." + extension;
    //   console.log(newFilename);

    const chunks = [];

    for await (const chunk of file.stream()) {
        chunks.push(chunk);
    }

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: newFilename,
        ACL: 'public-read',
        Body: Buffer.concat(chunks),
        ContentType: file.type,
      })
    );

    const link = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${newFilename}`

      return Response.json(link);
    }

    
    

}
