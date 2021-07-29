let videos_div = document.getElementById("videos_div");

async function trending() {
    videos_div.innerHTML = null;
    try {
        let res = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=IN&maxResults=25&key=AIzaSyBz2XSVsRAIC_DnkBWT8NFQY5-n2ti8vyY&maxResults=20`
        );


        let data = await res.json();

        console.log(data);

        let { items } = data;

        items.forEach(({ id: lol }) => {
            console.log(lol);

            let div = document.createElement("div");

            div.innerHTML = `<iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/${lol}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>`;

            videos_div.append(div);
        });
    } catch (error) {
        console.log(error);
    }
}

trending();


async function findVideos(e) {
    e.preventDefault();
    videos_div.innerHTML = null;
    try {
        let input = document.getElementById("input").value;
        let res = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?q=${input}&key=AIzaSyBz2XSVsRAIC_DnkBWT8NFQY5-n2ti8vyY&maxResults=20&type=video`
        );
        let data = await res.json();

        let { items } = data;

        items = items.filter((el) => {
            return el.id.videoId != undefined;
        });

        items.forEach(({ id: { videoId } }) => {
            console.log(videoId);

            let div = document.createElement("div");

            div.innerHTML = `<iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/${videoId}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>`;

            videos_div.append(div);
        });
    } catch (error) {
        console.log(error);
    }
}