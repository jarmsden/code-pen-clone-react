import React, { useState, useEffect } from 'react';
import Editor from './Editor';
import useLocalStorage from '../Hooks/useLocalStorage';

export default function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [javascript, setJavascript] = useLocalStorage('css', '')
  const [css, setCss] = useLocalStorage('javascript', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${javascript}</script>
        </html>
      `)
    }, 500)
    return () => {
      clearTimeout(timeout)
    }
  }, [html, css, javascript])     

  return (
    <>
        <div className="pane pane-top">
          <Editor 
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
          />
          <Editor 
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
          />
          <Editor 
            language="javascript"
            displayName="JS"
            value={javascript}
            onChange={setJavascript}
          />
        </div>
        <div className="pane">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </>
  )
}