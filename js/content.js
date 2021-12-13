$.get( "../CONTENT.md", function( data ) {
    let cont = document.getElementById("content-info");
    var converter = new showdown.Converter();
    text = `${data}`;
    html = converter.makeHtml(text);
    cont.innerHTML = (`${html}`)       
},'text');