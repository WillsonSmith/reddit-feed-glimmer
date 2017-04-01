import Component, { tracked } from '@glimmer/component';

function stripDefaultThumbnails(post) {
  if (post.thumbnail && post.thumbnail === 'default') {
    post.thumbnail = {exists: false};
  } else {
    post.thumbnail = {exists: true, thumbnail: post.thumbnail};
  }
  return post;
}

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
    this.posts = postData.data.children.map((post) => stripDefaultThumbnails(post.data) );
    document.querySelector('a').focus();
  }
};
