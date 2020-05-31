import { DOMRenderer } from "../src/domRenderer"

test("jsdom renderer", () => {
  const jsdomRenderer = new DOMRenderer({
    window,
    isBrowser: false,
  })

  const el = jsdomRenderer.document.createTextNode("div")

  console.log(jsdomRenderer.isNode(el))
})
