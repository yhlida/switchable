/**
 * jQuery Switchable v1.0
 * Plugin: Carousel
 * By: baipan
 * 2014-01-16
 * carousel.js
 * 翻页按钮
 */
(function ($, window, document, undefined) {
    if (!$.switchable) {
        return;
    }
    
    // 新增参数
    $.extend($.switchable.Config, {
        // 选择器
        prev: '.prev',
        next: '.next',
        disabledClass: 'disabled'
    });


    /**
     * API:
     * 
     * this.prevBtn    =>    jQuery
     * this.nextBtn    =>    jQuery
     */
    $.switchable.Plugins.push({
        name: 'carousel',

        init: function (host) {
            var cfg = host.config,
                prefix = ['prev', 'next'],
                _prefix,
                _cfg,
                i = 0,
                to,
                pausing,
                setNext = function (index, isPrev) {
                    if (!cfg.loop && isPrev && index === 0) {
                        return;
                    }

                    if (!cfg.loop && !isPrev && index === host.length - 1) {
                        return;
                    }

                    var num = 1;
                    if (isPrev) {
                        num = -1;
                    }
                    host._nextIndex = (index + num + host.length) % host.length;
                };

            if (!$(host.root).find(cfg.prev).length && !$(host.root).find(cfg.next)) {
                return;
            }

            for (; i < 2; i++) {
                _prefix = prefix[i];
                _cfg = $(host.root).find(cfg[_prefix]);
                if (!_cfg.length) {
                    continue;
                }
                host[_prefix + 'Btn'] = _cfg;
            }

            $(host.root).find(cfg.prev).on('click', function (e) {
                e.preventDefault();
                if (!$(this).hasClass(cfg.disabledClass) && !host._anim) {
                    setNext(host.index, true);
                    to = host.willTo();
                    if (to === host.length - 1) {
                        host._circle = true;
                    } else {
                        host._circle = false;
                    }
                    host.switchTo(to);
                }
            });

            $(host.root).find(cfg.next).on('click', function (e) {
                e.preventDefault();
                if (!$(this).hasClass(cfg.disabledClass) && !host._anim) {
                    setNext(host.index, false);
                    to = host.willTo();
                    if (to === 0) {
                        host._circle = true;
                    } else {
                        host._circle = false;
                    }
                    host.switchTo(to);
                }
            });

            if (cfg.autoplay && cfg.pauseOnHover) {
                $(host.root).find(cfg.prev + ', ' + cfg.next).hover(function () {
                    pausing = host.paused;
                    host._pause();
                }, function () {
                    if (!pausing) {
                        host._play();
                    }
                });
            }

            $(host).on('switch', function () {

                if (host.nextBtn) {
                    host.nextBtn.removeClass(cfg.disabledClass);
                    if (!cfg.loop && host.index === (host.length - 1)) {
                        host.nextBtn.addClass(cfg.disabledClass);
                    }
                }

                if (host.prevBtn) {
                    host.prevBtn.removeClass(cfg.disabledClass);
                    if (!cfg.loop && host.index === 0) {
                        host.prevBtn.addClass(cfg.disabledClass);
                    }
                }

                host._circle = false;
            });
        }
    });
})(jQuery, window, document);