const validWhatWeDo = (data) => {
    if (data.title){
        return true;
    }
    return false;
}

const validWhatWeDoToClient = (data) => {
    return data.map((item) => {
        return {
            id: item.id,
            image: item.image,
            blur_image: item.blur_image,
            title: item.title,
        }
    })
}

const validWhatWeDoToDb = (data) => {
    return {
        image: data.image,
        blur_image: data.blur_image,
        title: data.title,
    }
}

module.exports = {
    validWhatWeDo,
    validWhatWeDoToClient,
    validWhatWeDoToDb
}   