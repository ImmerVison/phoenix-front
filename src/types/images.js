// Enum equivalent in JavaScript
export const Source = {
  Wallhaven: "wallhaven",
  Konachan: "konachan",
  Gelbooru: "gelbooru",
  Zerochan: "zerochan",
  AnimePictures: "anime-pictures"
};

export const Purity = {
  SFW: "sfw",
  NSFW: "nsfw"
};

// Image class definition
export class Image {
  constructor(resolution, height, width, source, sample, purity, id) {
    this.resolution = resolution;
    this.height = height;
    this.width = width;
    this.source = source;
    this.sample = sample;
    this.purity = purity;
    this.id = id;
  }

  // Example method to display image info
  displayInfo() {
    console.log(`Image ID: ${this.id}, Resolution: ${this.resolution}, Source: ${this.source}`);
  }
}

// ImageDetail class extending Image
export class ImageDetail extends Image {
  constructor(resolution, height, width, source, sample, purity, id, tags, url, fileSize, imageSource) {
    super(resolution, height, width, source, sample, purity, id);
    this.tags = tags;
    this.url = url;
    this.fileSize = fileSize;
    this.imageSource = imageSource;
  }

  // Example method to display detailed image info
  displayDetailedInfo() {
    this.displayInfo(); // Call the parent class method
    console.log(`Tags: ${this.tags.join(", ")}, URL: ${this.url}`);
  }
}

// Example usage
const exampleImageDetail = new ImageDetail(
    "1920x1080",
    1080,
    1920,
    Source.Gelbooru,
    "sample_image_url",
    Purity.NSFW,
    "12345",
    ["tag1", "tag2"],
    "image_url",
    2048,
    "source_url"
);

exampleImageDetail.displayDetailedInfo();
