let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("blogs").doc(blogId);

docRef.get().then((doc) => {
    if(doc.exists){
        setupBlog(doc.data());
    } else{
        location.replace("/");
    }
})

const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('.title');
    const publish = document.querySelector('.published');
    
    banner.style.backgroundImage = `url(${data.bannerImage})`;

    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;

    const article = document.querySelector('.article');
    addArticle(article, data.article);
}

const addArticle = (ele, data) => {
    // splits every sentence in the article to check for headers and images

    data = data.split("\n").filter(item => item.length);// filters out empty \n spaces

    data.forEach(item => {
        // check for heading
        if(item[0] == '#'){
            let hCount = 0;
            let i = 0;
            while(item[i] == '#'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`; //makes a header out of the hashtags next to a phrase, like ##item will make a h2 header
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>` //inserts the element into html
        } 

        //checking for image format
        else if(item[0] == "!" && item[1] == "["){ 
            let seperator;
            for(let i = 0; i <= item.length; i++){
                if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){               
                    seperator = i;
                }
            }

            /* separates the image name and the the image source from the image format that 
            was given when uploaded like ![Bulbasur.jpg](uploads/1666729834859Bulbasur.jpg)
            gets the name from bulbasur.jpg, and the source from 1666729834859Bulbasur.jpg, taking into account 
            the different types of parenthesis like this ![Bulbasur.jpg]separator(uploads/1666729834859Bulbasur.jpg)*/ 

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
        }

        else{
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}