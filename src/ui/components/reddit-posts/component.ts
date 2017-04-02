import Component, { tracked } from "@glimmer/component";
import feedDispatcher from '../utils/dispatcher/feed-dispatcher';

export default class RedditPosts extends Component {
  @tracked feedTitle = "A Reddit feed";
  constructor(options) {
    super(options);
    feedDispatcher.register('feed:loaded', (data) => this.feedTitle = data.title);
  }
}
