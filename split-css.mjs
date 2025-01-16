import fs from "fs-extra";
import path from "path";
import { glob } from "glob";
import postcss from "postcss";
import purgeCssPlugin from "@fullhuman/postcss-purgecss"; // Import correctly

const massiveCSSFile = "./src/styles/Adminpanel.css"; // Path to the massive CSS file
const outputDir = "./src/styles/generated-styles"; // Directory to store split CSS files

// Function to extract CSS for a specific TSX file
const extractCSSForFile = async (tsxFile) => {
  const fileName = path.basename(tsxFile, ".tsx");
  const cssOutputPath = path.join(outputDir, `${fileName}.css`);

  try {
    // Read the massive CSS file
    const cssContent = fs.readFileSync(massiveCSSFile, "utf8");

    // Use PurgeCSS to process the CSS file
    const result = await postcss([
      purgeCssPlugin({
        content: [tsxFile], // Scan this TSX file
        defaultExtractor: (content) =>
          content.match(/[\w-/:]+(?<!:)/g) || [], // Extract class names
      }),
    ]).process(cssContent, { from: undefined });

    // Write the extracted CSS to the output file
    fs.outputFileSync(cssOutputPath, result.css);
    console.log(`Extracted CSS for ${fileName} -> ${cssOutputPath}`);
  } catch (error) {
    console.error(`Error processing ${tsxFile}:`, error);
  }
};

// Main function to process all TSX files
const processAllFiles = async () => {
  try {
    // Clear the output directory
    fs.emptyDirSync(outputDir);

    // Find all TSX files
    const tsxFiles = await glob.sync("./**/*.tsx", { ignore: "**/node_modules/**" });

    // Process each TSX file
    for (const tsxFile of tsxFiles) {
      await extractCSSForFile(tsxFile);
    }

    console.log("CSS extraction complete.");
  } catch (error) {
    console.error("Error in processing files:", error);
  }
};

// Run the script
processAllFiles();
