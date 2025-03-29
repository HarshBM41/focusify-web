const apiKey = process.env.API_KEY;
var base_Search_URL = "https://www.googleapis.com/youtube/v3/search?";
var search_tag = "&q=";
var type_tag = "&type=video";
var part_tag = "&part=snippet";
var maxResults = "&maxResults=3";
var input;
var finalURL;
var vidEmbedURLs = [];
var parent = document.getElementsByClassName("container")[0];
var child = document.getElementsByClassName("results-container")[0];

function searchFromInput() {
    input = document.getElementById("search-input").value;
    finalURL = base_Search_URL + "key=" + apiKey+ search_tag + input + type_tag + part_tag + maxResults;
    console.log(finalURL);
    fetch(finalURL)
        .then(response => {
            if (!response.ok) {
               alert("Please make sure the keywords are valid alphanumeric characters.");
            }
            return response.json()
        })
        .then(data => {
            console.log(data);
            var temp = data.items.length;
            console.log(temp)
            if (data.items.length > 3) {
                temp = 3;
            }
            console.log(child);
            child.innerHTML = "";
            for (var i = 0; i < temp; i++) {
                var videoID = data.items[i].id.videoId;
                var vidEmbed_URL = "https://www.youtube.com/embed/" + videoID;
                vidEmbedURLs.push(vidEmbed_URL);
                var iframe = document.createElement('iframe');

                /* Use this ID tag later to provide user with the option of removing videos they would not like to see*/
                iframe.id = "video" + i;
                /*  ___________________________________________________-*/
                
                iframe.title = data.items[i].snippet.title;
                iframe.className = "embedVid";
                iframe.width = "720";
                iframe.height = "360";
                iframe.src = vidEmbed_URL;
                iframe.referrerPolicy = "no-referrer-when-downgrade";
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;
                child.appendChild(iframe);
                child.appendChild(document.createElement("br"));
                child.appendChild(document.createElement("br"));
                child.appendChild(document.createElement("br"));
                child.appendChild(document.createElement("br"));
            }
            parent.appendChild(child);
            console.log(vidEmbedURLs);
        });
    }

document.getElementById("search-button").addEventListener("click", searchFromInput);
