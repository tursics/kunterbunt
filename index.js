var fillColor = '#fff';

function initEventsToReset(svg, className) {
    var elems = document.getElementsByClassName(className);

    if (elems.length > 0) {
        elems[0].addEventListener('click', function() {
            var svgDoc = svg.contentDocument;
            var pathes = svgDoc.querySelectorAll('path');

            console.log(svgDoc);

            for (p = 0; p < pathes.length; ++p) {
                pathes[p].setAttribute('fill', '#fff');
            }
        });
    }
}

function initEventsToSwatches(className) {
    var elems = document.getElementsByClassName(className);

    for (var e = 0; e < elems.length; ++e) {
        elems[e].addEventListener('click', function() {
            var actives = document.getElementsByClassName('active');
            if (actives.length > 0) {
                actives[0].classList.remove('active');
            }
            this.classList.add('active');
            fillColor = window.getComputedStyle(this).getPropertyValue('background-color');
        });
    }
}

function initEventsOfVector(svg) {
    var pathes = svg.querySelectorAll('path');

    for (p = 0; p < pathes.length; ++p) {
        pathes[p].addEventListener('click', function() {
            this.setAttribute('fill', fillColor);
        });
    }
}

window.addEventListener('load', function() {
    initEventsToReset(document.getElementById('graphic'), 'reset');
    initEventsToSwatches('swatch');
    initEventsOfVector(document.querySelector('svg'));
});
