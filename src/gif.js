function giphy() {
  const grabImage = async (input) => {
    try {
      let image = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=9VDhXZ9mqtYWj40QAVT7DGZP0lWTpZdQ&s=${input}`
      );
      let result = await image.json();
      console.log(result.data.images.original.url);
      return result.data.images.original.url
    } catch (error) {
      console.log(error);
    }
  };
  return {grabImage}
}



export const giphyGrabber = giphy();

// giphyGrabber.grabImage('rain')
