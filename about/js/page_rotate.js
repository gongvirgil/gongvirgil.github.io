$(document).ready(function() {
    var $page = $('.page'),
        pages = $page.length,
        scrolling = false,
        curPage = 1;

    function svgPagination(prev, next, dir, revDir, divider) {
        if (!divider) {
            destroySvg(revDir, prev);
            if (revDir) {
                between(dir, prev);
            } else {
                between(dir, prev - 1);
            }
            createSvg(dir, next, 600, 300);
        } else {
            destroySvg(revDir, prev, 600 / divider);
            if (revDir) {
                between(dir, prev, 150 / divider, 150 / divider, 750 / divider);
            } else {
                between(dir, prev - 1, 150 / divider, 150 / divider, 750 / divider);
            }
            createSvg(dir, next, 600 / divider, 300 / divider);
        }
    }

    function timeoutHell(tempPrev, tempNext, numDir, numDirRev, divider, i) {
        setTimeout(function() {
            svgPagination(tempPrev, tempNext, numDir, numDirRev, divider);
        }, 900 / divider * i);
    }

    function pagination(page, direction) {
        scrolling = true;
        curPage = page;
        var tempPage = page,
            prevPage = +$('.nav--btn.active').attr('data-page'),
            $prevActive = $('.page.active'),
            $newActive = $('.page-' + page),
            numDir = direction === 'down' ? 0 : 1,
            numDirRev = direction === 'down' ? 1 : 0;
        $page.removeClass('inactive active down up');
        $('.nav--btn').removeClass('active');
        $('.nav--btn-' + page).addClass('active');
        $newActive.addClass('active');
        if (Math.abs(prevPage - curPage) > 1) {
            var divider = Math.abs(prevPage - curPage),
                tempPrev = prevPage,
                tempDir = direction === 'down' ? 0 : 1,
                tempNext = !tempDir ? prevPage + 1 : prevPage - 1;
            for (var i = 0; i < divider; i++) {
                if (window.CP.shouldStopExecution(1)) {
                    break;
                }
                if (!i) {
                    svgPagination(tempPrev, tempNext, numDir, numDirRev, divider);
                } else {
                    timeoutHell(tempPrev, tempNext, numDir, numDirRev, divider, i);
                }
                tempPrev = tempNext;
                tempNext = !tempDir ? tempNext + 1 : tempNext - 1;
            }
            window.CP.exitedLoop(1);
        } else {
            svgPagination(prevPage, curPage, numDir, numDirRev);
        }
        $('.page-number').css('transform', 'translateX(-' + (page - 1) * 15 + 'rem)');
        if (direction === 'down') {
            $prevActive.addClass('removing down');
        }
        if (direction === 'up') {
            $newActive.addClass('removing up');
        }
        while (--tempPage) {
            if (window.CP.shouldStopExecution(2)) {
                break;
            }
            $('.page-' + tempPage).addClass('inactive');
        }
        window.CP.exitedLoop(2);
        setTimeout(function() {
            $page.removeClass('removing up');
        }, 700);
        setTimeout(function() {
            scrolling = false;
        }, 1000);
    }

    function navigateUp() {
        if (curPage > 1) {
            curPage--;
            pagination(curPage, 'up');
        }
    }

    function navigateDown() {
        if (curPage < pages) {
            curPage++;
            pagination(curPage, 'down');
        }
    }
    $(document).on('mousewheel DOMMouseScroll', function(e) {
        if (!scrolling) {
            if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
                navigateUp();
            } else {
                navigateDown();
            }
        }
    });
    $(document).on('click', '.nav--btn:not(.active)', function() {
        if (scrolling)
            return;
        var nextPage = +$(this).attr('data-page'),
            dir = curPage < nextPage ? 'down' : 'up';
        pagination(nextPage, dir);
    });

    function between(dir, point, duration, delay, rDelay, easing) {
        var w = $('.nav--btn').outerWidth() / 2,
            duration = duration || 150,
            delay = delay || 150,
            rDelay = rDelay || 750,
            strokeW = 2,
            easing = easing || 'linear',
            d = [
                '0,' + w,
                w + ',' + w
            ];
        if (dir)
            d.reverse();
        d[0] = 'M' + d[0];
        var svg = $('<svg class=\'pathIt-svg\'><path stroke=\'#fff\' fill=\'none\' stroke-width=\'' + strokeW + '\' d=\'' + d + '\'/></svg>');
        svg.width(w).height(2 * w);
        var $path = $(svg).find('path'),
            len = $path[0].getTotalLength();
        $path.velocity({
            strokeDasharray: len,
            strokeDashoffset: len
        }, {
            duration: 0
        });
        $('.nav--btn-' + point).append(svg);
        $(svg).css({
            'left': w * 2 - 2
        });
        $path.delay(delay).velocity({
            strokeDashoffset: 0
        }, {
            duration: duration,
            easing: easing
        });
        setTimeout(function() {
            $(svg).css('transform', 'rotate(180deg)');
            $path.velocity({
                strokeDashoffset: len
            }, {
                duration: duration,
                easing: easing
            });
        }, rDelay);
        setTimeout(function() {
            $(svg).remove();
        }, rDelay + duration + 10);
    }

    function createSvg(dir, point, duration, delay, easing) {
        var wh = $('.nav--btn').outerWidth(),
            duration = duration || 600,
            delay = delay || 0,
            strokeW = 2,
            easing = easing || 'linear',
            dTop = [
                '0,' + wh / 2,
                '0,0',
                wh + ',0',
                wh + ',' + wh / 2
            ],
            dBot = [
                '0,' + wh / 2,
                '0,' + wh,
                wh + ',' + wh,
                wh + ',' + wh / 2
            ],
            dataDir = dir ? 1 : 0;
        if (dir) {
            dTop.reverse();
            dBot.reverse();
        }
        dTop[0] = 'M' + dTop[0];
        dBot[0] = 'M' + dBot[0];
        var svg = $('<svg data-dir=\'' + dataDir + '\' class=\'pathIt-svg\'><path stroke=\'#fff\' fill=\'none\' stroke-width=\'' + strokeW + '\' d=\'' + dTop + '\'/><path stroke=\'#fff\' fill=\'none\' stroke-width=\'' + strokeW + '\' d=\'' + dBot + '\'/></svg>');
        svg.width(wh).height(wh);
        var len = $(svg).find('path')[0].getTotalLength();
        $(svg).find('path').each(function() {
            $(this).velocity({
                strokeDasharray: len,
                strokeDashoffset: len
            }, {
                duration: 0
            });
        });
        $('.nav--btn-' + point).append(svg);
        $(svg).find('path').each(function() {
            $(this).delay(delay).velocity({
                strokeDashoffset: 0
            }, {
                duration: duration,
                easing: easing
            });
        });
    }

    function destroySvg(dir, point, duration, delay, easing) {
        var duration = duration || 600,
            delay = delay || 300,
            easing = easing || 'linear',
            $svg = $('.nav--btn-' + point + ' svg'),
            dataDir = +$svg.attr('data-dir');
        setTimeout(function() {
            if (dataDir !== dir)
                $svg.css('transform', 'rotate(180deg)');
        }, delay);
        $svg.find('path').each(function() {
            var $path = $(this),
                len = $path[0].getTotalLength();
            $svg = $path.parent(), $path.delay(delay).velocity({
                strokeDashoffset: len
            }, {
                duration: duration,
                easing: easing
            });
        });
        setTimeout(function() {
            $svg.remove();
        }, duration + delay + 10);
    }
    createSvg(0, 1, 1);
});
