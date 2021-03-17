import { HomePageContainer } from 'features/home/home-page-container.js';
import { page } from 'hocs/page.js';

HomePageContainer.getInitialProps = async () => ({
  namespacesRequired: ['app-loading', 'common', 'landing'],
});

export default page(HomePageContainer);
