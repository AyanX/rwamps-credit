
const aboutCardValidator=(about)=>{
    const { name,icon ,title,content, bg_color} = about;
    if (!name || !icon || !title || !content || !bg_color) {
      return false; 
    }
    return true; 
}

const aboutCardToClientFormat=(about)=>{
    return {
        id: about.id,
        name: about.name,
        icon: about.icon,
        title: about.title,
        content: about.content,
        bg_color: about.bg_color,
    }
}

const aboutCardToDbFormat=(about)=>{
    return {
        name: about.name,
        icon: about.icon,
        title: about.title,
        content: about.content,
        bg_color: about.bg_color,
    }
}

module.exports={
    aboutCardValidator,
    aboutCardToClientFormat,
    aboutCardToDbFormat
}