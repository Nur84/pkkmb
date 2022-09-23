function hitung() {
    $('#pesan_content').remove()
    $('#pesan').append('<div id="pesan_content" class="alert alert-primary" role="alert"><span id="isipesan"></span></div>')
    var angkatan = $('#angkatan').val()
    var prodi = $('#fprodi').val()
    $.ajax({
        type: "post",
        url: "./hitungtranskrip",
        data: { angkatan: angkatan, prodi: prodi },
        success: function (msg) {
            var pesan = JSON.parse(msg)
            console.log(pesan.error_code)
            if (pesan.error_code=='0') {
                $('#isipesan').text('Perhitungan transkrip angkatan berhasil')
            } else if(pesan.error_code=='236'){
                $('#isipesan').text(pesan.error_desc)
            }
            
        }
    })
}