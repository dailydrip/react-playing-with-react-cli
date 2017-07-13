const { h, mount, Component, Text } = require("ink");
var fetch = require("node-fetch");
var libxmljs = require("libxmljs");

function parseXML(xml) {
  const xmlDoc = libxmljs.parseXml(xml);
  // xpath queries
  const titles = xmlDoc.find("*//item//title");
  const links = xmlDoc.find("*//item//link");

  for (let i = 0; i < 5; i++) {
    console.log("// --> ", titles[i].text(), "\n", links[i].text());
  }
}

class Feed extends Component {
  constructor() {
    super();

    this.state = {
      i: ""
    };
  }

  render() {
    return h(
      Text,
      { blue: true },
      this.state.i,
      " DAILYDRIP BLOG POSTS"
    );
  }

  componentDidMount() {
    fetch("https://www.dailydrip.com/blog/feed.rss").then(response => response.text()).then(response => parseXML(response)).catch(error => {
      console.error(error);
    });
  }
}

mount(h(Feed, null), process.stdout);
