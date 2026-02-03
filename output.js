//Tue Feb 03 2026 15:21:30 GMT+0000 (Coordinated Universal Time)
//Base:<url id="cv1cref6o68qmpt26ol0" type="url" status="parsed" title="GitHub - echo094/decode-js: JS混淆代码的AST分析工具 AST analysis tool for obfuscated JS code" wc="2165">https://github.com/echo094/decode-js</url>
//Modify:<url id="cv1cref6o68qmpt26olg" type="url" status="parsed" title="GitHub - smallfawn/decode_action: 世界上本来不存在加密，加密的人多了，也便成就了解密" wc="741">https://github.com/smallfawn/decode_action</url>
(function (a, b) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], b);
  } else {
    if (typeof exports === 'object') {
      b(require('jquery'));
    } else {
      if (a.jQuery) {
        b(a.jQuery);
      } else {
        b(a.Zepto);
      }
    }
  }
})(this, function ($, j) {
  $.fn.jPlayer = function (b) {
    var c = "jPlayer";
    var d = typeof b === "string",
      args = Array.prototype.slice.call(arguments, 1),
      returnValue = this;
    if (!d && args.length) {
      b = $.extend.apply(null, [true, b].concat(args));
    } else {
      b = b;
    }
    if (d && b.charAt(0) === "_") {
      return returnValue;
    }
    if (d) {
      this.each(function () {
        var a = $(this).data(c),
          methodValue = a && $.isFunction(a[b]) ? a[b].apply(a, args) : a;
        if (methodValue !== a && methodValue !== j) {
          returnValue = methodValue;
          return false;
        }
      });
    } else {
      this.each(function () {
        var a = $(this).data(c);
        if (a) {
          a.option(b || {});
        } else {
          $(this).data(c, new $.jPlayer(b, this));
        }
      });
    }
    return returnValue;
  };
  $.jPlayer = function (a, b) {
    if (arguments.length) {
      this.element = $(b);
      this.options = $.extend(true, {}, this.options, a);
      var c = this;
      this.element.bind("remove.jPlayer", function () {
        c.destroy();
      });
      this._init();
    }
  };
  $.jPlayer.emulateMethods = "load play pause";
  $.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate";
  $.jPlayer.emulateOptions = "muted volume";
  $.jPlayer.reservedEvent = "ready flashreset resize repeat error warning";
  $.jPlayer.event = {};
  $.each(['ready', 'setmedia', 'flashreset', 'resize', 'repeat', 'click', 'error', 'warning', 'loadstart', 'progress', 'suspend', 'abort', 'emptied', 'stalled', 'play', 'pause', 'loadedmetadata', 'loadeddata', 'waiting', 'playing', 'canplay', 'canplaythrough', 'seeking', 'seeked', 'timeupdate', 'ended', 'ratechange', 'durationchange', 'volumechange'], function () {
    $.jPlayer.event[this] = 'jPlayer_' + this;
  });
  $.jPlayer.htmlEvent = ["loadstart", "abort", "emptied", "stalled", "loadedmetadata", "canplay", "canplaythrough"];
  $.jPlayer.timeFormat = {
    showHour: false,
    showMin: true,
    showSec: true,
    padHour: false,
    padMin: true,
    padSec: true,
    sepHour: ":",
    sepMin: ":",
    sepSec: ""
  };
  var k = function () {
    this.init();
  };
  k.prototype = {
    init: function () {
      this.options = {
        timeFormat: $.jPlayer.timeFormat
      };
    },
    time: function (s) {
      s && typeof s === 'number' ? s = s : s = 0;
      var a = new Date(s * 1000),
        hour = a.getUTCHours(),
        min = this.options.timeFormat.showHour ? a.getUTCMinutes() : a.getUTCMinutes() + hour * 60,
        sec = this.options.timeFormat.showMin ? a.getUTCSeconds() : a.getUTCSeconds() + min * 60,
        strHour = this.options.timeFormat.padHour && hour < 10 ? "0" + hour : hour,
        strMin = this.options.timeFormat.padMin && min < 10 ? "0" + min : min,
        strSec = this.options.timeFormat.padSec && sec < 10 ? "0" + sec : sec,
        strTime = "";
      this.options.timeFormat.showHour ? strTime += strHour + this.options.timeFormat.sepHour : strTime += "";
      this.options.timeFormat.showMin ? strTime += strMin + this.options.timeFormat.sepMin : strTime += "";
      this.options.timeFormat.showSec ? strTime += strSec + this.options.timeFormat.sepSec : strTime += "";
      return strTime;
    }
  };
  var l = new k();
  $.jPlayer.convertTime = function (s) {
    return l.time(s);
  };
  $.jPlayer.uaBrowser = function (a) {
    var b = a.toLowerCase();
    var c = /(webkit)[ \/]([\w.]+)/;
    var d = /(opera)(?:.*version)?[ \/]([\w.]+)/;
    var e = /(msie) ([\w.]+)/;
    var f = /(mozilla)(?:.*? rv:([\w.]+))?/;
    var g = c.exec(b) || d.exec(b) || e.exec(b) || b.indexOf("compatible") < 0 && f.exec(b) || [];
    return {
      browser: g[1] || "",
      version: g[2] || "0"
    };
  };
  $.jPlayer.uaPlatform = function (a) {
    var b = a.toLowerCase();
    var c = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/;
    var d = /(ipad|playbook)/;
    var e = /(android)/;
    var f = /(mobile)/;
    var g = c.exec(b) || [];
    var h = d.exec(b) || !f.exec(b) && e.exec(b) || [];
    if (g[1]) {
      g[1] = g[1].replace(/\s/g, "_");
    }
    return {
      platform: g[1] || "",
      tablet: h[1] || ""
    };
  };
  $.jPlayer.browser = {};
  $.jPlayer.platform = {};
  var m = $.jPlayer.uaBrowser(navigator.userAgent);
  if (m.browser) {
    $.jPlayer.browser[m.browser] = true;
    $.jPlayer.browser.version = m.version;
  }
  var n = $.jPlayer.uaPlatform(navigator.userAgent);
  if (n.platform) {
    $.jPlayer.platform[n.platform] = true;
    $.jPlayer.platform.mobile = !n.tablet;
    $.jPlayer.platform.tablet = !!n.tablet;
  }
  $.jPlayer.nameMap = {
    dragStart: $.jPlayer.platform.mobile ? 'touchstart' : 'mousedown',
    dragMove: $.jPlayer.platform.mobile ? 'touchmove' : 'mousemove',
    dragEnd: $.jPlayer.platform.mobile ? 'touchend' : 'mouseup'
  };
  $.jPlayer.focus = null;
  $.jPlayer.prototype = {
    count: 0,
    options: {
      solution: "html",
      preload: 'auto',
      volume: 0.8,
      supplied: "mp3",
      playbackRate: 1,
      defaultPlaybackRate: 1,
      cssSelector: {
        play: ".jp-play",
        pause: ".jp-pause",
        stop: ".jp-stop",
        seekBar: ".jp-buffer-bar",
        playBar: ".jp-play-bar",
        playthumb: ".jp-play-thumb",
        volumeBar: ".jp-volume-bar",
        volumeBarValue: ".jp-volume-bar-value",
        volumeMax: ".jp-volume-max",
        mute: ".jp-mute",
        unmute: ".jp-unmute",
        currentTime: ".jp-current-time",
        duration: ".jp-duration",
        title: ".jp-title",
        playbackRateBar: ".jp-playback-rate-bar",
        playbackRateBarValue: ".jp-playback-rate-bar-value"
      },
      stateClass: {
        playing: "jp-state-playing",
        seeking: "jp-state-seeking",
        muted: "jp-state-muted",
        looped: "jp-state-looped",
        noVolume: "jp-state-no-volume"
      },
      idPrefix: "jp",
      errorAlerts: false,
      warningAlerts: false,
      autoBlur: false,
      smoothPlayBar: true,
      globalVolume: false
    },
    optionsAudio: {
      size: {
        width: "0px",
        height: "0px",
        cssClass: ""
      }
    },
    instances: {},
    status: {
      src: "",
      media: {},
      paused: true,
      format: {},
      formatType: "",
      waitForPlay: true,
      waitForLoad: true,
      srcSet: false,
      seekPercent: 0,
      currentPercentRelative: 0,
      currentPercentAbsolute: 0,
      currentTime: 0,
      duration: 0,
      remaining: 0,
      readyState: 0,
      networkState: 0,
      playbackRate: 1,
      ended: 0
    },
    internal: {
      ready: false
    },
    solution: {
      html: true
    },
    format: {
      mp3: {
        codec: 'audio/mpeg',
        media: 'audio'
      },
      m4a: {
        codec: 'audio/mp4; codecs="mp4a.40.2"',
        media: 'audio'
      }
    },
    _init: function () {
      var g = this;
      this.element.empty();
      this.options.timeFormat = $.extend({}, $.jPlayer.timeFormat, this.options.timeFormat);
      this.internal.cmdsIgnored = $.jPlayer.platform.ipad || $.jPlayer.platform.iphone || $.jPlayer.platform.ipod;
      this.internal.domNode = this.element.get(0);
      this.androidFix = {
        setMedia: false,
        play: false,
        pause: false,
        time: NaN
      };
      if ($.jPlayer.platform.android) {
        this.options.preload !== 'auto' ? this.options.preload = 'metadata' : this.options.preload = 'auto';
      }
      this.formats = [];
      this.solutions = [];
      this.require = {};
      this.htmlElement = {};
      this.html = {};
      this.html.audio = {};
      this.css = {};
      this.css.cs = {};
      this.css.jq = {};
      this.ancestorJq = [];
      this.options.volume = this._limitValue(this.options.volume, 0, 1);
      $.each(this.options.supplied.toLowerCase().split(","), function (c, d) {
        var e = d.replace(/^\s+|\s+$/g, "");
        if (g.format[e]) {
          var f = false;
          $.each(g.formats, function (a, b) {
            if (e === b) {
              f = true;
              return false;
            }
          });
          if (!f) {
            g.formats.push(e);
          }
        }
      });
      $.each(this.options.solution.toLowerCase().split(","), function (c, d) {
        var e = d.replace(/^\s+|\s+$/g, "");
        if (g.solution[e]) {
          var f = false;
          $.each(g.solutions, function (a, b) {
            if (e === b) {
              f = true;
              return false;
            }
          });
          if (!f) {
            g.solutions.push(e);
          }
        }
      });
      this.internal.instance = "jp_" + this.count;
      this.instances[this.internal.instance] = this.element;
      if (!this.element.attr("id")) {
        this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count);
      }
      this.internal.self = $.extend({}, {
        id: this.element.attr("id"),
        jq: this.element
      });
      this.internal.audio = $.extend({}, {
        id: this.options.idPrefix + "_T22_" + this.count,
        jq: j
      });
      $.each($.jPlayer.event, function (a, b) {
        if (g.options[a] !== j) {
          g.element.bind(b + ".jPlayer", g.options[a]);
          g.options[a] = j;
        }
      });
      this.require.audio = false;
      $.each(this.formats, function (a, b) {
        g.require[g.format[b].media] = true;
      });
      if (this.require.audio) {
        this.options = $.extend(true, {}, this.optionsAudio, this.options);
      }
      this._setSize();
      this.html.audio.available = false;
      if (this.require.audio) {
        this.htmlElement.audio = document.createElement('audio');
        this.htmlElement.audio.id = this.internal.audio.id;
        this.html.audio.available = !!this.htmlElement.audio.canPlayType && this._testCanPlayType(this.htmlElement.audio);
      }
      this.html.canPlay = {};
      $.each(this.formats, function (a, b) {
        g.html.canPlay[b] = g.html[g.format[b].media].available && "" !== g.htmlElement[g.format[b].media].canPlayType(g.format[b].codec);
      });
      this.html.desired = false;
      $.each(this.solutions, function (c, d) {
        if (c === 0) {
          g[d].desired = true;
        } else {
          var e = false;
          $.each(g.formats, function (a, b) {
            if (g[g.solutions[0]].canPlay[b]) {
              if (g.format[b].media === 'audio') {
                e = true;
              }
            }
          });
          g[d].desired = g.require.audio && !e;
        }
      });
      this.html.support = {};
      $.each(this.formats, function (a, b) {
        g.html.support[b] = g.html.canPlay[b] && g.html.desired;
      });
      this.html.used = false;
      $.each(this.solutions, function (c, d) {
        $.each(g.formats, function (a, b) {
          if (g[d].support[b]) {
            g[d].used = true;
            return false;
          }
        });
      });
      this._resetActive();
      this._resetGate();
      this._cssSelectorAncestor(this.options.cssSelectorAncestor);
      if (this.html.used) {
        this.status.playbackRateEnabled = this._testPlaybackRate('audio');
      } else {
        this.status.playbackRateEnabled = false;
      }
      this._updatePlaybackRate();
      if (this.html.used) {
        if (this.html.audio.available) {
          this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio);
          this.internal.audio.jq = $("#" + this.internal.audio.id, window.parent.document);
        }
      }
      if (this.html.used) {
        setTimeout(function () {
          g.internal.ready = true;
          g._trigger($.jPlayer.event.repeat);
          g._trigger($.jPlayer.event.ready);
        }, 100);
      }
    },
    _addHtmlEventListeners: function (b, c) {
      var d = this;
      b.preload = this.options.preload;
      b.muted = this.options.muted;
      b.volume = this.options.volume;
      if (this.status.playbackRateEnabled) {
        b.defaultPlaybackRate = this.options.defaultPlaybackRate;
        b.playbackRate = this.options.playbackRate;
      }
      b.addEventListener("progress", function () {
        if (c.gate) {
          if (d.internal.cmdsIgnored && this.readyState > 0) {
            d.internal.cmdsIgnored = false;
          }
          d._getHtmlStatus(b);
          d._updateInterface();
          d._trigger($.jPlayer.event.progress);
        }
      }, false);
      b.addEventListener("loadeddata", function () {
        if (c.gate) {
          d.androidFix.setMedia = false;
          if (d.androidFix.play) {
            d.androidFix.play = false;
            d.play(d.androidFix.time);
          }
          if (d.androidFix.pause) {
            d.androidFix.pause = false;
            d.pause(d.androidFix.time);
          }
          d._trigger($.jPlayer.event.loadeddata);
        }
      }, false);
      b.addEventListener("timeupdate", function () {
        if (c.gate) {
          d._getHtmlStatus(b);
          d._updateInterface();
          d._trigger($.jPlayer.event.timeupdate);
        }
      }, false);
      b.addEventListener("durationchange", function () {
        if (c.gate) {
          d._getHtmlStatus(b);
          d._updateInterface();
          d._trigger($.jPlayer.event.durationchange);
        }
      }, false);
      b.addEventListener("play", function () {
        if (c.gate) {
          d._updateButtons(true);
          d._trigger($.jPlayer.event.play);
        }
      }, false);
      b.addEventListener("playing", function () {
        if (c.gate) {
          d._updateButtons(true);
          d._seeked();
          d._trigger($.jPlayer.event.playing);
        }
      }, false);
      b.addEventListener("pause", function () {
        if (c.gate) {
          d._updateButtons(false);
          d._trigger($.jPlayer.event.pause);
        }
      }, false);
      b.addEventListener("waiting", function () {
        if (c.gate) {
          d._seeking();
          d._trigger($.jPlayer.event.waiting);
        }
      }, false);
      b.addEventListener("seeked", function () {
        if (c.gate) {
          d._seeked();
          d._trigger($.jPlayer.event.seeked);
        }
      }, false);
      b.addEventListener("volumechange", function () {
        if (c.gate) {
          d.options.volume = b.volume;
          d.options.muted = b.muted;
          d._updateMute();
          d._updateVolume();
          d._trigger($.jPlayer.event.volumechange);
        }
      }, false);
      b.addEventListener("ratechange", function () {
        if (c.gate) {
          d.options.defaultPlaybackRate = b.defaultPlaybackRate;
          d.options.playbackRate = b.playbackRate;
          d._updatePlaybackRate();
          d._trigger($.jPlayer.event.ratechange);
        }
      }, false);
      b.addEventListener("suspend", function () {
        if (c.gate) {
          d._seeked();
          d._trigger($.jPlayer.event.suspend);
        }
      }, false);
      b.addEventListener("ended", function () {
        if (c.gate) {
          if (!$.jPlayer.browser.webkit) {
            d.htmlElement.media.currentTime = 0;
          }
          d.htmlElement.media.pause();
          d._updateButtons(false);
          d._getHtmlStatus(b, true);
          d._updateInterface();
          d._trigger($.jPlayer.event.ended);
        }
      }, false);
      b.addEventListener("error", function () {
        if (c.gate) {
          d._updateButtons(false);
          d._seeked();
          if (d.status.srcSet) {
            clearTimeout(d.internal.htmlDlyCmdId);
            d.status.waitForLoad = true;
            d.status.waitForPlay = true;
            d._error({
              type: $.jPlayer.error.URL,
              context: d.status.src,
              message: $.jPlayer.errorMsg.URL,
              hint: $.jPlayer.errorHint.URL
            });
          }
        }
      }, false);
      $.each($.jPlayer.htmlEvent, function (i, a) {
        b.addEventListener(this, function () {
          if (c.gate) {
            d._trigger($.jPlayer.event[a]);
          }
        }, false);
      });
    },
    _getHtmlStatus: function (a, b) {
      var c = 0,
        cpa = 0,
        sp = 0,
        cpr = 0;
      if (isFinite(a.duration)) {
        this.status.duration = a.duration;
      }
      c = a.currentTime;
      this.status.duration > 0 ? cpa = 100 * c / this.status.duration : cpa = 0;
      if (typeof a.seekable === "object" && a.seekable.length > 0) {
        this.status.duration > 0 ? sp = 100 * a.seekable.end(a.seekable.length - 1) / this.status.duration : sp = 100;
        this.status.duration > 0 ? cpr = 100 * a.currentTime / a.seekable.end(a.seekable.length - 1) : cpr = 0;
      } else {
        sp = 100;
        cpr = cpa;
      }
      if (b) {
        c = 0;
        cpr = 0;
        cpa = 0;
      }
      this.status.seekPercent = sp;
      this.status.currentPercentRelative = cpr;
      this.status.currentPercentAbsolute = cpa;
      this.status.currentTime = c;
      this.status.remaining = this.status.duration - this.status.currentTime;
      this.status.readyState = a.readyState;
      this.status.networkState = a.networkState;
      this.status.playbackRate = a.playbackRate;
      this.status.ended = a.ended;
    },
    _updateInterface: function () {
      if (this.css.jq.seekBar.length) {
        this.css.jq.seekBar.width(this.status.seekPercent + "%");
      }
      if (this.css.jq.playBar.length) {
        if (this.options.smoothPlayBar) {
          this.css.jq.playBar.stop().animate({
            width: this.status.currentPercentAbsolute + "%"
          }, 200, "linear");
        } else {
          this.css.jq.playBar.width(this.status.currentPercentRelative + "%");
        }
      }
      if (this.css.jq.playthumb.length) {
        if (this.options.smoothPlayBar) {
          this.css.jq.playthumb.stop().animate({
            left: this.status.currentPercentAbsolute + "%"
          }, 200, "linear");
        } else {
          this.css.jq.playthumb.css("left", this.status.currentPercentRelative + "%");
        }
      }
      var a = '';
      if (this.css.jq.currentTime.length) {
        a = this._convertTime(this.status.currentTime);
        if (a !== this.css.jq.currentTime.text()) {
          this.css.jq.currentTime.text(this._convertTime(this.status.currentTime));
        }
      }
      var b = '',
        duration = this.status.duration,
        remaining = this.status.remaining;
      if (this.css.jq.duration.length) {
        if (typeof this.status.media.duration === 'string') {
          b = this.status.media.duration;
        } else {
          if (typeof this.status.media.duration === 'number') {
            duration = this.status.media.duration;
            remaining = duration - this.status.currentTime;
          }
          if (this.options.remainingDuration) {
            b = (remaining > 0 ? '-' : '') + this._convertTime(remaining);
          } else {
            b = this._convertTime(duration);
          }
        }
        if (b !== this.css.jq.duration.text()) {
          this.css.jq.duration.text(b);
        }
      }
    },
    _updateButtons: function (a) {
      if (a === j) {
        a = !this.status.paused;
      } else {
        this.status.paused = !a;
      }
      if (this.css.jq.play.length && this.css.jq.pause.length) {
        if (a) {
          this.css.jq.play.hide();
          this.css.jq.pause.show();
        } else {
          this.css.jq.play.show();
          this.css.jq.pause.hide();
        }
      }
    },
    _updatePlaybackRate: function () {
      var a = this.options.playbackRate,
        ratio = (a - this.options.minPlaybackRate) / (this.options.maxPlaybackRate - this.options.minPlaybackRate);
      if (this.status.playbackRateEnabled) {
        if (this.css.jq.playbackRateBar.length) {
          this.css.jq.playbackRateBar.show();
        }
        if (this.css.jq.playbackRateBarValue.length) {
          this.css.jq.playbackRateBarValue.show();
          this.css.jq.playbackRateBarValue[this.options.verticalPlaybackRate ? "height" : "width"](ratio * 100 + "%");
        }
      } else {
        if (this.css.jq.playbackRateBar.length) {
          this.css.jq.playbackRateBar.hide();
        }
        if (this.css.jq.playbackRateBarValue.length) {
          this.css.jq.playbackRateBarValue.hide();
        }
      }
    },
    _updateVolume: function (v) {
      if (v === j) {
        v = this.options.volume;
      }
      this.options.muted ? v = 0 : v = v;
      if (this.status.noVolume) {
        this.addStateClass('noVolume');
        if (this.css.jq.volumeBar.length) {
          this.css.jq.volumeBar.hide();
        }
        if (this.css.jq.volumeBarValue.length) {
          this.css.jq.volumeBarValue.hide();
        }
        if (this.css.jq.volumeMax.length) {
          this.css.jq.volumeMax.hide();
        }
      } else {
        this.removeStateClass('noVolume');
        if (this.css.jq.volumeBar.length) {
          this.css.jq.volumeBar.show();
        }
        if (this.css.jq.volumeBarValue.length) {
          this.css.jq.volumeBarValue.show();
          this.css.jq.volumeBarValue[this.options.verticalVolume ? "height" : "width"](v * 100 + "%");
        }
        if (this.css.jq.volumeMax.length) {
          this.css.jq.volumeMax.show();
        }
      }
    },
    _updateMute: function (a) {
      if (a === j) {
        a = this.options.muted;
      }
      if (a) {
        this.addStateClass('muted');
      } else {
        this.removeStateClass('muted');
      }
      if (this.css.jq.mute.length && this.css.jq.unmute.length) {
        if (this.status.noVolume) {
          this.css.jq.mute.hide();
          this.css.jq.unmute.hide();
        } else {
          if (a) {
            this.css.jq.mute.hide();
            this.css.jq.unmute.show();
          } else {
            this.css.jq.mute.show();
            this.css.jq.unmute.hide();
          }
        }
      }
    },
    _seeking: function () {
      if (this.css.jq.seekBar.length) {
        this.css.jq.seekBar.addClass("jp-seeking-bg");
      }
      this.addStateClass('seeking');
    },
    _seeked: function () {
      if (this.css.jq.seekBar.length) {
        this.css.jq.seekBar.removeClass("jp-seeking-bg");
      }
      this.removeStateClass('seeking');
    },
    seekBar: function (e) {
      if (this.css.jq.seekBar.length) {
        var a = $(e.currentTarget, window.parent.document),
          offset = a.offset(),
          x = e.pageX - offset.left,
          w = a.width(),
          p = 100 * x / w;
        this.playHead(p);
      }
    },
    _convertTime: k.prototype.time,
    _muted: function (a) {
      this.mutedWorker(a);
      if (this.options.globalVolume) {
        this.tellOthers("mutedWorker", function () {
          return this.options.globalVolume;
        }, a);
      }
    },
    mute: function (a) {
      var b = typeof a === "object";
      if (b && this.options.useStateClassSkin && this.options.muted) {
        this._muted(false);
      } else {
        a === j ? a = true : a = !!a;
        this._muted(a);
      }
    },
    unmute: function (a) {
      a === j ? a = true : a = !!a;
      this._muted(!a);
    },
    volumeMax: function () {
      this.volume(1);
    },
    _limitValue: function (a, b, c) {
      return a < b ? b : a > c ? c : a;
    },
    _validString: function (a) {
      return a && typeof a === "string";
    },
    _setSize: function () {
      this.status.width = this.options.size.width;
      this.status.height = this.options.size.height;
      this.status.cssClass = this.options.size.cssClass;
      this.element.css({
        'width': this.status.width,
        'height': this.status.height
      });
    },
    _cssSelectorAncestor: function (c) {
      var d = this;
      this.options.cssSelectorAncestor = c;
      c ? this.ancestorJq = $(c, window.parent.document) : this.ancestorJq = [];
      if (c && this.ancestorJq.length !== 1) {
        this._warning({
          type: $.jPlayer.warning.CSS_SELECTOR_COUNT,
          context: c,
          message: $.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.ancestorJq.length + " found for cssSelectorAncestor.",
          hint: $.jPlayer.warningHint.CSS_SELECTOR_COUNT
        });
      }
      $.each(this.options.cssSelector, function (a, b) {
        d._cssSelector(a, b);
      });
      this._updateInterface();
      this._updateButtons();
      this._updateVolume();
      this._updateMute();
    },
    _cssSelector: function (a, b) {
      var c = this;
      if (typeof b === 'string') {
        if ($.jPlayer.prototype.options.cssSelector[a]) {
          if (this.css.jq[a] && this.css.jq[a].length) {
            this.css.jq[a].unbind(".jPlayer");
          }
          this.options.cssSelector[a] = b;
          this.css.cs[a] = this.options.cssSelectorAncestor + " " + b;
          if (b) {
            this.css.jq[a] = $(this.css.cs[a], window.parent.document);
          } else {
            this.css.jq[a] = [];
          }
          if (this.css.jq[a].length && this[a]) {
            var d = function (e) {
              e.preventDefault();
              c[a](e);
              if (c.options.autoBlur) {
                $(this).blur();
              } else {
                $(this).focus();
              }
            };
            this.css.jq[a].bind("click.jPlayer", d);
          }
          if (a === 'playthumb' && this.css.jq['playthumb'].length > 0) {
            var f = 0,
              x = 0,
              parent = 0;
            this.css.jq.playthumb.on($.jPlayer.nameMap.dragStart, function (e) {
              if (3 == e.which) {
                return false;
              }
              parent = $(this).parent();
              f = parent.offset();
              c.options.smoothPlayBar = false;
              c.pause();
              $(window.parent.document).on($.jPlayer.nameMap.dragMove, function (e) {
                x = ((e.clientX || e.originalEvent.changedTouches[0].clientX) - f.left) / parent.width();
                x = Math.max(x, 0);
                x = Math.min(x, 1);
                p = 100 * x;
                c.css.jq.playBar.width(p + "%");
                c.css.jq.playthumb.css("left", p + "%");
                c.css.jq.currentTime.text(c._convertTime(c.status.duration * x));
              }).on($.jPlayer.nameMap.dragEnd, function (e) {
                x = ((e.clientX || e.originalEvent.changedTouches[0].clientX) - f.left) / parent.width();
                x = Math.max(x, 0);
                x = Math.min(x, 1);
                p = 100 * x;
                c.playHead(p);
                c.play();
                $(this).off($.jPlayer.nameMap.dragMove).off($.jPlayer.nameMap.dragEnd);
              });
              e.preventDefault();
            });
          }
          if (b && this.css.jq[a].length !== 1) {
            this._warning({
              type: $.jPlayer.warning.CSS_SELECTOR_COUNT,
              context: this.css.cs[a],
              message: $.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[a].length + " found for " + a + " method.",
              hint: $.jPlayer.warningHint.CSS_SELECTOR_COUNT
            });
          }
        } else {
          this._warning({
            type: $.jPlayer.warning.CSS_SELECTOR_METHOD,
            context: a,
            message: $.jPlayer.warningMsg.CSS_SELECTOR_METHOD,
            hint: $.jPlayer.warningHint.CSS_SELECTOR_METHOD
          });
        }
      } else {
        this._warning({
          type: $.jPlayer.warning.CSS_SELECTOR_STRING,
          context: b,
          message: $.jPlayer.warningMsg.CSS_SELECTOR_STRING,
          hint: $.jPlayer.warningHint.CSS_SELECTOR_STRING
        });
      }
    },
    _testCanPlayType: function (a) {
      try {
        a.canPlayType(this.format.mp3.codec);
        return true;
      } catch (err) {
        return false;
      }
    },
    _testPlaybackRate: function (a) {
      var b,
        rate = 0.5;
      typeof a === 'string' ? a = a : a = 'audio';
      b = document.createElement(a);
      try {
        if ('playbackRate' in b) {
          b.playbackRate = rate;
          return b.playbackRate === rate;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    },
    _absoluteMediaUrls: function (c) {
      var d = this;
      $.each(c, function (a, b) {
        if (b && d.format[a] && b.substr(0, 5) !== "data:") {
          c[a] = d._qualifyURL(b);
        }
      });
      return c;
    },
    _qualifyURL: function (a) {
      var b = document.createElement('div');
      b.innerHTML = '<a href="' + this._escapeHtml(a) + '">x</a>';
      return b.firstChild.href;
    },
    _escapeHtml: function (s) {
      return s.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;');
    },
    _resetMedia: function () {
      this._resetStatus();
      this._updateButtons(false);
      this._updateInterface();
      this._seeked();
      clearTimeout(this.internal.htmlDlyCmdId);
      if (this.html.active) {
        this._html_resetMedia();
      }
    },
    _resetStatus: function () {
      this.status = $.extend({}, this.status, $.jPlayer.prototype.status);
    },
    _resetGate: function () {
      this.html.audio.gate = false;
    },
    _resetActive: function () {
      this.html.active = false;
    },
    removeStateClass: function (a) {
      if (this.ancestorJq.length) {
        this.ancestorJq.removeClass(this.options.stateClass[a]);
      }
    },
    setMedia: function (f) {
      var g = this,
        supported = false;
      this._resetMedia();
      this._resetGate();
      this._resetActive();
      this.androidFix.setMedia = false;
      this.androidFix.play = false;
      this.androidFix.pause = false;
      f = this._absoluteMediaUrls(f);
      $.each(this.formats, function (d, e) {
        $.each(g.solutions, function (a, b) {
          if (g[b].support[e] && g._validString(f[e])) {
            var c = b === 'html';
            if (c) {
              g.html.audio.gate = true;
              g._html_setAudio(f);
              g.html.active = true;
              if ($.jPlayer.platform.android) {
                g.androidFix.setMedia = true;
              }
            }
            supported = true;
            return false;
          }
        });
        if (supported) {
          return false;
        }
      });
      if (supported) {
        if (typeof f.title === 'string') {
          if (this.css.jq.title.length) {
            this.css.jq.title.html(f.title);
          }
          if (this.htmlElement.audio) {
            this.htmlElement.audio.setAttribute('title', f.title);
          }
        }
        this.status.srcSet = true;
        this.status.media = $.extend({}, f);
        this._updateButtons(false);
        this._updateInterface();
        this._trigger($.jPlayer.event.setmedia);
      } else {
        this._error({
          type: $.jPlayer.error.NO_SUPPORT,
          context: "{supplied:'" + this.options.supplied + "'}",
          message: $.jPlayer.errorMsg.NO_SUPPORT,
          hint: $.jPlayer.errorHint.NO_SUPPORT
        });
      }
    },
    load: function () {
      if (this.status.srcSet) {
        if (this.html.active) {
          this._html_load();
        }
      } else {
        this._urlNotSetError("load");
      }
    },
    play: function (a) {
      var b = typeof a === "object";
      if (b && this.options.useStateClassSkin && !this.status.paused) {
        this.pause(a);
      } else {
        typeof a === "number" ? a = a : a = NaN;
        if (this.status.srcSet) {
          if (this.html.active) {
            this._html_play(a);
          }
        } else {
          this._urlNotSetError("play");
        }
      }
    },
    pause: function (a) {
      typeof a === "number" ? a = a : a = NaN;
      if (this.status.srcSet) {
        if (this.html.active) {
          this._html_pause(a);
        }
      } else {
        this._urlNotSetError("pause");
      }
    },
    stop: function () {
      if (this.status.srcSet) {
        if (this.html.active) {
          this._html_pause(0);
        }
      } else {
        this._urlNotSetError("stop");
      }
    },
    playHead: function (p) {
      p = this._limitValue(p, 0, 100);
      if (this.status.srcSet) {
        if (this.html.active) {
          this._html_playHead(p);
        }
      } else {
        this._urlNotSetError("playHead");
      }
    },
    playbackRate: function (a) {
      this._setOption("playbackRate", a);
    },
    playbackRateBar: function (e) {
      if (this.css.jq.playbackRateBar.length) {
        var a = $(e.currentTarget, window.parent.document),
          offset = a.offset(),
          x = e.pageX - offset.left,
          w = a.width(),
          y = a.height() - e.pageY + offset.top,
          h = a.height(),
          ratio,
          pbr;
        if (this.options.verticalPlaybackRate) {
          ratio = y / h;
        } else {
          ratio = x / w;
        }
        pbr = ratio * (this.options.maxPlaybackRate - this.options.minPlaybackRate) + this.options.minPlaybackRate;
        this.playbackRate(pbr);
      }
    },
    addStateClass: function (a) {
      if (this.ancestorJq.length) {
        this.ancestorJq.addClass(this.options.stateClass[a]);
      }
    },
    _html_setFormat: function (c) {
      var d = this;
      $.each(this.formats, function (a, b) {
        if (d.html.support[b] && c[b]) {
          d.status.src = c[b];
          d.status.format[b] = true;
          d.status.formatType = b;
          return false;
        }
      });
    },
    _html_setAudio: function (a) {
      this._html_setFormat(a);
      this.htmlElement.media = this.htmlElement.audio;
      this._html_initMedia(a);
    },
    _html_initMedia: function (a) {
      var b = $(this.htmlElement.media).empty();
      this.htmlElement.media.src = this.status.src;
      if (this.options.preload !== 'none') {
        this._html_load();
      }
      this._trigger($.jPlayer.event.timeupdate);
    },
    _html_resetMedia: function () {
      if (this.htmlElement.media) {
        this.htmlElement.media.pause();
      }
    },
    _html_setProperty: function (a, b) {
      if (this.html.audio.available) {
        this.htmlElement.audio[a] = b;
      }
    },
    _html_checkWaitForPlay: function () {
      if (this.status.waitForPlay) {
        this.status.waitForPlay = false;
      }
    },
    _html_load: function () {
      if (this.status.waitForLoad) {
        this.status.waitForLoad = false;
        this.htmlElement.media.load();
      }
      clearTimeout(this.internal.htmlDlyCmdId);
    },
    _html_play: function (a) {
      var b = this,
        media = this.htmlElement.media;
      this.androidFix.pause = false;
      this._html_load();
      if (this.androidFix.setMedia) {
        this.androidFix.play = true;
        this.androidFix.time = a;
      } else {
        if (!isNaN(a)) {
          if (this.internal.cmdsIgnored) {
            media.play();
          }
          try {
            if (!media.seekable || typeof media.seekable === "object" && media.seekable.length > 0) {
              media.currentTime = a;
              media.play();
            } else {
              throw 1;
            }
          } catch (err) {
            this.internal.htmlDlyCmdId = setTimeout(function () {
              b.play(a);
            }, 250);
            return;
          }
        } else {
          media.play();
        }
      }
      this._html_checkWaitForPlay();
    },
    _html_pause: function (a) {
      var b = this,
        media = this.htmlElement.media;
      this.androidFix.play = false;
      if (a > 0) {
        this._html_load();
      } else {
        clearTimeout(this.internal.htmlDlyCmdId);
      }
      media.pause();
      if (this.androidFix.setMedia) {
        this.androidFix.pause = true;
        this.androidFix.time = a;
      } else {
        if (!isNaN(a)) {
          try {
            if (!media.seekable || typeof media.seekable === "object" && media.seekable.length > 0) {
              media.currentTime = a;
            } else {
              throw 1;
            }
          } catch (err) {
            this.internal.htmlDlyCmdId = setTimeout(function () {
              b.pause(a);
            }, 250);
            return;
          }
        }
      }
      if (a > 0) {
        this._html_checkWaitForPlay();
      }
    },
    _html_playHead: function (a) {
      var b = this,
        media = this.htmlElement.media;
      this._html_load();
      try {
        if (typeof media.seekable === "object" && media.seekable.length > 0) {
          media.currentTime = a * media.seekable.end(media.seekable.length - 1) / 100;
        } else {
          if (media.duration > 0 && !isNaN(media.duration)) {
            media.currentTime = a * media.duration / 100;
          } else {
            throw "e";
          }
        }
      } catch (err) {
        this.internal.htmlDlyCmdId = setTimeout(function () {
          b.playHead(a);
        }, 250);
        return;
      }
      if (!this.status.waitForLoad) {
        this._html_checkWaitForPlay();
      }
    },
    _trigger: function (a, b, c) {
      var d = $.Event(a);
      d.jPlayer = {};
      d.jPlayer.options = $.extend(true, {}, this.options);
      d.jPlayer.status = $.extend(true, {}, this.status);
      d.jPlayer.html = $.extend(true, {}, this.html);
      if (b) {
        d.jPlayer.error = $.extend({}, b);
      }
      if (c) {
        d.jPlayer.warning = $.extend({}, c);
      }
      this.element.trigger(d);
    },
    _error: function (a) {
      this._trigger($.jPlayer.event.error, a);
      if (this.options.errorAlerts) {
        this._alert("Error!" + (a.message ? "\n" + a.message : "") + (a.hint ? "\n" + a.hint : "") + "\nContext: " + a.context);
      }
    },
    _warning: function (a) {
      this._trigger($.jPlayer.event.warning, j, a);
      if (this.options.warningAlerts) {
        this._alert("Warning!" + (a.message ? "\n" + a.message : "") + (a.hint ? "\n" + a.hint : "") + "\nContext: " + a.context);
      }
    },
    _urlNotSetError: function (a) {
      this._error({
        type: $.jPlayer.error.URL_NOT_SET,
        context: a,
        message: $.jPlayer.errorMsg.URL_NOT_SET,
        hint: $.jPlayer.errorHint.URL_NOT_SET
      });
    },
    _setOption: function (c, d) {
      var e = this;
      switch (c) {
        case "volume":
          {
            this.volume(d);
            break;
          }
        case "muted":
          {
            this._muted(d);
            break;
          }
        case "globalVolume":
          {
            this.options[c] = d;
            break;
          }
        case "cssSelectorAncestor":
          {
            this._cssSelectorAncestor(d);
            break;
          }
        case "cssSelector":
          {
            $.each(d, function (a, b) {
              e._cssSelector(a, b);
            });
            break;
          }
        case "playbackRate":
          {
            this.options[c] = d = this._limitValue(d, this.options.minPlaybackRate, this.options.maxPlaybackRate);
            if (this.html.used) {
              this._html_setProperty('playbackRate', d);
            }
            this._updatePlaybackRate();
            break;
          }
        case "defaultPlaybackRate":
          {
            this.options[c] = d = this._limitValue(d, this.options.minPlaybackRate, this.options.maxPlaybackRate);
            if (this.html.used) {
              this._html_setProperty('defaultPlaybackRate', d);
            }
            this._updatePlaybackRate();
            break;
          }
        case "minPlaybackRate":
          {
            this.options[c] = d = this._limitValue(d, 0.1, this.options.maxPlaybackRate - 0.1);
            this._updatePlaybackRate();
            break;
          }
        case "maxPlaybackRate":
          {
            this.options[c] = d = this._limitValue(d, this.options.minPlaybackRate + 0.1, 16);
            this._updatePlaybackRate();
            break;
          }
        case "loop":
          {
            this._loop(d);
            break;
          }
        case "remainingDuration":
          {
            this.options[c] = d;
            this._updateInterface();
            break;
          }
        case "toggleDuration":
          {
            this.options[c] = d;
            break;
          }
        case "noVolume":
          {
            this.options[c] = $.extend({}, this.options[c], d);
            this.status.noVolume = this._uaBlocklist(this.options.noVolume);
            this._updateVolume();
            this._updateMute();
            break;
          }
        case "timeFormat":
          {
            this.options[c] = $.extend({}, this.options[c], d);
            break;
          }
      }
      return this;
    },
    destroy: function () {
      this.clearMedia();
      if (this.css.jq.currentTime.length) {
        this.css.jq.currentTime.text("");
      }
      if (this.css.jq.duration.length) {
        this.css.jq.duration.text("");
      }
      $.each(this.css.jq, function (a, b) {
        if (b.length) {
          b.unbind(".jPlayer");
        }
      });
      if (this === $.jPlayer.focus) {
        $.jPlayer.focus = null;
      }
      this.element.removeData("jPlayer");
      this.element.unbind(".jPlayer");
      this.element.empty();
      delete this.instances[this.internal.instance];
    },
    destroyRemoved: function () {
      var b = this;
      $.each(this.instances, function (i, a) {
        if (b.element !== a) {
          if (!a.data("jPlayer")) {
            a.jPlayer("destroy");
            delete b.instances[i];
          }
        }
      });
    },
    tellOthers: function (a, b) {
      var c = this,
        hasConditions = typeof b === 'function',
        args = Array.prototype.slice.call(arguments);
      if (typeof a !== 'string') {
        return;
      }
      if (hasConditions) {
        args.splice(1, 1);
      }
      $.jPlayer.prototype.destroyRemoved();
      $.each(this.instances, function () {
        if (c.element !== this) {
          if (!hasConditions || b.call(this.data("jPlayer"), c)) {
            this.jPlayer.apply(this, args);
          }
        }
      });
    }
  };
  $.jPlayer.error = {
    NO_SOLUTION: "e_no_solution",
    NO_SUPPORT: "e_no_support",
    URL: "e_url",
    URL_NOT_SET: "e_url_not_set",
    VERSION: "e_version"
  };
  $.jPlayer.errorMsg = {
    NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",
    NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options.",
    URL: "Media URL could not be loaded.",
    URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set.",
    VERSION: "123123"
  };
  $.jPlayer.errorHint = {
    NO_SOLUTION: "Review the jPlayer options: support and supplied.",
    NO_SUPPORT: "Video or audio formats defined in the supplied option are missing.",
    URL: "Check media URL is valid.",
    URL_NOT_SET: "Use setMedia() to set the media URL.",
    VERSION: "Update jPlayer files."
  };
  $.jPlayer.warning = {
    CSS_SELECTOR_COUNT: "e_css_selector_count",
    CSS_SELECTOR_METHOD: "e_css_selector_method",
    CSS_SELECTOR_STRING: "e_css_selector_string",
    OPTION_KEY: "e_option_key"
  };
  $.jPlayer.warningMsg = {
    CSS_SELECTOR_COUNT: "The number of css selectors found did not equal one: ",
    CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",
    CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
    OPTION_KEY: "The option requested in jPlayer('option') is undefined."
  };
  $.jPlayer.warningHint = {
    CSS_SELECTOR_COUNT: "Check your css selector and the ancestor.",
    CSS_SELECTOR_METHOD: "Check your method name.",
    CSS_SELECTOR_STRING: "Check your css selector is a string.",
    OPTION_KEY: "Check your option name."
  };
});
;
(function () {
  var canvas, gl, debugInfo, glRenderer;
  function getCanvas() {
    if (canvas == null) {
      canvas = document.createElement('canvas');
    }
    return canvas;
  }
  function getGl() {
    if (gl == null) {
      gl = getCanvas().getContext('experimental-webgl');
    }
    return gl;
  }
  function getGlRenderer() {
    if (glRenderer == null) {
      getGl() == null ? debugInfo = null : debugInfo = getGl().getExtension('WEBGL_debug_renderer_info');
      debugInfo == null ? glRenderer = 'undefined' : glRenderer = getGl().getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    }
    return glRenderer;
  }
  if (window.MobileDevice == undefined) {
    window.MobileDevice = {};
  }
  window.MobileDevice.getGlRenderer = getGlRenderer;
})();
if (parent.tingid == undefined || parent.novel_id == undefined || sgin == undefined) {
  top.location.href = "https://m.baidu.com/error.jsp";
}
if (top == self || typeof parent.tingid == "undefined" || typeof parent.lo == "undefined") {
  top.location = "https://www.huanting.cc/";
} else {
  var iｉl = 'jsjiami.com.v7';
  var Iiliil1I = i11lill;
  function I1i111Ii() {
    var iiliIl1I = function () {
      return [iｉl, 'YjVFsryjbKiaexmKi.ucpoEIMm.gRv7FBtnQKgLW==', 'WRNdQWFcO2G', 'AYJcHSkGba', 'iMbVwCo8WR0', 'h8kQWRis', 'mCoFWPJdSCkIW6a', 'WPFdJ8kX', 'WRFdVwCzW44XWQCYxY4dW4VdV1FdSa9oaCkFW6b0pgRdHCoAC8oMW4S', 'W5xcLIu', 'W4BdNSkUzuu', 'WP7cUSkon8oDW5tcICoJ', 'W7NdU3m0amkpuSkIp8oTfatcKCkOWRDy', 'f8k9WQisle0', 'C2Xs', 'AYZcHG', 'aH48WR0tFG', 'W4ZcKxCVW7u', 'fW3cVmk1vNiQW6yLoJDYW6BcOSokkHFdINhcL8oZW7e', 'W7WlWO3dQ0DD', 'WQnrzryH', 'W7egW6dcMh4', 'WRlcJtBdHmoN', 'WP3cTSoZzCotW5pcJ8o8WPhcTa', 'hCkkWQn4oCkGW4nbW4ZcTSkM', 'rWhdUSknhG', 'W7tdP8oMBNdcN8kt', 'W7iwegGv', 'dZzkymkBWOtdPSoTW78', 'rmkQvXtdQ38', 'rZqNWRddGHKzWPxdOG', 'ESoldCoo', 'qWtdNCkChG', 'W6ddTHpdKmo9', 'gmkzr8o2ca', 'WRxcSGtcOSoT', 'W5SMWRtcRq', 'W7SmW5dcLLeTlcRdHXNdOSkqeCk5', 'WRBcGrpdOCofq04Pac/cVLL/ySkAyY3dM30VW7JdRKrWnINcNmonzcfnpSkgASkjtCkIeW', 'ySkQufG', 'WOTfvGu+', 'W53dKhuvbq', 'yZBcMmkPdXddMYyOWRRcLq', 'tGXIjSoC', 'g8kUs8oEhW', 'n2zUvSoMWRJcTW', 'W5RcUmkm', 'W4BcMsNcGbldJW', 'dSodW73cK8k7', 'W6BcQw5fFG', 'W5BcUmklWOhcLwtcLSoUuHjx', 'D8oSe8kBpG', 'kmoprfHWWRCuomo4mwHlpeXgW53dRmkiWOBdQcDJpgxdO8o0WP/dP8ovWQVdLg9iWOq', 'v35tW6ZdNq', 'rdyKWQ3dMq', 'jdlcHSoHfdBdMcbVW7ZcIapcPMDBb8k8', 'WP3dSqlcVKa', 'B8onW58Lca', 'dtfayCksWPO', 'W5TzquKR', 'uSowWPhdTcXe', 'vCo6bCk9oG', 'W63dH8oMzN0', 'W5VcGfS7W5m', 'WPFdJCk+WPpcTW', 'WPrAtq', 'gmkvWROwo0X+', 'W4ddULqIcG', 'W4WXWQNcUayo', 'D8o9W6HJdq', 'W58IWR7cQHC', 'uCkSWO0SiW', 'WQxcHaddU8oHtX1SxY7dP3z6BCkmCq', 'dJD9CCkpWOtdPSoV', 'yCk/WP47hq', 'W7dcK8kSWOFcVa', 'W6hdLSktiSos', 'fmkWWRGunKbJW5e', 'W5JcGYdcSYe', 'D8oGWRNdQmobW45krGv6WPxcHe0NW5S0WP/dHCk0b8ootuHHuJVcPmksW4VdIxtdOCoxEr7dLKBcILBcVsFdLmopWPVdKCokWPlcIMTrWOldKCkFjXeiWRHNxSojW7tcRCk/WO3cQ2NcG8kQyHpcPbzxEfbIW4e', 'W7dcJuflDa', 'bbWtWQe9', 'W43dUhe4jCkdt8kI', 'dSkFWQDHmG', 'B8olW4mLfmkZ', 'wXZdLCo4WPRcGLzj', 'yXVdJCkXcW', 'sWddKCoGWR4', 'W6pdS8kkvKVdL8kDruvc', 'pmout0jM', 'W4aijKe', 'EdNcMmkOeJu', 'smoGW6yfpCo3', 'W5j9q247', 'WOVdI8kBwrS', 'WRFdNmkFWPtcRW', 'WO/dPmkIsdZcLW', 'W44ZWRZcTqS', 'FJj3nSok', 'wfHAW6pdKaf7', 'W5PFq0i', 'eCo0sM1g', 'qMLdW7hdJaa', 'twNcHHy', 'W53dNdi', 'W5BcHMvTq8kk', 'xmolbmkg', 'xrtdUmkSfx1+', 'W7dcSG7cOq', 'WPBcGaddQ8oh', 'btP5WRJcMrftWPNcTW', 'W4lcQh1BtG', 'WPRcRGxcLCo9', 'fbKSWQev', 'W4ZdUxe', 'W7/dQCktwLZdGmkgrK8', 'kSoQEG', 'yW8sWOhdGq', 'WO3dNc7cT38dWRlcSSke', 'umkJWRKigSk1r8oRWPJcLW', 'o8o9BLLa', 'WOVcISoZWOBcHW', 'isBcS0O', 'WPzCxqSWfX7cKbpdUSkVDJ/dLXFdJSk7', 'WRv4WPBdOuuDWR4+', 't8oOWOVdTCoC', 'W4NdOmo9xeO', 'us8KWQe', 'WPZdPGlcH1S', 'hJDnCmkqWOJdPSo8', 'FJFcPCk4dZhdKcG', 'W7yPlfmr', 'W73cVhm', 'w8k7waFdQMq', 'W4FcJwaCW5zRWQayyq', 'F3m+W6ScWOaY', 'WQxdOmoLhdW', 'W7C+WRRdSwWrWPGdWP0bW4RdPCoSW6C', 'FKzKyIG', 'zJO0dmo3WPNcKCoxB8kI', 'lb9Mq8kw', 'jSkgWRe2dG', 'WOv3nuim', 'uJaTWQRdMq', 'WORdMmkQWO4', 'W78FW5FcJfe', 'WQddP8k9WPVcLa', 'W7/dUmkcr1VdImkbduzqW4pdRmk9', 'WRlcN8o9WO7cHa', 'kSk9WQmvaa', 'ArBdV8kSnW', 'W6NdHrddJCoN', 'W5JdVmkMmSo0', 'W7hcVHy', 'W7Pezhqr', 'W4ldNvdcS8kFfGTVqG/dKgq', 'bmoTa1hdUL94W4rZpq', 'nSowW5u1vSkMESkqW6zUWRe3W4FdLgiAW7lcQCoyWOahpSkba8oD', 'qaiRWOddTW', 'qXtdOmkUe2y', 'W5ztvvi', 'kSoTxLjX', 'j8kqWRu6oG', 'xapdQSoLWPW', 'n8kdW4/dPde', 'trJdOmkT', 'WOdcVmoZ', 'W4qMWRxcMH0pW4q', 'W6BdSSkixq', 'DCk/rqu', 'W5GIWQxcRrSfW4y', 'FCoDWORdHt4', 'F8oxWPS', 'W7NdQSkIc8o/', 'DSo+W6HVia', 'ywflEHm', 'WOhdK8k2WP/cPW', 'ESofpmkVmW', 'mSopW5e', 'AmodW58YhG', 'zvXNCq'].concat(function () {
        return ['grBcNwHRWPe', 'W73cRmk7z1y6W7ddSSo3zLO', 'fSoGW7dcLmkL', 'W6iWaeWq', 'h8oJwwT3', 'W7pcOXBcOtRcMa', 'W4ddUxyOmmkPrW', 'sNNcMrXq', 'A8ooW4GNdSk2Eq', 'vCkIWRyj', 'x8oEgCkffq', 'B8kkWP8RaW', 'WPZdSmkOWPBcSa', 'W7xcMxOlW4a', 'ztyJWPtdVq', 'W57dQ8kRpSoWW5i', 'gmkHWOvdmG', 'W5NcQapcQXW', 'wCoSWONdNmow', 'kmkrWRWCcW', 'WP/cQ8o+WQRcKLi', 'vCkOWRKkhmkk', 'D0O8W64', 'cIPlCW', 'W7VdTmkpv13dKa', 'tXPgemo6', 'lmkLW4ZdGqW', 'WOdcHGxdP8optWb9va', 'z0yIW6yAWOyL', 'aSktFSoWd8oRvmo1', 'W4RdGtldKSoLWR85zW', 'tCkWCSoWh8oRvCo8', 'W5qsi1GICW', 'oCkiWPregG', 'cSkbWRq', 'zmoFW5vfawhdRe8', 'qY1ie8ocW5JdUG', 'W7mPWQZdSW', 'WRhdLSo6zLNdImopW6mhWQK+W4ZdM1q', 'imkyWQ9DgG', 'tJvkkmoW', 'm8kBWOmEqtNcU1SGimoSWQldLG', 'rmoFWRFdPH4', 'W6tcOLdcRmkRFb44oq', 'vgr0FIy', 'rdBdT8o/WPO', 'b8kXW6a', 'W4BcP1j9AG', 'W7lcMxXKtG', 'xmo4WOpdLCoH', 'r8kYvXtdUgnaW6C', 'DLe3W6SpWOa', 'WQBcUSo2W7u', 'WPFdPmo3kau', 'W6/dP8k1mSo9W5pdU8kRW7pcSLfgnSkLWQTZdmoWj8kdyuyTfgNcQSowWRC1gL49eZ5jCgfd', 'W7/dM8oVFx0', 'qmotWOBdVmou', 'imkWWRu8lq', 'WP9Oo1uEW4W5W4NcJmk/W4NdNW', 'lYhcUe9zW4SshW', 'f8k7W6lcVa', 'jSo7y19bWQW', 'W4BdNSkRmmoOW5pcQq', 'hZpcLwv8', 'hqq5', 'WQBdNmkHWP/dTCkK', 'W5mhm0WKEeNdGZHcWPy', 'nmovWOBdUSkW', 'jMvKw8oMWRJcTW', 'W7ZdVGJdGmo7', 'W5BcILizW4W', 'W5JdLmoOvwG', 'm8owWOhdUCkQW6RdPq', 'qbnub8op', 'WQNcLmoNWQ7cHa', 'W4pcQvTCBG', 'nNPY', 'kctcV1LFW44', 'W6RdMmozE3VcK8kpW7q', 'W7xcTaZcTYdcJMNdNu3cGWS', 'rrHpiCoW', 'WQpdSCoSobSI', 'W43cGgPT', 'uZTIh8oV', 'uWNcPmkBbq', 'qb/dPCkShMP0WQe3', 'WQ/dPYfFWO8VWQOWtbm5W7m', 'x2/cUqDKuSk4W7y', 'wH/dQSkSawD1WRm9', 'tSk8WQyNeG', 'CxuOW4iA', 'W58VWQ3cOa', 'WR7dHCoieX8', 'q3blvW', 'W5BcT8khWOBcNG', 'W7FcHMmOW4S', 'dSovWPFdJCkV', 'CSogW5PFgwhdSfu', 'cCkgWRLSj8kNW69f', 'WRpdM8k2WQdcTq', 'uW4FWQVdOa', 'cSkTC8o0eW', 'uSoNWRRdNZO', 'W47dSMympmksu8k/mSoQgsi', 'qxPv', 'WONcUmoBWR7cKa', 'wW0aWQpdMq', 'W57dGJddNSoQWRS0EmojWR57vq', 'fJ9mC8k4', 'W7tdVSkYjSo7', 'mmkKWQusDb0', 'zve3W7WEWOS0W6RdNdJcGq3dNKq', 'WPtdKCkZWOpcOCoXbc9BqmkUmq', 'W7GlW5FcK0aX', 'kmkCW4ddRdeQW5pdGq', 'W594AvbiW5fVW57dR8kIWO8', 'gmoyW7/cPMvPWPtcKcTEWR8MBKeViCksqCoYWO3dKq7dRbtdGCkkWOhcVdhdJWbYWR7cQa', 'kCkiWRnHpG', 'WQHJWQJdSh5rWOqYWPKjW5/dUCoUW7tdLmkeWQ7cGcOwkxRcOCkNWPBdV8oWWOy', '6lwR5RUJ6kwL5PYC5AEz6lEo77Y5', 'W4m1nwaz', 'ruzKW4ZdKa', 'qg0aW4qT', 'imkCW4ddUcGMW5ldMW', 'qxHAW6VdNq', 'aH8/WROsFW', 'WP7dJSo3jJy', 'WPFcOCoZWRJcI1/cTCki', 'WPNcNSo8WQZcN1/cQq', 'W4ZcRSk7wd/dKw5fhdzEWPukWPHZm8kRWQJdV8kaW4VdSG3cMhLSb2G', 'whdcHHPI', 'W6VcOhm', 'dtlcPxzh', 'imowWP3dVCkO', 'vNpcQSoNxxlcLNb1WONcGepcUWSumSkBW4xcJ0inWPywW5rpcsXVfSk7qH/cGca', 'amkAWQnOoCkgW7bjW4FcQ8k3', 'sSk/WRq', 'aSoZWOhcI8oQW5PwCW', 'fau9', 'W7VcVNKnW5i', 'dSkdWRbI', 'hSodw8kkrhPLFwGREa', 'xMfkwX4', 'jmkvWPe0ma', 'W4WsihGs', 'W6ZdMmoTpGSJW6ZdMW', 'WOxcIrtdSCom', 'wq/cTmkCpW', 'sXZdPCo5WOxcJLzA', 'jNXJtSoNWRG', 'DtWfWQpdGq', 'W63cVhqlW592WQeIwG', 'rGFdO8o+WONcN1fbWRvw', 'yCkzFIBdTq', 'WRXDwdm+', 'xvSOW5aY', 'WRhcI8o1WPVcVW', 'WQdcUXlcPa', 'FSojWQJdGCo3', 'wNHivGxdQa', 'nZDmBmkrWOJdJmoTW61CWRau', 'ht1A', 'CCoeWPtcTx12W7NdVgvmWP1T', 'W4FdJConzge', 'k8o6BxHn', 'be53uCoy', 'W6hdRCos', 'r8o8WOJdPCoRW5Tl', 'kthcGSkPea', 'sGpdVmkMfq', 'WQdcTW/cT8oWza', 'ievhCCoH', 'W7ZcVxmBW5r6WQeZ', 'W4K2WQlcUGycW45WcNjIWQrGht3cVa', 'eWiWWQO', 'W7dcQq3cQrFcLh3dJhRcGX0z', 'hmoTBWi', 'W43dHJddJSoM', 'cZxcPuKBWPy', 'xwPCW6FdIHa', 'W63dM8oJBgW'].concat(function () {
          return ['WQldQdFcNrdcRhJdTG', 'sCoycCkumq', 'WPRcNqtdVSomWOOZwW', 'dCkuFmoJomoTx8o+zJq', 'A8oeW51j', 'W63dQmkvw13dLq', 'WPRdMYtcTG', 'WO7dT8k8tr0', 'rMeNW4Wj', 'Cfu3W6qp', '5OoS55M36kYC6zwJ6l6c5lUn6AcT57UU77YD6k+Y566x5B6o5PwK5lIQ5Bcn5PAn5zod5yEO5Q6o6k2P6zsp', 'lSkCW4RdOW', 'CSkqEIVdUa', 'aqFcOeTy', 'W5/dUSkMjCo0', 'xmk/WQucgG', 'WP5BAdGQ', 'WRPpWOldKaW0gqBdLsJdJG', 'ah1Nbq', 'W4TFsMqGdr3cJa', 'ndFcM0RcI8k6WPVdHmkqWOvHWQ7ySTQ427lBUnUnbt0', 'W7ZdK8o5z2JcImke', 'WOjpmeKf', 'ymktWOxdJCodW73dOsGSWOhcQq', 'EsZcL8k4ccS', 'vSkWwa/dQ2jrW695', 'W5RcQW/cJc0', 'CKicW6eH', 'hqpcKe10', 'ECo6hmk+ga', 'W6BdPLJdQmkGCf8ktSoBWRy', 'WOvBFsy/vCklEG', 'WR7cOCoZWP7cIG', 'xahdPq', 'W5CjWO7dLKu', 'W5xcJmoRW4RcP8okhtbCzG', 'W5FdTmoFswa', 'WOjeqJS5', 'jSkzzq', 'BZyMWQFdOG', 'WQLeqdec', '6lwT5RUT6kEh5P+I5AAk6lAy776j', 'WQjTle0p', 'W7GBW4hcRveNmq8', 'mmkCW7ddUtCQW5ldIa', 'W6xdS8kfvKRdQmkj', 'FZ8+WP3dUa', 'xSoThSksfG', 'FJ3cJSk4', 'tSoFWQhdS8og', 'sSk9WRSeha', 'W7BdLmoDDu0', 'vCofW7jsla', 'WPhdNYVcTxW', 'xCoAhCktaNuZ', 'W4tdJSo6DMe', 'EJtcL8k1hZNdNsqDWRpcLqS', 'WQNdIaxcVh4', 'j8kkWQ8', 'tmkFWQmFma', 'W7O3WQRdOq', 'tmkfWQDskmkHW7TuW4hcQSkTW7Pg', 'WPlcUrdcTCoj', 'gmodW5dcJmk1', 'tbNdR8k7jgf/WRmyFG', 'WRVdU8orkX0JW6ZdMW', 'sSowWOZdPW', 'WOzBxdy+', 'ngvKt8oN', 'WP7dMIJcH3a', 'dmk6tCoeoq', 'W64IWRBdSW', 'fmowWRBdTCkM', 'W73dHmo5', 'qXZdPCoTWPZcGLDa', 'w0Lbqaq', 'W5ntvhuWaX0', 'bSkGWQud', 'WOlcRrNdKmoo', 'lCkGW6/dLYC', 'W7FcRHBcQW', 'WQxcJYVcNmoP', 'BCosWQVdKca', 'DsC7WQhcM1K', 'W7aLWRhdO2yi', 'kCoQWPJdV8k6W6hdPa', 'W7VdOapdQCoE', 'r0fkuXpdUKu', 'W6fdqfmG', 'xWvIc8oF', 'W4SnlLC', 'qNPtW7tdJaP9W47cPwVcG8okqNW', 'W6tdUmkivfRdKW', 'iSoEWPddNCkVW6xdPra', 'wXtdTSk9', 'W4ywWPRdSe4', 'aCkED8o0gmo2', 'WQlcQYFdJSo5', 'gCkAWQblha', 'wmo2WQldKSo2W5zaya', 'kSouWPddU8k7W4VdSa', 'WRhcPGlcTCoPDeqRyW', 'yg19W4BdHq', 'W4tdOLCyaa', 'WRVdTdVcM04', 'W5pcGh5Nsa', 'WOX2p00iW4G', 'maOQWRSZ', 'W61csX4', 'E1DfAbO', 'rCk7uG', 'ASkhW4ZdVwGWW5NdMW', 'zLeX', 'W7/dLx0fiq', 'bIqlWO8f', 'tSkSWQud', 'W64qW5y', 'r8oTW4L3iW', 'm8o3W4JcVCkx', 'aCkjW6VdGIK', 'yuOMW6yE', 'jSoSFv9qWO8AoSoblW', 'wqFdQ8kXaa', 'hJFdNuSUdSktW4ldNCkOW6bP', 'sSkHWRilhCkqqG', 'q8o0W69hjNn2W4VdTCkK', 'WOVdK8kXWPxcRCoKaJX9tmk/oSk5', 'WPldOIBcS2apWQ4', 'W67cJwLWBW', 'W73dMmoKFgBcLSke', 'W4/cJN1Gs8kCW7RcG8kQ', 'W5ZcOSkDWOJcPL7cNa', 'W4OTWQ8', 'WQZdKmk8Eae', 'xd/cNSk5kq', 'wgxcIqD/vmk4WRZdMCkaW5z8nG', 'W7FcV0XkxG', 'W6emW63cT3y', 'nSkHWQDMkq', 'W7VdG8kVh8oq', 'WP3dHmoBobW', 'f8kRWRu', 'xwxcSbrL', 'qq9bfa', 'WOxdKCk1WPu', 'W6GrW5VcK0aXlq3dLHddSq', 'W63dKSo+rMFcJSkeW6ezWRHT', 'W7dcS2mgW5XT', 'WRBcMdhcHCoB', 'W4ldTSkKW7NcPf/cJ8kAdG8', 'uSoCWP7dTW', 'j8oRW7FcHSkh', 'vMDvW7FdHafNW74', 'hSkDB8oIhG', 'WO3dTCoXoLL+', 'jmotW5e', 'tCoFWPRdTs1EWPW', 'WR7dP8kXWRJcPa', 'WO3dK8k7WO4', 'W5ZcPCkC', 'W614F2Gp', 'WOnrxtC5', 'mdVcL2H6', 'WOFcOCodWRNcLfpcTCkB', 'lG9OzmkK', 'W5pcS8kbWOpcMvm', 'W44gl0SD', 'oSoTzKO', 'oCopA1HG', 'W73cT8kCWOhdMW8', 'WRZdS8oGcHC', 'W4pcHMvT', 'vCohW61NbG', 'W55FqunK', 'W4VcV2DOvCkyW7W', 'k8khWOv8gG', 'krnJCmks', 'W5dcP8oKWQJcIW'];
        }());
      }());
    }();
    I1i111Ii = function () {
      return iiliIl1I;
    };
    return I1i111Ii();
  }
  ;
  (function (IllIIII1, ii11i111, I1Iiill, liI1i11l, llIlii1l, llI1Ii1I, l1liiiIi) {
    IllIIII1 = IllIIII1 >> 0x9;
    llI1Ii1I = 'hs';
    l1liiiIi = 'hs';
    return function (i1iili1i, ii1iI1II, iIIill1I, lIIIlIii, Ili11lil) {
      var lI11i1il = i11lill;
      lIIIlIii = 'tfi';
      llI1Ii1I = lIIIlIii + llI1Ii1I;
      Ili11lil = 'up';
      l1liiiIi += Ili11lil;
      llI1Ii1I = iIIill1I(llI1Ii1I);
      l1liiiIi = iIIill1I(l1liiiIi);
      iIIill1I = 0x0;
      var IIliii1i = i1iili1i();
      while (!![] && --liI1i11l + ii1iI1II) {
        try {
          lIIIlIii = parseInt(lI11i1il(0xa8, 'LrqW')) / 0x1 * (parseInt(lI11i1il(0xb9, 'kn]d')) / 0x2) + -parseInt(lI11i1il(0x1e3, '@m#C')) / 0x3 * (parseInt(lI11i1il(0x16f, '6tMj')) / 0x4) + -parseInt(lI11i1il(0xbf, '26D#')) / 0x5 * (-parseInt(lI11i1il(0x1d4, 'kqO[')) / 0x6) + parseInt(lI11i1il(0x236, 'zuk0')) / 0x7 + parseInt(lI11i1il(0x1f3, 'VqPa')) / 0x8 + -parseInt(lI11i1il(0xc6, '7^4y')) / 0x9 * (-parseInt(lI11i1il(0x125, '#AE%')) / 0xa) + -parseInt(lI11i1il(0x95, 'Ge@w')) / 0xb;
        } catch (I1I1Ilil) {
          lIIIlIii = iIIill1I;
        } finally {
          Ili11lil = IIliii1i[llI1Ii1I]();
          if (IllIIII1 <= liI1i11l) {
            iIIill1I ? llIlii1l ? lIIIlIii = Ili11lil : llIlii1l = Ili11lil : iIIill1I = Ili11lil;
          } else {
            if (iIIill1I == llIlii1l['replace'](/[YVRFbgrQeMWLKuxIEpyntB=]/g, '')) {
              if (lIIIlIii === ii1iI1II) {
                IIliii1i['un' + llI1Ii1I](Ili11lil);
                break;
              }
              IIliii1i[l1liiiIi](Ili11lil);
            }
          }
        }
      }
    }(I1Iiill, ii11i111, function (IlIIIIII, Il1I1ll, IIiIII1l, Ill1IIli, l1II11lI, l111I1l1, iIllIliI) {
      Il1I1ll = '\x73\x70\x6c\x69\x74';
      IlIIIIII = arguments[0x0];
      IlIIIIII = IlIIIIII[Il1I1ll]('');
      IIiIII1l = '\x72\x65\x76\x65\x72\x73\x65';
      IlIIIIII = IlIIIIII[IIiIII1l]('\x76');
      Ill1IIli = '\x6a\x6f\x69\x6e';
      0x18e2d8;
      return IlIIIIII[Ill1IIli]('');
    });
  })(0x19000, 0x5f146, I1i111Ii, 0xca);
  if (I1i111Ii) {
    iｉl = 0xca;
  }
  (function (i11lIl11, iiIII1ii, ll1i11li) {
    var ilI1llI = {
      'fXZQA': function (iIi1iIii, I1lII1ll) {
        return iIi1iIii(I1lII1ll);
      }
    };
    ilI1llI['fXZQA'](iiIII1ii, i11lIl11['CryptoJS']);
  })(this, function (I1i1lIll) {
    var Il11lI1l = i11lill,
      III1l1 = {
        'LIqMK': function (illllIll, i1l1i111) {
          return illllIll < i1l1i111;
        },
        'XSxmN': function (iiiI1l1i, li11Iil1) {
          return iiiI1l1i !== li11Iil1;
        },
        'OECcQ': Il11lI1l(0x132, 'lIRW'),
        'WWwSC': function (llllilll, IIIilIll) {
          return llllilll * IIIilIll;
        },
        'muEUH': Il11lI1l(0x119, 'HjCF'),
        'UUcMx': function (i11l1ll, iIiililI) {
          return i11l1ll / iIiililI;
        }
      };
    (function () {
      var IililIiI = Il11lI1l,
        Il11I1II = {
          'kEqsr': function (II11iIii, I1llI11l) {
            return II11iIii !== I1llI11l;
          },
          'HkLMA': III1l1[IililIiI(0x10f, 'HjCF')]
        },
        illI1ii = I1i1lIll,
        liIIi1i1 = illI1ii['lib'],
        I11iiIII = liIIi1i1[IililIiI(0x201, 'P!)B')],
        ii1IlllI = liIIi1i1['WordArray'],
        lIiiiIiI = illI1ii[IililIiI(0x138, 'j$rX')],
        IIIillII = lIiiiIiI[IililIiI(0x249, 'Ge@w')],
        llII1Il = lIiiiIiI[IililIiI(0x20c, 'F6tO')],
        IiIl1lI = lIiiiIiI[IililIiI(0x20d, 'n)Cj')] = I11iiIII[IililIiI(0x212, 'LrqW')]({
          'cfg': I11iiIII[IililIiI(0x165, '#AE%')]({
            'keySize': III1l1[IililIiI(0x1fa, '#AE%')](0x80, 0x20),
            'hasher': IIIillII,
            'iterations': 0x1
          }),
          'init': function (iii1i1i1) {
            var liII111 = IililIiI;
            if (Il11I1II[liII111(0x23a, '2qcm')](Il11I1II['HkLMA'], Il11I1II['HkLMA'])) {
              var lI11l = III11I['apply'](ll1Iili, arguments);
              IiiIl11l = null;
              return lI11l;
            } else {
              this['cfg'] = this['cfg'][liII111(0x212, 'LrqW')](iii1i1i1);
            }
          },
          'compute': function (lIiIIill, lIlll1I) {
            var lliIlilI = IililIiI,
              IiI1liil = lliIlilI(0x16a, '5QI9')[lliIlilI(0x18e, 'Q&KF')]('|'),
              lllil1lI = 0x0;
            while (!![]) {
              switch (IiI1liil[lllil1lI++]) {
                case '0':
                  {
                    var lllI1II = iIIIIll1[lliIlilI(0x250, 'b1)e')];
                    continue;
                  }
                case '1':
                  {
                    var iIIIIll1 = ii1IlllI[lliIlilI(0x112, 'kEnz')]();
                    continue;
                  }
                case '2':
                  {
                    var ii1llIl1 = llII1Il[lliIlilI(0x240, 'hFR2')](il111I1l[lliIlilI(0x13b, 'rkh0')], lIiIIill);
                    continue;
                  }
                case '3':
                  {
                    return iIIIIll1;
                  }
                case '4':
                  {
                    while (III1l1['LIqMK'](lllI1II[lliIlilI(0x25e, 'Oq*q')], iiiiIIii)) {
                      if (III1l1[lliIlilI(0x18b, 'h7ZE')](III1l1[lliIlilI(0x1a3, '&Uvm')], lliIlilI(0xfa, '6T2x'))) {
                        var iiI1i1li = ii1llIl1[lliIlilI(0x22d, '*VYs')](lIlll1I)[lliIlilI(0x26f, 'lIRW')](iII11liI);
                        ii1llIl1[lliIlilI(0x149, ')KfY')]();
                        var lI1i1li1 = iiI1i1li[lliIlilI(0x191, 'INBE')],
                          II1IlII = lI1i1li1['length'],
                          l1il1Iil = iiI1i1li;
                        for (var IlII1iil = 0x1; IlII1iil < I11i11li; IlII1iil++) {
                          l1il1Iil = ii1llIl1['finalize'](l1il1Iil);
                          ii1llIl1['reset']();
                          var liI1lI1l = l1il1Iil[lliIlilI(0xeb, ')KfY')];
                          for (var lilIil11 = 0x0; lilIil11 < II1IlII; lilIil11++) {
                            lI1i1li1[lilIil11] ^= liI1lI1l[lilIil11];
                          }
                        }
                        iIIIIll1['concat'](iiI1i1li);
                        il1ilii1[0x0]++;
                      } else {
                        lIl1Iill = lIII1ilI[lliIlilI(0x118, 'hFR2')];
                        ilii11I();
                      }
                    }
                    continue;
                  }
                case '5':
                  {
                    var il1ilii1 = iII11liI[lliIlilI(0x250, 'b1)e')];
                    continue;
                  }
                case '6':
                  {
                    var I11i11li = il111I1l[lliIlilI(0x8b, '2qcm')];
                    continue;
                  }
                case '7':
                  {
                    var iiiiIIii = il111I1l[lliIlilI(0xf4, '@hq1')];
                    continue;
                  }
                case '8':
                  {
                    var il111I1l = this['cfg'];
                    continue;
                  }
                case '9':
                  {
                    iIIIIll1[lliIlilI(0xbb, '@hq1')] = III1l1[lliIlilI(0x1d6, 'lhxi')](iiiiIIii, 0x4);
                    continue;
                  }
                case '10':
                  {
                    var iII11liI = ii1IlllI['create']([0x1]);
                    continue;
                  }
              }
              break;
            }
          }
        });
      illI1ii[IililIiI(0x187, 'LrqW')] = function (iiiI1i11, liIIIlIl, illIIlI1) {
        var II1lIill = IililIiI;
        return IiIl1lI[II1lIill(0x19c, 'bU#c')](illIIlI1)['compute'](iiiI1i11, liIIIlIl);
      };
    })();
    return I1i1lIll['PBKDF3'];
  });
  parent[Iiliil1I(0x225, 'k)lq')]['setInterval'](function () {
    var I1iiliI1 = Iiliil1I,
      l1II1ii1 = {
        'lsOJz': function (lIl1iIiI, Iil11111) {
          return lIl1iIiI > Iil11111;
        },
        'XrIVu': function (lIl1i111, I1ll1ll) {
          return lIl1i111 - I1ll1ll;
        },
        'UYiFE': function (I1lI1ilI, llIlI1I) {
          return I1lI1ilI > llIlI1I;
        },
        'ooFjg': I1iiliI1(0x1e0, 'Oq*q'),
        'XmCWd': I1iiliI1(0x283, 'kqO[')
      };
    if (l1II1ii1['lsOJz'](l1II1ii1[I1iiliI1(0x1a2, 'LAw!')](parent['window'][I1iiliI1(0x121, 'jQo^')], parent[I1iiliI1(0x192, '4MB$')][I1iiliI1(0x1cf, 'LAw!')]), 0xa0) || l1II1ii1['UYiFE'](parent[I1iiliI1(0x15c, '@m#C')][I1iiliI1(0x294, 'lIRW')] - parent['window'][I1iiliI1(0x182, 'Sy[w')], 0xa0)) {
      if (I1iiliI1(0xf3, 'F6tO') !== l1II1ii1[I1iiliI1(0xb8, ')KfY')]) {
        top['location'][I1iiliI1(0x137, 'RyNM')] = l1II1ii1[I1iiliI1(0x1bd, 'jQo^')];
      } else {
        debugger;
      }
    }
  }, 0x12c);
  parent['window'][Iiliil1I(0x126, 'j$rX')] = function () {
    var IlII1l11 = Iiliil1I;
    event[IlII1l11(0x1e1, 'kqO[')]();
    return ![];
  };
  parent[Iiliil1I(0x1c1, 'Oy&7')][Iiliil1I(0x262, '5QI9')] = parent[Iiliil1I(0xfc, 'kqO[')]['onkeyup'] = parent[Iiliil1I(0x15c, '@m#C')][Iiliil1I(0x1b0, 'k)lq')] = function (i111ll) {
    var iiIii1lI = Iiliil1I,
      I11lllIl = {
        'sgbUx': function (I1I1Il1l, i11ilill) {
          return I1I1Il1l == i11ilill;
        },
        'QFWRJ': function (l11IIil1, ilIll1Il) {
          return l11IIil1 !== ilIll1Il;
        },
        'sbdYw': 'aFble',
        'SaMnl': 'Bmrhn'
      };
    if (I11lllIl[iiIii1lI(0x152, 'Oq*q')](i111ll[iiIii1lI(0x9a, 'wI0Y')], 0x7b)) {
      i111ll[iiIii1lI(0x103, 'JMPP')]();
      parent[iiIii1lI(0x1ac, 'INBE')]['event'][iiIii1lI(0x170, 'lIRW')] = ![];
    } else {
      if (I11lllIl[iiIii1lI(0x152, 'Oq*q')](i111ll['keyCode'], 0x74)) {
        top['location'][iiIii1lI(0x21c, '6tMj')]();
      } else {
        if (i111ll[iiIii1lI(0x1ff, 'bU#c')] == 0x55 && i111ll['ctrlKey']) {
          i111ll[iiIii1lI(0x17d, 'kn]d')]();
        } else {
          if (i111ll['keyCode'] == 0x53 && i111ll[iiIii1lI(0x12b, '&Uvm')]) {
            I11lllIl['QFWRJ'](I11lllIl['sbdYw'], I11lllIl[iiIii1lI(0x1b7, 'j$rX')]) ? i111ll['preventDefault']() : (I1IiiliI[iiIii1lI(0x143, '26D#')] = iiIiIiil['enc'][iiIii1lI(0x151, '&Uvm')]['parse'](lIII11l[iiIii1lI(0x290, 'rkh0')])[iiIii1lI(0xc7, ')KfY')](I1111iIl[iiIii1lI(0x186, '&Uvm')][iiIii1lI(0xe4, 'bU#c')]), il11IllI[iiIii1lI(0x13e, '6T2x')]());
          }
        }
      }
    }
  };
  var IIii1Ii = $('#jquery_jplayer', parent[Iiliil1I(0x1aa, 'HjCF')]),
    l11IllI1 = {
      'cssSelectorAncestor': Iiliil1I(0xe5, 'lIRW'),
      'supplied': Iiliil1I(0x99, 'k)lq')
    },
    lIIliilI = CryptoJS,
    iilIlIi,
    iliI1II1,
    iIlliIli = parent[Iiliil1I(0x9d, '7^4y')],
    iiIlil1l = parent['novel_id'];
  if (typeof self[Iiliil1I(0x93, '4MB$')] === 'undefined' || typeof self['$'][Iiliil1I(0x19a, '#AE%')] === 'undefined') {
    top[Iiliil1I(0x22a, '&JQj')][Iiliil1I(0x1d2, 'n)Cj')] = Iiliil1I(0x28e, 'zfUY');
  }
  IIii1Ii[Iiliil1I(0xff, 'F6tO')](l11IllI1);
  var IliIIil1 = parent['window']['innerWidth'],
    ii1l11Il = parent[Iiliil1I(0x92, 'F6tO')]['innerHeight'],
    ll11Illl = navigator[Iiliil1I(0x255, 'b1)e')],
    l1iIl1I1 = window[Iiliil1I(0x12a, 'Oy&7')]['webdriver'],
    OD = Math['floor'](Math[Iiliil1I(0x1b3, 'Sy[w')]() * 0xa),
    GL = MobileDevice['getGlRenderer'](),
    lil1IIlI,
    iiIIil1l,
    Ill1ll1i,
    il11Il1i,
    iliI1II1,
    IilI1Il,
    II1I11l1,
    li1111 = document['getElementById']('audio');
  if (typeof iIlliIli != Iiliil1I(0x174, '4MB$') && typeof iiIlil1l != Iiliil1I(0x228, 'VqPa')) {
    I1l1lil1(iIlliIli, iiIlil1l);
  }
  function I1l1lil1(I1Il1Iil, Iil1Il1) {
    var Il1iilii = Iiliil1I,
      iIi11lll = {
        'AatuT': 'UChOp',
        'SWBPB': function (ilIIIlI, II1IIii1) {
          return ilIIIlI !== II1IIii1;
        },
        'tTSIU': 'CnuVf',
        'NXBwu': function (l1l1lll1, lIII1iII, I1llI1lI, iII1I1iI) {
          return l1l1lll1(lIII1iII, I1llI1lI, iII1I1iI);
        },
        'yuRLL': function (llilIll, IIlIiiil, Iill1il1, iI1ll1il) {
          return llilIll(IIlIiiil, Iill1il1, iI1ll1il);
        },
        'aWhAy': function (i111Il1I) {
          return i111Il1I();
        },
        'GeWFN': Il1iilii(0x160, 'rkh0'),
        'FgqeP': function (lI1iliii, liillIll) {
          return lI1iliii(liillIll);
        },
        'jZSsK': Il1iilii(0x146, 'j$rX'),
        'bWrYO': Il1iilii(0xa4, 'P)Oa'),
        'dQneh': function (i1Il1iii, IiiiII1i) {
          return i1Il1iii + IiiiII1i;
        },
        'AQmCb': Il1iilii(0x97, 'jQo^'),
        'ReKDl': function (I1IlilI, II1Illil) {
          return I1IlilI != II1Illil;
        },
        'veZgs': function (iIl11lI1, I1ll1I1) {
          return iIl11lI1 < I1ll1I1;
        },
        'mpgAD': Il1iilii(0x227, 'Ge@w'),
        'LoLYq': function (li11ilI, iI1iI1Il) {
          return li11ilI + iI1iI1Il;
        },
        'LpmHy': function (I1IiIIil, li1ilIi1) {
          return I1IiIIil !== li1ilIi1;
        },
        'zlHuF': 'PWdsM',
        'RPYgs': 'undefined',
        'bFPUB': function (li1liiIl, IiIii111) {
          return li1liiIl === IiIii111;
        },
        'hUNzi': 'object',
        'MocSl': function (iI1iIli1, ili111) {
          return iI1iIli1 === ili111;
        },
        'hAHtp': Il1iilii(0x1a5, '#AE%'),
        'mnEVH': Il1iilii(0x1a7, 'wI0Y'),
        'lMKwH': Il1iilii(0x14e, '*VYs'),
        'yvrVp': 'DCojf',
        'HyvYU': function (i1IilIi, IiI11l1l) {
          return i1IilIi > IiI11l1l;
        },
        'VzPQU': Il1iilii(0x1ae, '5QI9'),
        'gHYtF': function (iIilIlII, llllII1I, IIliii, i1lIli) {
          return iIilIlII(llllII1I, IIliii, i1lIli);
        },
        'xDcKa': function (ilI1III, iI1ll1li) {
          return ilI1III || iI1ll1li;
        },
        'TWFaY': 'twScE',
        'wqqJz': function (lI1Iii1, i1ll111i) {
          return lI1Iii1 - i1ll111i;
        },
        'ObbyC': function (lIIIl11l, Iiiillli) {
          return lIIIl11l == Iiiillli;
        },
        'qQJLp': function (i1IllII1, illIlil1) {
          return i1IllII1 === illIlil1;
        },
        'aysoF': Il1iilii(0xc5, 'h7ZE'),
        'gqFTg': Il1iilii(0x18c, 'jQo^'),
        'qRudf': 'GXOgW',
        'jKnHb': Il1iilii(0xa0, 'bU#c'),
        'EqjDx': function (iIIIll1l, lilIIliI) {
          return iIIIll1l + lilIIliI;
        },
        'gHnZK': function (il1IIl1I, lli1lil) {
          return il1IIl1I + lli1lil;
        },
        'pJEsq': 'input',
        'gUQys': Il1iilii(0x171, '5QI9'),
        'tGgXM': Il1iilii(0x19f, 'LAw!'),
        'ZZcBg': function (lli1i1i1, iIi1i1I) {
          return lli1i1i1 === iIi1i1I;
        },
        'yoADW': 'UzWYC',
        'VghuT': Il1iilii(0x1c9, 'gQAr'),
        'uRtrX': Il1iilii(0x10d, '7^4y'),
        'dsWlV': Il1iilii(0x1e9, 'kn]d'),
        'dHWoM': Il1iilii(0x1f0, '6tMj'),
        'Xpuwj': function (l1i11i1l, Ii1I111i) {
          return l1i11i1l < Ii1I111i;
        },
        'BYbPR': Il1iilii(0x280, 'kEnz'),
        'ZTjkI': Il1iilii(0xd1, 'RyNM'),
        'VgCIQ': function (iliiIi1i, lIlIiIi) {
          return iliiIi1i + lIlIiIi;
        },
        'lgbvE': function (l1lIiIII, I1lillli) {
          return l1lIiIII !== I1lillli;
        },
        'SKMuo': 'success',
        'ynyTt': 'kseWJ',
        'vuwFW': 'vFgbM',
        'rdgcb': function (llII1ilI, liIiliiI, l1ililil) {
          return llII1ilI(liIiliiI, l1ililil);
        },
        'ZWtlK': function (iiliiIii) {
          return iiliiIii();
        },
        'UNRNV': function (li11I1ll, ll1iIlIi) {
          return li11I1ll + ll1iIlIi;
        },
        'QzOng': function (ilIiilIi, IlIi1lIl) {
          return ilIiilIi + IlIi1lIl;
        },
        'Svwmb': Il1iilii(0x109, 'VqPa'),
        'mvpbU': Il1iilii(0x233, 'lhxi'),
        'wOUAb': '&pid=',
        'zqxWs': Il1iilii(0x1f1, 'LrqW'),
        'xxtJb': function (llIIIIl1, il1Iilli) {
          return llIIIIl1 + il1Iilli;
        },
        'CRKUj': function (iIi1IIi1, l1l1llII) {
          return iIi1IIi1 + l1l1llII;
        },
        'JSkpg': function (iil1il11, lli1lii) {
          return iil1il11 + lli1lii;
        },
        'wDcDZ': function (I1li1ii1, I1llI1iI) {
          return I1li1ii1 + I1llI1iI;
        },
        'xMzls': function (ii11ilIi, IIlllIii) {
          return ii11ilIi + IIlllIii;
        },
        'uuxzR': function (llliiIII, IiiII1Il) {
          return llliiIII + IiiII1Il;
        },
        'BrIRH': function (i1lI1I1i, iiiIIil1) {
          return i1lI1I1i + iiiIIil1;
        }
      },
      iI111i11 = function () {
        var l1ilii = Il1iilii,
          Il11iII1 = {
            'ZMDOf': function (IIlliIii, ill1IIi1) {
              return IIlliIii(ill1IIi1);
            },
            'luSUy': l1ilii(0x14f, 'jQo^'),
            'qkAFZ': function (lIIIiiii, lii1II1i) {
              return lIIIiiii === lii1II1i;
            },
            'BEeVY': iIi11lll[l1ilii(0x113, 'gQAr')],
            'FlAPe': l1ilii(0x270, 'j$rX')
          };
        if (iIi11lll[l1ilii(0x86, 'Sy[w')](l1ilii(0x203, '6T2x'), iIi11lll[l1ilii(0x206, 'zuk0')])) {
          Il11iII1['ZMDOf'](III11I11, illl1IlI);
        } else {
          var IllI1Ii1 = !![];
          return function (llI11i1, I11liI) {
            var iillIIi1 = l1ilii,
              I1Ii1Ii1 = {
                'sWotj': Il11iII1[iillIIi1(0x178, '5QI9')],
                'OYPEH': function (i1l11ll, Ii1lIi1i) {
                  return Il11iII1['qkAFZ'](i1l11ll, Ii1lIi1i);
                },
                'Yumuy': Il11iII1[iillIIi1(0x8f, 'oP5Z')],
                'btpqf': Il11iII1['FlAPe']
              },
              liiliII1 = IllI1Ii1 ? function () {
                var iIi1liIi = iillIIi1;
                if (I11liI) {
                  if (I1Ii1Ii1['OYPEH'](I1Ii1Ii1[iIi1liIi(0x100, '@hq1')], I1Ii1Ii1['btpqf'])) {
                    lIiI1lI[iIi1liIi(0xec, '@m#C')]('您的访问过于频繁，请等待数个小时后再次访问');
                    I1iiIIIl[iIi1liIi(0x1df, 'hFR2')](I1Ii1Ii1['sWotj']);
                  } else {
                    var llil1iIl = I11liI['apply'](llI11i1, arguments);
                    I11liI = null;
                    return llil1iIl;
                  }
                }
              } : function () {};
            IllI1Ii1 = ![];
            return liiliII1;
          };
        }
      }(),
      iil1lI1 = iI111i11(this, function () {
        var IllIIiil = Il1iilii,
          llIlilII = {
            'inNla': iIi11lll[IllIIiil(0x16e, 'VqPa')],
            'DfsZj': IllIIiil(0x281, 'Ge@w'),
            'hcWzD': function (ilIiIIIi, IIIilIi1) {
              var li1lillI = IllIIiil;
              return iIi11lll[li1lillI(0xe6, '7^4y')](ilIiIIIi, IIIilIi1);
            },
            'YQRWx': iIi11lll['jZSsK'],
            'imFoB': iIi11lll[IllIIiil(0x285, '*VYs')],
            'WOSDq': function (Illi1l, IiII11i1) {
              var III11Ill = IllIIiil;
              return iIi11lll[III11Ill(0x272, '&JQj')](Illi1l, IiII11i1);
            },
            'uWSEx': IllIIiil(0x89, 'Q&KF'),
            'zxEaI': iIi11lll[IllIIiil(0x1ec, 'oP5Z')],
            'OsaoH': function (lIllllIl, I1i1II11) {
              var IIIlI1i1 = IllIIiil;
              return iIi11lll[IIIlI1i1(0x10e, 'JMPP')](lIllllIl, I1i1II11);
            },
            'HxzZI': function (IIiII1li, l1lll1) {
              var iI1liill = IllIIiil;
              return iIi11lll[iI1liill(0x136, '&*MV')](IIiII1li, l1lll1);
            },
            'OQpWI': function (l1iIiIi1, IIIIl1lI) {
              return l1iIiIi1 === IIIIl1lI;
            },
            'TafHM': iIi11lll[IllIIiil(0x83, '*VYs')],
            'Zypyh': function (iiiIllii, liiIIll) {
              return iIi11lll['LoLYq'](iiiIllii, liiIIll);
            },
            'lMhqO': function (lIIlIi1, I1ll1iil) {
              var lI1llliI = IllIIiil;
              return iIi11lll[lI1llliI(0x207, 'F6tO')](lIIlIi1, I1ll1iil);
            },
            'AABaS': iIi11lll[IllIIiil(0x237, '6T2x')],
            'eeeCh': function (liIIiili, ilIiI1i, II11iIIl, iiIII111) {
              return liIIiili(ilIiI1i, II11iIIl, iiIII111);
            }
          },
          iI1liI1i = iIi11lll[IllIIiil(0xc2, 'LrqW')](typeof window, iIi11lll[IllIIiil(0x134, 'Oq*q')]) ? window : iIi11lll[IllIIiil(0xd9, 'wI0Y')](typeof process, iIi11lll['hUNzi']) && iIi11lll[IllIIiil(0x26d, 'b1)e')](typeof require, iIi11lll['hAHtp']) && typeof global === IllIIiil(0xa6, 'JMPP') ? global : this,
          l1il11ii = new RegExp(iIi11lll['mnEVH'], 'g'),
          l11il1iI = 'wyHNEwqdwAQOEGHsWC.huaONntQGiNnlxlyffg.cc;QRAwwwqZ.hPkAuanNPltiBnVvgHS.jIPtxoZIpGAjVBKzylxbqYeqQejJOZLvHBBU'[IllIIiil(0x229, 'hFR2')](l1il11ii, '')[IllIIiil(0x28f, '&*MV')](';'),
          II1iili1,
          I11l1Ii1,
          Ii11iII,
          lii11I1,
          l11li1iI = function (Il1IIiII, Iii1lllI, IlIiilii) {
            var ii111Iil = IllIIiil,
              iliI1l = {
                'lxCYf': llIlilII[ii111Iil(0x291, 'n)Cj')],
                'YCtNo': function (lIlllIii, liliII) {
                  var lIll1lii = ii111Iil;
                  return llIlilII[lIll1lii(0xdb, 'lhxi')](lIlllIii, liliII);
                },
                'wExRg': llIlilII[ii111Iil(0x261, 'Sy[w')],
                'zEnKJ': llIlilII[ii111Iil(0x19b, 'HjCF')],
                'rqNws': function (i1lIIl, ilIiIlI) {
                  var liiIli1I = ii111Iil;
                  return llIlilII[liiIli1I(0x1ba, 'RyNM')](i1lIIl, ilIiIlI);
                },
                'EzHOl': ii111Iil(0x256, 'RyNM')
              };
            if (llIlilII[ii111Iil(0x19d, 'zuk0')] === llIlilII['zxEaI']) {
              iiIIii1i[ii111Iil(0xf2, '2qcm')]['href'] = llIlilII['inNla'];
            } else {
              if (llIlilII[ii111Iil(0x21e, 'LrqW')](Il1IIiII[ii111Iil(0x14d, '&Uvm')], Iii1lllI)) {
                return ![];
              }
              for (var iIiliIll = 0x0; iIiliIll < Iii1lllI; iIiliIll++) {
                for (var IIIiIi11 = 0x0; llIlilII[ii111Iil(0x8e, 'hFR2')](IIIiIi11, IlIiilii['length']); IIIiIi11 += 0x2) {
                  if (llIlilII[ii111Iil(0x12d, 'zfUY')]('hVoLI', llIlilII['TafHM'])) {
                    if (iIiliIll == IlIiilii[IIIiIi11] && llIlilII['OsaoH'](Il1IIiII[ii111Iil(0xe8, '5QI9')](iIiliIll), IlIiilii[llIlilII[ii111Iil(0xdf, 'lhxi')](IIIiIi11, 0x1)])) {
                      if (llIlilII['lMhqO']('TVMTR', llIlilII[ii111Iil(0x20f, '26D#')])) {
                        return ![];
                      } else {
                        iIil1il1();
                      }
                    }
                  } else {
                    var lliIil1l = new i1l111iI('function\x20*\x5c(\x20*\x5c)'),
                      IiliilI = new I1Iil1Il(qinsll['lxCYf'], 'i'),
                      iiiliIlI = qinsll['YCtNo'](Illl1II1, qinsll[ii111Iil(0xf6, 'VqPa')]);
                    !lliIil1l[ii111Iil(0xea, '6T2x')](iiiliIlI + qinsll[ii111Iil(0x195, 'h7ZE')]) || !IiliilI[ii111Iil(0x90, '7^4y')](qinsll['rqNws'](iiiliIlI, qinsll[ii111Iil(0x11f, 'Ge@w')])) ? iiiliIlI('0') : Iii1l11I();
                  }
                }
              }
              return !![];
            }
          },
          Il1lli1l = function (ll1lil1l, Ill11l1l, iIl1IlI) {
            return llIlilII['eeeCh'](l11li1iI, Ill11l1l, iIl1IlI, ll1lil1l);
          },
          IiII1l1l = function (IIiI1ilI, illilll, lIiI1Ii) {
            var Illil1i = IllIIiil;
            return iIi11lll[Illil1i(0x253, 'rkh0')](Il1lli1l, illilll, IIiI1ilI, lIiI1Ii);
          },
          IIiIiII = function (l1111ili, I1lll11I, lillIill) {
            var illIlI1l = IllIIiil;
            return iIi11lll[illIlI1l(0x239, 'F6tO')](IiII1l1l, I1lll11I, lillIill, l1111ili);
          };
        for (var I1ll1i1I in iI1liI1i) {
          if (iIi11lll[IllIIiil(0xee, '&JQj')](iIi11lll['lMKwH'], iIi11lll['yvrVp'])) {
            return;
          } else {
            if (iIi11lll[IllIIiil(0x1a6, 'LrqW')](l11li1iI, I1ll1i1I, 0x8, [0x7, 0x74, 0x5, 0x65, 0x3, 0x75, 0x0, 0x64])) {
              II1iili1 = I1ll1i1I;
              break;
            }
          }
        }
        for (var iiliIliI in iI1liI1i[II1iili1]) {
          if (IIiIiII(0x6, iiliIliI, [0x5, 0x6e, 0x0, 0x64])) {
            I11l1Ii1 = iiliIliI;
            break;
          }
        }
        for (var l11I1Ii in iI1liI1i[II1iili1]) {
          if (iIi11lll[IllIIiil(0x179, 'P)Oa')](IiII1l1l, l11I1Ii, [0x7, 0x6e, 0x0, 0x6c], 0x8)) {
            if (iIi11lll[IllIIiil(0xc8, 'oP5Z')](IllIIiil(0x25d, 'RyNM'), IllIIiil(0x188, '26D#'))) {
              return;
            } else {
              Ii11iII = l11I1Ii;
              break;
            }
          }
        }
        if (!iIi11lll[IllIIiil(0xd6, 'Q&KF')]('~', I11l1Ii1)) {
          if (iIi11lll[IllIIiil(0x1e2, 'F6tO')]('fSiCd', iIi11lll[IllIIiil(0x211, 'jQo^')])) {
            for (var lIiiii11 in iI1liI1i[II1iili1][Ii11iII]) {
              if (iIi11lll[IllIIiil(0x23c, 'Oy&7')](Il1lli1l, [0x7, 0x65, 0x0, 0x68], lIiiii11, 0x8)) {
                lii11I1 = lIiiii11;
                break;
              }
            }
          } else {
            var I1lIl11i = IllIIiil(0x1c6, 'Q&KF')[IllIIiil(0x1fb, '2qcm')]('|'),
              Il1iiilI = 0x0;
            while (!![]) {
              switch (I1lIl11i[Il1iiilI++]) {
                case '0':
                  {
                    iIiIl1iI = '';
                    continue;
                  }
                case '1':
                  {
                    iliI1il['jPlayer'](IllIIiil(0x278, 'P)Oa'), lliIiiI1['sp']);
                    continue;
                  }
                case '2':
                  {
                    lI11Iil1[IllIIiil(0x172, 'lhxi')](IllIIiil(0xd3, 'kn]d'), {
                      'mp3': IlI1IiIl
                    });
                    continue;
                  }
                case '3':
                  {
                    IlIl1Ill = '';
                    continue;
                  }
                case '4':
                  {
                    I1lIIiiI[IllIIiil(0x28d, 'oP5Z')]('play');
                    continue;
                  }
              }
              break;
            }
          }
        }
        if (!II1iili1 || !iI1liI1i[II1iili1]) {
          return;
        }
        var IIIliili = iI1liI1i[II1iili1][I11l1Ii1],
          i11il1I1 = !!iI1liI1i[II1iili1][Ii11iII] && iI1liI1i[II1iili1][Ii11iII][lii11I1],
          iiillI1I = iIi11lll[IllIIiil(0x1d1, 'oP5Z')](IIIliili, i11il1I1);
        if (!iiillI1I) {
          if (iIi11lll[IllIIiil(0xc4, 'n)Cj')] === iIi11lll[IllIIiil(0x14c, '4MB$')]) {
            return;
          } else {
            var lili1i11 = Il11i1Ii[IllIIiil(0x25c, 'LrqW')][IllIIiil(0x176, 'Q&KF')]['bind'](lIili1lI),
              iI1iilII = i1iiIli1[l1I1iIl1],
              I11I1ll1 = IIiiliI1[iI1iilII] || lili1i11;
            lili1i11[IllIIiil(0x1de, 'rkh0')] = lli1l11I[IllIIiil(0x1fd, '5QI9')](I1I1Il1);
            lili1i11[IllIIiil(0x264, '&*MV')] = I11I1ll1[IllIIiil(0xe9, 'Oq*q')]['bind'](I11I1ll1);
            llilIII[iI1iilII] = lili1i11;
          }
        }
        var iiiIlIl1 = ![];
        for (var Illi1I = 0x0; iIi11lll[IllIIiil(0x17a, '&JQj')](Illi1I, l11il1iI[IllIIiil(0x1b8, 'zfUY')]); Illi1I++) {
          var ill1I1l1 = IllIIiil(0x29a, 'h7ZE')[IllIIiil(0x289, 'JMPP')]('|'),
            l1llllII = 0x0;
          while (!![]) {
            switch (ill1I1l1[l1llllII++]) {
              case '0':
                {
                  var lliilliI = I11l1Ii1[0x0] === String[IllIIiil(0xa2, 'LrqW')](0x2e) ? I11l1Ii1[IllIIiil(0xa7, 'lhxi')](0x1) : I11l1Ii1;
                  continue;
                }
              case '1':
                {
                  var I11l1Ii1 = l11il1iI[Illi1I];
                  continue;
                }
              case '2':
                {
                  var i1iIi1Ii = iIi11lll['SWBPB'](iIii11ll, -0x1) && iIi11lll['bFPUB'](iIii11ll, ii1ii1i1);
                  continue;
                }
              case '3':
                {
                  var iIii11ll = iiillI1I[IllIIiil(0xd5, 'k)lq')](lliilliI, ii1ii1i1);
                  continue;
                }
              case '4':
                {
                  var ii1ii1i1 = iIi11lll[IllIIiil(0x266, 'LAw!')](iiillI1I['length'], lliilliI[IllIIiil(0x1dd, 'P!)B')]);
                  continue;
                }
              case '5':
                {
                  if (i1iIi1Ii) {
                    if (iIi11lll[IllIIiil(0x128, 'Oy&7')](iiillI1I[IllIIiil(0x221, 'oP5Z')], I11l1Ii1['length']) || iIi11lll['qQJLp'](I11l1Ii1[IllIIiil(0x213, 'HjCF')]('.'), 0x0)) {
                      iiiIlIl1 = !![];
                    }
                  }
                  continue;
                }
            }
            break;
          }
        }
        if (!iiiIlIl1) {
          if (iIi11lll[IllIIiil(0x214, '&*MV')] !== iIi11lll['aysoF']) {
            iIi11lll['aWhAy'](lllIlii1);
          } else {
            var iII11ll = new RegExp('[VMRgfMvpsBOSUgiyXdAOHEE]', 'g'),
              i1ll11i = iIi11lll[IllIIiil(0x183, 'RyNM')]['replace'](iII11ll, '');
            iI1liI1i[II1iili1][Ii11iII] = i1ll11i;
          }
        }
      });
    iIi11lll['aWhAy'](iil1lI1);
    var iilli1ll = function () {
      var iiIli1li = !![];
      return function (i1i1llI, iIi1ii1I) {
        var llI1l11l = i11lill;
        if (iIi11lll['SWBPB'](iIi11lll[llI1l11l(0xd7, 'h7ZE')], iIi11lll['qRudf'])) {
          liil11ii[llI1l11l(0x17d, 'kn]d')]();
          liII1ll1['window'][llI1l11l(0x18d, 'JMPP')][llI1l11l(0x24f, '*VYs')] = ![];
        } else {
          var IlilIiII = iiIli1li ? function () {
            var lIIiII1I = llI1l11l;
            if (iIi1ii1I) {
              var IIl1llIl = iIi1ii1I[lIIiII1I(0x15b, 'Sy[w')](i1i1llI, arguments);
              iIi1ii1I = null;
              return IIl1llIl;
            }
          } : function () {};
          iiIli1li = ![];
          return IlilIiII;
        }
      };
    }();
    (function () {
      var iIIlIII1 = Il1iilii,
        Iliil1l1 = {
          'StWQC': iIi11lll[iIIlIII1(0x1b5, '@hq1')],
          'NpdEd': iIIlIII1(0x293, 'Sy[w'),
          'JDPZN': function (li11illl, I1iil1Ii) {
            var lii11l = iIIlIII1;
            return iIi11lll[lii11l(0x1ee, '5QI9')](li11illl, I1iil1Ii);
          },
          'uMFxD': function (Ili1I1i1, iIiilI1l) {
            return iIi11lll['EqjDx'](Ili1I1i1, iIiilI1l);
          },
          'XxubB': iIIlIII1(0x1c5, 'VqPa'),
          'Fgdlu': function (lIIIIllI, liIiilII) {
            var i11liii1 = iIIlIII1;
            return iIi11lll[i11liii1(0x235, 'RyNM')](lIIIIllI, liIiilII);
          },
          'Aoggp': iIi11lll[iIIlIII1(0x13f, '26D#')],
          'zxUxJ': function (I1i1I1i, l1lliIll) {
            var iiiI1il1 = iIIlIII1;
            return iIi11lll[iiiI1il1(0x13c, '7^4y')](I1i1I1i, l1lliIll);
          },
          'Mivas': iIi11lll['gUQys']
        };
      iIi11lll[iIIlIII1(0x269, 'Oq*q')](iIi11lll[iIIlIII1(0x181, 'HjCF')], 'haZAK') ? iilli1ll(this, function () {
        var il1llilI = iIIlIII1,
          lIl1ilil = new RegExp(Iliil1l1[il1llilI(0x173, '*VYs')]),
          IiilIlll = new RegExp(Iliil1l1[il1llilI(0x1c8, '7^4y')], 'i'),
          lIiil1l1 = Iliil1l1['JDPZN'](ii1lii11, il1llilI(0xef, 'kqO['));
        if (!lIl1ilil[il1llilI(0xf5, '#AE%')](Iliil1l1[il1llilI(0x1b1, 'jQo^')](lIiil1l1, Iliil1l1[il1llilI(0x1ed, '#AE%')])) || !IiilIlll[il1llilI(0x232, 'kqO[')](Iliil1l1[il1llilI(0x282, 'lIRW')](lIiil1l1, Iliil1l1['Aoggp']))) {
          if (Iliil1l1[il1llilI(0x16d, 'kn]d')](Iliil1l1[il1llilI(0x8d, ')KfY')], Iliil1l1[il1llilI(0xd2, 'kEnz')])) {
            lIiil1l1('0');
          } else {
            var Ili11i1I = Iil1IlIi ? function () {
              var li1iIili = il1llilI;
              if (ilIl1ili) {
                var l1IlIliI = I1ilIi1i[li1iIili(0x1b9, 'bU#c')](IiiiiIll, arguments);
                iiii1IIl = null;
                return l1IlIliI;
              }
            } : function () {};
            iiI1lI11 = ![];
            return Ili11i1I;
          }
        } else {
          ii1lii11();
        }
      })() : II1l11ll['preventDefault']();
    })();
    var lii1l1Ii = function () {
        var illi11Il = !![];
        return function (iIlill1, l1l1l111) {
          var ll1liili = i11lill,
            ll1llllI = {
              'kBGoD': function (I1I11i1, IIIil1i) {
                return iIi11lll['ZZcBg'](I1I11i1, IIIil1i);
              },
              'WlBke': iIi11lll[ll1liili(0x14a, 'n)Cj')]
            },
            l1Illi1I = illi11Il ? function () {
              var Ili11I1 = ll1liili;
              if (l1l1l111) {
                if (ll1llllI['kBGoD'](Ili11I1(0x209, 'h7ZE'), ll1llllI[Ili11I1(0xf0, 'b1)e')])) {
                  var IiI1i1li = l1l1l111[Ili11I1(0x1ab, 'lIRW')](iIlill1, arguments);
                  l1l1l111 = null;
                  return IiI1i1li;
                } else {
                  Iil1il1l[Ili11I1(0x27c, 'hFR2')]();
                }
              }
            } : function () {};
          illi11Il = ![];
          return l1Illi1I;
        };
      }(),
      l1llII1I = iIi11lll[Il1iilii(0x1d0, 'jQo^')](lii1l1Ii, this, function () {
        var illI11ii = Il1iilii,
          I1IIli1i = typeof window !== iIi11lll[illI11ii(0x252, 'P)Oa')] ? window : iIi11lll[illI11ii(0xf9, '7^4y')](typeof process, 'object') && iIi11lll['qQJLp'](typeof require, illI11ii(0x248, 'n)Cj')) && iIi11lll['bFPUB'](typeof global, illI11ii(0x24a, 'jQo^')) ? global : this,
          I1II1lii = I1IIli1i[illI11ii(0x129, 'lhxi')] = I1IIli1i['console'] || {},
          IIiIlIIi = [illI11ii(0x24d, 'gQAr'), illI11ii(0x11b, 'LAw!'), illI11ii(0xac, 'zuk0'), iIi11lll[illI11ii(0x12e, 'Sy[w')], iIi11lll[illI11ii(0xe3, 'LAw!')], iIi11lll[illI11ii(0x1af, '2qcm')], iIi11lll[illI11ii(0x271, 'Q&KF')]];
        for (var i1iiIll1 = 0x0; iIi11lll[illI11ii(0x27a, '6tMj')](i1iiIll1, IIiIlIIi['length']); i1iiIll1++) {
          var ilI1lIi1 = iIi11lll['BYbPR'][illI11ii(0x29b, 'F6tO')]('|'),
            i1IIIll = 0x0;
          while (!![]) {
            switch (ilI1lIi1[i1IIIll++]) {
              case '0':
                {
                  var llI1l1I1 = lii1l1Ii[illI11ii(0x139, 'kn]d')]['prototype'][illI11ii(0x223, 'hFR2')](lii1l1Ii);
                  continue;
                }
              case '1':
                {
                  llI1l1I1[illI11ii(0x14b, 'oP5Z')] = i1Ililli[illI11ii(0x14b, 'oP5Z')][illI11ii(0x153, 'Oy&7')](i1Ililli);
                  continue;
                }
              case '2':
                {
                  I1II1lii[I111IIl] = llI1l1I1;
                  continue;
                }
              case '3':
                {
                  var I111IIl = IIiIlIIi[i1iiIll1];
                  continue;
                }
              case '4':
                {
                  var i1Ililli = I1II1lii[I111IIl] || llI1l1I1;
                  continue;
                }
              case '5':
                {
                  llI1l1I1['__proto__'] = lii1l1Ii[illI11ii(0x1bc, '@hq1')](lii1l1Ii);
                  continue;
                }
            }
            break;
          }
        }
      });
    iIi11lll['ZWtlK'](l1llII1I);
    if (iIi11lll[Il1iilii(0x258, 'Oy&7')](typeof parent[Il1iilii(0xbd, 'lhxi')], iIi11lll[Il1iilii(0x91, 'wI0Y')])) {
      return;
    }
    if (IliIIil1 < 0x1f4 || iIi11lll[Il1iilii(0x242, 'Oq*q')](ii1l11Il, 0x1f4)) {
      if (Il1iilii(0xbe, 'kEnz') !== Il1iilii(0x21a, 'rkh0')) {
        if (i11illiI[Il1iilii(0x28a, 'gQAr')] == 0x0) {
          iIiiIliI = IillIlli[Il1iilii(0xc9, '2qcm')];
          l1iII1Ii();
        } else {
          iIi11lll['ObbyC'](iIllIlI['status'], 0x2) ? (IIIIIl1[Il1iilii(0xc0, 'Sy[w')] = 0x0, I1iIiIi = IlI1l11i[Il1iilii(0x295, 'LAw!')], lii1l()) : IIl1liI['alert'](iIi11lll[Il1iilii(0x220, '#AE%')]);
        }
      } else {
        return;
      }
    }
    if (typeof Storage === Il1iilii(0x265, '5QI9') || typeof CryptoJS === Il1iilii(0x8a, 'rkh0') || typeof sgin === Il1iilii(0x1ce, 'w6gR') || sgin['length'] != '32') {
      return;
    }
    var iIiiliII = CryptoJS['MD5'](iIi11lll[Il1iilii(0x287, 'hFR2')](iIi11lll[Il1iilii(0xe1, 'w6gR')](iIi11lll[Il1iilii(0xfe, 'P)Oa')](iIi11lll[Il1iilii(0x148, '@hq1')](I1Il1Iil, '**'), sgin), '**'), Iil1Il1))[Il1iilii(0x1a1, '4MB$')](),
      i1ii1lli = Number(Math[Il1iilii(0x111, 'Oy&7')](new Date() / 0x3e8))['toString'](0x10)[Il1iilii(0x1fc, 'Ge@w')]('')[Il1iilii(0xde, 'h7ZE')]()[Il1iilii(0xb3, 'Ge@w')](''),
      iIIl1i1i = /Mali|Adreno|NATT|IMG|Power/i['test'](GL);
    if (iIIl1i1i) {
      if (iIi11lll[Il1iilii(0x145, 'j$rX')](iIi11lll[Il1iilii(0x23d, 'Oy&7')], iIi11lll['Svwmb'])) {
        return;
      } else {
        l111Iiii[Il1iilii(0x27f, 'Ge@w')][Il1iilii(0x15e, 'b1)e')]();
      }
    }
    $['ajax']({
      'url': iIi11lll[Il1iilii(0x24c, 'n)Cj')](iIi11lll[Il1iilii(0xaf, 'zfUY')] + I1Il1Iil + iIi11lll[Il1iilii(0x11a, 'gQAr')], Iil1Il1),
      'type': iIi11lll[Il1iilii(0x180, ')KfY')],
      'async': ![],
      'headers': {
        's1': CryptoJS[Il1iilii(0x161, 'rkh0')](iIiiliII['substr'](0xa, 0x12))[Il1iilii(0xc7, ')KfY')](),
        's2': i1ii1lli,
        's3': CryptoJS[Il1iilii(0x1dc, 'rkh0')][Il1iilii(0xfb, 'Q&KF')][Il1iilii(0x1cb, 'k)lq')](CryptoJS[Il1iilii(0x12c, 'bU#c')][Il1iilii(0x17f, 'P!)B')][Il1iilii(0x20b, 'INBE')](iIi11lll['xxtJb'](iIi11lll[Il1iilii(0x197, 'rkh0')](iIi11lll['JSkpg'](iIi11lll[Il1iilii(0x1f6, 'Q&KF')](iIi11lll['xMzls'](iIi11lll[Il1iilii(0x21f, 'wI0Y')](iIi11lll['xMzls'](iIi11lll[Il1iilii(0x1f2, '@hq1')](iIi11lll['LoLYq'](iIi11lll[Il1iilii(0x219, 'j$rX')](iIiiliII, '@'), GL), '@'), navigator[Il1iilii(0x23f, 'P!)B')]), '@'), IliIIil1), '*'), ii1l11Il), '@'), i1ii1lli)))[Il1iilii(0xcd, ')KfY')]('')['reverse']()[Il1iilii(0x200, 'k)lq')]('')
      },
      'success': function (I1I11IIl) {
        var l1lIII1I = Il1iilii;
        if (iIi11lll[l1lIII1I(0x279, '4MB$')](l1lIII1I(0xc3, 'hFR2'), 'qYLeg')) {
          if (iIi11lll[l1lIII1I(0xe7, '26D#')](I1I11IIl[l1lIII1I(0xb6, '6tMj')], iIi11lll[l1lIII1I(0x158, '4MB$')])) {
            if (iIi11lll['ynyTt'] !== iIi11lll[l1lIII1I(0x10a, 'lIRW')]) {
              I1Ii1I1l(I1I11IIl);
            } else {
              if (lIiIiIi == lIl11I[ililIiii] && GkdjaO[l1lIII1I(0x16c, ')KfY')](i1lli111[l1lIII1I(0xab, '&JQj')](l11l11i), lIIlliiI[GkdjaO[l1lIII1I(0x22e, 'lIRW')](i11llii, 0x1)])) {
                return ![];
              }
            }
          }
        } else {
          return;
        }
      }
    });
  }
  function i11lill(_0x3d734c, _0x5d5d74) {
    var _0x5d2d0f = I1i111Ii();
    i11lill = function (_0x5337e6, _0x523082) {
      _0x5337e6 = _0x5337e6 - 0x83;
      var _0x5c486d = _0x5d2d0f[_0x5337e6];
      if (i11lill['uuAPky'] === undefined) {
        var _0xad76ec = function (_0x2001a6) {
          var _0x4a790 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
          var _0x2cbf96 = '',
            _0x3e5254 = '';
          for (var _0x494c32 = 0x0, _0x385b74, _0x1c00ac, _0x1d7487 = 0x0; _0x1c00ac = _0x2001a6['charAt'](_0x1d7487++); ~_0x1c00ac && (_0x494c32 % 0x4 ? _0x385b74 = _0x385b74 * 0x40 + _0x1c00ac : _0x385b74 = _0x1c00ac, _0x494c32++ % 0x4) ? _0x2cbf96 += String['fromCharCode'](0xff & _0x385b74 >> (-0x2 * _0x494c32 & 0x6)) : 0x0) {
            _0x1c00ac = _0x4a790['indexOf'](_0x1c00ac);
          }
          for (var _0x5e1f77 = 0x0, _0x3091ee = _0x2cbf96['length']; _0x5e1f77 < _0x3091ee; _0x5e1f77++) {
            _0x3e5254 += '%' + ('00' + _0x2cbf96['charCodeAt'](_0x5e1f77)['toString'](0x10))['slice'](-0x2);
          }
          return decodeURIComponent(_0x3e5254);
        };
        var _0x34efac = function (_0xbd4cc6, _0x4d1371) {
          var _0x4a66a8 = [],
            _0x388f12 = 0x0,
            _0x3ee16e,
            _0x1a3906 = '';
          _0xbd4cc6 = _0xad76ec(_0xbd4cc6);
          var _0x3bea17;
          for (_0x3bea17 = 0x0; _0x3bea17 < 0x100; _0x3bea17++) {
            _0x4a66a8[_0x3bea17] = _0x3bea17;
          }
          for (_0x3bea17 = 0x0; _0x3bea17 < 0x100; _0x3bea17++) {
            _0x388f12 = (_0x388f12 + _0x4a66a8[_0x3bea17] + _0x4d1371['charCodeAt'](_0x3bea17 % _0x4d1371['length'])) % 0x100;
            _0x3ee16e = _0x4a66a8[_0x3bea17];
            _0x4a66a8[_0x3bea17] = _0x4a66a8[_0x388f12];
            _0x4a66a8[_0x388f12] = _0x3ee16e;
          }
          _0x3bea17 = 0x0;
          _0x388f12 = 0x0;
          for (var _0x184498 = 0x0; _0x184498 < _0xbd4cc6['length']; _0x184498++) {
            _0x3bea17 = (_0x3bea17 + 0x1) % 0x100;
            _0x388f12 = (_0x388f12 + _0x4a66a8[_0x3bea17]) % 0x100;
            _0x3ee16e = _0x4a66a8[_0x3bea17];
            _0x4a66a8[_0x3bea17] = _0x4a66a8[_0x388f12];
            _0x4a66a8[_0x388f12] = _0x3ee16e;
            _0x1a3906 += String['fromCharCode'](_0xbd4cc6['charCodeAt'](_0x184498) ^ _0x4a66a8[(_0x4a66a8[_0x3bea17] + _0x4a66a8[_0x388f12]) % 0x100]);
          }
          return _0x1a3906;
        };
        i11lill['sFFZlX'] = _0x34efac;
        _0x3d734c = arguments;
        i11lill['uuAPky'] = !![];
      }
      var _0x413894 = _0x5d2d0f[0x0],
        _0x3305b4 = _0x5337e6 + _0x413894,
        _0x324f4b = _0x3d734c[_0x3305b4];
      !_0x324f4b ? (i11lill['EylZsQ'] === undefined && (i11lill['EylZsQ'] = !![]), _0x5c486d = i11lill['sFFZlX'](_0x5c486d, _0x523082), _0x3d734c[_0x3305b4] = _0x5c486d) : _0x5c486d = _0x324f4b;
      return _0x5c486d;
    };
    return i11lill(_0x3d734c, _0x5d5d74);
  }
  function I1Ii1I1l(I11iii) {
    var l1IilIl = Iiliil1I,
      I11i1lll = {
        'NolIc': l1IilIl(0xe0, 'Sy[w'),
        'dVzHa': function (lIIIllll, lIiIi1i) {
          return lIIIllll === lIiIi1i;
        },
        'DZoaW': function (I111lIll) {
          return I111lIll();
        },
        'uLFLr': function (Ii1IIIi, ilill1I) {
          return Ii1IIIi == ilill1I;
        },
        'TCgAL': function (Ililii1i) {
          return Ililii1i();
        },
        'QGvlK': l1IilIl(0x284, '2qcm'),
        'uwMoZ': function (l1IIil11, l1iIli1l) {
          return l1IIil11 === l1iIli1l;
        },
        'JCOVw': function (iIIli1Ii, lI1i1IIi, iIIlIll1) {
          return iIIli1Ii(lI1i1IIi, iIIlIll1);
        },
        'iENVa': '.img-box\x20img',
        'XoSpA': l1IilIl(0x117, 'Ge@w'),
        'OwxPQ': function (iilllill, ilIIIi1, i11il1i1) {
          return iilllill(ilIIIi1, i11il1i1);
        },
        'zFFmT': l1IilIl(0x1f5, 'INBE'),
        'VGHFk': function (Ili1Ill, i1lIli1I) {
          return Ili1Ill != i1lIli1I;
        },
        'oTsFr': function (llI111ii, li1IlIl1) {
          return llI111ii % li1IlIl1;
        },
        'XpncO': function (i1lIilIi, ilIIil1i) {
          return i1lIilIi !== ilIIil1i;
        },
        'WKkjG': l1IilIl(0x110, 'w6gR'),
        'GFeLR': l1IilIl(0x115, 'F6tO'),
        'ztdqn': function (I1i1Iili, IIIIiii) {
          return I1i1Iili(IIIIiii);
        },
        'vxFyd': '://',
        'iahbs': function (l1Ill1I1, li11liii) {
          return l1Ill1I1 - li11liii;
        },
        'WTnzd': function (iI11ll, ill11il) {
          return iI11ll - ill11il;
        },
        'WoItY': l1IilIl(0xbc, 'kEnz'),
        'WzBOK': function (iil1, l1liI1II) {
          return iil1(l1liI1II);
        },
        'IfvPo': function (iI11IIi, lillIii1) {
          return iI11IIi * lillIii1;
        },
        'fhbUi': l1IilIl(0x18a, '&Uvm'),
        'pVbbB': l1IilIl(0x94, '4MB$'),
        'HGAfc': function (III1iIiI, i1l1iI1l) {
          return III1iIiI + i1l1iI1l;
        },
        'zvKsv': function (lil1il1i, iiill1) {
          return lil1il1i + iiill1;
        },
        'uRVOd': '&r1=',
        'lTELb': l1IilIl(0x1e6, 'kEnz')
      };
    if (I11i1lll['dVzHa'](I11iii, undefined)) {
      return;
    }
    var lllIIi11 = I11iii[l1IilIl(0x26e, 'zuk0')];
    if (I11i1lll[l1IilIl(0x1a9, 'gQAr')](lllIIi11['apiurl'], undefined)) {
      return;
    }
    iilIlIi = {
      'title': I11iii[l1IilIl(0x120, 'hFR2')],
      'author': I11iii[l1IilIl(0xad, 'k)lq')],
      'announcer': I11iii['announcer'],
      'bookurl': I11iii[l1IilIl(0x185, '@m#C')],
      'image': I11iii['image'],
      'bookid': iIlliIli,
      'pid': iiIlil1l,
      'name': lllIIi11['name'],
      'url': lllIIi11['url'],
      'prev': lllIIi11[l1IilIl(0x224, '4MB$')],
      'npid': lllIIi11['npid'],
      'next': lllIIi11['next'],
      'file': lllIIi11[l1IilIl(0x1bf, '&*MV')],
      'src': lllIIi11['src'],
      'status': lllIIi11[l1IilIl(0x167, 'Sy[w')],
      'apiurl': lIIliilI[l1IilIl(0x1dc, 'rkh0')]['Base64']['parse'](lllIIi11[l1IilIl(0x25a, 'n)Cj')])[l1IilIl(0x1da, 'Sy[w')](lIIliilI[l1IilIl(0x297, 'gQAr')][l1IilIl(0xa3, 'jQo^')])
    };
    I11i1lll[l1IilIl(0x162, 'k)lq')]($, I11i1lll['iENVa'], parent[l1IilIl(0x28c, 'oP5Z')])['attr']('src', iilIlIi[l1IilIl(0xdd, 'w6gR')]);
    I11i1lll['JCOVw']($, I11i1lll['XoSpA'], parent[l1IilIl(0x288, 'Ge@w')])[l1IilIl(0xd8, 'Sy[w')](iilIlIi[l1IilIl(0x26a, 'F6tO')]);
    I11i1lll[l1IilIl(0x234, 'lIRW')]($, I11i1lll[l1IilIl(0x260, 'RyNM')], parent[l1IilIl(0x140, 'JMPP')])[l1IilIl(0x17c, 'bU#c')](iilIlIi[l1IilIl(0xc1, 'P!)B')]);
    I11iii = '';
    if (I11i1lll[l1IilIl(0x8c, 'P!)B')](I11i1lll[l1IilIl(0x26c, 'rkh0')](OD, 0x2), 0x0)) {
      I11i1lll[l1IilIl(0xcf, 'Q&KF')](I11i1lll[l1IilIl(0x1db, '*VYs')], I11i1lll[l1IilIl(0x189, 'Oy&7')]) ? (li1111[l1IilIl(0x1c0, 'P)Oa')] = CryptoJS[l1IilIl(0x135, '#AE%')][l1IilIl(0xa5, 'n)Cj')][l1IilIl(0x217, 'h7ZE')](iilIlIi[l1IilIl(0x1fe, 'oP5Z')])['toString'](CryptoJS[l1IilIl(0x11c, 'kn]d')][l1IilIl(0x114, '@hq1')]), li1111[l1IilIl(0x25f, 'Oy&7')]()) : IllIiIli[l1IilIl(0x231, 'RyNM')](I11i1lll['NolIc'], llIllIiI);
    }
    if (I11i1lll[l1IilIl(0x1e4, '4MB$')](iilIlIi[l1IilIl(0x1d7, 'Q&KF')], '')) {
      var IilllIi1 = l1IilIl(0x238, '7^4y')[l1IilIl(0x196, 'lhxi')]('|'),
        lIIl1111 = 0x0;
      while (!![]) {
        switch (IilllIi1[lIIl1111++]) {
          case '0':
            {
              lil1IIlI = I11i1lll['ztdqn'](iI1lliIl, iilIlIi[l1IilIl(0x1c4, 'LrqW')]);
              continue;
            }
          case '1':
            {
              iiIIil1l = lIIliilI[l1IilIl(0x22f, 'lIRW')][l1IilIl(0x24e, 'j$rX')][l1IilIl(0x141, '&JQj')](lil1IIlI)[l1IilIl(0x1ad, '2qcm')](lIIliilI['enc'][l1IilIl(0x241, 'oP5Z')]);
              continue;
            }
          case '2':
            {
              if (I11i1lll[l1IilIl(0x218, 'LAw!')](iiIIil1l['indexOf'](I11i1lll[l1IilIl(0x101, 'RyNM')]), -0x1) || iiIIil1l[l1IilIl(0x10c, 'b1)e')]('$') != -0x1) {
                iliI1II1 = iiIIil1l;
              } else {
                var I11liil = '4|3|0|1|2'[l1IilIl(0xda, 'LAw!')]('|'),
                  lIl1iiiI = 0x0;
                while (!![]) {
                  switch (I11liil[lIl1iiiI++]) {
                    case '0':
                      {
                        iliI1II1 = iiIIil1l['substr'](I1I1i1Il[l1IilIl(0x1f7, '5QI9')] + il11Il1i[l1IilIl(0x194, '6T2x')], I11i1lll[l1IilIl(0x26b, '&Uvm')](I11i1lll['WTnzd'](iiIIil1l[l1IilIl(0x222, 'LAw!')], I1I1i1Il['length']), il11Il1i['length']) - 0x2);
                        continue;
                      }
                    case '1':
                      {
                        iiill1I = lIIliilI[l1IilIl(0x1b4, 'INBE')](I11i1lll[l1IilIl(0xdc, 'zuk0')], lIIliilI['enc'][l1IilIl(0xce, '&JQj')]['parse'](I1I1i1Il), {
                          'keySize': 0x4,
                          'iterations': i1I1iii1,
                          'hasher': lIIliilI[l1IilIl(0x299, 'lIRW')][l1IilIl(0x16b, 'bU#c')]
                        });
                        continue;
                      }
                    case '2':
                      {
                        iliI1II1 = lIIliilI[l1IilIl(0x20a, '26D#')][l1IilIl(0x142, 'Oq*q')]['parse'](I11i1lll['WzBOK'](lII1il11, iiill1I))[l1IilIl(0xd4, 'Ge@w')](lIIliilI['enc'][l1IilIl(0xba, '@m#C')]);
                        continue;
                      }
                    case '3':
                      {
                        il11Il1i = iiIIil1l[l1IilIl(0x27e, 'kn]d')](I1I1i1Il['length'], 0x20);
                        continue;
                      }
                    case '4':
                      {
                        var liliiiiI = iiIIil1l[l1IilIl(0x88, '@m#C')](-0x1),
                          I1I1i1Il = iiIIil1l['substr'](0x0, I11i1lll['IfvPo'](liliiiiI, 0x8)),
                          i1I1iii1 = iiIIil1l[l1IilIl(0x168, 'gQAr')](-0x2, 0x1),
                          iiill1I;
                        continue;
                      }
                  }
                  break;
                }
              }
              continue;
            }
          case '3':
            {
              IilI1Il = iliI1II1[l1IilIl(0x196, 'lhxi')]('$');
              continue;
            }
          case '4':
            {
              iilIlIi['file'] = '';
              continue;
            }
        }
        break;
      }
    }
    if (I11i1lll[l1IilIl(0x11e, '26D#')](IilI1Il, undefined)) {
      return;
    }
    parent[l1IilIl(0x1a0, 'VqPa')][l1IilIl(0x204, '6T2x')](iilIlIi);
    parent[l1IilIl(0x164, 'HjCF')][l1IilIl(0x166, 'JMPP')]({
      'name': I11i1lll[l1IilIl(0xed, 'w6gR')],
      'bookid': iIlliIli
    });
    I11i1lll[l1IilIl(0xd0, ')KfY')](IilI1Il[0x1], undefined) && iilIlIi['apiurl'] !== '' ? (II1I11l1 = IilI1Il[0x0][l1IilIl(0x198, 'j$rX')]('_'), $[l1IilIl(0x1b2, '*VYs')]({
      'type': I11i1lll[l1IilIl(0x150, 'jQo^')],
      'url': iilIlIi['apiurl'],
      'data': I11i1lll['HGAfc'](I11i1lll[l1IilIl(0x276, 'oP5Z')](l1IilIl(0x155, '@hq1') + encodeURIComponent(II1I11l1[0x0]), I11i1lll[l1IilIl(0x184, '&JQj')]), II1I11l1[0x1]),
      'dataType': I11i1lll[l1IilIl(0x273, '6T2x')],
      'success': function (IIilIIIi) {
        var Ii11liII = l1IilIl;
        if (I11i1lll[Ii11liII(0x267, 'hFR2')](Ii11liII(0x133, '6tMj'), 'HpOcp')) {
          illiIi1l[Ii11liII(0x251, '@m#C')](lllIii1i['next']);
        } else {
          if (IIilIIIi['status'] == 0x0) {
            iliI1II1 = IIilIIIi[Ii11liII(0x275, 'JMPP')];
            I11i1lll[Ii11liII(0x1ea, 'j$rX')](lIlllII);
          } else {
            I11i1lll[Ii11liII(0x9e, '@m#C')](IIilIIIi[Ii11liII(0x175, 'P!)B')], 0x2) ? (iilIlIi[Ii11liII(0xc0, 'Sy[w')] = 0x0, iliI1II1 = IIilIIIi[Ii11liII(0x15f, 'j$rX')], I11i1lll[Ii11liII(0x1e5, '#AE%')](lIlllII)) : parent[Ii11liII(0x17b, '7^4y')](I11i1lll[Ii11liII(0x98, '@m#C')]);
          }
        }
      }
    })) : I11i1lll[l1IilIl(0x169, 'rkh0')](lIlllII);
  }
  function lII1il11(iiI1II1) {
    var lli1Iiii = Iiliil1I,
      il11ii1l = {
        'eCHlY': function (lIIl1II, l1IIiI1l) {
          return lIIl1II(l1IIiI1l);
        }
      };
    return lIIliilI['AES']['decrypt'](il11ii1l[lli1Iiii(0x190, 'w6gR')](iI1lliIl, iliI1II1), iiI1II1, {
      'iv': lIIliilI['enc'][lli1Iiii(0xe2, 'lIRW')][lli1Iiii(0x19e, 'bU#c')](il11Il1i),
      'mode': lIIliilI[lli1Iiii(0x15d, '#AE%')][lli1Iiii(0x23b, 'Ge@w')]
    })[lli1Iiii(0x10b, 'wI0Y')](lIIliilI['enc'][lli1Iiii(0xa3, 'jQo^')]);
  }
  (function () {
    var i1i1ill = Iiliil1I,
      i1IlI1iI = {
        'VPGCr': function (liiI1l1i, iili111l) {
          return liiI1l1i === iili111l;
        },
        'wNRNy': i1i1ill(0x108, '&JQj'),
        'UdeZn': i1i1ill(0x230, 'zuk0'),
        'pmiTV': function (I1il1ill, I1llll) {
          return I1il1ill === I1llll;
        }
      },
      lIiI1iil = typeof window !== 'undefined' ? window : i1IlI1iI[i1i1ill(0x29c, '#AE%')](typeof process, i1IlI1iI[i1i1ill(0x21d, 'lIRW')]) && i1IlI1iI[i1i1ill(0x130, 'Oy&7')](typeof require, i1IlI1iI[i1i1ill(0x205, '6tMj')]) && i1IlI1iI['pmiTV'](typeof global, i1IlI1iI[i1i1ill(0x286, 'JMPP')]) ? global : this;
    lIiI1iil[i1i1ill(0x13a, 'lhxi')](ii1lii11, 0x7d0);
  })();
  function iI1lliIl(IlIl1Il1) {
    var llIiilI = Iiliil1I,
      IIIilli = {
        'hJWvS': 'Jugot'
      };
    if (IlIl1Il1 == null) {
      return;
    } else {
      if (llIiilI(0xb5, 'n)Cj') === IIIilli[llIiilI(0x1b6, 'zfUY')]) {
        return;
      } else {
        return IlIl1Il1['split']('')[llIiilI(0x1c3, '5QI9')]()[llIiilI(0x102, '*VYs')]('');
      }
    }
  }
  function lIlllII() {
    var IiIIIlI = Iiliil1I,
      IiIil1ll = {
        'Imlqx': '1|3|2|0|4',
        'TIZEl': 'setMedia',
        'Grbtv': 'play'
      },
      l111lIl1 = IiIil1ll['Imlqx'][IiIIIlI(0x289, 'JMPP')]('|'),
      IiIli1i1 = 0x0;
    while (!![]) {
      switch (l111lIl1[IiIli1i1++]) {
        case '0':
          {
            iliI1II1 = '';
            continue;
          }
        case '1':
          {
            IIii1Ii[IiIIIlI(0x127, 'w6gR')](IiIil1ll[IiIIIlI(0x1cd, 'Q&KF')], {
              'mp3': iliI1II1
            });
            continue;
          }
        case '2':
          {
            IIii1Ii['jPlayer'](IiIil1ll['Grbtv']);
            continue;
          }
        case '3':
          {
            IIii1Ii['jPlayer'](IiIIIlI(0x247, 'kEnz'), parent['sp']);
            continue;
          }
        case '4':
          {
            IilI1Il = '';
            continue;
          }
      }
      break;
    }
  }
  IIii1Ii[Iiliil1I(0xa1, 'gQAr')]($[Iiliil1I(0x24b, '6tMj')][Iiliil1I(0xb1, 'hFR2')][Iiliil1I(0x268, 'bU#c')], function (I1IiiiI1) {
    var il11I1I1 = Iiliil1I,
      l111iII1 = {
        'AZEwG': il11I1I1(0x18f, 'Sy[w'),
        'jrXWB': 'style',
        'QbJBX': il11I1I1(0x243, '6tMj'),
        'uMXIV': function (li1I11lI, lli1liI1, iI1iii11) {
          return li1I11lI(lli1liI1, iI1iii11);
        },
        'mZoMn': function (Ilil1Il, Iil1ii1i) {
          return Ilil1Il + Iil1ii1i;
        },
        'lKHgt': il11I1I1(0x9b, 'Sy[w')
      };
    $(l111iII1[il11I1I1(0x107, 'kqO[')], parent[il11I1I1(0x9f, 'rkh0')])['removeAttr'](l111iII1[il11I1I1(0x131, 'kn]d')])[il11I1I1(0x1cc, 'jQo^')]({
      'animation': l111iII1[il11I1I1(0x1a8, 'Oy&7')]
    });
    l111iII1['uMXIV']($, l111iII1['mZoMn'](l111iII1[il11I1I1(0x277, 'Q&KF')], iiIlil1l), parent[il11I1I1(0x22b, 'P)Oa')])['removeClass'](il11I1I1(0x12f, '&*MV'));
  });
  IIii1Ii[Iiliil1I(0xae, 'w6gR')]($[Iiliil1I(0x1bb, 'JMPP')]['event'][Iiliil1I(0x85, 'VqPa')], function (llliliiI) {
    var Ili1Il1i = Iiliil1I,
      ii1lii1 = {
        'YzGkh': function (IilI1lil, I1iiII1l, IliIiIll) {
          return IilI1lil(I1iiII1l, IliIiIll);
        },
        'yrQJm': 'style',
        'ctWhS': Ili1Il1i(0x1be, 'JMPP'),
        'ndRGr': function (IIl1ll1l, IIilili1, iIiiI1i1) {
          return IIl1ll1l(IIilili1, iIiiI1i1);
        },
        'CRGuF': Ili1Il1i(0x1eb, 'k)lq')
      };
    ii1lii1[Ili1Il1i(0x96, 'lhxi')]($, Ili1Il1i(0x1d3, '@hq1'), parent['document'])['removeAttr'](ii1lii1['yrQJm'])[Ili1Il1i(0x259, '@m#C')]({
      'animation': Ili1Il1i(0x17e, 'VqPa'),
      'animation-play-state': ii1lii1[Ili1Il1i(0x1f9, 'jQo^')]
    });
    ii1lii1['ndRGr']($, Ili1Il1i(0x159, 'oP5Z') + iiIlil1l, parent[Ili1Il1i(0x87, '2qcm')])[Ili1Il1i(0x105, 'b1)e')](ii1lii1[Ili1Il1i(0x210, '*VYs')]);
  });
  IIii1Ii['bind']($[Iiliil1I(0x19a, '#AE%')][Iiliil1I(0x1e7, 'Q&KF')][Iiliil1I(0x202, 'bU#c')], function (lliiIi1) {
    var lii11l11 = Iiliil1I,
      iIiiI11I = {
        'RdpFQ': function (Ii1ilI1l, lii1Illi, ilIIliil) {
          return Ii1ilI1l(lii1Illi, ilIIliil);
        },
        'MXTsC': lii11l11(0x22c, '&JQj'),
        'lJwZP': lii11l11(0xf8, 'LrqW')
      };
    iIiiI11I['RdpFQ']($, iIiiI11I[lii11l11(0x1a4, '6tMj')], parent['document'])['css'](lii11l11(0x104, 'k)lq'), iIiiI11I[lii11l11(0x245, 'wI0Y')]);
  });
  IIii1Ii['on']($[Iiliil1I(0xfd, 'b1)e')]['event']['canplay'], function (lIIlliI1) {
    var Ii1Iiili = Iiliil1I,
      IIIIillI = {
        'pSOvU': function (iii1iIlI, iIl1IIl1) {
          return iii1iIlI == iIl1IIl1;
        },
        'FcbZa': function (lilIliIi, iIiillll) {
          return lilIliIi === iIiillll;
        },
        'kbgbz': Ii1Iiili(0x84, 'Oq*q'),
        'cqzSX': 'height'
      };
    IIIIillI['pSOvU'](OD % 0x2, 0x0) && IIIIillI[Ii1Iiili(0x254, 'lhxi')](li1111[Ii1Iiili(0x274, 'HjCF')](Ii1Iiili(0x295, 'LAw!')), '') && (li1111[Ii1Iiili(0x290, 'rkh0')] = CryptoJS[Ii1Iiili(0x1ca, 'HjCF')][Ii1Iiili(0x27b, '#AE%')][Ii1Iiili(0x23e, 'wI0Y')](iilIlIi['src'])[Ii1Iiili(0x25b, 'lhxi')](CryptoJS[Ii1Iiili(0x199, ')KfY')][Ii1Iiili(0x177, 'h7ZE')]), li1111[Ii1Iiili(0x216, 'LAw!')]());
    $(IIIIillI['kbgbz'], parent[Ii1Iiili(0x22b, 'P)Oa')])[Ii1Iiili(0xf1, 'lhxi')](IIIIillI[Ii1Iiili(0x1d5, 'wI0Y')], '0px');
  });
  IIii1Ii['bind']($['jPlayer']['event'][Iiliil1I(0xb7, 'LAw!')], function (IiIii11l) {
    var i1i1I1Il = Iiliil1I,
      iilI1Il = {
        'RpkPP': function (il1i11l1, lIiili1i, iiil1l1) {
          return il1i11l1(lIiili1i, iiil1l1);
        },
        'ICUFi': '#Loading',
        'ENLKf': i1i1I1Il(0x193, '@hq1'),
        'RucKo': i1i1I1Il(0x116, 'P!)B'),
        'iSLZb': function (IlIl11l, i1ili1lI, iIIII1il) {
          return IlIl11l(i1ili1lI, iIIII1il);
        },
        'dTHUB': '#Loading\x20span'
      };
    switch (IiIii11l[i1i1I1Il(0x156, 'Oy&7')]['error']['type']) {
      case $['jPlayer'][i1i1I1Il(0x9c, '5QI9')]['URL']:
        {
          iilI1Il[i1i1I1Il(0x21b, 'Q&KF')]($, iilI1Il[i1i1I1Il(0xcc, 'lhxi')], parent['document'])[i1i1I1Il(0x147, '&Uvm')](iilI1Il[i1i1I1Il(0xb4, 'P!)B')], iilI1Il[i1i1I1Il(0x246, '#AE%')]);
          iilI1Il[i1i1I1Il(0xf7, 'Ge@w')]($, iilI1Il[i1i1I1Il(0x1d8, 'w6gR')], parent['document'])[i1i1I1Il(0x106, '5QI9')]('播放资源损坏了！请见谅');
          break;
        }
    }
  });
  IIii1Ii['on']($[Iiliil1I(0x28d, 'oP5Z')]['event'][Iiliil1I(0x208, 'j$rX')], function (il11iiil) {
    var Iiii1Ill = Iiliil1I,
      IiI1ilii = {
        'wEgDl': function (lIiii1iI, li1lIiI) {
          return lIiii1iI > li1lIiI;
        },
        'QZuyY': 'javascript:void(0);',
        'WmVAs': Iiii1Ill(0xb2, 'Ge@w'),
        'TGlbz': Iiii1Ill(0x1c2, 'h7ZE')
      };
    IiI1ilii['wEgDl'](iilIlIi['status'], 0x0) ? iilIlIi[Iiii1Ill(0x1e8, 'j$rX')][Iiii1Ill(0x14b, 'oP5Z')]() !== IiI1ilii[Iiii1Ill(0x28b, 'Oq*q')] ? parent[Iiii1Ill(0x144, '6T2x')](iilIlIi['next']) : parent[Iiii1Ill(0x124, 'LAw!')](iilIlIi['bookurl']) : (parent[Iiii1Ill(0x244, 'lhxi')](IiI1ilii[Iiii1Ill(0x154, 'zuk0')]), IIii1Ii['jPlayer'](IiI1ilii['TGlbz']));
  });
  function playbackRate(I1IliilI) {
    var lii1llli = Iiliil1I,
      iIIiIlil = {
        'nEBdx': lii1llli(0x27d, 'j$rX')
      };
    IIii1Ii[lii1llli(0x127, 'w6gR')](iIIiIlil['nEBdx'], I1IliilI);
  }
  $('.jp-prev', parent[Iiliil1I(0x1d9, '4MB$')])[Iiliil1I(0x298, 'rkh0')](function () {
    parent['slefurl'](iilIlIi['prev']);
  });
  $(Iiliil1I(0x296, 'wI0Y'), parent['document'])[Iiliil1I(0x292, 'b1)e')](function () {
    var Ili1Ilil = Iiliil1I;
    parent[Ili1Ilil(0x215, 'INBE')](iilIlIi[Ili1Ilil(0x1f8, '@hq1')]);
  });
  function ii1lii11(I1iiiIlI) {
    var illII1Ii = Iiliil1I,
      I1liiIii = {
        'EGrQV': function (lII1IiII, IIi1iIiI, II11I111, IiIIl1lI) {
          return lII1IiII(IIi1iIiI, II11I111, IiIIl1lI);
        },
        'DPdRU': function (iIiI11ll, lii11iii) {
          return iIiI11ll === lii11iii;
        },
        'DhRqQ': 'string',
        'rYAQc': function (ill111ii) {
          return ill111ii();
        },
        'uVehy': illII1Ii(0x1c7, 'Oy&7'),
        'cBnQW': function (i1Il1I1, Il1Iil1) {
          return i1Il1I1 !== Il1Iil1;
        },
        'SBuFr': function (IlIiI11i, l1li1il1) {
          return IlIiI11i + l1li1il1;
        },
        'AYMqq': illII1Ii(0x25e, 'Oq*q'),
        'ZZwcb': function (Il1IIIli, lI1I11l1) {
          return Il1IIIli % lI1I11l1;
        },
        'FfOvv': function (ill1illI, lIIi111) {
          return ill1illI !== lIIi111;
        },
        'fgbbA': illII1Ii(0xca, 'kqO['),
        'mPWPK': function (lliiI11I, iillllll) {
          return lliiI11I(iillllll);
        }
      };
    function ll1i1(IIIi11) {
      var liiIi1ii = illII1Ii,
        lillI = {
          'GkAjo': function (ii1IIIiI, iII1llii, Il1lI1li, l1Iliil1) {
            var I1IilIIl = i11lill;
            return I1liiIii[I1IilIIl(0x11d, 'zuk0')](ii1IIIiI, iII1llii, Il1lI1li, l1Iliil1);
          }
        };
      if (I1liiIii['DPdRU'](typeof IIIi11, I1liiIii[liiIi1ii(0x157, 'lIRW')])) {
        var lIilIlIl = function () {
          while (!![]) {}
        };
        return I1liiIii['rYAQc'](lIilIlIl);
      } else {
        if ('HBTQe' === I1liiIii['uVehy']) {
          return lillI[liiIi1ii(0x1ef, 'P)Oa')](liIII1i1, ll1iii1I, llilll1, iIliiiI);
        } else {
          if (I1liiIii['cBnQW'](I1liiIii[liiIi1ii(0xb0, 'hFR2')]('', IIIi11 / IIIi11)[I1liiIii[liiIi1ii(0x15a, 'w6gR')]], 0x1) || I1liiIii['DPdRU'](I1liiIii[liiIi1ii(0x257, 'oP5Z')](IIIi11, 0x14), 0x0)) {
            debugger;
          } else {
            if (I1liiIii['FfOvv'](liiIi1ii(0x122, '5QI9'), 'OUOGo')) {
              debugger;
            } else {
              var ilIiiiIi = I111ii11['apply'](i1IllIl, arguments);
              l1li1iiI = null;
              return ilIiiiIi;
            }
          }
        }
      }
      ll1i1(++IIIi11);
    }
    try {
      if (I1liiIii[illII1Ii(0x226, 'RyNM')] === I1liiIii[illII1Ii(0xa9, 'h7ZE')]) {
        if (I1iiiIlI) {
          return ll1i1;
        } else {
          I1liiIii['mPWPK'](ll1i1, 0x0);
        }
      } else {
        return II1ii1ll(lIIiliIi, Illii11, iiIi1iiI);
      }
    } catch (il1iiIli) {}
  }
  var version_ = 'jsjiami.com.v7';
}