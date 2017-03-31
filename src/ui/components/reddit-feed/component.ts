import Component, { tracked } from '@glimmer/component';

export default class RedditFeed extends Component {
  @tracked subreddit;
  @tracked posts;
  
  constructor(options) {
    super(options);
    this.getPosts(this.args.subreddit);
  }

  async getPosts(subreddit) {
    let response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    let postData = await response.json();
    this.posts = postData.data.children.map((post) => post.data );
    console.log(this.posts);
  }
};
