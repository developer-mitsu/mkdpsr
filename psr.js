const marked = require('marked')
const hljs = require('highlightjs')

marked.setOptions({
    // code要素にdefaultで付くlangage-を削除
    langPrefix: '',
    // highlightjsによるシンタックスハイライト処理
    highlight: function(code, lang) {
        return hljs.highlightAuto(code, [lang]).value
    }
})

const renderer = new marked.Renderer()

renderer.code = function(code, fileInfo, escaped) {   
    var delimiter = ':'
    var info = fileInfo.split(delimiter)
    var lang = info.shift()
    var fileName = info.join(delimiter) // 2つ目以降のdelimiterはファイル名として扱う
    var fileTag = ''
    var UniqueId = uniqueId()

    var copyBtn = '<button class="copyBtn" id="btn-'+UniqueId+'"><i class="far fa-copy"></i></button>'

    if (fileName) {
        fileTag = '<code class="filename">'+fileName+'</code>'
    }

    if (this.options.highlight) {
        var out = this.options.highlight(code, lang)
        if (out != null && out !== code) {
            escaped = true
            code = out
        }
    }

    if (!lang) {
        return '<div class="code-header">'+fileTag+'</div><pre>'+copyBtn+'<code id="code'+UniqueId+'">'
        + (escaped ? code : escape(code, true))
        + '\n</code></pre>'
    }

    return '<div class="code-header">'
    + fileTag
    + copyBtn
    +'</div><pre><code id="code-' +UniqueId +' " class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n'

    function uniqueId(digits) {
        var strong = typeof digits !== 'undefined' ? digits : 1000
        return Date.now().toString(16) + Math.floor(strong * Math.random()).toString(16)
    }

}

module.exports = marked