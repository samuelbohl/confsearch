import axios from "axios";
import { writeFile } from "fs/promises";

const url = "https://portal.core.edu.au/conf-ranks/";

// Parameters are set as they would be set by the web form
const params = {
  search: "",
  by: "all",
  sort: "atitle",
  do: "Export",
};

// Additional headers
const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
};

// Making the GET request and saving the file
async function downloadAndSaveFile() {
  try {
    const response = await axios.get(url, { params, headers, responseType: "arraybuffer" });

    // Saving the file locally
    const filename = "./init-db/ranks/exported_data.csv"; // or .xlsx, .pdf, etc. depending on the format
    await writeFile(filename, response.data);

    console.log(`File downloaded and saved as ${filename}`);
  } catch (error) {
    console.error("Error downloading or saving file:", error);
  }
}

// Run the function
downloadAndSaveFile().then((_) => console.log("DOWNLOAD COMPLETED"));
