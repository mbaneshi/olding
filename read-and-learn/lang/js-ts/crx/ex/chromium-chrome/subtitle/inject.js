;(function () {
  if (!location.hostname.includes('youtube')) return
  interceptor().catch(console.log)

  function getCaptionTracks() {
    const script = [...document.querySelectorAll('script')].find((el) =>
      el.innerText.includes('ytInitialPlayerResponse'),
    )
    let config
    try {
      config = new Function(
        `const window = {}; ${script?.textContent}; return ytInitialPlayerResponse;`,
      )()
    } catch (error) {
      console.log('¬ (inject.js:14) error', error)
    }
    return config?.captions?.playerCaptionsTracklistRenderer.captionTracks
  }

  async function interceptor() {
    const open = XMLHttpRequest.prototype.open
    const send = XMLHttpRequest.prototype.send
    Object.defineProperty(XMLHttpRequest.prototype, 'open', {
      value: function (...params) {
        this._url = typeof params[1] === 'string' ? params[1] : params[1].href
        return open.apply(this, params)
      },
      writable: true,
    })

    Object.defineProperty(XMLHttpRequest.prototype, 'send', {
      value: async function (...params) {
        if (
          (await isSubtitle(this._url)) &&
          new RegExp('(^((http|https)://)?((www).)?youtube.com/watch.*v=\\S+)').test(location.href)
        ) {
          try {
            const value = await getDataByMessage('translate', {
              url: this._url,
              captionTracks: getCaptionTracks(),
            })

            Object.defineProperty(this, 'responseText', { value, writable: false })
            Object.defineProperty(this, 'response', { value, writable: false })
          } catch (e) {
            console.log('paul xhr get translate fail', e)
          }
        }
        return send.apply(this, params)
      },
      writable: true,
    })
  }

  function getDataByMessage(type, data) {
    return new Promise((resolve, reject) => {
      const listener = (ev) => {
        if (!ev.data.type?.includes('-')) return
        const [action, _type] = ev.data.type.split('-')

        if (_type !== type) {
          return
        }

        if (action === 'set') {
          resolve(ev.data[type])
          window.removeEventListener('message', listener)
        } else if (action === 'fail') {
          reject()
          window.removeEventListener('message', listener)
        }
      }
      window.addEventListener('message', listener)
      window.postMessage({ type: `get-${type}`, data })
    })
  }

  async function isTranslateOpen() {
    return await getDataByMessage('isTranslateOpen')
  }
  async function isSubtitle(url) {
    if (!url) return false
    const rule = await getDataByMessage('rule')
    const targetLanguage = await getDataByMessage('targetLanguage')
    const originLanguage = /tlang=(.*?)&/.exec(url)?.[1] || /lang=(.*?)&/.exec(url)[1]
    return (
      rule?.vttRegex &&
      new RegExp(rule.vttRegex).test(url) &&
      (await isTranslateOpen()) &&
      targetLanguage.split('-')[0] !== originLanguage.split('-')[0]
    )
  }
})()
