function labnolIframe(div) {
    var videoSource = div.getAttribute('videosource');
    var videoId = div.dataset.id;

    if (videoSource === 'youtube') {
        // Create a YouTube iframe
        var youtubeIframe = document.createElement('iframe');
        var thumbnailImg = div.querySelector('img'); // Get the thumbnail image
        var width = thumbnailImg.width;
        var height = thumbnailImg.height - 50;
        
        youtubeIframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1');
        youtubeIframe.setAttribute('width', width);
        youtubeIframe.setAttribute('height', height);
        youtubeIframe.setAttribute('frameborder', '0');
        youtubeIframe.setAttribute('allowfullscreen', '1');
        youtubeIframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');

        // Replace the div with the YouTube iframe
        div.parentNode.replaceChild(youtubeIframe, div);
    } else if (videoSource === 'aws') {
        // Create an AWS video player (modify this part based on your AWS video player implementation)
        // Example: You can create an HTML5 video element for AWS videos
        var awsVideo = document.createElement('video');
        awsVideo.setAttribute('src', videoId);
        awsVideo.setAttribute('controls', 'controls');
        awsVideo.style.width = '100%'; // Set the width to 100% for full width
        
        // Replace the div with the AWS video element
        div.parentNode.replaceChild(awsVideo, div);
    }
}

function initYouTubeVideos() {
    var playerElements = document.querySelectorAll('.youtube-player');
    for (var n = 0; n < playerElements.length; n++) {
        var div = playerElements[n];
        div.onclick = function () {
            labnolIframe(this);
        };

        // Create a thumbnail image for YouTube videos
        if (div.getAttribute('videosource') === 'youtube') {
            var thumbnailImg = document.createElement('img');
            thumbnailImg.src = 'https://img.youtube.com/vi/' + div.dataset.id + '/hqdefault.jpg';
            div.appendChild(thumbnailImg);
        }

        // Create a play button overlay
        var playButton = document.createElement('div');
        playButton.setAttribute('class', 'play-button');
        div.appendChild(playButton);
    }
}

document.addEventListener('DOMContentLoaded', initYouTubeVideos);
