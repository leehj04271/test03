const lisMobile = line2.map((station, i) => {


    if (i < 4) {
        return `<li data-coords="${2 * i + 5}, 2" data-labelpos="N">
<a href="trainInfo.html?statn_nm=${line2[i].statn_nm}">${line2[i] ? line2[i].statn_nm : ''}</a>
</li>`

    }

    else if (i < 21) {
        return `<li data-coords="12, ${i - 1}" data-dir="E" data-labelpos="W">
        <a href="trainInfo.html?statn_nm=${line2[i].statn_nm}">${line2[i] ? line2[i].statn_nm : ''}</a>
        </li>`


    }

    else if (i < 25) {
        return `<li data-coords="${-(i * 2) + 53}, 20" data-dir="S" data-labelpos="S">
        <a href="trainInfo.html?statn_nm=${line2[i].statn_nm}">${line2[i] ? line2[i].statn_nm : ''}</a>
        </li>`
    }

    else if (i < 42) {
        return `<li data-coords="4, ${44 - i}" data-dir="W" data-labelpos="E">
        <a href="trainInfo.html?statn_nm=${line2[i].statn_nm}">${line2[i] ? line2[i].statn_nm : ''}</a>
        </li>`
    }
    else if (i < 43) {
        return `<li data-coords="5,2">
    
        </li>`
    }

})



const coda1 = line2.map((station, i) => {
    if (i === 41) {
        return `<li data-coords="12, 9"></li>`
    }
    if (i > 42 && i < 46) {
        return `<li data-coords="13, ${11 + 40 - i}" data-dir="E" data-labelpos="E">
<a href="trainInfo.html?statn_nm=${line2[i].statn_nm}">${line2[i] ? line2[i].statn_nm : ''}</a>
</li>`
    }
})


const coda2 = line2.map((station, i) => {
    if (i === 46) {
        return `<li data-coords="4, 11"></li>`
    }
    if (i > 46) {
        return `<li data-coords="3, ${11 - 46 + i}" data-dir="W" data-labelpos="W">
<a href="trainInfo.html?statn_nm=${line2[i].statn_nm}">${line2[i] ? line2[i].statn_nm : ''}</a>
</li>`
    }
})



const lisPc = line2.map((station, i) => {

    if (i < 9) {
        return `<li data-coords="${10 + i * 2}, 4">
<a href="trainInfo.html?statn_nm=${line2[i].statn_nm}">${line2[i] ? line2[i].statn_nm : ''}</a>
</li>`
    } else if (i < 19) {
        return `<li data-coords=" 27, ${5 + (i - 9)}">
<a href="trainInfo.html?statn_nm=${line2[i].statn_nm}">${line2[i] ? line2[i].statn_nm : ''}</a>
</li>`
    } else if (i < 32) {
        return `<li data-coords="${26 - (i - 19) * 2}, 15 ">
<a href="trainInfo.html?statn_nm=${line2[i].statn_nm}">${line2[i] ? line2[i].statn_nm : ''}</a>
</li>`
    } else if (i < 39) {
        return `<li data-coords="2, ${9 - (i - 37)}">
<a href="trainInfo.html?statn_nm=${line2[i].statn_nm}">${line2[i] ? line2[i].statn_nm : ''}</a>
</li>`
    } else if (i < 43) {
        return `<li data-coords="${2 + (i - 39) * 2}, 4">
<a href="trainInfo.html?statn_nm=${line2[i].statn_nm}">${line2[i] ? line2[i].statn_nm : ''}</a>
</li>`}
})


const getHtmlText = () => {


    if ($(window).width() < 768) {


        const htmlText =
    `<div class="subway-map" data-columns="15" data-rows="24" data-cellSize="50" data-legendId="legend"
data-textClass="text" data-gridNumbers="true" data-grid="true" data-lineWidth="8">

<ul data-color="#82eca7" data-label="jQuery Widgets">
${lisMobile.join('')}
</ul>

<ul data-color="#82eca7">

${coda1.join('')}


</ul>

<ul data-color="#82eca7">

${coda2.join('')}


</ul>


</div>`

        return htmlText

    } else {


        const htmlText = `
<div class="subway-map" data-columns="30" data-rows="20" data-cellSize="50" data-legendId="legend"
data-textClass="text" data-gridNumbers="true" data-grid="false" data-lineWidth="8">

<ul data-color="#82eca7" data-label="jQuery Widgets">
${lisPc.join('')}
</ul>

</div>`
        return htmlText
    }
}


function update() {
    if ($('#wrap').is('.main')) {
        $('#wrap').html('')
        $('#wrap').html(getHtmlText())

        $(".subway-map").subwayMap({
            debug: true
        });

        if ($(window).width() < 1249) {
            $('.subway-map').css("zoom", $(window).width() / $('canvas').width())
        }
    }
}

update()


window.onresize = () => {
    update()
};




$('#wrap').on('click', '.subway-map .text', function (e) {

    e.preventDefault();
    var statn_nm = $(this).text().slice(1, -1)
    console.log(statn_nm)
    localStorage.recentSearch = JSON.stringify(statn_nm)

    const state = { statn_nm: statn_nm };

    history.pushState(state, null);

    $("#wrap").html('');
    $('#wrap').removeClass()
    $('#wrap').addClass('trainInfo')

    $("#wrap").load(`trainInfo.html`);


})


