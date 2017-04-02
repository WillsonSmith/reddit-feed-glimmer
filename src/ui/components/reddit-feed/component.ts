import Component, { tracked } from '@glimmer/component';

import feedStore from '../store/feed-store/helper';
import feedDispatcher from '../dispatcher/feed-dispatcher/helper';


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
    feedStore.set('posts', postData.data.children.map((post) => stripDefaultThumbnails(post.data)));
    this.posts = feedStore.get('posts');
    feedDispatcher.dispatch('feed:loaded');
  }
};
