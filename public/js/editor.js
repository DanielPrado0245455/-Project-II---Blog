const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');


let bannerPath;


bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
})




//using the upload-file module


const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata = new FormData();
        formdata.append('image', file);



        //adds the image to the upload folder from the form data
        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())


        .then(data => {                 //checks if the image is going for a banner image or an image inside the article
            if(uploadType == "image"){  

                addImage(data, file.name);
            } else{
                bannerPath = `${location.origin}/${data}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })
    } else{
        alert("upload Image only");
    }
}


//transforms the image into a format for further use inside the blog page
const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart; // checks position in the article
    let textToInsert = `\r![${alt}](${imagepath})\r`; //inserts data
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
publishBtn.addEventListener('click', () => {
    if(articleField.value.length && blogTitleField.value.length){
        // generates an id for the article

        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for(let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
        }


        // sets up the name of the document that will be added to de firestor db
        let docName= `${blogTitle}-${id}`;
        let date = new Date(); // for published at info

        //access firstore with db variable, and adds al the info of the blog
        db.collection("blogs").doc(docName).set({
            title: blogTitleField.value,
            article: articleField.value,

            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
        .then(() => {


          location.href = `/${docName}`; // when made, it sends you to the finished blog page.

        })
        .catch((err) => {
            console.error(err);
        })
    }
})