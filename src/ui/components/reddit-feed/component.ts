import Component, { tracked } from '@glimmer/component';

export default class RedditFeed extends Component {
  @tracked posts;
  afterMarker = "";
  
  constructor(options) {
    super(options);
    this.getPosts();
  }

  async getPosts() {
    let response = await fetch(`https://www.reddit.com/r/${this.args.subreddit}.json?after=${this.afterMarker}`);
    let postData = await response.json();
    this.afterMarker = postData.data.after;
    this.posts = postData.data.children.map((post) => post.data );
  }
};
