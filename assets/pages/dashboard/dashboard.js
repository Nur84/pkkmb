function text_info(param,smt) {
    var data = { prodi: param,smt:smt }
    $.ajax({
        type: "post",
        data: data,
        url: "./dashboard/text_info",
        success: function (msg) {
            var pesan = JSON.parse(msg)
            $('#mhs-terdaftar').text(numFormat(pesan.mahasiswa_terdaftar))
            $('#kelas_kuliah').text(numFormat(pesan.kelas_kuliah))
            $('#ajar_dosen').text(numFormat(pesan.ajar_dosen))
            $('#krs').text(numFormat(pesan.krs)+" ("+numFormat(pesan.percentage)+"%)")
        }
    })
}
function page_title(params) {
    var data = { smt: params }
    $.ajax({
        type: "post",
        data: data,
        url: "./dashboard/headerData",
        success: function (msg) {
            $("#pageTitle").text("Info Grafik "+msg)
        }
    })
}
function table_info(param,smt) {
    var data = { prodi: param,smt:smt }
    $('#table-info').prepend('<div id="preloader" class="text-black-50">Tunggu. Sedang memuat data...</div>')
    $.ajax({
        type: "post",
        data: data,
        url: "./dashboard/table_info",
        success: function (msg) {
            // var pesan = JSON.parse(msg)
            $('#preloader').remove()
            $('#table-info').prepend('<div id="table-isi"></div>')
            $('#table-isi').html(msg)

        }
    })
}
function load_data() {
    var prodi = $('#fprodi').val()
    var smt = $('#fsmt').val()
    $('#table-isi').remove()
    text_info(prodi,smt)
    table_info(prodi, smt)
    page_title(smt)
}
function numFormat(params) {
    if (typeof Intl === "undefined" || !Intl.NumberFormat) {
    return(params);
    } else {
    var nf = Intl.NumberFormat();
    return nf.format(params);
    }
}

load_data()
$('#fprodi').change(function () {
    load_data()
})
$('#fsmt').change(function () {
    load_data()
})