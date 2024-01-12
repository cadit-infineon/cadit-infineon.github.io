function decode(data) {
  try {
    var node = parseXml(data).documentElement;
    console.log(node.getElementsByTagName('diagram'))
    if (node != null && node.nodeName == 'mxfile') {
      var diagrams = node.getElementsByTagName('diagram');
      console.log(diagrams);
      if (diagrams.length > 0) {
        data = getTextContent(diagrams[0]);
      }
    }
  }
  catch (e) {
    // ignore
    console.log(e)
  }

  // if (document.getElementById('base64Checkbox').checked) {
  try {

    console.log(data);
    data = atob(data);
  }
  catch (e) {
    console.log(e);
    alert('atob failed: ' + e);

    return;
  }
  // }

  if (/* document.getElementById('deflateCheckbox').checked && */ data.length > 0) {
    try {
      data = pako.inflateRaw(Uint8Array.from(data, c => c.charCodeAt(0)), { to: 'string' });
    }
    catch (e) {
      console.log(e);
      alert('inflateRaw failed: ' + e);

      return;
    }
  }

  // if (document.getElementById('encodeCheckbox').checked) {
  try {
    data = decodeURIComponent(data);
  }
  catch (e) {
    console.log(e);
    alert('decodeURIComponent failed: ' + e);

    return;
  }
  // }

  // if (data.length > 0) {
  //   document.getElementById('textarea').value = data;
  // }
  console.log(data)
};

function getTextContent(node) {
  return (node != null) ? node[(node.textContent === undefined) ? 'text' : 'textContent'] : '';
};

function parseXml(xml) {
  if (window.DOMParser) {
    var parser = new DOMParser();

    return parser.parseFromString(xml, 'text/xml');
  }
  else {
    var result = createXmlDocument();

    result.async = 'false';
    result.loadXML(xml);

    return result;
  }
};