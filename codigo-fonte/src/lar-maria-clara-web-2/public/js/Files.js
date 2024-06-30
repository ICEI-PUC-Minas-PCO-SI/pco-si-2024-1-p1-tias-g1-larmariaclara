function photoView(e) {

    var input = e.target;
    var reader = new FileReader();
    reader.onload = function(e) {
        var id = input.getAttribute('data-id');
        var img = document.getElementById(id);

        console.log(img);
        img.src = e.target.result;
        img.style.display = 'block';
    };

    reader.readAsDataURL(input.files[0]);
}