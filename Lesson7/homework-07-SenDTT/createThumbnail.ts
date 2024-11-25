import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import cron from "node-cron";
import sgMail from "@sendgrid/mail";
import process from "dotenv/config";

const inputFolder = path.join("input");
const outputFolder = path.join("output");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (num: number, input: number, output: number) => {
    const msg = {
      to: "thithanhsen.doan@miu.edu",
      from: "thithanhsen.doan@gmail.com",
      subject: "Status Report",
      text: `This is an automated email. 
The input folder has ${input} thumbnails.
The output folder has ${output} thumbnails.
Generated ${num} new thumbnails.`,
    };

    (async () => {
        try {
            await sgMail.send(msg);
        } catch (error) {
            console.log("sendEmail: " + error);

            if (error.response) {
              console.error(error.response.body);
            }
        }
    })();
}

try {
  if (!fs.existsSync(inputFolder)) {
    fs.mkdirSync(inputFolder);
  }

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }
} catch (err) {
  console.error(err);
}

const getFiles = (dir) => {
  return fs.readdirSync(dir).filter((file) => {
    return fs.statSync(path.join(dir, file)).isFile();
  });
};

const resizeImage = async (file) => {
  try {
    const inputFile = path.join(inputFolder, file);
    const outputFile = path.join(outputFolder, file);

    await sharp(inputFile).resize({ width: 200 }).toFile(outputFile);

    console.log(`Resized and saved ${file}`);
  } catch (error) {
    console.log(error);
  }
};

const processImages = () => {
  const inputFiles = getFiles(inputFolder);
  const outputFiles = getFiles(outputFolder);

  const missingFiles = inputFiles.filter((file) => !outputFiles.includes(file));

  if (missingFiles.length > 0) {
    missingFiles.forEach((file) => resizeImage(file));
  }

  sendEmail(missingFiles.length, inputFiles.length, outputFiles.length);
};

cron.schedule("*/30 * * * * *", () => {
  console.log("Running resize image cron job...");
  processImages();
});
